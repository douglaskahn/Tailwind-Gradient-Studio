'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating Tailwind CSS, standard CSS, and RGB code snippets based on user-defined gradient selections.
 *
 * - generateCodeSnippets - A function that takes gradient configuration as input and returns code snippets.
 * - GenerateCodeSnippetsInput - The input type for the generateCodeSnippets function.
 * - GenerateCodeSnippetsOutput - The return type for the generateCodeSnippets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GradientColorStopSchema = z.object({
  color: z.string().describe('The color value (e.g., #RRGGBB or color name).'),
  position: z.number().min(0).max(100).describe('The position of the color stop in the gradient (0-100).'),
});

const PrimaryGradientConfigSchema = z.object({
  colorStops: z.array(GradientColorStopSchema).length(3).describe('An array of three color stops defining the primary gradient.'),
  angle: z.number().describe('The angle of the gradient in degrees.'),
});

const OverlayGradientConfigSchema = z.object({
  colorStops: z.array(GradientColorStopSchema).length(2).describe('An array of two color stops defining the overlay gradient.'),
  blendMode: z.string().describe('The blend mode for the overlay (e.g., overlay, multiply, screen).'),
  opacity: z.number().min(0).max(1).describe('The opacity of the overlay gradient (0-1).'),
});

const GenerateCodeSnippetsInputSchema = z.object({
  primaryGradient: PrimaryGradientConfigSchema.describe('Configuration for the primary gradient.'),
  overlayGradient: OverlayGradientConfigSchema.describe('Configuration for the overlay gradient.'),
});
export type GenerateCodeSnippetsInput = z.infer<typeof GenerateCodeSnippetsInputSchema>;

const GenerateCodeSnippetsOutputSchema = z.object({
  tailwindCss: z.string().describe('The Tailwind CSS code snippet.'),
  css: z.string().describe('The standard CSS code snippet.'),
  rgb: z.string().describe('The RGB code snippet.'),
});
export type GenerateCodeSnippetsOutput = z.infer<typeof GenerateCodeSnippetsOutputSchema>;

export async function generateCodeSnippets(input: GenerateCodeSnippetsInput): Promise<GenerateCodeSnippetsOutput> {
  return generateCodeSnippetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeSnippetsPrompt',
  input: {schema: GenerateCodeSnippetsInputSchema},
  output: {schema: GenerateCodeSnippetsOutputSchema},
  prompt: `You are a code generator expert specializing in CSS gradients. Based on the provided primary and overlay gradient configurations, generate Tailwind CSS, standard CSS, and RGB code snippets.

Here are the configurations:

Primary Gradient:
Color Stops: {{#each primaryGradient.colorStops}}{{{this.color}}} ({{{this.position}}}%), {{/each}}
Angle: {{{primaryGradient.angle}}} degrees

Overlay Gradient:
Color Stops: {{#each overlayGradient.colorStops}}{{{this.color}}} ({{{this.position}}}%), {{/each}}
Blend Mode: {{{overlayGradient.blendMode}}}
Opacity: {{{overlayGradient.opacity}}}

Output the code snippets in the following format:

Tailwind CSS:
<Tailwind CSS code>

CSS:
<CSS code>

RGB:
<RGB code>

Ensure that the generated code is syntactically correct and ready to be used in a project. The CSS code should be compatible with most browsers, consider adding/removing browser-specific prefixes as needed, and the Tailwind CSS should utilize Tailwind classes where appropriate.
`,
});

const generateCodeSnippetsFlow = ai.defineFlow(
  {
    name: 'generateCodeSnippetsFlow',
    inputSchema: GenerateCodeSnippetsInputSchema,
    outputSchema: GenerateCodeSnippetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
