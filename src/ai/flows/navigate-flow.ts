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
import { sendLeadNotification } from '@/services/whatsapp';

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
    source: z.string().optional(),
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
    source: z.string().optional(),
  }).optional().describe('El objeto de datos del formulario actualizado con la información extraída del último mensaje del usuario. Debes rellenar todos los campos posibles (incluyendo los opcionales como empresa, servicio y mensaje) basándote en la conversación.'),
  isFormComplete: z.boolean().optional().describe('Debe establecerse en true cuando todos los campos requeridos (nombre, email, teléfono, empresa) estén completos, con la excepción de la empresa si el usuario indica que no tiene.'),
});
export type NavigateOutput = z.infer<typeof NavigateOutputSchema>;

export async function navigate(input: NavigateInput): Promise<NavigateOutput> {
  return navigateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'navigatePrompt',
  input: {schema: NavigateInputSchema},
  output: {schema: NavigateOutputSchema},
  prompt: `Eres un asistente de IA para el sitio web de JRsistemas. Tu personalidad es amigable, servicial y curiosa. Tienes dos modos de operación: Modo Navegación y Modo Captura de Leads.

**MODO NAVEGACIÓN (POR DEFECTO):**
- Tu objetivo es ayudar a los usuarios a explorar el sitio y entender los servicios de JRsistemas de una manera natural.
- **Tono:** Amigable, entusiasta de la tecnología, pero fácil de entender. Evita ser demasiado insistente con las ventas.
- **Acciones:**
  - Conversa de forma natural. Para dar mejores respuestas, haz preguntas abiertas para entender las ideas, negocio o proyecto del usuario. Ej: "¿Qué tipo de negocio tienes?", "Cuéntame un poco más sobre ese proyecto que tienes en mente", "¿Qué problema estás tratando de resolver?".
  - **Evita la palabra 'cotización'**: No ofrezcas una 'cotización' directamente. Si el usuario pregunta por precios, guíalo amablemente a proporcionar sus datos para que un asesor lo contacte con todos los detalles.
  - Usa el historial de la conversación para no repetir preguntas y dar un contexto más rico a tus respuestas.
  - Usa Markdown para negritas (\`**así**\`) para resaltar información clave que podría interesarle al prospecto.
  - Sugiere enlaces a secciones del sitio (\`/#services\`, \`/#portfolio\`, etc.) cuando sea relevante.
- **Temas de conversación:**
  - **Consultoría:** Ofrecemos una **primera consultoría gratis**, sin compromiso. Menciona esto solo si el usuario muestra interés en empezar.
  - **Servicios:** Creamos desde **landing pages** hasta **plataformas de e-commerce completas**.
  - **Tecnología:** Usamos **Next.js y React** para sitios rápidos y con **diseño moderno**, evitando diseños planos y anticuados.

**TRANSICIÓN A MODO CAPTURA DE LEADS:**
- Si un usuario muestra una intención clara de iniciar un proyecto, pide una cotización o quiere hablar con alguien (ej: "¿cuánto cuesta?", "quiero empezar", "me interesa", "contactar con un asesor"), debes cambiar al Modo Captura de Leads.
- Para cambiar de modo, establece \`startLeadCapture: true\` en tu respuesta.

**MODO CAPTURA DE LEADS:**
- Tu único objetivo es completar un formulario con los datos del usuario de manera conversacional.
- **Campos del formulario:** \`name\` (requerido), \`email\` (requerido), \`phone\` (requerido), \`company\` (requerido), \`service\` (opcional), \`message\` (opcional).
- **Lógica CRÍTICA:**
  1.  **Analiza el Contexto:** Revisa el \`history\` de la conversación y el objeto \`formData\` de la entrada (los datos que ya se han recopilado).
  2.  **Extrae Información (Regla Principal):** En cada turno, tu primera tarea es analizar el último mensaje del usuario (\`history[history.length-1].text\`) y rellenar CUALQUIER campo de \`updatedFormData\` con la información que encuentres. **Siempre devuelve todos los campos que ya tenías en el \`formData\` de entrada, actualizados con cualquier nueva información que hayas extraído.**
  3.  **Extracción de Campos Específicos (¡Muy Importante!):**
      - **\`company\`**: Este campo es requerido. Extrae el nombre de la empresa si el usuario lo menciona. Si no lo tienes, debes preguntarlo. **No asumas** que la profesión del usuario es el nombre de la empresa. Si dice "soy pastelero", no pongas "Pastelero" en el campo de empresa.
      - **\`service\`**: Si el usuario menciona interés en "diseño web", "automatización" o "servicios de TI", o describe una necesidad relacionada, deduce el servicio y rellena este campo.
      - **\`message\`**: Resume la necesidad o idea de proyecto principal del usuario. **¡Presta especial atención a los detalles importantes!** Si el usuario da instrucciones específicas de contacto (ej: "llámenme por la tarde", "contáctenme por correo electrónico", "no me llamen, solo WhatsApp"), **debes incluir estas instrucciones en el mensaje**. El objetivo es que el asesor humano tenga todo el contexto clave. Ejemplo: "Interesado en una página web para su pastelería. Prefiere ser contactado por correo electrónico después de las 5 PM."
  4.  **No Repitas Preguntas:** NUNCA preguntes por un dato que ya está presente en el objeto \`formData\` de entrada.
  5.  **Pregunta Uno a Uno:** Después de extraer toda la información posible, si todavía falta alguno de los campos REQUERIDOS (\`name\`, \`email\`, \`phone\`, \`company\`), haz UNA SOLA pregunta para obtener el siguiente campo que falte. Sé natural. Ejemplo: "¡Perfecto! ¿Cuál es tu correo electrónico?".
  6.  **Manejo de Negativas:** Si el usuario indica explícitamente que no tiene un dato (ej: "no tengo empresa", "soy particular", "no quiero dar mi teléfono"), acepta su respuesta, no insistas, y pasa a preguntar por el siguiente dato que falte.
  7.  **Verificación de Finalización (¡CRÍTICO!):** Después de rellenar \`updatedFormData\`, verifica si los campos \`name\`, \`email\`, y \`phone\` están TODOS completos. Adicionalmente, verifica el campo \`company\`. El formulario se considera completo si se cumple una de estas dos condiciones:
      a) Los campos \`name\`, \`email\`, \`phone\` y \`company\` están TODOS completos.
      b) Los campos \`name\`, \`email\`, y \`phone\` están completos Y el usuario ha indicado explícitamente que no tiene una empresa o es un proyecto personal (esta información debería estar en el historial).
      **Si se cumple alguna de estas condiciones**, establece \`isFormComplete: true\`. De lo contrario, déjalo en \`false\` o no lo incluyas.
  8.  **Mensaje Final:** Solo cuando \`isFormComplete\` es \`true\`, da un mensaje de agradecimiento y confirma que la información **ha sido enviada** a nuestro equipo. Asegura al usuario que será contactado pronto por un asesor.

**Contexto Actual:**
- **Modo Captura de Leads Activo:** \`{{isLeadCaptureMode}}\`
- **Datos Recopilados Hasta Ahora:**
{{#if formData}}
- Nombre: {{formData.name}}
- Email: {{formData.email}}
- Teléfono: {{formData.phone}}
- Empresa: {{formData.company}}
- Servicio: {{formData.service}}
- Mensaje: {{formData.message}}
- Fuente: {{formData.source}}
{{else}}
(No hay datos todavía)
{{/if}}
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

    // DEBUGGING: Log the raw output from the AI to the server console
    console.log('AI Raw Output:', JSON.stringify(output, null, 2));

    if (output?.isFormComplete && output.updatedFormData) {
      try {
        await sendLeadNotification(output.updatedFormData, 'chatbot');
      } catch (error) {
        console.error('Failed to send lead notification via WhatsApp:', error);
        // Inform the user about the failure and revert form state.
        output.response = "¡Uy! Hubo un problema técnico al enviar tu información. Por favor, intenta usar el formulario de contacto principal en la sección 'Contáctanos' o inténtalo de nuevo más tarde.";
        output.isFormComplete = false;
        // Keep the user in form mode so they don't lose their data and can try again if they wish.
        output.startLeadCapture = true; 
      }
    }

    return output!;
  }
);
