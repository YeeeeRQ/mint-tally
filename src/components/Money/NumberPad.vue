<template>
  <div class="numberPad">
    <div class="output">{{ output || blankChar }}</div>
    <div class="buttons" @click="tapButton">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button data-type="delete">删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button data-type="clear">清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button data-type="ok" class="ok">OK</button>
      <button class="zero">0</button>
      <button class="dot" data-type="dot">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  blankChar = "\u3000"; // \u3000 不可见字符
  output = "";

  tapButton(event: MouseEvent) {
    const btn = event.target as HTMLButtonElement;
    const max_size = 13;
    const _this = this;

    if (isNumberBtn(btn)) {
      handleNumberBtn(btn);
    } else {
      switch (btn.dataset.type) {
        case "delete":
          handleDeleteBtn();
          break;
        case "clear":
          handleClearBtn();
          break;
        case "ok":
          handleOkBtn();
          break;
        case "dot":
          handleDotBtn();
          break;
        default: // do nothing
          break;
      }
    }

    function isNumberBtn(btn: HTMLButtonElement): boolean {
      if (!btn.textContent) return false;
      return 0 <= "0123456789".indexOf(btn.textContent);
    }

    function handleNumberBtn(btn: HTMLButtonElement): void {
      if (_this.output.length >= max_size) return;
      if (!btn.textContent) return;

      if (_this.output === "0") {
        if (btn.textContent !== "0") {
          _this.output = btn.textContent;
        }
        return;
      }

      _this.output += btn.textContent;
    }

    function handleDeleteBtn(): void {
      _this.output = _this.output.slice(0, -1);
    }

    function handleClearBtn(): void {
      _this.output = "";
    }

    function handleDotBtn(): void {
      if (_this.output.length >= max_size) return;
      if (_this.output.length === 0) {
        _this.output = "0.";
        return;
      }
      if (_this.output.indexOf(".") > 0) {
        return;
      }
      _this.output += ".";
    }

    function handleOkBtn(): void {
      if(!_this.output)return;

      _this.$emit('update:value', _this.output);
      _this.$emit('submit', _this.output);
      _this.output = "";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearfix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    overflow: auto;
  }
  .buttons {
    @extend %clearfix;
    > button {
      font-size: 18px;
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.dot{
        font-size: 18px;
        font-weight: bolder;
      }
      &.ok {
        float: right;
        height: 64 * 2px;
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>
