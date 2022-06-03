<template>
  <!-- label.notes>span.name+input[type="text"] -->
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input
        type="text"
        placeholder="此处输入备注"
        v-model="desc"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  desc = "";
  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.desc = input.value;
  }
}
</script>

<style lang="scss" scoped>
.notes {
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    flex-grow: 1;
    height: 64px;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
