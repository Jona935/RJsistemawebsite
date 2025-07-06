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
  userInquiry: z.string().describe('The user inquiry from the contact form.'),
});
export type PersonalizeContentInput = z.infer<typeof PersonalizeContentInputSchema>;

const PersonalizeContentOutputSchema = z.object({
  suggestedServices: z
    .array(z.string())
    .describe('An array of suggested services based on the user inquiry.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested services.'),
});
export type PersonalizeContentOutput = z.infer<typeof PersonalizeContentOutputSchema>;

export async function personalizeContent(input: PersonalizeContentInput): Promise<PersonalizeContentOutput> {
  return personalizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeContentPrompt',
  input: {schema: PersonalizeContentInputSchema},
  output: {schema: PersonalizeContentOutputSchema},
  prompt: `You are an AI assistant specializing in matching user inquiries with the most relevant services offered by JR Servicios Digitales.

  Based on the user's inquiry, identify and suggest the most suitable services.
  Explain your reasoning for suggesting these services.

  User Inquiry: {{{userInquiry}}}

  Available Services: Web Design, Automation, IT Services

  Format your response as a JSON object with 'suggestedServices' (an array of service names) and 'reasoning' (your explanation).
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
