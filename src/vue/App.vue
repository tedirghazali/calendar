<script setup lang="ts">
import DatePicker from './components/DatePicker.vue'
import CalendarBox from './components/CalendarBox.vue'
import EventCalendar from './components/EventCalendar.vue'
</script>

<template>
  <DatePicker />
  <p><br/></p>
  <CalendarBox />
  <p><br/></p>
  <EventCalendar />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1024px;
  color: #2c3e50;
  margin: 60px auto;
}
</style>
