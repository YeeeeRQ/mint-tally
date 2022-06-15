<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`" :style="contentStyle">
      <slot></slot>
    </div>
    <Nav class="nav-wrapper" @update:clientHeight="onNavMounted" />
  </div>
</template>

<script lang="ts" >

import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class Layout extends Vue {

  @Prop({ default: '', type: String }) classPrefix?: '';
  
  contentStyle = {
    bottom: "0px",
  }

  beforeCreate() {
    console.log(window.visualViewport.width + ' * ' + window.visualViewport.height)
  }

  onNavMounted(height: number) {
    this.contentStyle.bottom = height.toString() + 'px';
  }

}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  // border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.content {
  overflow-y: hidden;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  width: 100%;
}

.nav-wrapper {
  // border: 1px solid red;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
