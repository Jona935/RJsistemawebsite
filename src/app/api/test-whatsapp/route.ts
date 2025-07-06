
import { NextResponse } from 'next/server';
import { sendTestNotification } from '@/services/whatsapp-test';

/**
 * API route to trigger a test WhatsApp notification.
 * Accessing GET /api/test-whatsapp will execute the test.
 */
export async function GET() {
  console.log('Solicitud recibida en /api/test-whatsapp para iniciar la prueba.');
  
  const result = await sendTestNotification();
  
  if (result.success) {
    return NextResponse.json({
      message: 'Prueba de WhatsApp iniciada. Revisa tu terminal para los logs y tu WhatsApp para el mensaje.',
      details: result,
    });
  } else {
    return NextResponse.json({
        message: 'La prueba de WhatsApp falló. Revisa los logs de la terminal para ver el error detallado.',
        details: result,
      },
      { status: 500 }
    );
  }
}
