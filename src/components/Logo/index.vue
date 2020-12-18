<template>
  <div class="logo" @click="$router.push('/home/index')"></div>
</template>

<script>
/**
 * header-logo模块
 * @author lyh
 * @date 2020-12-08
 */
export default {
  name: 'Logo',
  components: {}
}
</script>

<style scoped lang="scss">
.logo {
  width: 122px;
  height: 65px;
  cursor: pointer;
  background: url("../../assets/img/user-logo.png");
  background-size: 100%;
}
</style>
