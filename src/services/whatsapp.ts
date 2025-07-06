'use server';

import type { z } from 'zod';
import type { NavigateInput } from '@/ai/flows/navigate-flow';

type LeadData = Exclude<NavigateInput['formData'], undefined>;

/**
 * Sends a lead notification to the business's WhatsApp number using the Meta Graph API.
 * @param leadData The collected lead data (name, email, phone, etc.).
 * @returns A promise that resolves with the API response on success.
 * @throws An error if configuration is missing or the API call fails.
 */
export async function sendLeadNotification(leadData: LeadData) {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
  const toPhoneNumber = process.env.BUSINESS_WHATSAPP_NUMBER;

  if (!accessToken || !phoneNumberId || !toPhoneNumber) {
    console.error('WhatsApp environment variables are not set. Please check your .env file.');
    throw new Error('Server configuration error: WhatsApp credentials missing.');
  }

  // Use a recent, stable version of the Graph API.
  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  const messageParts = [
    `*Nuevo Lead de JRsistemas*`,
    `*Nombre:* ${leadData.name || 'No proporcionado'}`,
    `*Email:* ${leadData.email || 'No proporcionado'}`,
    `*Teléfono:* ${leadData.phone || 'No proporcionado'}`,
  ];

  if (leadData.company) {
    messageParts.push(`*Empresa:* ${leadData.company}`);
  }
  if (leadData.service) {
    messageParts.push(`*Servicio de Interés:* ${leadData.service}`);
  }
  if (leadData.message) {
    messageParts.push(`*Mensaje:* ${leadData.message}`);
  }

  const messageBody = messageParts.join('\n');
  
  // A standard text message is used for notifications to a business-controlled number.
  // This avoids reliance on pre-approved templates for this internal notification flow.
  const payload = {
    messaging_product: 'whatsapp',
    to: toPhoneNumber,
    type: 'text',
    text: {
      body: messageBody,
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Failed to send WhatsApp message:', responseData);
      throw new Error(`Failed to send WhatsApp message. API responded with: ${JSON.stringify(responseData)}`);
    }

    console.log('WhatsApp message sent successfully:', responseData);
    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error in sendLeadNotification:', error);
    throw error; // Re-throw to be handled by the caller
  }
}
