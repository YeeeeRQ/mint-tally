<template>
  <Layout class-prefix="layout">
    <Tags @update:value="onUpdateTags" />
    <div class="notes-wrapper">
      <Notes @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>
    </div>
    <Types :value.sync="record.type" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    {{record}}
  </Layout>
</template>

<script lang="ts">
import { Vue, Component} from "vue-property-decorator";

import Tags from "@/components/Money/Tags.vue";
import EditItem from "@/components/Money/EditItem.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

@Component({
  components: { NumberPad, Tags, Notes: EditItem, Types },
  // computed:{
  //   recordList(){
  //     return this.$store.state.recordList;
  //   }
  // }
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  created(){
    this.$store.commit("fetchRecord");
  }
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
    this.$store.commit('createRecord', this.record);
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
