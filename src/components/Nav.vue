<template>
  <div class="nav">
    <router-link to="/money">
      <svg>
        <use xlink:href="#labels" />
      </svg>
      记账
    </router-link>
    |
    <router-link to="/labels">标签</router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>


<script lang="ts">
  //import x from "@/assets/icons/labels.svg"
  //console.log(x)

  let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)

  try {
    importAll(require.context('../assert/icons', true, /\.svg$/))
  }
  catch (error) {
    console.log(error)
  }

  export default {
    name: "NavComponent"
  }
</script>

<style lang="scss" scoped>
  .nav {
    border: 1px solid red;
  }
</style>
