<template>
  <div class="w-full">
    <PersonalHeader text="个人账户" />
    <div class="bank-card p-16">
      <el-button
        v-if="bankData.length === 0"
        size="mini"
        type="primary"
        plain
        @click="$router.push('/finance/addBank')"
      >+ 新增银行卡</el-button>
      <div v-else v-loading="loading">
        <div class="flex flex-wrap">
          <div
            v-for="(card, index) in bankData"
            :key="index"
            class="b-c-card relative"
          >
            <div class="flex pt-16 pl-16">
              <img :src="card.cardPic" alt="" />
              <div class="b-c-num">
                ****
                {{
                  card.cardNo && card.cardNo.length > 4
                    ? card.cardNo.substring(
                      card.cardNo.length - 4,
                      card.cardNo.length
                    )
                    : ""
                }}
              </div>
            </div>
            <div class="b-c-title flex flex-col">
              <div class="text-14">{{ card.openBankName }}</div>
              <p class="text-12">{{ card.cardType }}</p>
            </div>
            <div class="b-c-limit text-right text-12">
              <a
                href="javascript:"
                @click="unBindBankClick(card.cardNo)"
              >解绑</a>
            </div>
          </div>
          <UnBindBank ref="unBindBankDialog" @success="queryBankCard" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 财务管理(银行卡管理)模块
 * @author lyh
 * @date 2021-01-19
 */
import PersonalHeader from '@/components/PersonalHeader/index'
import UnBindBank from '@/views/personal/finance/dialog/UnBindBank'
export default {
  name: 'BankCard',
  components: { UnBindBank, PersonalHeader },
  data() {
    return {
      bankData: [],
      loading: false
    }
  },
  created() {
    this.queryBankCard()
  },
  methods: {
    unBindBankClick(cardNo) {
      this.$refs.unBindBankDialog.dialogFormVisible = true
      this.$refs.unBindBankDialog.cardNo = cardNo
    },
    // 查询银行卡列表
    queryBankCard() {
      this.loading = true
      this.$api.user.queryBankCard().then(res => {
        this.loading = false
        if (res.code === 1000) {
          this.bankData = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bank-card {
  width: 100%;
  margin: 16px auto 0;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 9px;
    .b-c-card {
      color: #ffffff;
      width: 280px;
      height: 148px;
      border-radius: 8px;
      background: url("../../../assets/img/finance-bg-one.png");
      background-size: 100% 100%;
      &:hover {
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
        .b-c-limit {
          a {
            display: block;
          }
        }
      }
      img {
        width: 126px;
        height: 36px;
      }
      .b-c-title {
        width: fit-content;
        margin-left: 16px;
        margin-top: 8px;
        font-weight: 500;
      }
      .b-c-num {
        height: 32px;
        font-size: 16px;
        margin-left: 48px;
        font-weight: bold;
      }
      .b-c-limit {
        span {
          position: absolute;
          right: 16px;
          bottom: 16px;
        }
        a {
          display: none;
          position: absolute;
          left: 16px;
          bottom: 16px;
          text-decoration: underline;
        }
      }
  }
}
</style>
