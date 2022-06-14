<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type" />
    <ol>
      <li v-for="group, index in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.createdAt" class="record">
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
import recordTypeList from "@/constants/recordTypeList";
import dayjs from 'dayjs';
import clone from "@/lib/clone";

@Component({
  components: {
    Tabs
  }
})
export default class Statistics extends Vue {
  beautify(title: string) {
    const day = dayjs(title)
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天'
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;
    const formatStr = 'YYYY-MM-DD';

    if (recordList.length === 0) { return []; }

    type HashTableValue = { title: string, items: RecordItem[] }

    const newList = clone(recordList)
      .filter(r => r.type === this.type)
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

    type Result = { title: string, total?: number, items: RecordItem[] }[];

    const result: Result = [{ title: dayjs(newList[0].createdAt).format(formatStr), items: [newList[0]] }];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({ title: dayjs(current.createdAt).format(formatStr), items: [current] })
      }
    }

    result.map(group=>{
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    })
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecord')
  }

  type = '-';
  interval = 'day';

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