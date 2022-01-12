<script lang="ts" setup>
const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6']
</script>

<template>
  <div class="weekWrap">
    <div class="weekDay">Week</div>
    <div class="weekGrid" style="height: 800px;">
      <div v-for="week in weeks" class="weekItem">
        {{ week }}
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
