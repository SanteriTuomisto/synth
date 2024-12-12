<template>
  <div class="container">
    <div class="knob">
      <div class="inner">
        <div class="top">
        </div>
      </div>
    </div>
    <div class="title">
      {{ props.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<style scoped>
.container {
  width: 80px;
  padding-bottom: 10px;
}
.title {
  text-align: center;
  color: #525252;
  font-size: 11px;
  font-weight: bold;
  text-shadow: 1px -1px 0px #fdfdfd;
}
.knob {
  background: linear-gradient(319deg, #646464 5%, #6f6f6f 10%, #000000 30%, #474747 50%, #000000 70%, #000000 80%, #000000 95%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 0px #282828;
}

.inner {
  border: 5px solid #060606;
  box-shadow: 3px 3px 1px 1px black;
  background: linear-gradient(
    45deg,
    #999 5%,
    #fff 10%,
    #ccc 30%,
    #ddd 50%,
    #ccc 70%,
    #fff 80%,
    #999 95%
  );
  width: 55%;
  height: 55%;
  border-radius: 50%;
  margin-right: 3px;
  margin-bottom: 3px;
}

.top {
  box-shadow: inset 0px 2px 5px 0px #000000;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>