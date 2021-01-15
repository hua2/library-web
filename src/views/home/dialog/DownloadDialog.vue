<template>
  <el-dialog class="down-dialog" :visible.sync="dialogVisible" width="352px" title="确认订单" @close="handlerClose">
    <h4>{{ price }}元</h4>
    <div class="d-pic">
      <canvas ref="canvas" />
    </div>
    <strong class="text-16">支付方式：微信扫码支付</strong>
    <!--    <p>能源图库会员更优惠</p>-->
    <!--    <el-button type="primary" @click="goToClick">了解详情</el-button>-->
  </el-dialog>
</template>

<script>
/**
 * 下载图片(服务条款)模块
 * @author lyh
 * @date 2020-12-08
 */
import QRCode from 'qrcode'
export default {
  name: 'DownloadDialog',
  data() {
    return {
      dialogVisible: false,
      qrCode: undefined,
      price: undefined
    }
  },
  watch: {
    qrCode(n) {
      this.$nextTick(() => {
        this.initByVal(n)
      })
    }
  },
  methods: {
    handlerClose() {
      this.$emit('close')
    },
    // goToClick() {
    //   this.$emit('close')
    //   this.$router.push('/personal/index')
    // },
    initByVal(val) {
      QRCode.toCanvas(this.$refs.canvas, val, error => {
        if (error) {
          this.$message({
            duration: 1500,
            message: 'create error',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.down-dialog{
  width: 100%;
  height: 100%;
  /deep/ {
    .el-dialog {
      border-radius: 8px;
      margin-top: 38vh!important;
    }
    .el-dialog__header {
      border-bottom: unset;
      text-align: center;
    }
    .el-dialog__body {
      padding: 0 0 24px 0;
      text-align: center;
    }
    h4{
      color: #D7262E;
      margin-bottom: 4px;
      font-weight: 500;
    }
    .d-pic{
      width: 100%;
      margin-bottom: 12px;
      border: 1px solid #F1F2F6;
      canvas {
        width: 120px;
        height: 120px;
        margin: 12px auto;
      }
    }
    //p{
    //  color: #666;
    //  margin: 16px 0 8px 0;
    //}
    //.el-button{
    //  height: 30px;
    //  padding: 4px 16px;
    //  border-radius: 16px;
    //}
  }
}

</style>
