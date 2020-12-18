<template>
  <div class="flex">
    <span class="p-h-line"></span>
    <span class="p-h-title h-40 text-14">{{ text }}</span>
  </div>
</template>

<script>
/**
 *个人中心-通用header(ex:|个人信息)模块
 * @author lyh
 * @date 2020-12-10
 */
export default {
  name: 'PersonalHeader',
  props: {
    text: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.p-h-line {
  width: 0;
  height: 16px;
  border: 1.5px solid #d7262e;
  display: block;
  margin: 3px 4px 0 0;
}
.p-h-title {
  color: #d7262e;
  font-weight: 500;
}
</style>
