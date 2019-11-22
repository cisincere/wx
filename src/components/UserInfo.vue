<template>
<div>
  <div id="div_color">
    <span></span>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import $ from 'jquery';
import RandomTextForColor from './RandomTextForColor.vue';


@Component({
  components: {
    RandomTextForColor,
  },
})
export default class UserInfo extends Vue {
    // 初期色のパラメータを提供します。
    static colors :object = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 1, 'b', 4, 'c', 'd', 'e', 'c', 'f', '6', '8', 'f', '2', '3', 'a', 'f', 'c', 'e', '5', '9', 'd'];
}
</script>

<style scoped>
  #div_color{
    width: 400px;
    height: 400px;
  }
</style>
