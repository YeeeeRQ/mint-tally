<template>
  <Layout>
    <ol class="tags">
      <router-link class="tag" tag="li" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </ol>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新增标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts" >
import { Component} from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { TagHelper } from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";

@Component({
  components:{Button},
})
export default class Labels extends mixins(TagHelper){
  get tags(){
      return this.$store.state.tagList;
  }

  beforeCreate(){
    this.$store.commit('fetchTags');
  }

}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  >.tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 12px;
    border-bottom: 1px solid #e6e6e6;

    .icon {
      color: #333;
    }

  }
}

.createTag {
  background: #8FBC8F;
  font-weight: bold;
  color: white;
  border-radius: 8px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
