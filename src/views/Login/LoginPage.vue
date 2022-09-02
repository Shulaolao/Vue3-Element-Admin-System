<template>
  <div class="login-container">
    <aside>
      <el-carousel height="100%" direction="horizontal" :initial-index="0" :autoplay="true" :interval="5000"
        :loop="true" trigger="hover" indicator-position="none" arrow="hover" pause-on-hover>
        <el-carousel-item v-for="(img, index) in imgList" :key="index">
          <img :src="img" alt="">
        </el-carousel-item>
      </el-carousel>
    </aside>
    <section>
      <el-form :model="loginForm" ref="formRef" :rules="formRules" label-width="100px" :inline="false" size="default">
        <el-form-item :label="$t('login.account')">
          <el-input type="text" v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.password')">
          <el-input type="password" :show-password='true' v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="Login(formRef)">{{ $t('login.login') }}</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import imgList from '@/assets/images/LoginBg/index.js'
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'loginPage',
  setup () {
    const { t } = useI18n()
    const formRef = ref(null)
    const loginForm = reactive({
      account: 'superAdmin',
      password: '123456'
    })

    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const valAccount = (rule, value, callback) => {
      if (value !== 'superAdmin' || value !== 'commonAdmin') {
        return callback(new Error(t('login.accountText') + 'superAdmin or commonAdmin'))
      } else {
        callback()
      }
    }
    const valPassword = (rule, value, callback) => {
      if (value !== 123456) {
        return callback(new Error('superAdmin, commonAdmin' + t('login.') + '123456'))
      } else {
        callback()
      }
    }
    const formRules = reactive({
      account: [
        { validator: valAccount, required: true, trigger: 'blur' }
      ],
      password: [
        { validator: valPassword, required: true, trigger: 'blur' }
      ]
    })

    const loading = ref(false)

    const Login = (formEl) => {
      if (!formEl) return
      formEl.validate(async (valid) => {
        if (valid) {
          loading.value = true
          store.dispatch('user/login', loginForm).then(() => {
            const pushPath = !route.redirectedFrom ? '/WorkTable' : route.redirectedFrom.path
            router.push({ path: pushPath })
            loading.value = false
          }).catch(() => {
            console.log('login catch error')
            loading.value = false
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return {
      imgList,
      loginForm,
      formRef,
      formRules,
      Login,
      loading
    }
  }
}
</script>

<style lang='scss' scoped>
.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;

  aside {
    width: 40vw;
    height: 100vh;

    .el-carousel {
      height: 100%;
      width: 100%;
    }
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60vw;
    height: 100%;

    .el-form {
      width: 320px;
      height: 300px;
      padding: 20px 20px 20px 0;

      .el-form-item:deep(.el-form-item__content) {
        justify-content: center;
      }
    }
  }
}
</style>
