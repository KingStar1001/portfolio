import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["Angular", "Node.js", "MongoDB", "Stripe", "Socket.io"]
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, file sharing, and team communication features.",
      technologies: ["React", "Express.js", "PostgreSQL", "Redis", "WebRTC"]
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Data visualization platform with machine learning insights, predictive analytics, and interactive charts.",
      technologies: ["Vue.js", "Python", "TensorFlow", "D3.js", "FastAPI"]
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication, transaction history, and financial planning tools.",
      technologies: ["React Native", "Java", "Spring Boot", "MySQL", "AWS"]
    },
    {
      title: "Content Management System",
      description: "Headless CMS with multi-tenant architecture, content versioning, and API-first design for modern web applications.",
      technologies: ["Angular", "C#", ".NET Core", "SQL Server", "Azure"]
    },
    {
      title: "Real-time Chat Application",
      description: "Instant messaging platform with group chats, file sharing, voice messages, and end-to-end encryption.",
      technologies: ["React", "Socket.io", "MongoDB", "Node.js", "WebRTC"]
    }
  ];
}
