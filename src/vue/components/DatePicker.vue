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
  (e: 'update:modelValue', value: any[] | any): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  //@ts-ignore
  options: [],
  prop: 'value',
  placeholder: '-- combo option --',
  size: 0
})

const emit = defineEmits<Emits>()

const selected = ref<Date>(props.modelValue || new Date())
const picker = ref<boolean>(false)
const searchStr = ref<string>('')

watch(() => props.modelValue, () => {
  selected.value = props.modelValue
})

const randomChar = (maxlength: number = 10) => {
  let allChar: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let resChar: string = ''
  for(let i: number = 0; i < maxlength; i++) {
    resChar += allChar.charAt(Math.floor(Math.random() * allChar.length))
  }
  return resChar
}

const hideByClick = (e: any) => {
  e.target.style.display = 'none' 
  picker.value = false
}
</script>

<template>
  <div class="picker" :class="picker ? 'active' : ''">
    <teleport to="body">
      <div class="pickerBackdrop" :style="{display: picker ? 'block' : 'none'}" @click="hideByClick"></div>
    </teleport>
    <div class="pickerContent">
      <input type="search" v-model="selected" @click="picker = !picker" class="input" style="cursor: default; caret-color: transparent;" />
      <div class="pickerBody" style="width: auto;">
        <CalendarBox v-model="selected" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@use picker;
@use form {
  field: input;
}
</style>
