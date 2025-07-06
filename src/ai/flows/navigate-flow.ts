'use server';

/**
 * @fileOverview An AI agent that helps users navigate the website and captures leads.
 *
 * - navigate - A function that suggests site sections or captures lead information based on user inquiry.
 * - NavigateInput - The input type for the navigate function.
 * - NavigateOutput - The return type for the navigate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NavigateInputSchema = z.object({
  history: z.array(z.object({
    sender: z.enum(['user', 'bot']).describe('Quién envió el mensaje.'),
    text: z.string().describe('El contenido del mensaje.'),
  })).describe('El historial de la conversación. El último mensaje es la consulta actual del usuario.'),
  isLeadCaptureMode: z.boolean().optional().describe('Indica si el bot está en modo de captura de leads para recopilar información del usuario.'),
  formData: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    service: z.string().optional(),
    message: z.string().optional(),
  }).optional().describe('Los datos del formulario recopilados hasta ahora.'),
});
export type NavigateInput = z.infer<typeof NavigateInputSchema>;

const NavigateOutputSchema = z.object({
  response: z.string().describe('Una respuesta conversacional útil para el usuario.'),
  suggestedLinks: z.array(z.object({
    text: z.string().describe('El texto para el enlace sugerido.'),
    href: z.string().describe('El enlace al que debe apuntar (por ejemplo, /#services).'),
  })).optional().describe('Un arreglo de enlaces de navegación sugeridos (solo en modo de navegación).'),
  startLeadCapture: z.boolean().optional().describe('Debe establecerse en true solo en el turno en que se decide iniciar el modo de captura de leads.'),
  updatedFormData: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    service: z.string().optional(),
    message: z.string().optional(),
  }).optional().describe('El objeto de datos del formulario actualizado con la información extraída del último mensaje del usuario.'),
  isFormComplete: z.boolean().optional().describe('Debe establecerse en true cuando todos los campos requeridos (nombre, email, teléfono) estén completos.'),
  contactLink: z.string().optional().describe('El enlace de contacto final (WhatsApp) generado cuando el formulario está completo.'),
});
export type NavigateOutput = z.infer<typeof NavigateOutputSchema>;

export async function navigate(input: NavigateInput): Promise<NavigateOutput> {
  return navigateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'navigatePrompt',
  input: {schema: NavigateInputSchema},
  output: {schema: NavigateOutputSchema},
  prompt: `Eres un asistente de IA para el sitio web de JRsistemas. Tu personalidad es amigable y servicial. Tienes dos modos de operación: Modo Navegación y Modo Captura de Leads.

**MODO NAVEGACIÓN (POR DEFECTO):**
- Tu objetivo es ayudar a los usuarios a explorar el sitio y entender los servicios de JRsistemas.
- **Tono:** Amigable, entusiasta de la tecnología, pero fácil de entender.
- **Temas de conversación:**
  - **Servicios:** Creamos desde **landing pages** hasta **plataformas de e-commerce completas**.
  - **Tecnología:** Usamos **Next.js y React** para sitios rápidos y con **diseño moderno**, evitando diseños planos y anticuados.
  - **Consultoría:** Ofrecemos una **primera consultoría gratis**, sin compromiso.
- **Acciones:**
  - Conversa de forma natural. Pregunta sobre las ideas o negocios del usuario para dar un mejor contexto.
  - Usa Markdown para negritas (\`**así**\`) para resaltar información clave.
  - Sugiere enlaces a secciones del sitio (\`/#services\`, \`/#portfolio\`, etc.) cuando sea relevante.

**TRANSICIÓN A MODO CAPTURA DE LEADS:**
- Si un usuario muestra una intención clara de iniciar un proyecto, pide una cotización o quiere hablar con alguien (ej: "¿cuánto cuesta?", "quiero empezar", "me interesa", "contactar con un asesor"), debes cambiar al Modo Captura de Leads.
- Para cambiar de modo, establece \`startLeadCapture: true\` en tu respuesta.

**MODO CAPTURA DE LEADS:**
- Tu único objetivo es completar un formulario con los datos del usuario de manera conversacional.
- **Campos del formulario:** \`name\` (requerido), \`email\` (requerido), \`phone\` (requerido), \`company\` (opcional), \`service\` (opcional), \`message\` (opcional).
- **Lógica CRÍTICA:**
  1.  **Analiza el Contexto:** Revisa el \`history\` de la conversación y el objeto \`formData\` de la entrada.
  2.  **Extrae Información:** Popula \`updatedFormData\` con cualquier información que el usuario haya dado en su último mensaje o en mensajes anteriores. Si el usuario ya mencionó su nombre, idea de proyecto o empresa, ¡úsalo!
  3.  **No Repitas Preguntas:** NUNCA preguntes por un dato que ya está presente en \`formData\`.
  4.  **Pregunta Uno a Uno:** Haz una sola pregunta a la vez para el siguiente campo requerido que falte. Sé natural. Ejemplo: "¡Genial! Para empezar, ¿cuál es tu nombre?".
  5.  **Formulario Completo:** Una vez que tengas \`name\`, \`email\` y \`phone\`, establece \`isFormComplete: true\`. Da un mensaje de agradecimiento y confirma que la información está lista para ser enviada.

**Contexto Actual:**
- **Modo Captura de Leads Activo:** \`{{isLeadCaptureMode}}\`
- **Datos Recopilados Hasta Ahora:** \`{{JSON.stringify formData}}\`
- **Historial de Conversación:**
{{#each history}}
- **{{this.sender}}**: {{{this.text}}}
{{/each}}

Basado en el contexto, genera tu siguiente respuesta como 'bot' y los campos correspondientes del JSON de salida.
`,
});

const navigateFlow = ai.defineFlow(
  {
    name: 'navigateFlow',
    inputSchema: NavigateInputSchema,
    outputSchema: NavigateOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (output?.isFormComplete && output.updatedFormData) {
      // El número de WhatsApp se configura en el archivo .env (NEXT_PUBLIC_WHATSAPP_NUMBER)
      const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "521XXXXXXXXXX";
      const values = output.updatedFormData;
      const messageParts = [
        `*Nuevo Lead de JRsistemas (Chatbot)*`,
        `*Nombre:* ${values.name || 'No proporcionado'}`,
        `*Email:* ${values.email || 'No proporcionado'}`,
        `*Teléfono:* ${values.phone || 'No proporcionado'}`,
      ];

      if (values.company) {
        messageParts.push(`*Empresa:* ${values.company}`);
      }
      if (values.service) {
        messageParts.push(`*Servicio de Interés:* ${values.service}`);
      }
      if (values.message) {
        messageParts.push(`*Mensaje:* ${values.message}`);
      }

      const message = encodeURIComponent(messageParts.join('\n'));
      output.contactLink = `https://wa.me/${whatsAppNumber}?text=${message}`;
    }

    return output!;
  }
);
