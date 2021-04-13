<template lang="pug">
el-button 按钮
router-view(v-slot="{ Component }")
  suspense
    component(:is="Component")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
