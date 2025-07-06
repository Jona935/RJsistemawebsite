'use server';

import type { z } from 'zod';
import type { NavigateInput } from '@/ai/flows/navigate-flow';

type LeadData = Exclude<NavigateInput['formData'], undefined>;

/**
 * Sends a lead notification to the business's WhatsApp number using a Meta Graph API template.
 * @param leadData The collected lead data (name, email, phone, etc.).
 * @param source The source of the lead ('chatbot' or 'form').
 * @returns A promise that resolves with the API response on success.
 * @throws An error if configuration is missing or the API call fails.
 */
export async function sendLeadNotification(leadData: LeadData, source: 'chatbot' | 'form') {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
  const toPhoneNumber = process.env.BUSINESS_WHATSAPP_NUMBER;

  if (!accessToken || !phoneNumberId || !toPhoneNumber) {
    console.error('WhatsApp environment variables are not set. Please check your .env file.');
    throw new Error('Server configuration error: WhatsApp credentials missing.');
  }

  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;
  
  let sourceText: string;
  if (source === 'chatbot') {
    sourceText = 'Asistente de IA del Sitio Web';
  } else {
    // Use the source from the form if available, otherwise default to a generic form message.
    sourceText = leadData.source || 'Formulario de Contacto';
  }

  // The payload uses a pre-approved template named 'lead_notification'.
  // This template is expected to have a body with 7 parameters.
  // The parameters are sent in the correct order to match the template.
  const parameters = [
    {
      type: 'text',
      text: leadData.name || 'No proporcionado',
    },
    {
      type: 'text',
      text: leadData.email || 'No proporcionado',
    },
    {
      type: 'text',
      text: leadData.phone || 'No proporcionado',
    },
    {
      type: 'text',
      text: leadData.company || 'No proporcionado',
    },
    {
      type: 'text',
      text: sourceText, // 5th parameter: How they found us.
    },
    {
      type: 'text',
      text: leadData.service || 'No proporcionado',
    },
    {
      type: 'text',
      text: leadData.message || 'No proporcionado',
    },
  ];

  const payload = {
    messaging_product: 'whatsapp',
    to: toPhoneNumber,
    type: 'template',
    template: {
      name: 'lead_notification',
      language: {
        code: 'es_mx',
      },
      components: [
        {
          type: 'body',
          parameters: parameters,
        },
      ],
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
