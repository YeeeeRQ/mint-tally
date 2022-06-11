<template>
  <Layout>
    <ol class="tags">
      <router-link class="tag" tag="li" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </ol>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts" >
import { Vue, Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import store from "@/store/index2";
// 
@Component({
  components:{Button}
})
export default class Labels extends Vue {
  tags = store.tagList;
  createTag() {
    const name = window.prompt("请输入标签名")?.trim();
    // const name = store.prompt("请输入标签名");
    if (name) {
      store.createTag(name);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  >.tag {
    // border: 1px solid red;
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
  background: #767676;
  color: white;
  border-radius: 8px;
  border: none;
  height: 40px;
  ;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
