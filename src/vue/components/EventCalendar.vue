<script lang="ts" setup>
import Day from './Day.vue'
import DayGrid from './DayGrid.vue'
import Week from './Week.vue'
</script>

<template>
  <div class="calendar">
    <div class="calendarDay">
      <Day />
    </div>
    <div class="calendarMonth">
      <DayGrid />
    </div>
    <div class="calendarWeek">
      <Week />
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
</style>
