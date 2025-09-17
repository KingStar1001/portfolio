import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactForm } from '../../services/contact.service';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  contactForm: ContactForm = {
    name: '',
    email: '',
    message: ''
  };
  
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  showMoveToTop = false;

  constructor(private contactService: ContactService, private cdr: ChangeDetectorRef) {}
  projects: Project[] = [
    {
      title: 'IPF Digital',
      description: 'Developed a cloud-based system for nonprofit and member-driven organizations to streamline donor management, automate billing and communications, and coordinate events and campaigns. Enhanced data centralization and boosted supporter engagement.',
      technologies: ['Full Stack', 'Web Application', 'API Integration', 'Fintech', 'Cloud'],
      liveUrl: 'https://www.ipfdigital.com/',
      githubUrl: '#',
      image: 'assets/images/project-ipf-digital.png'
    },
    {
      title: 'iLoy Solution',
      description: 'Worked on a real-time customer loyalty and engagement system for large enterprises. Developed features for profiling, personalized rewards, and automated campaigns. Ensured seamless multi-channel integration and compliance with data privacy standards.',
      technologies: ['Cloud Platform', 'API Development', 'Multilingual UI', 'Real-time Systems'],
      liveUrl: 'https://iloy-group.com/',
      githubUrl: '#'
    },
    {
      title: 'Foxway Recommerce',
      description: 'Played a role in building a comprehensive platform that manages the intake, refurbishment, and resale of used electronic devices. Enhanced process efficiency, facilitated partnerships with retailers and businesses, and advanced sustainable technology initiatives.',
      technologies: ['Full Stack', 'API Development', 'Web Application', 'Database Integration', 'AI'],
      liveUrl: 'https://www.foxway.com/en/',
      githubUrl: '#',
      image: 'assets/images/project-foxway-recommerce.png'
    },
    {
      title: 'Staffomatic',
      description: 'Contributed to the development of key features including shift scheduling, time tracking, and leave management. Improved real-time updates, streamlined shift swaps, and enhanced user workflows for managers and employees.',
      technologies: ['Full Stack', 'Real-time Systems', 'Mobile App', 'Workflow Management', 'Web Application', 'AI'],
      liveUrl: 'https://staffomatic.com/',
      githubUrl: '#',
      image: 'assets/images/project-staffomatic.png'
    },
    {
      title: 'SmartPlaces',
      description: 'Contributed to a blockchain-powered ecosystem that rewards users with tokens for real-world social interactions and event participation. Developed features around virtual land ownership, geolocation-based rewards, AR exploration, and AI moderation to create a secure, community-driven platform.',
      technologies: ['Blockchain', 'Web3', 'Geolocation', 'AR Technology', 'AI Moderation', 'Mobile App'],
      liveUrl: 'https://www.smart-places.io/',
      githubUrl: '#',
      image: 'assets/images/project-smart-places.png'
    },
    {
      title: 'Bottomless',
      description: 'Developed a smart subscription system that uses IoT-enabled scales to monitor product usage and automate reordering. Focused on enhancing user convenience by ensuring timely deliveries, flexible subscription management, and integration with partner suppliers.',
      technologies: ['Full Stack', 'API Development', 'Web Application', 'IoT Integration'],
      liveUrl: 'https://www.bottomless.com/',
      githubUrl: '#',
      image: 'assets/images/project-bottomless.png'
    },
    {
      title: 'CMO',
      description: 'Supported development of a worldwide platform that promotes legal and sustainable forestry practices. Delivered solutions for forest management, regulatory compliance, carbon offset projects, and digital tools to enhance supply chain transparency and empower small producers.',
      technologies: ['Full Stack', 'Mobile App', 'Web Application', 'API Development', 'Supply Chain'],
      liveUrl: 'https://cmogroup.io/',
      githubUrl: '#',
      image: 'assets/images/project-cmo.png'
    },
    {
      title: 'Bonify',
      description: 'Worked on a platform that provides users with real-time access to credit scores, financial insights, and personalized product recommendations. Focused on improving financial transparency, user engagement, and seamless integration with credit data providers.',
      technologies: ['Full Stack', 'Mobile App', 'Web Application', 'API Integration', 'Microservices', 'Fintech'],
      liveUrl: 'https://www.bonify.de/',
      githubUrl: '#',
      image: 'assets/images/project-bonify.png'
    },
    {
      title: 'Jirnexu',
      description: 'Built and enhanced a platform supporting end-to-end digital journeys for financial and insurance services. Worked on tools for lead generation, product comparison, digital onboarding, and customer retention, enabling seamless integration for banks, insurers, and telcos.',
      technologies: ['Full Stack', 'Mobile App', 'Web Application', 'API Integration', 'Fintech'],
      liveUrl: 'https://jirnexu.com/',
      githubUrl: '#',
      image: 'assets/images/project-jirnexu.png'
    },
    {
      title: 'GreenPower Digital',
      description: 'Supported a software-focused platform dedicated to the renewable energy sector. Delivered custom, scalable digital solutions involving data management, IoT, and analytics, optimized for solar and smart energy operations. The work helped energy firms streamline workflows, achieve energy transition goals, and manage complex project data across Europe.',
      technologies: ['Full Stack', 'IoT', 'Analytics', 'Web Application', 'Data Management', 'Renewable Energy'],
      liveUrl: 'https://www.gp-digital.io/',
      githubUrl: '#',
      image: 'assets/images/project-gp-digital.png'
    },
    {
      title: 'Winorg',
      description: 'Developed a cloud-based system for nonprofit and member-driven organizations to streamline donor management, automate billing and communications, and coordinate events and campaigns. Enhanced data centralization and boosted supporter engagement.',
      technologies: ['Full Stack', 'Mobile App', 'Web Application', 'API Integration', 'Cloud'],
      liveUrl: 'https://www.winorg.no/',
      githubUrl: '#',
      image: 'assets/images/project-winorg.png'
    }
  ];

  ngOnInit() {
    // Add scroll listener for move to top button
    // window.addEventListener('scroll', this.handleScroll.bind(this)); // Removed manual listener
  }

  ngOnDestroy() {
    // Remove scroll listener for move to top button
    // window.removeEventListener('scroll', this.handleScroll.bind(this)); // Removed manual listener
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log('Scroll position:', scrollTop, 'Show button:', scrollTop > 300);
    this.showMoveToTop = scrollTop > 300; // Show button when scrolled past 300px
    this.cdr.detectChanges(); // Trigger change detection
  }

  // handleScroll() { // Removed manual handler
  //   this.showMoveToTop = window.pageYOffset > 300; // Show button when scrolled past 300px
  // }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Calculate position accounting for navbar
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      
      // Use smooth scroll
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  scrollToTop() {
    // Smooth scroll to the top
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  async onSubmitContactForm() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      this.submitMessage = 'Please fill in all fields.';
      this.submitSuccess = false;
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactForm.email)) {
      this.submitMessage = 'Please enter a valid email address.';
      this.submitSuccess = false;
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      const result = await this.contactService.sendEmail(this.contactForm);
      
      this.submitSuccess = result.success;
      this.submitMessage = result.message;
      
      if (result.success) {
        // Reset form on success
        this.contactForm = {
          name: '',
          email: '',
          message: ''
        };
      }
    } catch (error) {
      this.submitSuccess = false;
      this.submitMessage = 'An unexpected error occurred. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
