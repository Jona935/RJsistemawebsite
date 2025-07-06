'use server';

/**
 * @fileOverview An AI agent that personalizes content based on user inquiry.
 *
 * - personalizeContent - A function that personalizes content based on user inquiry.
 * - PersonalizeContentInput - The input type for the personalizeContent function.
 * - PersonalizeContentOutput - The return type for the personalizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeContentInputSchema = z.object({
  userInquiry: z.string().describe('La consulta del usuario desde el formulario de contacto.'),
});
export type PersonalizeContentInput = z.infer<typeof PersonalizeContentInputSchema>;

const PersonalizeContentOutputSchema = z.object({
  suggestedServices: z
    .array(z.string())
    .describe('Un arreglo de servicios sugeridos basado en la consulta del usuario.'),
  reasoning: z.string().describe('La justificación de la IA para los servicios sugeridos.'),
});
export type PersonalizeContentOutput = z.infer<typeof PersonalizeContentOutputSchema>;

export async function personalizeContent(input: PersonalizeContentInput): Promise<PersonalizeContentOutput> {
  return personalizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeContentPrompt',
  input: {schema: PersonalizeContentInputSchema},
  output: {schema: PersonalizeContentOutputSchema},
  prompt: `Eres un asistente de IA especializado en conectar las consultas de los usuarios con los servicios más relevantes ofrecidos por JR Servicios Digitales.

  Basado en la consulta del usuario, identifica y sugiere los servicios más adecuados.
  Explica tu razonamiento para sugerir estos servicios.

  Consulta del Usuario: {{{userInquiry}}}

  Servicios Disponibles: Diseño Web, Automatización, Servicios de TI

  Formatea tu respuesta como un objeto JSON con 'suggestedServices' (un arreglo de nombres de servicios) y 'reasoning' (tu explicación).
`,
});

const personalizeContentFlow = ai.defineFlow(
  {
    name: 'personalizeContentFlow',
    inputSchema: PersonalizeContentInputSchema,
    outputSchema: PersonalizeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
