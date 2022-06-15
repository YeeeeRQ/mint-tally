<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`" ref="pageContent" :style="contentStyle">
      <slot></slot>
    </div>
    <Nav class="nav-wrapper" @update:clientHeight="onNavMounted"/>
  </div>
</template>

<script lang="ts" >


import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class Layout extends Vue {
  @Prop({default:'', type:String}) classPrefix?:'';
  contentStyle = {
    // border: "1px solid red",
    height: "100%",
  }
  beforeCreate() {
    console.log(window.visualViewport.width + ' * ' + window.visualViewport.height)
  }

  onNavMounted(height: number){
    // console.log(height);
    const pageContent = this.$refs.pageContent as HTMLDivElement ;
    this.contentStyle.height = (pageContent.clientHeight - height).toString() + 'px';
  }
  // mounted(){
    // const navWrapper = this.$refs.navWrapper as HTMLDivElement ;

    // console.log(this.$refs.pageContent);
    // console.log(pageContent.clientHeight);
    // console.log(navWrapper.clientHeight);
  // }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  // border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
  // position: fixed;
  // bottom: 0;
  // width: 100%;
}

.content {
  // border: 2px solid blue;

  // flex-grow: 1;
  overflow: auto;
  position: fixed;
  top:0;
  width: 100%;
  // height: 762px;
}

.nav-wrapper {
  // border: 1px solid red;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
