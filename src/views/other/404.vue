<template>
  <div class="invalid-404 relative">
    <img src="../../assets/img/404.jpeg" alt="" />
    <div class="invalid-link" @click="$router.push('/')"></div>
  </div>
</template>

<script>
/**
 * 404
 * @author lyh
 * @date 2019-12-11
 */
export default {
  name: '404'
}
</script>

<style scoped lang="scss">
.invalid-404 {
  img {
    width: 100%;
    height: 100%;
  }
  .invalid-link {
    width: 260px;
    height: 74px;
    top: 268px;
    left: 42%;
    cursor: pointer;
    border-radius: 36px;
    position: absolute;
  }
}
</style>
