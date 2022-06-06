<template>
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
import { Vue, Component, Watch} from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  desc = "";
  @Watch('desc')
  onValueChanged(desc: string){
    this.$emit('update:value', desc);
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
