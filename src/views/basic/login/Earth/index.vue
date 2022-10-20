<template>
  <div id="html2canvas" class="css3d-wapper" ref="html2canvas">
    <div class="fire-div"></div>
  </div>
  <div id="earth-canvas" ref="earth_canvas"></div>
</template>

<script setup lang="ts">
  import World from './world';
  const earth_canvas = ref<HTMLElement>();
  const html2canvas = ref<HTMLElement>();
  onMounted(() => {
    new World({ dom: earth_canvas.value as HTMLElement });
  });
</script>

<style lang="less">
  #html2canvas {
    pointer-events: none;
    color: #fff;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0);

    .fire-div {
      font-size: 20px;
      font-weight: 600;
      border-top: 3px solid #0cd1eb;
      padding: 6px 8px;
      min-width: 50px;
      background: rgba(40, 108, 181, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  #earth-canvas {
    height: 100%;
    width: 100%;
    background: #010826;
  }
</style>
