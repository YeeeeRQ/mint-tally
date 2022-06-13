<template>
    <Layout>
      <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type" />
      <Tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval" />
      <!-- <div>
        type: {{type}}
        <br/>
        interval: {{interval}}
      </div> -->
    </Layout>
</template>

<style lang="scss" scoped>
 ::v-deep .type-tabs-item {
  background-color: white;

  &.selected {
    background-color: #c4c4c4;

    &::after {
      display: none;
    }
  }
}

::v-deep .interval-tabs-item{
  height: 48px;
}
</style>

<script lang="ts" >
import { Vue, Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: {
    Tabs
  }
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';

  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>