<template>
  <h1>Home</h1>
  <p>
    <img src="../assets/logo.png" alt="logo" />
  </p>

  <p>value的值是:</p>
  <p>{{ value }}</p>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive, onMounted, ref } from 'vue'

const value = ref('')
onMounted(async () => {
  const result = await axios.get('/api/get')
  value.value = (result as unknown) as string
})
const state = reactive({ count: 0 })
</script>

<style scoped>
h1,
a {
  color: green;
}
</style>
