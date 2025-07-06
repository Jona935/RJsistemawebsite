
'use server';

import { sendLeadNotification } from './whatsapp';

/**
 * Sends a hardcoded test notification to WhatsApp.
 * This function bypasses the AI and form logic to directly test the `sendLeadNotification` service.
 */
export async function sendTestNotification() {
  console.log('--- INICIANDO PRUEBA DE WHATSAPP ---');
  
  // Hardcoded data for the test
  const testLeadData = {
    name: 'Juan Prueba',
    email: 'test@example.com',
    phone: '1234567890',
    company: 'Pruebas Inc.',
    source: 'Test Manual',
    service: 'Diseño Web de Prueba',
    message: 'Este es un mensaje de prueba para verificar la conexión con la API de WhatsApp.',
  };

  try {
    console.log('Intentando enviar notificación de prueba a través de la plantilla "lead_notification" con los siguientes datos:', JSON.stringify(testLeadData, null, 2));
    const result = await sendLeadNotification(testLeadData, 'form'); // Source can be 'form' or 'chatbot'
    console.log('--- PRUEBA DE WHATSAPP EXITOSA ---');
    console.log('Respuesta de la API de Meta:', result);
    return { success: true, message: 'Mensaje de prueba enviado con éxito.', data: result };
  } catch (error) {
    console.error('--- PRUEBA DE WHATSAPP FALLIDA ---');
    // We log the full error object for better debugging on the server
    console.error(error); 
    
    // We return a simplified error message for the client
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
    return { success: false, message: 'Falló el envío del mensaje de prueba.', error: errorMessage };
  }
}
