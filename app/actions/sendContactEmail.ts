'use server';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Create the SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function sendContactEmail({
  name,
  userEmail,
  message,
}: {
  name: string;
  userEmail: string;
  message: string;
}) {
  const params = {
    Source: process.env.SENDER_EMAIL!, // The "From" email
    Destination: {
      ToAddresses: [process.env.CONTACT_EMAIL!], // The recipient email
    },
    Message: {
      Subject: {
        Data: `Art-related message from ${name}`,
      },
      Body: {
        Text: {
          Data: `New art-related message from ${name} (${userEmail}):\n\n${message}`,
        },
      },
    },
    ReplyToAddresses: [userEmail], // The user's email as the "Reply-To" address
  };

  try {
    const command = new SendEmailCommand(params);
    await sesClient.send(command);
    return { success: true };
  } catch (error) {
    console.error('Error sending email via SES:', error); // Log the full error object
    throw new Error('Failed to send email');
  }
}
