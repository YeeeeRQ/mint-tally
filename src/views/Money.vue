<template>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <Notes @update:value="onUpdateNotes" />
    <Types :value.sync="record.type"/>
    <NumberPad @update:value="onUpdateAmount" />
    {{record}}
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};

@Component({
  components: { NumberPad, Tags, Notes, Types },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }
  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
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
</style>
