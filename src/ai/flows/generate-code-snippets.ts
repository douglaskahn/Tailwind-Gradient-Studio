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
  color: z.string().describe('The color value in HEX format (e.g., #RRGGBB).'),
  position: z.number().min(0).max(100).describe('The position of the color stop in the gradient (0-100).'),
  isTailwind: z.boolean().describe('Whether the color is from the Tailwind CSS palette.')
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
  tailwindCss: z.string().describe('The Tailwind CSS class definition for the gradient. If any color is not a Tailwind color, this should be an empty string and a note should be added to the CSS output explaining how to configure tailwind.config.js.'),
  css: z.string().describe('The standard CSS `background-image` and `background-blend-mode` properties using HEX values.'),
  rgb: z.string().describe('The standard CSS `background-image` and `background-blend-mode` properties using RGB values.'),
});
export type GenerateCodeSnippetsOutput = z.infer<typeof GenerateCodeSnippetsOutputSchema>;

export async function generateCodeSnippets(input: GenerateCodeSnippetsInput): Promise<GenerateCodeSnippetsOutput> {
  return generateCodeSnippetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeSnippetsPrompt',
  input: {schema: GenerateCodeSnippetsInputSchema},
  output: {schema: GenerateCodeSnippetsOutputSchema},
  prompt: `You are an expert CSS gradient code generator. Generate Tailwind CSS, standard CSS (HEX), and standard CSS (RGB) for the given gradient configuration.

**Configuration:**
- Primary Gradient: Angle {{{primaryGradient.angle}}}deg, Colors: {{#each primaryGradient.colorStops}}{{{this.color}}} at {{{this.position}}}%{{#if this.isTailwind}} (Tailwind){{/if}}, {{/each}}
- Overlay Gradient: Angle {{{overlayGradient.angle}}}deg, Colors: {{#each overlayGradient.colorStops}}{{{this.color}}} at {{{this.position}}}%{{#if this.isTailwind}} (Tailwind){{/if}}, {{/each}}
- Overlay Blend Mode: {{{overlayGradient.blendMode}}}
- Overlay Opacity: {{{overlayGradient.opacity}}}

**Outputting Tailwind CSS:**
- If ALL colors are from the Tailwind palette (isTailwind is true), generate Tailwind utility classes.
- The gradient will be a combination of two linear gradients.
- Example: \`bg-[linear-gradient(90deg,theme(colors.red.500)_0%,theme(colors.blue.500)_100%),linear-gradient(90deg,theme(colors.yellow.300)_0%,theme(colors.green.300)_100%)]\`
- The overlay gradient should have its opacity applied to the colors directly using an alpha channel if possible, not via the \`opacity\` property.
- The blend mode should be applied as a class, e.g., \`bg-blend-overlay\`.
- If ANY color is not a Tailwind color, output an empty string for \`tailwindCss\` and add a comment in the \`css\` output explaining that custom colors need to be added to \`tailwind.config.js\`.

**Outputting Standard CSS (HEX & RGB):**
- Generate the \`background-image\` property with two linear-gradients.
- The first gradient is the primary one.
- The second is the overlay, with its colors converted to RGBA to include the opacity.
- Apply the blend mode using \`background-blend-mode\`.
- For the RGB output, convert all HEX colors to their RGB/RGBA equivalents.

**Example CSS Output:**
\`\`\`css
.gradient {
  background-image: linear-gradient(...), linear-gradient(...);
  background-blend-mode: ...;
}
\`\`\`

Generate the code snippets now based on the provided configuration.
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
