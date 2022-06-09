<template>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <div class="notes-wrapper">
      <Notes @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>
    </div>
    <Types :value.sync="record.type" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import Tags from "@/components/Money/Tags.vue";
import EditItem from "@/components/Money/EditItem.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const recordList = recordListModel.fetch();

@Component({
  components: { NumberPad, Tags, Notes: EditItem, Types },
})
export default class Money extends Vue {
  tags = tagListModel.data;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList = recordList;

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }
  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }
  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
  }

  saveRecord() {
    const record_copy: RecordItem = recordListModel.clone(this.record)
    record_copy.createdAt = new Date()
    this.recordList.push(record_copy);
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save(this.recordList)
  }

  mounted() {
    // console.log(aaa);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes-wrapper{
  padding: 12px 0;
}
</style>
