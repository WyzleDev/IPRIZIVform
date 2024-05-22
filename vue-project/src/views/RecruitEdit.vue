<script setup>
import RecruitRecord from '@/entities/RecruitRecord'
import RecruitBaseForm from '../components/RecruitBaseForm.vue'
import { onMounted, reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { RecruitTransformer } from '@/entities/RecruitTransformer'
import { useToast } from 'primevue/usetoast'
import SyncRecruitValidator from '@/entities/SyncRecruitValidator'
const route = useRoute()

let recruit = ref(undefined)
const toast = useToast()
let errors = reactive({ data: {} })

onMounted(async () => {
  const rawRecruit = await fetch(`http://localhost:3000/recruits/${route.params.id}`).then((r) =>
    r.json()
  )

  recruit.value = new RecruitRecord(rawRecruit)
})

async function sendForm(recruit) {
  const rawResponse = await fetch(`http://localhost:3000/recruits/${recruit.id}/edit`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    method: 'PATCH',
    body: JSON.stringify(recruit)
  })

  toast.add({ severity: 'info', summary: 'Info Message', detail: rawResponse.status, life: 3000 })
}

const isDataLoad = computed(() => recruit.value != undefined)

function syncIpriziv(recruit) {
  const result = new SyncRecruitValidator().validate(recruit)

  errors.data = result.errors

  if (!result.isValid) return
  const transformedRecruit = RecruitTransformer.transform(recruit)
  
  fetch(`http://127.0.0.1:3000/recruits/${recruit.id}/synciprizriv`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(transformedRecruit)
  })
}
</script>

<template>
  <RecruitBaseForm
    v-if="isDataLoad"
    @submit="sendForm"
    submitBtnName="Сохранить"
    :recruit="recruit"
    :errors
  >
    <template #sync="syncProps">
      <ElButton @click="() => syncIpriziv(syncProps.recruit)" type="success">SYNC</ElButton>
    </template>
  </RecruitBaseForm>
</template>
