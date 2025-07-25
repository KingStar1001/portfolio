import { Component, OnInit, OnDestroy, HostListener, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  isMobileMenuOpen = false;
  activeSection = 'home';
  private scrollTimeout: any;
  private scrollHandler!: () => void;
  private scrollPollingInterval: any;
  private lastScrollPosition = 0;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.updateActiveSection();
  }

  ngAfterViewInit() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
      this.setupScrollListeners();
    }, 100);
  }

  private setupScrollListeners() {
    // Find the actual scrollable element
    const scrollableElement = this.findScrollableElement();
    
    // Simple test function
    const testScroll = () => {
      // Scroll detected
    };
    
    // Try multiple approaches
    try {
      // Method 1: window scroll
      window.addEventListener('scroll', testScroll);
      
      // Method 2: document scroll
      document.addEventListener('scroll', testScroll);
      
      // Method 3: documentElement scroll
      document.documentElement.addEventListener('scroll', testScroll);
      
      // Method 4: body scroll
      document.body.addEventListener('scroll', testScroll);
      
      // Method 5: scrollable element scroll
      if (scrollableElement && scrollableElement !== window) {
        scrollableElement.addEventListener('scroll', testScroll);
      }
      
      // Add our component handler
      this.scrollHandler = this.onWindowScroll.bind(this);
      window.addEventListener('scroll', this.scrollHandler);
      document.addEventListener('scroll', this.scrollHandler);
      document.body.addEventListener('scroll', this.scrollHandler);
      if (scrollableElement && scrollableElement !== window) {
        scrollableElement.addEventListener('scroll', this.scrollHandler);
      }
      
    } catch (error) {
      console.error('Error setting up scroll listeners:', error);
    }
    
    // Fallback: Polling mechanism
    this.setupScrollPolling();
  }

  private findScrollableElement(): Element | Window {
    // Check which element is actually scrollable
    const elements = [window, document.documentElement, document.body];
    
    for (const element of elements) {
      if (element === window) {
        if (window.pageYOffset > 0 || document.documentElement.scrollHeight > window.innerHeight) {
          return window;
        }
      } else {
        const el = element as Element;
        if (el.scrollHeight > el.clientHeight || el.scrollTop > 0) {
          return el;
        }
      }
    }
    
    return window;
  }

  private getScrollPosition(): number {
    // Get scroll position from the correct element
    if (window.pageYOffset > 0) {
      return window.pageYOffset;
    }
    if (document.documentElement.scrollTop > 0) {
      return document.documentElement.scrollTop;
    }
    if (document.body.scrollTop > 0) {
      return document.body.scrollTop;
    }
    return 0;
  }

  private scrollTo(position: number) {
    // Scroll the correct element
    window.scrollTo(0, position);
    document.documentElement.scrollTop = position;
    document.body.scrollTop = position;
  }

  private setupScrollPolling() {
    this.lastScrollPosition = this.getScrollPosition();
    
    this.scrollPollingInterval = setInterval(() => {
      const currentPosition = this.getScrollPosition();
      if (currentPosition !== this.lastScrollPosition) {
        this.lastScrollPosition = currentPosition;
        this.updateActiveSection();
        this.cdr.detectChanges();
      }
    }, 100); // Check every 100ms
  }

  ngOnDestroy() {
    // Clean up scroll timeout and event listener
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    // Remove scroll event listeners
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      document.removeEventListener('scroll', this.scrollHandler);
      document.body.removeEventListener('scroll', this.scrollHandler);
      document.documentElement.removeEventListener('scroll', this.scrollHandler);
    }
    // Clean up polling interval
    if (this.scrollPollingInterval) {
      clearInterval(this.scrollPollingInterval);
    }
  }

  onWindowScroll() {
    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      // Throttle scroll events for better performance
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.ngZone.run(() => {
          this.updateActiveSection();
          this.cdr.detectChanges(); // Force change detection
        });
      }, 50);
    });
  }

  updateActiveSection() {
    const sections = ['home', 'projects', 'contact'];
    const navbarHeight = 80;
    const scrollPosition = this.getScrollPosition() + navbarHeight + 100;

    let currentSection = 'home';

    // Check if in any of the services sections
    const serviceSections = document.querySelectorAll('.cloud-architecture-section, .fullstack-section, .mobile-section, .web3-section, .ai-ml-section');
    for (const section of Array.from(serviceSections)) {
      const element = section as HTMLElement;
      const elementTop = element.offsetTop;
      const elementBottom = elementTop + element.offsetHeight;
      if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
        currentSection = 'services';
        break;
      }
    }

    // If not in services, check other sections
    if (currentSection === 'home') {
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = sectionId;
            break;
          }
        }
      }
    }

    // Check if we're at the very top
    if (this.getScrollPosition() < 100) {
      currentSection = 'home';
    }

    if (this.activeSection !== currentSection) {
      this.activeSection = currentSection;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    this.closeMobileMenu();
    
    // Immediately update active section for better UX
    this.activeSection = sectionId;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Height of fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;
      
      // Primary method: scrollIntoView (most reliable)
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Adjust for navbar after scroll
      setTimeout(() => {
        window.scrollBy(0, -navbarHeight);
      }, 100);
      
      // Fallback method: window.scrollTo
      setTimeout(() => {
        const currentPosition = window.pageYOffset;
        if (Math.abs(currentPosition - elementPosition) > 50) {
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 200);
      
    }
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
