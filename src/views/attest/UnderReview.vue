<template>
  <div class="w-full">
    <PersonalHeader text="供图认证" />
    <div class="under-review">
      <img src="../../assets/img/attest-audit-icon.png" alt="" />
      <div class="u-r-btn">
        <img src="../../assets/img/attest-audit-btn.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import PersonalHeader from '@/components/PersonalHeader/index'
export default {
  name: 'UnderReview',
  components: { PersonalHeader }
}
</script>

<style scoped lang="scss">
.under-review{
  width: 904px;
  height: fit-content;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 32px 0 32px 24px;
 img{
   height: 55px;
   width: 480px;
   margin: 24px auto 32px auto;
 }
  .u-r-btn{
  img{
    width: 150px;
    height: 170px;
    margin: 0 auto;
      }
  }
}
</style>
