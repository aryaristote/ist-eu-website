import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    const { fullName, email, phone, message, planTitle, billingPeriod, price } = data;

    // Validate required fields
    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Create email transporter with debug enabled
    const transporter = nodemailer.createTransport({
      host: 'mail.ist-legal.rw',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@ist-legal.rw',
        pass: 'Kl2kWIiUmr5ORlnd'
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true, // Enable debug logs
      logger: true // Enable built-in logger
    });

    // Verify connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP Verification Error:', verifyError);
      return NextResponse.json(
        { error: 'Email server connection failed', details: verifyError.message },
        { status: 500 }
      );
    }

    // Create HTML email body
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3981a2; margin-bottom: 20px;">New Subscription Request</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin-top: 0;">Contact Information:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin-top: 0;">Plan Details:</h3>
            <p><strong>Selected Plan:</strong> ${planTitle}</p>
            <p><strong>Billing Period:</strong> ${billingPeriod}</p>
            <p><strong>Price:</strong> $${price}/${billingPeriod}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #2c3e50; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </body>
      </html>
    `; 
    
    const mailOptions = {
      from: {
        name: 'IST Legal Subscription',
        address: 'no-reply@ist-legal.rw'
      },
      to: ['support@ist-legal.rw', 'admin@ist-legal.rw'],
      subject: `IST Legal - New Subscription Request - ${fullName}`,
      html: htmlBody,
      text: `
New Subscription Request

Contact Information:
Name: ${fullName}
Email: ${email}
Phone: ${phone}

Plan Details:
Selected Plan: ${planTitle}
Billing Period: ${billingPeriod}
Price: $${price}/${billingPeriod}

Message:
${message}
      `,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'Message-ID': `<${Date.now()}.${Math.random().toString(36).substring(2)}@ist-legal.rw>`
      }
    };

    try {
      // Send email with detailed logging
      console.log('Attempting to send email...');
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      console.log('Accepted addresses:', info.accepted);
      console.log('Rejected addresses:', info.rejected);
      console.log('Pending addresses:', info.pending);
      
      return NextResponse.json(
        { 
          message: 'Form submitted successfully',
          id: info.messageId,
          details: {
            accepted: info.accepted,
            rejected: info.rejected,
            pending: info.pending,
            response: info.response
          }
        },
        { status: 200 }
      );
    } catch (sendError) {
      console.error('Email sending error:', sendError);
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: sendError.message,
          code: sendError.code 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Error submitting form', details: error.message },
      { status: 500 }
    );
  }
}
