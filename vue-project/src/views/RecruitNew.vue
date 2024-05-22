<script setup>
import RecruitBaseForm from '../components/RecruitBaseForm.vue'

function sendForm(recruit) {
  const url = 'http://localhost:3000/recruits'
  const headers = { 'Content-Type': 'application/json;charset=utf-8' }
  const requestOptions = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(recruit)
  }

  const rawResponse = fetch(url, requestOptions).then((r) => r.json())
  console.log('create')
  console.log(rawResponse)
}
</script>

<template>
  <RecruitBaseForm @submit="sendForm" submitBtnName="Создать" />
</template>
