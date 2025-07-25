import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init('FjZll4UXFn1ZcT0bG'); // You'll need to replace this with your actual EmailJS public key
  }

  async sendEmail(formData: ContactForm): Promise<{ success: boolean; message: string }> {
    try {
      const templateParams = {
        to_email: 'kudaibergentynybekov819@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email
      };

      const response = await emailjs.send(
        'service_27lzsch', // EmailJS service ID
        'template_e20sd8a', // EmailJS template ID
        templateParams
      );

      return { success: true, message: 'Message sent successfully!' };

    } catch (error) {
      return { success: false, message: 'Failed to send message. Please try again.' };
    }
  }
} 