<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag }}
      </li>
    </ul>
    <div class="new">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop() dataSource: string[] | undefined;
  selectedTags: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
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
        background: darken($tag_color, 20%);
        outline: 1px dashed #f7f7f7;
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
