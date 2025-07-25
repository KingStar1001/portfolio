# EmailJS Setup Guide

This guide will help you set up EmailJS to send emails from your contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Connect your Gmail account (kudaibergentynybekov819@gmail.com)
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

This message was sent from your portfolio contact form.
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., `user_def456`)

## Step 5: Update Configuration

Update the `contact.service.ts` file with your actual values:

```typescript
// In src/app/services/contact.service.ts

constructor() {
  // Replace 'YOUR_PUBLIC_KEY' with your actual public key
  emailjs.init('user_def456'); // Your actual public key
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
      'service_abc123', // Your actual service ID
      'template_xyz789', // Your actual template ID
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, message: 'Message sent successfully!' };

  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send message. Please try again.' };
  }
}
```

## Step 6: Test the Form

1. Start your Angular application
2. Navigate to the contact section
3. Fill out the form and submit
4. Check your email (kudaibergentynybekov819@gmail.com) for the message

## Troubleshooting

- **CORS Issues**: Make sure you're using the correct service and template IDs
- **Email Not Received**: Check your spam folder and EmailJS dashboard for delivery status
- **Form Not Working**: Check browser console for JavaScript errors

## Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- Basic templates
- Gmail, Outlook, and other email services

For more emails or advanced features, consider upgrading to a paid plan. 