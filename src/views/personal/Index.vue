<template>
  <div class="personal w-full">
    <PersonalHeader text="个人信息" />
    <div class="personal-info ">
      <div class="flex justify-between">
        <div class="h-56 flex items-center">
          <img :src="account.headPic" alt="">
          <strong>{{ account.nickname }}</strong>
          <template v-if="account.memberStatus !==0">
            <span>普通会员</span>
            <h5>{{ account.memberStartTime | moment("YYYY-MM-DD HH:mm") }}</h5>-
            <h5>{{ account.memberEndTime | moment("YYYY-MM-DD HH:mm") }}</h5>
          </template>
        </div>
        <!--        <div class="p-i-status">-->
        <!--          <span>已经完善</span>-->
        <!--        </div>-->
      </div>
      <p>普通会员下载需单图支付费用，升级年会员无限下载。</p>
      <div class="p-i-vip flex items-center">
        <span>升级VIP</span>
        <div class="p-i-num">年VIP <span>99元</span>/年
        </div>
      </div>
    </div>
  </div></template>

<script>
/**
 * 个人中心-个人信息模块
 * @author lyh
 * @date 2020-11-20
 */
import PersonalHeader from '@/components/PersonalHeader/index'
export default {
  name: 'Index',
  components: { PersonalHeader },
  data() {
    return {
    }
  },
  computed: {
    account() {
      return this.$store.state.account.account
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.personal {
  .personal-info{
    width: 904px;
    height: 195px;
    padding: 16px;
    background: #FFFFFF;
    color: #000000;
    font-size: 12px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    img{
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
    strong{
      font-size: 14px;
      font-weight: 500;
      margin: 0 38px 0 14px;
    }
    span{
      color: #858B93;
      padding: 2px 8px;
      background: #F1F2F6;
      border-radius: 10px;
    }
    h5{
      color: #858B93;
      margin-left: 64px;
    }
    .p-i-status{
     span{
       color: #35D726;
       background: unset;
     }
    }
    p{
      margin-left: 88px;
    }
    .p-i-vip{
     margin-top: 24px;
      span{
        color: #0067C6;
        padding: 2px 8px;
        background: #ffffff;
        border-radius: 14px;
        border: 1px solid #0067C6;
        margin: 0 12px 0 64px;
      }
      .p-i-num{
        width: 208px;
        padding: 2px 0 2px 6px;
        border-radius: 4px;
        border: 1px solid #E1E2E9;
       span{
         margin: 0;
         padding: 0;
         border: unset;
         color: #E93535;
         background: #ffffff;
       }
      }
    }
  }
}
</style>
