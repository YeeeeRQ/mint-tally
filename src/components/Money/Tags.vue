<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }">
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { TagHelper } from "@/mixins/TagHelper";

@Component
export default class Tags extends mixins(TagHelper){
  selectedTags: Tag[] = [];
  get tagList(){
      return this.$store.state.tagList;
  }

  created(){
    this.$store.commit('fetchTags');
  }
  toggle(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags)
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

  >.current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    >li {
      $tag_color: #d9d9d9;

      background-color: $tag_color;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 18px;
      margin-right: 18px;
      margin-top: 14px;

      &.selected {
        
        // background: darken($tag_color, 40%);
        // background: darken(#8FBC8F, 40%);
        background: #8FBC8F;
        color: #f7f7f7;
      }
    }
  }

  >.new {
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
