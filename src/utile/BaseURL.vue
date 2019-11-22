<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseURL extends Vue {
    static url: string='http://localhost:9898'
}
</script>

<style scoped>

</style>
