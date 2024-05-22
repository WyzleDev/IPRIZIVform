<script setup>
import { ref, onMounted } from 'vue'
import RecruitRecord from '@/entities/RecruitRecord'
import RecruitInlineShow from '@/components/RecruitInlineShow.vue'
import Recruit from '@/entities/RecruitBase'
import * as XLSX from 'xlsx'
let recruits = ref([])

onMounted(async () => {
  const rawRecruits = await fetch('http://localhost:3000/recruits').then((r) => r.json())

  recruits.value = rawRecruits.map((recruitRow) => new RecruitRecord(recruitRow))
})

function fileAdded(file, fileList) {
  console.log(file)
  const reader = new FileReader()
  reader.onload = async (e) => {
    const workbook = XLSX.read(e.target.result, { type: 'binary' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(sheet)
    jsonData.forEach(async (row) => {
      console.log(row)
      const [lastName, firstName, middleName] = row['ФИО'].split(' ')

      let response = await fetch('http://localhost:3000/recruits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
          new Recruit({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            birthDate: row['Дата рождения'],
            expectedDateArrivalToGSP: row['Дата явки на СПгМ'],
            address: row['Адрес регистрации'],
            passport: {
              series: row['Серия паспорта'],
              number: row['Номер паспорта'],
              whoIssued: row['Кем выдан паспорт'],
              issuedDate: row['Дата выдачи паспорта'],
              departamentCode: row['Код подразделения паспорта'],
              bornCity: row['Место рождения']
            },
            education: {
              level: row['Уровень образования'],
              speciality: row['Специальность']
            },
            family: {
              statusName: row['Семейное положение']
            },
            medical: {
              weight: row['Вес'],
              height: row['Рост']
            },
            militaryOffice: row['Военкомат'],
            militaryDocument: {
              comissionDecisionDate: row['Дата решения призывной комиссии']
            }
          })
        )
      })
    })
  }

  reader.readAsBinaryString(file.raw)
}
</script>

<template class="flex flex-col">
  <el-upload :auto-upload="false" drag :on-change="fileAdded">
    <p class="font-bold underline">Загрузка с 1С</p>
  </el-upload>
  <RecruitInlineShow v-for="recruit in recruits" :key="recruit.id" :recruit />
</template>
