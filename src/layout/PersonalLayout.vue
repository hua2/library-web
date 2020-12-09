<template>
  <div class="personal-layout">
    <MainHeader />
    <div class="p-l-search flex justify-between">
      <el-input v-model="keyWords" placeholder="搜索图片……">
        <el-button slot="append" icon="el-icon-search" @click="searchClick(keyWords)"></el-button>
      </el-input>
      <div class="p-l-attest flex">
        <img src="../assets/img/attest-icon.png" alt="">
        <span v-if="account.authStatus === 3" @click="$router.push('/attest/underReview')">审核中</span>
        <span v-if="account.authStatus === 4" @click="$router.push('/attest/refuseStatus')">已拒绝</span>
        <span v-if="account.authStatus === 0 ||account.authStatus === 2" @click="$router.push('/attest/index')">{{ account.authstatus === 0?'认证供图':'已认证' }}</span>
        <span v-if="account.authStatus === 1" @click="$router.push('/attest/index')">个人已认证</span>
      </div>
    </div>
    <div class="p-l-left flex">
      <div class="p-l-l-nav mr-56">
        <div v-for="(m, mIdx) in menu" :key="'m_' + mIdx" class="p-l-t-first">
          <a
            v-if="checkPermission(m.permission)"
            href="javascript:"
            :class="active === m.link ? 'active' : ''"
            @click="goTO(m.link)"
          >{{ m.title }}</a>
          <template v-if="m.children">
            <template v-for="(c, cIdx) in m.children">
              <div
                v-if="checkPermission(c.permission)"
                :key="'c_' + cIdx"
                class="p-l-t-second"
              >
                <a
                  href="javascript:"
                  :class="active === c.link ? 'active' : ''"
                  @click="goTO(c.link)"
                >{{ c.title }}</a>
                <div v-if="c.children" class="p-l-t-third">
                  <template v-for="(l, lIdx) in c.children">
                    <template v-if="checkPermission(l.permission)">
                      <a
                        v-if="l.badge"
                        :key="'l_b_' + lIdx"
                        class="relative"
                        href="javascript:"
                        :class="active === l.link ? 'active' : ''"
                        @click="goTO(l.link)"
                      >
                        <span> {{ l.title }}</span>
                        <!--                        <span class="p-l-t-badge">-->
                        <!--                          {{ orderCount[l.badge] }}</span>-->
                      </a>
                      <a
                        v-else
                        :key="'l_' + lIdx"
                        href="javascript:"
                        :class="active === l.link ? 'active' : ''"
                        @click="goTO(l.link)"
                      >{{ l.title }}</a>
                    </template>
                  </template>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
      <div class="p-l-form">
        <router-view />
      </div>
    </div>
    <Footer style="margin-top: 92px" />
  </div>
</template>

<script>
/**
 * 个人中心-侧边导航模块
 * @author lyh
 * @date 2020-11-19
 */
import Footer from '@/components/Footer/index'
import MainHeader from '@/components/MainHeader/index'

export default {
  name: 'PersonalLayout',
  components: { MainHeader, Footer },
  data() {
    return {
      keyWords: '',
      active: this.$route.path,
      menu: require('../assets/data/personal_menu.json') || []
    }
  },
  computed: {
    account() {
      return this.$store.state.account.account
    }
  },
  methods: {
    checkPermission(permission) {
      console.log('permission', permission)
      if (permission && permission instanceof Array && permission.length > 0) {
        const roles = ['user']
        if (this.account.authStatus === 1) {
          roles.push('authenticator')
        }
        const permissionRoles = permission

        return roles.some(role => {
          return permissionRoles.includes(role)
        })
      } else {
        return false
      }
    },
    goTO(link) {
      if (!link || link === '') {
        return
      }
      this.active = link
      this.$router.push(link)
    },
    searchClick(word) {
      this.$router.push({
        path: '/home/display',
        query: { word: word }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.personal-layout {
  min-width: 1144px;
  .p-l-search{
    width: 1144px;
    margin: 24px auto;
    .el-input{
      width: 902px;
    }
    .p-l-attest{
      width: 136px;
      height: 40px;
      color: #fff;
      background: #D7262E;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      cursor: pointer;
      img{
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
    }
  }
  .p-l-left {
    width: 1144px;
    margin: 32px auto 0 auto;
    .p-l-l-nav {
      width: 184px;
      height: fit-content;
      padding: 30px 0 0 49px;
      border: 1px solid rgba(241, 242, 246, 1);
      a {
        display: block;
        padding-bottom: 16px;
      }
      .p-l-t-first {
        margin-bottom: 16px;
        a {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          height: 38px;
        }
      }
      .p-l-t-second {
        a {
          font-size: 14px;
          color: #1a1a1a;
          font-weight: 400;
          height: 36px;
        }
      }
      .p-l-t-third {
        a {
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          height: 36px;
        }
      }
      .p-l-t-badge {
        width: fit-content;
        border: 1px solid #1a1a1a;
        border-radius: 10px;
        display: inline-block;
        font-size: 12px;
        height: 18px;
        line-height: 16px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
        margin-left: 8px;
      }
    }
    .active {
      position: relative;
      color: #d7262e !important;
      &:before {
        content: "";
        position: absolute;
        left: -48px;
        top: 4px;
        width: 3px;
        height: 16px;
        background: #d7262e;
        display: block;
      }
      .p-l-t-badge {
        color: #ffffff;
        background: rgba(215, 38, 46, 1);
        border: 1px solid rgba(215, 38, 46, 1);
      }
    }
    .p-l-form {
      width: 904px;
      height: 932px;
    }
  }
}
</style>
