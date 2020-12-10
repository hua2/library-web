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
            <h5 class="ml-64">{{ account.memberStartTime | moment("YYYY-MM-DD HH:mm") }}</h5>-
            <h5>{{ account.memberEndTime | moment("YYYY-MM-DD HH:mm") }}</h5>
          </template>
        </div>
      </div>
      <p>普通会员下载需单图支付费用，升级年会员无限下载。</p>
      <div class="flex items-center">
        <div class="ml-64 mr-12">会员时长</div>
        <div>
          <el-radio-group v-model="radio">
            <el-radio v-for="(li, index) in listData" :key="index" :label="li.type">{{ li.name }} {{ li.price/100 }} 元</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="p-i-btn">
        <span @click="buyClick">升级VIP</span>
      </div>
    </div>
    <MemberDialog ref="memberDialog" @close="closeClick" />
    <MemberPayment ref="memberPaymentDialog" />
  </div>
</template>

<script>
/**
 * 个人中心-个人信息模块
 * @author lyh
 * @date 2020-11-20
 */
import PersonalHeader from '@/components/PersonalHeader/index'
import MemberDialog from '@/views/personal/dialog/MemberDialog'
import MemberPayment from '@/views/personal/dialog/MemberPayment'
export default {
  name: 'Index',
  components: { MemberPayment, MemberDialog, PersonalHeader },
  data() {
    return {
      listData: [],
      radio: 1,
      checkPaiedIntervalId: null
    }
  },
  computed: {
    account() {
      return this.$store.state.account.account
    }
  },
  created() {
    this.memberList()
  },
  beforeDestroy() {
    if (this.checkPaiedIntervalId) {
      clearInterval(this.checkPaiedIntervalId)
    }
  },
  methods: {
    closeClick() {
      if (this.checkPaiedIntervalId) {
        clearInterval(this.checkPaiedIntervalId)
      }
    },
    memberList() {
      this.$api.user.member().then(res => {
        if (res.code === 1000) {
          this.listData = res.data
        }
      })
    },
    buyClick() {
      this.$refs.memberDialog.dialogVisible = true
      this.userOrderSubmit()
    },
    // 详情-用户购买订单
    userOrderSubmit() {
      this.$api.user.userOrderSubmit({
        orderType: this.radio,
        payment: 1
      }).then(res => {
        if (res.code === 1000) {
          this.$refs.memberDialog.qrCode = res.data.qrCode
          this.$refs.memberDialog.price = res.data.price
          this.checkPaied(res.data.orderCode)
        }
      })
    },
    // 查询交易是否成功
    checkPaied(orderCode) {
      if (this.checkPaiedIntervalId) {
        clearInterval(this.checkPaiedIntervalId)
      }
      this.checkPaiedIntervalId = setInterval(() => {
        this.$api.user.queryOrder({ orderCode }).then(res => {
          if (res.code === 1000 && res.data != null) {
            clearInterval(this.checkPaiedIntervalId)
            this.$refs.memberDialog.dialogVisible = false
            this.$refs.memberPaymentDialog.dialogFormVisible = true
          }
        })
      }, 1000)
    }
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
    }
    p{
      margin-left: 88px;
      margin-bottom: 24px;
    }
    .p-i-btn{
      margin: 24px 0 0 108px;
      span{
        color: #0067C6;
        padding: 3px 12px;
        background: #ffffff;
        border-radius: 14px;
        border: 1px solid #0067C6;
        margin: 0 12px 0 24px;
      }
    }
  }
}
</style>
