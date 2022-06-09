<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input
        type="text"
        :placeholder="placeholder"
        v-model="desc"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop} from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  @Prop({default:''}) desc!:string;

  @Prop({required:true}) fieldName!:string;
  @Prop({default:''}) placeholder!:string;

  @Watch('desc')
  onValueChanged(desc: string){
    this.$emit('update:value', desc);
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
