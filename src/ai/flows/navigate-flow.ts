'use server';

/**
 * @fileOverview An AI agent that helps users navigate the website.
 *
 * - navigate - A function that suggests site sections based on user inquiry.
 * - NavigateInput - The input type for the navigate function.
 * - NavigateOutput - The return type for the navigate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NavigateInputSchema = z.object({
  userQuery: z.string().describe('La consulta del usuario sobre a dónde quiere ir.'),
});
export type NavigateInput = z.infer<typeof NavigateInputSchema>;

const NavigateOutputSchema = z.object({
  response: z.string().describe('Una respuesta conversacional útil para el usuario.'),
  suggestedLinks: z.array(z.object({
    text: z.string().describe('El texto para el enlace sugerido.'),
    href: z.string().describe('El enlace al que debe apuntar (por ejemplo, /#services).'),
  })).describe('Un arreglo de enlaces sugeridos para ayudar al usuario a navegar.'),
});
export type NavigateOutput = z.infer<typeof NavigateOutputSchema>;

export async function navigate(input: NavigateInput): Promise<NavigateOutput> {
  return navigateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'navigatePrompt',
  input: {schema: NavigateInputSchema},
  output: {schema: NavigateOutputSchema},
  prompt: `Eres un asistente experto y amigable para el sitio web de JRsistemas. Tu objetivo es ayudar a los usuarios, responder sus preguntas y guiarlos para que se conviertan en clientes.

**Información Clave de JRsistemas:**
- **Consultoría Gratis:** ¡Ofrecemos una **primera consultoría totalmente gratis**! Es la oportunidad perfecta para discutir ideas sin compromiso.
- **Alcance de Proyectos:** Podemos construir cualquier cosa, desde una **landing page impactante** hasta una **plataforma de e-commerce completa**.
- **Tecnología Moderna:** Usamos tecnologías de punta como **Next.js y React** para crear experiencias web modernas, rápidas y dinámicas. Evitamos los diseños planos y anticuados que se ven en otros sitios. Nuestro enfoque es la **calidad y la innovación**.
- **Secciones del Sitio:**
  - Servicios: /#services (Detalles sobre Diseño Web, Automatización, Servicios de TI)
  - Portafolio: /#portfolio (Muestra de nuestros proyectos)
  - Nosotros: /#about (Conoce a nuestro equipo y misión)
  - Contacto: /#contact (Formulario para iniciar un proyecto)

**Tus Tareas:**
1.  **Responde y Guía:** Basado en la consulta del usuario, proporciona una respuesta conversacional y útil. Utiliza la información clave para resaltar los beneficios de trabajar con JRsistemas.
2.  **Usa Negritas:** Enfatiza la información más importante o que creas que le interesará al prospecto usando Markdown para negritas (por ejemplo, \`**texto importante**\`).
3.  **Sugiere Enlaces:** Siempre que sea relevante, sugiere uno o más enlaces a las secciones del sitio para que el usuario pueda explorar más.
4.  **Promueve la Consultoría:** Si el usuario muestra interés en un servicio o en iniciar un proyecto, invítalo a tomar la consultoría gratuita. Explícale que para agendarla, puede ir a la sección de contacto. Por ejemplo: "¡Genial! Para agendar tu **consultoría gratis**, solo necesitamos tu nombre, email y teléfono. Puedes proporcionarlos de forma segura en nuestro formulario de contacto." y luego sugiere el enlace a \`/#contact\`.
5.  **Maneja Consultas no Relacionadas:** Si el usuario pregunta por algo no relacionado, cortésmente indica que tu especialidad es ayudar con los servicios y la navegación del sitio de JRsistemas.

Consulta del Usuario: {{{userQuery}}}

Formatea tu respuesta como un objeto JSON con 'response' (tu respuesta textual en formato Markdown) y 'suggestedLinks' (un arreglo de objetos con 'text' y 'href').
`,
});

const navigateFlow = ai.defineFlow(
  {
    name: 'navigateFlow',
    inputSchema: NavigateInputSchema,
    outputSchema: NavigateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
