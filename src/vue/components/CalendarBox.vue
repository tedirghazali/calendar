<script setup lang="ts">
import { ref, watch } from 'vue'
import useCalendar from '../composables/useCalendar'

interface Props {
  modelValue?: Date,
  year?: number,
  month?: number,
  locale?: string,
  type?: string,
  size?: string,
  
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  year: new Date().getFullYear(),
  month: Number(new Date().getMonth()) + 1,
  locale: 'en-US',
  type: 'narrow',
  size: 'medium'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void,
  (e: 'handler', value: any[] | any): void
}>()

const year = ref<number>(props?.year || new Date().getFullYear())
const month = ref<number>(props?.month || Number(new Date().getMonth()) + 1)
const date = ref<number>(props.modelValue?.getDate() || new Date().getDate())
const locale = ref<string>(props.locale || 'en-US')
const daytype = ref<any>({ weekday: props.type || 'narrow' })

watch(() => props.modelValue, () => {
  year.value = props.modelValue?.getFullYear() || new Date().getFullYear()
  month.value = props.modelValue?.getMonth() || new Date().getMonth()
  date.value = props.modelValue?.getDate() || new Date().getDate()
})

const { days, daysInMonth, daysInPrevMonth, daysInNextMonth } = useCalendar(year, month, date, locale, daytype)

const splitDate = (dateArg: string) => {
  return dateArg.split('-')
}

const weeks = ['1', '2', '3', '4', '5', '6']
const count = ref(0)

const selectDate = (yr, mn, dy) => {
  date.value = dy
  const newDate = new Date(yr, mn, dy)
  emit('update:modelValue', newDate)
  emit('handler', newDate)
}
</script>

<template>
  <div class="calendar hasWeek" :class="{'calendarSmall': props?.size === 'small'}">
    <div class="calendarDay">
      <div class="dayGrid">
        <div v-for="day in days" class="dayItem">
          {{ day }}
        </div>
      </div>
    </div>
    <div class="calendarMonth">
      <div class="monthGrid">
        <div v-for="prevNum in daysInPrevMonth" :key="prevNum" class="monthItem readOnlyItem">
          <div class="monthHeader">{{ prevNum }}</div>
          <div class="monthBody"></div>
        </div>
        <div v-for="dayNum in daysInMonth" :key="dayNum" class="monthItem" :class="{active: date === dayNum, current: Number(new Date().getDate()) === dayNum}" @click.stop="selectDate(year, month, dayNum)">
          <div class="monthHeader">{{ dayNum }}</div>
          <div class="monthBody"></div>
        </div>
        <div v-for="nextNum in daysInNextMonth" :key="nextNum" class="monthItem readOnlyItem">
          <div class="monthHeader">{{ nextNum }}</div>
          <div class="monthBody"></div>
        </div>
      </div>
    </div>
    <div class="calendarWeek">
      <div class="weekWrap">
        <div class="weekDay readOnlyItem">W</div>
        <div class="weekGrid">
          <div v-for="week in weeks" class="weekItem readOnlyItem">
            <div class="monthHeader">{{ week }}</div>
            <div class="monthBody"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@use tedirLayoutCalendar;
@use tedirCalendar;
</style>
