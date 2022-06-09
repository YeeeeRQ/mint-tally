<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  // Todo： bug！！ 修改dataSource类型
  @Prop() readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags)
  }
  create() {
    const name = window.prompt("请输入标签名")?.trim();

    if (!name) return;

    if (name === "") {
      window.alert("标签名不能为空");
    } else {
      if (this.dataSource) {
        this.$emit("update:dataSource", [...this.dataSource, name]);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  overflow: auto;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      $tag_color: #d9d9d9;

      background-color: $tag_color;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 12px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($tag_color, 40%);
        color: #f7f7f7;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
