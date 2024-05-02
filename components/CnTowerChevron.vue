<template>
  <div
    ref="container"
  >
    <client-only>
      <video
        id="videoUnderlay"
        ref="videoUnderlay"
        src="/img/cn-tower.mp4"
        autoplay
        loop
        muted
      />
      <canvas
        id="canvasOverlay"
        ref="canvasOverlay"
        :width="cWidth"
        :height="cHeight"
      />
    </client-only>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, nextTick } from 'vue';

const container = ref(null);
const videoUnderlay = ref(null);
const canvasOverlay = ref(null);
const cWidth = ref(1000);
const cHeight = ref(1000);

onMounted(async () => {
  await nextTick();
  const canvas = canvasOverlay.value;
  const ctx = canvas.getContext('2d');
  const video = videoUnderlay.value;
  
  const setCanvasSize = () => {
    if (container.value) {
      canvas.width = cWidth.value;
      canvas.height = cWidth.value;
    }
  };

  setCanvasSize();

  function drawChevronPath(offset) {
    const width = canvas.width;
    const height = canvas.height;
    const chevronWidth = width / 2.7;

    ctx.beginPath();
    ctx.moveTo(width + offset, 0);
    ctx.lineTo(width - chevronWidth + offset, 0);
    ctx.lineTo(260 + offset, height / 2);
    ctx.lineTo(width - chevronWidth + offset, height);
    ctx.lineTo(width + offset, height);
    ctx.lineTo(chevronWidth + 260 + offset, height / 2);
    ctx.closePath();
  }

  let xOffset = canvas.width;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    drawChevronPath(xOffset);
    ctx.clip();

    ctx.drawImage(video, 0, 0, canvas.width * 1.15, canvas.height * 1.15);

    ctx.restore();
    if (xOffset > -canvas.width / 100) {
      xOffset -= xOffset / 30;
    }
    requestAnimationFrame(draw);
  }

  console.log('create video event listener');
  video.addEventListener('canplaythrough', () => {
    draw();
  });

  watchEffect(() => {
    setCanvasSize();
  });
});

</script>

<style scoped>
#canvasOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#videoUnderlay {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
