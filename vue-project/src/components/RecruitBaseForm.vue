<script setup>
import { reactive, computed } from 'vue'
import Recruit from '@/entities/RecruitBase'

import {
  specialityOptions,
  admissOptions,
  militaryOfficeOptions,
  doctorOptions,
  healthCategoryOptions,
  educationLevelOptions,
  municipalityOptions,
  marriageStatusOptions,
  militarySpecialityOptions,
  familySituationOptions
} from '@/entities/sourceMaps'
import Dropdown from 'primevue/dropdown'

import { ElOption, ElSelect } from 'element-plus'

const emit = defineEmits({
  submit: (recruit) => recruit
})

const props = defineProps({
  recruit: { type: Recruit, default: new Recruit() },
  submitBtnName: { type: String },
  errors: {
    type: Object,
    default: () => {
      return { data: {} }
    }
  }
})

const recruit = reactive(props.recruit)
const errors = computed(() => props.errors.data)

function changeFirst() {
  recruit.lastName = recruit.lastName.charAt(0).toUpperCase() + recruit.lastName.slice(1)
}
function change3() {
  recruit.firstName = recruit.firstName.charAt(0).toUpperCase() + recruit.firstName.slice(1)
}
function change4() {
  recruit.middleName = recruit.middleName.charAt(0).toUpperCase() + recruit.middleName.slice(1)
}
function whoIssuedU() {
  recruit.passport.whoIssued = recruit.passport.whoIssued.toUpperCase()
}
</script>

<template>
  {{ errors }}
  <ElForm ref="form" label-position="top">
    <div class="flex">
      <div class="mr-4">
        <ElFormItem label="Фамилия">
          <ElInput
            :class="{ 'ring ring-rose-500': !!errors?.lastName }"
            v-on:keyup.enter="focusNext($event.target)"
            @change="changeFirst"
            v-model="recruit.lastName"
          />
        </ElFormItem>

        <ElFormItem label="Имя">
          <ElInput
            :class="{ 'ring ring-rose-500': !!errors?.firstName }"
            @change="change3"
            v-model="recruit.firstName"
          />
        </ElFormItem>
        <ElFormItem label="Отчество">
          <ElInput
            :class="{ 'ring ring-rose-500': !!errors?.middleName }"
            @change="change4"
            v-model="recruit.middleName"
          />
        </ElFormItem>
        <div class="flex">
          <ElFormItem label="Дата рождения">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.birthDate }"
              v-mask="'##.##.####'"
              v-model="recruit.birthDate"
            />
          </ElFormItem>
          <ElFormItem label="Ожидается на ГСП">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.expectedDateArrivalToGSP }"
              v-mask="'##.##.####'"
              v-model="recruit.expectedDateArrivalToGSP"
            />
          </ElFormItem>
        </div>
        <ElFormItem label="Адрес">
          <ElInput :class="{ 'ring ring-rose-500': !!errors?.address }" v-model="recruit.address" />
        </ElFormItem>
        <div class="flex">
          <ElFormItem class="mr-4" label="Муниципалитет">
            <ElSelect
              :class="{ 'ring ring-rose-500': !!errors?.cityMunicipality }"
              v-model="recruit.cityMunicipality"
              filterable
            >
              <ElOption
                v-for="item in municipalityOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="Судим">
            <ElSwitch
              :class="{ 'ring ring-rose-500': !!errors?.isConvict }"
              v-model="recruit.isConvict"
            />
          </ElFormItem>
          <ElFormItem label="Справка ЗИЦ">
            <ElSwitch
              :class="{ 'ring ring-rose-500': !!errors?.hasZIC }"
              v-model="recruit.hasZIC"
            />
          </ElFormItem>
        </div>
        <div class="flex">
          <ElFormItem label="Серия паспорт">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.passport?.series }"
              v-mask="'####'"
              v-model="recruit.passport.series"
            />
          </ElFormItem>
          <ElFormItem label="Номер паспорт">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.passport?.number }"
              v-mask="'######'"
              v-model="recruit.passport.number"
            />
          </ElFormItem>
        </div>
        <ElFormItem label="Кем выдан паспорт">
          <ElInput
            :class="{ 'ring ring-rose-500': !!errors?.passport?.whoIssued }"
            @change="whoIssuedU"
            v-model="recruit.passport.whoIssued"
          />
        </ElFormItem>
        <div class="flex">
          <ElFormItem label="Дата выдачи паспорта">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.passport?.issuedDate }"
              v-mask="'##.##.####'"
              v-model="recruit.passport.issuedDate"
            />
          </ElFormItem>
          <ElFormItem label="Код подразделения">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.passport?.departamentCode }"
              v-model="recruit.passport.departamentCode"
            />
          </ElFormItem>
          <ElFormItem label="Место рождения">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.passport?.bornCity }"
              v-model="recruit.passport.bornCity"
            />
          </ElFormItem>
        </div>
        <ElFormItem label="Образование">
          <ElSelect
            :class="{ 'ring ring-rose-500': !!errors?.education?.level }"
            v-model="recruit.education.level"
            filterable
          >
            <ElOption
              v-for="item in educationLevelOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </ElSelect>
        </ElFormItem>
        <label class="text-zinc-500" for="recruit.education.speciality">Специальность</label>
        <Dropdown
          :class="{ 'ring ring-rose-500': !!errors?.education?.speciality }"
          id="recruit.education.speciality"
          v-model="recruit.education.speciality"
          filter
          autoFilterFocus
          :options="specialityOptions"
          optionLabel="name"
          optionValue="name"
          class="w-full mb-4"
          :virtualScrollerOptions="{ itemSize: 38 }"
          placeholder="Select"
        />
        <ElFormItem label="РОСТО">
          <ElSelect
            :class="{ 'ring ring-rose-500': !!errors?.education?.militarySpeciality }"
            v-model="recruit.education.militarySpeciality"
            filterable
          >
            <ElOption
              v-for="item in militarySpecialityOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </ElSelect>
        </ElFormItem>
      </div>

      <div>
        <div class="flex">
          <ElFormItem label="Детей">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.family?.childCount }"
              v-model="recruit.family.childCount"
              type="number"
            />
          </ElFormItem>
          <ElFormItem class="w-60" label="Статус">
            <ElSelect
              :class="{ 'ring ring-rose-500': !!errors?.family?.statusName }"
              v-model="recruit.family.statusName"
              filterable
            >
              <ElOption
                v-for="item in marriageStatusOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>
        </div>
        <ElFormItem label="Сложная семейная ситуация">
          <ElSelect
            :class="{ 'ring ring-rose-500': !!errors?.family?.situation }"
            v-model="recruit.family.situation"
            filterable
          >
            <ElOption
              v-for="item in familySituationOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </ElSelect>
        </ElFormItem>
        <div class="flex">
          <ElFormItem label="Категория">
            <ElSelect
              :class="{ 'ring ring-rose-500': !!errors?.medical?.healthCategory }"
              v-model="recruit.medical.healthCategory"
              filterable
            >
              <ElOption
                v-for="item in healthCategoryOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="Рост">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.medical?.height }"
              v-model="recruit.medical.height"
              type="number"
            />
          </ElFormItem>
          <ElFormItem label="Вес">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.medical?.weight }"
              v-model="recruit.medical.weight"
              type="number"
            />
          </ElFormItem>
        </div>
        <div class="flex flex-col">
          <div class="flex">
            <ElFormItem class="w-60" label="Специализация 1">
              <ElSelect
                :class="{ 'ring ring-rose-500': !!errors?.medical?.doctorName_0 }"
                v-model="recruit.medical.doctorName_0"
                filterable
              >
                <ElOption v-for="item in doctorOptions" :key="item" :label="item" :value="item" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="Статья 1">
              <ElInput
                :class="{ 'ring ring-rose-500': !!errors?.medical?.healthParagraph_0 }"
                v-model="recruit.medical.healthParagraph_0"
              />
            </ElFormItem>
          </div>
          <div class="flex">
            <ElFormItem class="w-60" label="Специализация 2">
              <ElSelect
                :class="{ 'ring ring-rose-500': !!errors?.medical?.doctorName_1 }"
                v-model="recruit.medical.doctorName_1"
                filterable
              >
                <ElOption v-for="item in doctorOptions" :key="item" :label="item" :value="item" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="Статья 2">
              <ElInput
                :class="{ 'ring ring-rose-500': !!errors?.medical?.healthParagraph_1 }"
                v-model="recruit.medical.healthParagraph_1"
              />
            </ElFormItem>
          </div>
        </div>

        <div class="flex">
          <ElFormItem class="w-60" label="Военкомат">
            <ElSelect
              :class="{ 'ring ring-rose-500': !!errors?.militaryOffice }"
              v-model="recruit.militaryOffice"
              filterable
            >
              <ElOption
                v-for="item in militaryOfficeOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="Уникальный номер">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.uniqueKey }"
              v-model="recruit.uniqueKey"
            />
          </ElFormItem>
        </div>

        <div class="flex felx-col">
          <div>
            <ElFormItem label="Серия военник">
              <ElInput
                :class="{ 'ring ring-rose-500': !!errors?.militaryDocument?.series }"
                v-model="recruit.militaryDocument.series"
              />
            </ElFormItem>
            <ElFormItem label="Номер военник">
              <ElInput
                :class="{ 'ring ring-rose-500': !!errors?.militaryDocument?.number }"
                v-model="recruit.militaryDocument.number"
              />
            </ElFormItem>
          </div>
          <div>
            <ElFormItem label="Дата выдачи военник">
              <ElInput
                :class="{ 'ring ring-rose-500': !!errors?.militaryDocument?.issuedDate }"
                v-mask="'##.##.####'"
                v-model="recruit.militaryDocument.issuedDate"
              />
            </ElFormItem>
            <ElFormItem label="Жетон">
              <ElInput
                :class="{ 'ring ring-rose-500': !!errors?.militaryDocument?.militaryBadge }"
                v-model="recruit.militaryDocument.militaryBadge"
              />
            </ElFormItem>
          </div>
          <ElFormItem label="Дата решения призывной комиссии">
            <ElInput
              :class="{ 'ring ring-rose-500': !!errors?.militaryDocument?.comissionDecisionDate }"
              v-mask="'##.##.####'"
              v-model="recruit.militaryDocument.comissionDecisionDate"
            />
          </ElFormItem>
        </div>

        <ElFormItem label="Допуск">
          <ElSelect
            :class="{ 'ring ring-rose-500': !!errors?.admiss }"
            v-model="recruit.admiss"
            filterable
          >
            <ElOption v-for="item in admissOptions" :key="item" :label="item" :value="item" />
          </ElSelect>
        </ElFormItem>
      </div>
    </div>

    <ElFormItem>
      <ElButton @click="emit('submit', recruit)" type="primary">{{ props.submitBtnName }}</ElButton>
      <slot v-if="$slots.sync" name="sync" :recruit />
    </ElFormItem>
  </ElForm>
</template>
