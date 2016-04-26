<template>
  <h1>Hello {{ project }}!</h1>
</template>
<style lang="less">
  h1{
    padding: 20px * 2 50px;
  }
</style>
<script>
  export default {
    replace: false,
    data() {
      return {
        project: '<%= appname %>',
      };
    },
  };
</script>