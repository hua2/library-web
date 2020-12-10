<template>
  <div class="payment-dialog">
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="472px"
      custom-class="c-g--dialog"
    >
      <span class="p-d-title">支付结果</span>
      <p class="text-12 mt-24">
        如有疑问或需要帮助，客服联系方式： <span>17601068589</span>
      </p>
      <div slot="footer" class="p-d-footer  flex justify-center">
        已完成支付，请点击 <span @click="payClick">下载</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 校验支付模块
 * @author lyh
 * @date 2020-12-10
 */
export default {
  name: 'CompletePayment',
  data() {
    return {
      dialogFormVisible: false,
      id: undefined
    }
  },
  methods: {
    payClick() {
      this.dialogFormVisible = false
      this.$emit('pay', this.id)
    }
  }
}
</script>

<style scoped lang="scss">
.payment-dialog {
  /deep/ {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      text-align: center;
      padding: 45px 25px 16px;
    }
    .el-dialog__footer {
      padding: 16px 0 55px 0;
    }
  }
  .p-d-footer {
    span{
     color:#d7262e ;
      cursor: pointer;
   }
  }
  .p-d-title {
    font-size: 20px;
    color: #000000;
  }
  span {
    color: #d7262e;
  }
}
</style>
