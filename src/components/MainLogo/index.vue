<template>
  <div class="main-logo" @click="$router.push('/')"></div>
</template>

<script>
/**
 *main-logo( mainLayout,personalLayout)模块
 * @author lyh
 * @date 2020-12-01
 */
export default {
  name: 'MainLogo',
  components: {}
}
</script>

<style scoped lang="scss">
.main-logo {
  width: 120px;
  height: 60px;
  cursor: pointer;
  background: url("../../assets/img/logo-main.png");
  background-size: 100% 100%;
}
</style>
