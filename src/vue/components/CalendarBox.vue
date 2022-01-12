<script setup lang="ts">
import { ref } from 'vue'
import useCalendar from '../composables/useCalendar'

interface Props {
  modelValue?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date()
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const { days, daysInMonth, daysInPrevMonth, daysInNextMonth } = useCalendar()

const splitDate = (dateArg: string) => {
  return dateArg.split('-')
}

const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6']
const count = ref(0)
</script>

<template>
  <div class="calendar">
    <div class="calendarDay">
      <div class="dayGrid">
        <div v-for="day in days" class="dayItem">
          {{ day }}
        </div>
      </div>
    </div>
    <div class="calendarMonth">
      <div class="monthGrid" style="height: 800px;">
        <div v-for="prevNum in daysInPrevMonth" :key="prevNum" class="monthItem">
          <div class="monthHeader">{{ prevNum }}</div>
          <div class="monthBody"></div>
          <div class="monthFooter"></div>
        </div>
        <div v-for="dayNum in daysInMonth" :key="dayNum" class="monthItem">
          <div class="monthHeader">{{ dayNum }}</div>
          <div class="monthBody"></div>
          <div class="monthFooter"></div>
        </div>
        <div v-for="nextNum in daysInNextMonth" :key="nextNum" class="monthItem">
          <div class="monthHeader">{{ nextNum }}</div>
          <div class="monthBody"></div>
          <div class="monthFooter"></div>
        </div>
      </div>
    </div>
    <div class="calendarWeek">
      <div class="weekWrap">
        <div class="weekDay">Week</div>
        <div class="weekGrid" style="height: 800px;">
          <div v-for="week in weeks" class="weekItem">
            {{ week }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: grid;
  grid-template-areas: "weekGrid dayGrid" "weekGrid monthGrid" "weekGrid monthGrid";
  grid-template-columns: auto 1fr;
}

.calendarDay {
  grid-area: dayGrid;
}

.calendarMonth {
  grid-area: monthGrid;
}

.calendarWeek {
  grid-area: weekGrid;
}

.dayGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
}

.dayItem {
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px;
  text-align: center;
}

.weekWrap {
  height: 100%;
}

.weekDay {
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px;
  text-align: center;
}

.weekGrid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: minmax(16.666666667%, 1fr);
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.weekItem {
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px;
  text-align: center;
}

.monthGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(16.666666667%, 1fr);
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
}

.monthItem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.monthHeader {
  text-align: right;
}

.monthBody {
  flex-grow: 1;
}
</style>
