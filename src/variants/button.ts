import type { Config as TailwindConfig } from "tailwindcss";

function makeColorVariants(classes: string, colors: string[]) {
  const res = {};

  for (const color in colors) {
    res[color] = classes.replaceAll("{color}", color);
  }
  return res;
}

function generateColorVariants(
  template: string,
  colors: string[],
  compound: object,
) {
  return Object.entries(makeColorVariants(template, colors)).map(
    ([color, classes]) => ({
      ...compound,
      color,
      class: classes,
    }),
  );
}

export default function (tailwindConfig: TailwindConfig) {
  const colors = tailwindConfig.theme?.colors;

  // TODO: Merge variant template with app config
  return {
    base: "font-semibold text-white text-sm py-1 px-4 rounded active:opacity-80",
    variants: {
      // Only colors with 100-900 attributes should be defined here
      // + Edge cases for black, gray and white
      colors: {},
      variant: {
        solid: "text-white",
        outline: "border",
      },
    },

    compoundVariants: [
      // Generate compound variants for solid button
      ...generateColorVariants("bg-{color}-500", colors, { variant: "solid" }),
      ...generateColorVariants("border-{color}-500 text-{color}-500", colors, {
        variant: "outline",
      }),
    ],
  };
}
