import type { Config as TailwindConfig } from "tailwindcss";

export default function (tailwindConfig: TailwindConfig) {
  const colors = tailwindConfig.theme?.colors;

  return {
    base: "",
    variants: {
      colors: {},
      variant: {
        solid: "text-white",
        outline: "border",
      },
    },
  };
}
