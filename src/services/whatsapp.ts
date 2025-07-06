'use server';

import type { z } from 'zod';
import type { NavigateInput } from '@/ai/flows/navigate-flow';

type LeadData = Exclude<NavigateInput['formData'], undefined>;

/**
 * Sends a lead notification to the business's WhatsApp number using a Meta Graph API template.
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

  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  // Dynamically build the lead details string.
  // This string will be passed as a single parameter to the WhatsApp template.
  // This approach allows for optional fields without needing a complex template structure.
  const leadDetailsParts = [
    `*Nombre:* ${leadData.name || 'No proporcionado'}`,
    `*Email:* ${leadData.email || 'No proporcionado'}`,
    `*Teléfono:* ${leadData.phone || 'No proporcionado'}`,
  ];

  if (leadData.company) {
    leadDetailsParts.push(`*Empresa:* ${leadData.company}`);
  }
  if (leadData.service) {
    leadDetailsParts.push(`*Servicio de Interés:* ${leadData.service}`);
  }
  if (leadData.message) {
    leadDetailsParts.push(`*Mensaje:* ${leadData.message}`);
  }

  const leadDetails = leadDetailsParts.join('\n');
  
  // The payload uses a pre-approved template named 'lead_notification'.
  // This template is expected to have a body with one parameter (e.g., "Nuevo Lead:\n\n{{1}}")
  // to accommodate the dynamically generated lead details.
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
          parameters: [
            {
              type: 'text',
              text: leadDetails,
            },
          ],
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
