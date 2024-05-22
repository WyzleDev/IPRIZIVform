<script setup>
import Toast from 'primevue/toast'
</script>

<template>
  <Toast />
  <div class="container mx-auto">
    <nav>
      <RouterLink class="underline mr-4 font-medium" to="/recruits">Призывники</RouterLink>
      <RouterLink class="underline mr-4 font-medium" to="/recruits/new">Новый призывник</RouterLink>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>
