<template>
  <div class="w-full">
    <PersonalHeader text="认证供图" />
    <div class="refuse">
      <img src="../../assets/img/refuse-status.png" alt="">
      <div class="r-btn" @click="$router.push('/attest/index')">
        <img src="../../assets/img/refuse-status-btn.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import PersonalHeader from '@/components/PersonalHeader/index'
export default {
  name: 'RefuseStatus',
  components: { PersonalHeader }
}
</script>

<style scoped lang="scss">
.refuse{
    width: 904px;
    height: fit-content;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 32px 0 32px 24px;
    img{
      height: 55px;
      width: 480px;
      margin: 24px auto 32px auto;
    }
    .r-btn{
      img{
        width: 200px;
        height: 215px;
        margin: 0 auto;
      }
    }
  }
</style>
