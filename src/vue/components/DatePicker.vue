<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { years, months } from 'alga-js/date'
import CalendarBox from './CalendarBox.vue'

interface Props {
  modelValue?: any,
  placeholder?: string,
  mode?: string,
  locale?: string,
  option?: any,
}

interface Emits {
  (e: 'update:modelValue', value: any[] | any): void,
  (e: 'handler', value: any[] | any): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  placeholder: '',
  mode: 'dataTime',
  locale: 'id-ID',
  option: {}
})

const emit = defineEmits<Emits>()

const selected = ref<Date>(new Date(props?.modelValue || null))
const year = ref<number>(new Date(props?.modelValue || null).getFullYear())
const month = ref<number>(Number(new Date(props?.modelValue || null).getMonth()) + 1)
const picker = ref<boolean>(false)
const searchStr = ref<string>('')

watch(() => props.modelValue, () => {
  selected.value = new Date(props?.modelValue || null)
  year.value = new Date(props?.modelValue || null).getFullYear()
  month.value = Number(new Date(props?.modelValue || null).getMonth()) + 1
})

const randomChar = (maxlength: number = 10) => {
  let allChar: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let resChar: string = ''
  for(let i: number = 0; i < maxlength; i++) {
    resChar += allChar.charAt(Math.floor(Math.random() * allChar.length))
  }
  return resChar
}

const hideByClick = () => {
  picker.value = false
}

const pickedHandler = (val: any) => {
  emit('update:modelValue', selected.value)
  emit('handler', val)
  picker.value = false
}

const allYears = computed(() => {
  return years(year.value, 4)
})

const allMonths = computed(() => {
  return months()
})

const monthControlHandler = (btnControl: string) => {
  let monthNum = 1
  if(btnControl === 'prev') {
    if(month.value > 1 && month.value <= 12) {
      monthNum = month.value - 1
    } else if(month.value === 1) {
      monthNum = 12
      year.value = year.value - 1
    }
  } else if(btnControl === 'next') {
    if(month.value >= 1 && month.value < 12) {
      monthNum = month.value + 1
    } else if(month.value === 12) {
      monthNum = 1
      year.value = year.value + 1
    }
  }
  month.value = monthNum
}

const dateInputValue = computed<any>(() => {
  let newInputValue = new Date(selected.value).toLocaleString(props?.locale || 'id-ID', props?.option || {})
  if(props?.mode && props.mode === 'date') {
    newInputValue = new Date(selected.value).toLocaleDateString(props?.locale || 'id-ID', props?.option || {})
  } else if(props?.mode && props.mode === 'time') {
    newInputValue = new Date(selected.value).toLocaleTimeString(props?.locale || 'id-ID', props?.option || {})
  }
  return newInputValue
})
</script>

<template>
  <div class="picker tedirDatePicker" :class="picker ? 'active' : ''">
    <div class="pickerBackdrop" @click="hideByClick"></div>
    <div class="pickerWrap">
      <input type="text" :value="dateInputValue" @click="picker = !picker" class="input tedirDateInput" :placeholder="placeholder" />
      <div class="pickerContent">
        <div class="tedirDateControl">
          <div class="tedirDateStart" @click="monthControlHandler('prev')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </div>
          <div class="tedirDateCenter">
            <select v-model="month" class="select tedirDateMonth">
              <option v-for="mnt in allMonths" :key="mnt.value" :value="Number(mnt.value)">{{ mnt.text }}</option>
            </select>
            <select v-model="year" class="select tedirDateYear">
              <option v-for="yr in allYears" :key="yr" :value="yr">{{ yr }}</option>
            </select>
          </div>
          <div class="tedirDateEnd" @click="monthControlHandler('next')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        </div>
        <CalendarBox v-model="selected" class="tedirDateCalendar" size="small" :year="year" :month="month" @handler="pickedHandler" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@use picker;
@use form {
  field: input;
}
@use tedirDatePicker;
</style>
