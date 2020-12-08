<template>
  <div class="message">
    <PersonalHeader text="其他消息" />
    <div v-loading="loading">
      <div v-if="messageData.data.length > 0" class="message-content">
        <div v-for="(mess, index) in messageData.data" :key="index" class="mb-24">
          <div class="text-14">
            {{ mess.title }}
          </div>
          <p>
            {{ mess.content }}
          </p>
        </div>
      </div>
      <div v-else class="message-other">
        暂无消息
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="messageData.pageSize"
        :total="messageData.totalNum"
        class="mt-32 pr-32 flex justify-end"
        @current-change="changePageClick"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心-系统消息模块
 * @author lyh
 * @date 2020-12-08
 */
import PersonalHeader from '@/components/PersonalHeader/index'
export default {
  name: 'OtherMessage',
  components: { PersonalHeader },
  data() {
    return {
      messageData: {
        data: [],
        totalNum: 0,
        totalPage: 1,
        pageSize: 20,
        pageNumber: 1
      },
      loading: false
    }
  },
  created() {
    this.messageList()
  },
  methods: {
    // 个人中心-消息-系统消息
    messageList() {
      this.loading = true
      this.$api.user.messageList({ type: 2 }).then(res => {
        this.loading = false
        if (res.code === 1000) {
          this.messageData = res.data
        }
      })
    },
    changePageClick(e) {
      this.messageData.pageNumber = e
      this.messageList()
    }
  }
}
</script>

<style scoped>
</style>
