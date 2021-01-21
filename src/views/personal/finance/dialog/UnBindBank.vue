<template>
  <div class="unBind-bank">
    <div class="u-b-dialog">
      <el-dialog
        :visible.sync="dialogFormVisible"
        width="340px"
        custom-class="c-g--dialog"
        :before-close="handleClose"
        style="margin-top: 18vh"
      >
        <span>您确定解绑该银行卡？</span>
        <div slot="footer" class="u-b-footer flex justify-center">
          <el-button
            type="info"
            size="small"
            class="mr-32"
            @click="dialogFormVisible = false"
          >取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="unbindBank"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/**
 * 财务管理(解绑银行卡)模块
 * @author lyh
 * @date 2021-01-19
 */
export default {
  name: 'UnBindBank',
  data() {
    return {
      dialogFormVisible: false,
      cardNo: undefined
    }
  },
  methods: {
    // 解绑银行卡
    unbindBank() {
      this.$api.user
        .unbindBank({ cardNumber: this.cardNo })
        .then(res => {
          if (res.code === 1000) {
            this.dialogFormVisible = false
            this.$message({
              duration: 1500,
              message: '解绑成功！',
              type: 'success'
            })
            this.$emit('success')
          }
        })
    },
    handleClose() {}
  }
}
</script>

<style scoped lang="scss">
.unBind-bank {
  .u-b-dialog {
    /deep/ {
      .el-dialog {
        border-radius: 9px;
      }
      .el-dialog__header {
        display: none;
      }
      .el-dialog__body {
        text-align: center;
        padding: 56px 25px 16px;
      }
      .el-dialog__footer {
        padding: 16px 0 32px 0;
      }
    }
    .u-b-footer {
      .el-button {
        width: 104px;
        height: 32px;
        margin-left: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
