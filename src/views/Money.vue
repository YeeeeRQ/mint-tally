<template>
  <Layout class-prefix="xxx">
    <Tags />
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
    Types
  }
};
</script>

<style lang="scss">
.xxx-content{
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

</style>
