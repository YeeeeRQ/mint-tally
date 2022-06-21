<template>
  <nav ref="navWrapper">
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="labels" /> 标签
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" /> 记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" /> 统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
@Component
export default class Nav extends Vue {
  get navHeight() {
    return (this.$refs.navWrapper as HTMLDivElement).clientHeight;
  }
  mounted() {
    this.$emit("update:clientHeight", this.navHeight);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";



nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  background: white;

  >.item {
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon {
      width: 30px;
      height: 30px;
    }

    color: #a0a0a0;
    font-weight: lighter;
  }

  >.item.selected {
    color: $color-highlight;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>

