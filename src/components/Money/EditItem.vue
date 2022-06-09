<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="onValueChanged($event.target.value)"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  @Prop({default:''}) readonly value!:string;

  @Prop({required:true}) fieldName!:string;
  @Prop({default:''}) placeholder!:string;

  onValueChanged(value: string){
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    flex-grow: 1;
    height: 40px;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
