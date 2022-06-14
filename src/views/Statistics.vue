<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type" />
    <Tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval" />
    <!-- <div>
      type: {{ type }}
      <br />
      interval: {{ interval }}
    </div> -->
    <ol>
      <li v-for="group in result" :key="group.title">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.amount" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts" >
import { Vue, Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from 'dayjs';

@Component({
  components: {
    Tabs
  }
})
export default class Statistics extends Vue {
  beautify(title: string){
    const day = dayjs(title)
    const now = dayjs();
    if(day.isSame(now, 'day')){
      return '今天'
    }else if(day.isSame(now.subtract(1, 'day'), 'day')){
      return '昨天'
    }else if(day.isSame(now.subtract(2, 'day'), 'day')){
      return '前天'
    }else if(day.isSame(now, 'year')){
      return day.format('M月D日');
    }else{
      return day.format('YYYY年M月D日');
    }
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const { recordList } = this;

    type HashTableValue = { title: string, items: RecordItem[] }

    const hashTable: { [key: string]: HashTableValue } = {};

    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T');

      hashTable[date] = hashTable[date] || { title: date, items: [] }
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecord')
  }

  type = '-';
  interval = 'day';

  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
%item {
  padding: 8px 16px;
  line-height: 24px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
}

.record {
  background-color: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

::v-deep {
  .type-tabs-item {
    background-color: white;

    &.selected {
      background-color: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}
</style>