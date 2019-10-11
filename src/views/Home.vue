<template>
  <div class="home">
    <RandomTextForColor :random_text="name"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line import/extensions
import RandomTextForColor from '../components/RandomTextForColor.vue';


@Component({
  components: {
    RandomTextForColor,
  },
})
export default class Home extends Vue {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  get name(): string {
    // eslint-disable-next-line no-use-before-define,no-underscore-dangle
    this._name = getName();
    // eslint-disable-next-line no-underscore-dangle
    return this._name;
  }

    // eslint-disable-next-line no-use-before-define
    _name: string = getName();
}
// eslint-disable-next-line no-use-before-define,no-global-assign,no-restricted-globals
function getName() {
  return '12 1';
}
</script>
