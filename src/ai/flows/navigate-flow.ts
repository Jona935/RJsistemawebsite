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
  prompt: `Eres un asistente de navegación amigable para el sitio web de JRsistemas. Tu objetivo es ayudar a los usuarios a encontrar lo que buscan.

  Secciones disponibles en el sitio:
  - Servicios: /#services (Incluye Diseño Web, Automatización, Servicios de TI)
  - Portafolio: /#portfolio (Muestra proyectos pasados)
  - Nosotros: /#about (Información sobre la empresa)
  - Contacto: /#contact (Formulario para contactar)

  Basado en la consulta del usuario, proporciona una respuesta corta y útil. Sugiere uno o más enlaces relevantes de la lista anterior. Si el usuario pregunta por algo no relacionado, cortésmente indica que solo puedes ayudar a navegar por el sitio de JRsistemas.

  Consulta del Usuario: {{{userQuery}}}

  Formatea tu respuesta como un objeto JSON con 'response' (tu respuesta textual) y 'suggestedLinks' (un arreglo de objetos con 'text' y 'href').
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
