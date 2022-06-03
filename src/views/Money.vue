<template>
  <Layout class-prefix="layout">
    <Tags :data-source="tags" />
    <Notes />
    <Types />
    <NumberPad/>
  </Layout>
</template>

<script lang="ts">
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
export default {
  name: "Money",
  components:{
    NumberPad,
    Tags,
    Notes,
    Types,
  },
  data(){
    return {
      tags:[ '衣','食','住','行', "彩票"]
    }
  }
};
</script>

<style lang="scss">
.layout-content{
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

</style>
