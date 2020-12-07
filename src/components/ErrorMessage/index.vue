<template>
  <div class="error-message text-12 absolute flex items-center">
    <img src="../../assets/img/warn-icon.png" alt="" class="mr-5" />
    {{ text }}
  </div>
</template>

<script>
/**
 * input报错通用模块
 * @author lyh
 * @date 2019-07-10
 */
export default {
  name: 'ErrorMessage',
  props: {
    text: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.error-message {
  font-weight: 400;
  color: rgba(215, 38, 46, 1);
  img {
    width: 14px;
    height: 14px;
  }
}
</style>
