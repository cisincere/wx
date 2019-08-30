<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseURL extends Vue {
    url: string='http://localhost:8080'
}
</script>

<style scoped>

</style>
