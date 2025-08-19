import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class AppComponent implements AfterViewInit {
  // Project data with multiple images
  projects = [
    {
      title: 'Ticket Booking Website',
      images: ['ticket 2.png', 'ticket.png', 'MONGO.png'],
      short: 'An intuitive platform for booking bus tickets online.',
      description: 'Ticket booking system, developed using Angular and MongoDB, provides a seamless experience for users to book and manage tickets. The frontend, built with Angular and enhanced by Angular Material, ensures a user-friendly interface. The backend, powered by Node.js and Express.js, facilitates communication with the MongoDB database, where booking details are stored. Users can book tickets through an intuitive form that sends data via HTTP requests to the backend for processing. A key feature of this system is the cancellation process, where a 10% fee is deducted when a user cancels a ticket, ensuring proper business logic enforcement. This fee calculation and deduction are handled efficiently through API calls, updating the stored data in MongoDB while dynamically reflecting changes in the UI. Additionally, GitHub is used for version control, allowing smooth code management and collaboration. Throughout development, various challenges, such as handling undefined values in API responses, debugging HTTP errors, and configuring Git repositories, were successfully resolved, reinforcing a strong understanding of frontend-backend integration. The system not only streamlines ticket booking but also demonstrates robust implementation of REST API connectivity and data handling, making it a well-rounded project showcasing your Angular expertise. Full PROJECT IS IN GITHUB.',
    },
    {
      title: 'Shuffling Keyboard',
      images: ['Picture1.jpg', 'Picture2.jpg', 'Picture3.jpg'],
      short: 'A fun keyboard that shuffles keys.',
      description: 'Security systems for lockers or vaults these days have been largely compromised. As technology advances, the possibility of robbery also increases. One of the most secure and widely used security systems is password protected. As with any devices that use a keypad for authentication or access, there is a risk that the password will be compromised by unscrupulous individual may deliberately observe your finger motions on the keyboard and attempt to predict your password or use the powder method to recognise your fingerprints. This paper presents a smart security system with a shuffling keyboard to overcome the issues and reduce the thefts. This system also comprises solutions for robberies in case of hostage situations, attack on the large organizations, home thefts, and unauthorized vehicle access by activating smooth silent alert system .This system is built using Micro controller with touch screen . The screen displays every message for the users understanding.'
    }
  ];

  // Modal and carousel state
  showModal = false;
  modalTitle = '';
  modalImages: string[] = [];
  modalDescription = '';
  currentImageIndex = 0;

  // Certificates
  certificates = [
    {
      name: 'Mean-Full Stack',
      date: '04 FEB 2025',
      image: 'A1.jpeg'
    },
    {
      name: 'Python',
      date: '27 MAR 2022',
      image: 'P1.jpg'
    },
    {
      name: 'Internship Certificate',
      date: '08 AUG 2021',
      image: 'i1.jpg'
    }
  ];

  // Certificate modal state
  showCertModal = false;
  certModalName = '';
  certModalDate = '';
  certModalImage = '';

  // Contact form state
  contact = { name: '', email: '', message: '' };
  contactSuccess = false;
  contactError = false;
  formStatus = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) {}

  // Project modal methods
  openProject(title: string, images: string[], description: string) {
    this.modalTitle = title;
    this.modalImages = images;
    this.modalDescription = description;
    this.currentImageIndex = 0;
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.showModal = false;
    document.body.classList.remove('modal-open');
  }

  prevImage() {
    if (this.modalImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.modalImages.length) % this.modalImages.length;
    }
  }

  nextImage() {
    if (this.modalImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.modalImages.length;
    }
  }

  // Certificate modal methods
  openCertModal(cert: any) {
    this.certModalName = cert.name;
    this.certModalDate = cert.date;
    this.certModalImage = cert.image;
    this.showCertModal = true;
    document.body.classList.add('modal-open');
  }

  closeCertModal() {
    this.showCertModal = false;
    document.body.classList.remove('modal-open');
  }
  // Section animation: left-to-right on scroll and navigation
  ngAfterViewInit() {
    const sections = this.el.nativeElement.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'active-section');
          } else {
            this.renderer.removeClass(entry.target, 'active-section');
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section: HTMLElement) => observer.observe(section));

    // Listen for hash changes (navigation)
    window.addEventListener('hashchange', () => {
      this.activateSectionFromHash();
    });

    // Activate on load if hash exists
    this.activateSectionFromHash();
  }

  activateSectionFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const section = this.el.nativeElement.querySelector(`section#${hash}`);
    if (section) {
      // Remove active-section from all sections
      this.el.nativeElement.querySelectorAll('section').forEach((sec: HTMLElement) => {
        this.renderer.removeClass(sec, 'active-section');
      });
      // Add to current section
      this.renderer.addClass(section, 'active-section');

      // Remove 'active' from all nav links
      this.el.nativeElement.querySelectorAll('.sidebar-nav a').forEach((a: HTMLElement) => {
        this.renderer.removeClass(a, 'active');
      });
      // Add 'active' to the current nav link
      const activeLink = this.el.nativeElement.querySelector(`.sidebar-nav a[href="#${hash}"]`);
      if (activeLink) {
        this.renderer.addClass(activeLink, 'active');
      }

      // Optional: scroll into view smoothly
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

  // Contact form submit
  submitContact() {
    this.http.post('http://localhost:3000/api/contact', this.contact).subscribe({
      next: () => {
        this.contactSuccess = true;
        this.contactError = false;
        this.contact = { name: '', email: '', message: '' };
      },
      error: () => {
        this.contactError = true;
        this.contactSuccess = false;
      }
    });
  }

  onSubmit() {
     if (/^[^@\s]+@gmail\.com$/.test(this.contact.email)) {
    // Proceed with sending the message or your logic
    this.formStatus = 'Message sent successfully!';
    // Optionally reset form
    this.contact = { name: '', email: '', message: '' };
  } else {
    this.formStatus = 'Please enter a valid Gmail address.';
  }
    fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.contact)
    })
      .then(res => res.json())
      .then(data => {
        this.formStatus = 'Message sent successfully!';
        this.contact = { name: '', email: '', message: '' };
      })
      .catch(err => {
        this.formStatus = 'Failed to send message. Please try again later.';
      });
  }
}
