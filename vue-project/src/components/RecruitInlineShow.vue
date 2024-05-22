<script setup>
  const { recruit } = defineProps(['recruit'])
</script>

<template>
  <div class="border border-gray-600 border-solid mb-4 p-4">
    <div>{{ recruit.lastName }} {{ recruit.firstName }} {{ recruit.middleName }}</div>
    <div>{{ recruit.birthDate }}</div>
    <div>{{ recruit.militaryOffice }}</div>
    <RouterLink class="text-orange-300" :to="`/recruits/${recruit.id}/edit`"> Edit </RouterLink>
  </div>
</template>
