<template>
  <q-form @submit="onSubmit" @reset="onReset" ref="loginForm">
    <q-tabs
        v-model="tab"
        active-color="primary"
        indicator-color="primary"
        :breakpoint="0"
        narrow-indicator
        class="text-black"
    >
      <q-tab name="mails" no-caps label="用户名密码登录"/>
      <q-tab name="alarms" no-caps label="手机登录"/>
    </q-tabs>
    <div class="q-gutter-y-sm">
      <q-tab-panels v-model="tab" class="text-center">
        <q-tab-panel name="mails" class="q-col-gutter-y-sm">
          <div class="row">
            <div class="col">
              <q-input
                  rounded
                  outlined
                  clearable
                  clear-icon="cancel"
                  v-model="username"
                  debounce="700"
                  label="用户名/邮箱"
                  :rules="[
                      (val) => (val && val.length > 0) || '请输入用户名'
                    ]"
                  lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="event"/>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                  rounded
                  outlined
                  clearable
                  clear-icon="cancel"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="password"
                  debounce="700"
                  label="密码"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || '请输入密码']"
              >
                <template v-slot:prepend>
                  <q-icon name="event"/>
                </template>
                <template v-slot:append>
                  <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="alarms" class="q-col-gutter-y-sm">
          <div class="row">
            <div class="col">
              <q-input
                  rounded
                  outlined
                  clearable
                  clear-icon="cancel"
                  v-model="telephone"
                  debounce="700"
                  label="手机号"
                  lazy-rules
                  :rules="[
                      (val) => (val && val.length > 0) || '请输入手机号'
                    ]"
              >
                <template v-slot:prepend>
                  <q-icon name="event"/>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  v-model="password"
                  dense
                  debounce="700"
                  label="验证码"
                  lazy-rules
                  square
                  :rules="[(val) => (val && val.length > 0) || '请输入验证码']"
              >
                <template v-slot:prepend>
                  <q-icon name="event"/>
                </template>
                <template v-slot:after>
                  <q-btn
                      unelevated
                      color="secondary"
                      class="no-border-radius"
                      label="获取验证码"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <div class="q-mx-md">
        <div class="row">
          <div class="col text-left">
            <q-checkbox v-model="autoLogin" label="自动登录"/>
          </div>
          <div class="col text-right">
            <q-btn no-caps color="primary" flat label="忘记密码"/>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-btn
                no-caps
                dense
                unelevated
                label="登录"
                size="17px"
                color="primary q-mt-sm"
                class="full-width no-border-radius"
                type="submit"
                :loading="loginLogin"
            >
              <template v-slot:loading>
                <q-spinner-ios class="on-left"/>
                {{ 登录 }} ...
              </template>
            </q-btn>
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col text-right">
            <q-btn
                to="/user/register"
                color="primary"
                flat
                no-caps
                label="注册"
            />
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      tab: 'mails',
      username: null,
      password: null,
      telephone: null,
      accept: false,
      isPwd: true,
      autoLogin: true,
      card: false,
      loginLogin: false,
      currentLogin: {
        login: false,
        obj: {}
      }
    }
  },
  methods: {
    onSubmit() {
      this.loginLogin = true
      this.$http({
        url: this.$http.adornUrl('/login'),
        method: 'post',
        data: {username: this.username, password: this.password}
      }).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data)
          this.$q.notify({message: '登录成功', position: 'top'})
          window.sessionStorage.setItem('token', data.user.token)
          window.sessionStorage.setItem('user', data.user.username)
          // window.sessionStorage.setItem('type', data.user.role)
          window.sessionStorage.setItem('loginId', data.user.id)
          window.sessionStorage.setItem('resetTime', new Date().getTime())
          setTimeout(() => {
            this.$router.push('/admin')
          },1000)
        } else {
          this.$q.notify({type: 'negative', message: '登录异常：' + data.msg , position: 'top'})
        }
      })
      this.loginLogin = false
    },
    onReset() {
      this.username = null;
      this.password = null;
    }
  }
}
</script>

<style scoped>
.platform-introduce {
}

</style>
