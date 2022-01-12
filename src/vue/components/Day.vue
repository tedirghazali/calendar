<script lang="ts" setup>
import useCalendar from '../composables/useCalendar'

const { days } = useCalendar()
</script>

<template>
  <div class="dayGrid">
    <div v-for="day in days" class="dayItem">
      {{ day }}
    </div>
  </div>
</template>

<style scoped>
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
</style>
