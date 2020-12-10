<template>
  <el-dialog class="down-dialog" :visible.sync="dialogVisible" width="352px" title="确认订单" @close="handlerClose">
    <h4>{{ price }}元</h4>
    <div class="d-pic">
      <canvas ref="canvas" />
    </div>
    <strong class="text-16">支付方式：微信扫码支付</strong>
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
  name: 'MemberDialog',
  data() {
    return {
      dialogVisible: false,
      data: {},
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
      padding: 0 0 36px 0;
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
  }
}

</style>
