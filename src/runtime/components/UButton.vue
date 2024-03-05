<script setup lang="ts">
import { computed } from "vue";
import button from "#build/ui/button";
import { VariantProps, tv } from "tailwind-variants";
type ButtonVariants = VariantProps<typeof button>;

const props = withDefaults(
  defineProps<{
    color?: string;
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    ui?: object;
  }>(),
  {
    color: "green",
    variant: "solid",
    size: "md",
  },
);

const buttonVariants = tv({
  extend: button,
  ...props.ui,
});

const klass = computed(() => buttonVariants(props));
</script>

<template>
  <button :class="klass">
    <slot />
  </button>
</template>
