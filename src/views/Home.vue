<template>
  <div class="home">
    <RandomTextForColor :random_text="name"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line import/extensions,import/no-unresolved,import/no-extraneous-dependencies
import $ from 'jquery';
import RandomTextForColor from '../components/RandomTextForColor.vue';
import BURL from '@/utile/BaseURL.vue';

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

  get name():string {
    return this.user_info[1];
  }

  // eslint-disable-next-line camelcase
  get user_info(): any[] {
    // eslint-disable-next-line no-underscore-dangle,no-use-before-define
    this._user_info = getNames();
    // eslint-disable-next-line no-underscore-dangle
    return this._user_info;
  }

        // eslint-disable-next-line no-use-before-define,camelcase
        private _user_info: any[] | undefined;
}

function getNames() {
  // eslint-disable-next-line no-array-constructor
  let data: any[];
  // eslint-disable-next-line prefer-const
  data = [];
  $.ajax({
    url: `${BURL.url}/user/4`,
    dataType: 'json',
    type: 'GET',
    async: false,
    success(json) {
      // eslint-disable-next-line prefer-destructuring
      const datas = json.data;
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in datas) {
        if (datas[key] != null) {
          data.push(datas[key]);
        }
      }
    },
  });
  return data;
}
</script>
