<template>
  <div></div>
</template>

<script lang="ts">
// eslint-disable-next-line import/extensions,import/no-unresolved
import C from 'color-js/color';
import UI from '@/components/UserInfo.vue';
import BaseURL from '@/utile/BaseURL.vue';

let c;
const co = C;
export default class HelloWorld extends UI {
    c = this.age;

    static color=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
}
console.log(C);
setInterval(() => {
  let colors = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    // eslint-disable-next-line radix
    const p = HelloWorld.color[`${parseInt(String(Math.random() * HelloWorld.color.length))}`];
    colors += p;
  }
  // eslint-disable-next-line radix
  console.log(C(`#${colors}`).toRGB());
}, 2500);
let u;
// eslint-disable-next-line prefer-const
u = new UI();
const ui = { ...u };
console.log(ui.age);
const bi = new BaseURL();
console.log(bi.url);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
