<template>
  <div
    class="max-w-screen-md mx-auto space-y-4 p-8 flex flex-col justify-center items-center"
  >
    <p class="text-xl font-bold">
      Nuxt module playground!
    </p>

    <div class="flex gap-4">
      <UButton
        variant="solid"
        color="green"
      >
        Click me!
      </UButton>

      <UButton
        variant="solid"
        color="blue"
      >
        Click me!
      </UButton>

      <UButton
        variant="outline"
        color="cerise"
      >
        Click me!
      </UButton>

      <!-- Extend with UI prop -->
      <UButton
        variant="outline"
        color="gray"
        :ui="{ variants: { variant: { outline: 'shadow-xl bg-pink-200' } } }"
      >
        Click me!
      </UButton>

      <!-- Extend with classes -->
      <UButton
        variant="outline"
        color="gray"
        class="border-pink-500"
      >
        Click me!
      </UButton>
    </div>
  </div>
</template>
