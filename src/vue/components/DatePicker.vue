<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CalendarBox from './CalendarBox.vue'

interface Props {
  modelValue?: any,
  //@ts-ignore
  options?: any[],
  prop?: string,
  placeholder?: string,
  size?: number
}

interface Emits {
  (e: 'update:modelValue', value: any[] | any): void,
  (e: 'handler', value: any[] | any): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  //@ts-ignore
  options: [],
  prop: 'value',
  placeholder: '',
  size: 0
})

const emit = defineEmits<Emits>()

const selected = ref<Date>(new Date(props?.modelValue || undefined))
const year = ref<number>(new Date(props?.modelValue || undefined).getFullYear())
const month = ref<number>(Number(new Date(props?.modelValue || undefined).getMonth()) + 1)
const picker = ref<boolean>(false)
const searchStr = ref<string>('')

watch(() => props.modelValue, () => {
  selected.value = new Date(props?.modelValue || undefined)
  year.value = new Date(props?.modelValue || undefined).getFullYear()
  month.value = Number(new Date(props?.modelValue || undefined).getMonth()) + 1
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
</script>

<template>
  <div class="picker tedirDatePicker" :class="picker ? 'active' : ''">
    <div class="pickerBackdrop" @click="hideByClick"></div>
    <div class="pickerWrap">
      <input type="search" v-model="selected" @click="picker = !picker" class="input tedirDateInput" :placeholder="placeholder" />
      <div class="pickerContent">
        <div class="tedirDateControl">
          <div class="tedirDateStart">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </div>
          <div class="tedirDateCenter">
            <select class="select tedirDateMonth">
              <option>Jan</option>
            </select>
            <select class="select tedirDateYear">
              <option>2022</option>
            </select>
          </div>
          <div class="tedirDateEnd">
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
