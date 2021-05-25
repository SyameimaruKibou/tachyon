<template>
  <div class="q-pa-lg">
        <q-form @submit="onSubmit">
          <div class="q-gutter-y-sm">
            <div class="row">
              <div class="col">
                <q-input
                    rounded
                    outlined
                    clearable
                    clear-icon="cancel"
                    v-model="username"
                    debounce="700"
                    label="用户名"
                    maxlength="128"
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
                    v-model="nickname"
                    debounce="700"
                    label="昵称"
                    maxlength="128"
                    :rules="[
                      (val) => (val && val.length > 0) || '请输入昵称'
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
                    maxlength="32"
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
            <div class="row">
              <div class="col">
                <q-input
                    rounded
                    outlined
                    clearable
                    clear-icon="cancel"
                    :type="isPwd ? 'password' : 'text'"
                    v-model="confirmPassword"
                    debounce="700"
                    maxlength="32"
                    label="确认密码"
                    lazy-rules
                    :rules="[
                        (val) => (val && val.length > 0) || '请输入确认密码',
                        (val) => passwordValida || '两次密码不一致'
                    ]"
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
            <div class="row">
              <div class="col">
                <q-input
                    rounded
                    outlined
                    clearable
                    clear-icon="cancel"
                    type="tel"
                    v-model="phone"
                    debounce="700"
                    maxlength="11"
                    label="手机号"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || '请输入手机号']"
                >
                  <template v-slot:prepend>
                    <q-icon name="event"/>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <q-toggle
                  v-model="useGroupCode"
                  color="primary"
                  :label="groupToggleLabel"
              ></q-toggle>
            </div>
            <div class="row" v-if="useGroupCode">
              <div class="col">
                <q-input
                    outlined
                    clearable
                    clear-icon="cancel"
                    v-model="groupCode"
                    debounce="700"
                    maxlength="20"
                    label="团队邀请码"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || '请输入团队邀请码']"
                >
                  <template v-slot:prepend>
                    <q-icon name="event"/>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row" v-if="!useGroupCode">
              <div class="col">
                <q-input
                    outlined
                    clearable
                    clear-icon="cancel"
                    v-model="groupName"
                    debounce="700"
                    maxlength="100"
                    label="新团队名称"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || '请输入团队名称']"
                >
                  <template v-slot:prepend>
                    <q-icon name="event"/>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="q-mx-md">
              <div class="row">
                <div class="col text-left">
                  <q-btn
                      no-caps
                      dense
                      unelevated
                      label="注册"
                      size="17px"
                      color="primary"
                      class="full-width no-border-radius"
                      type="submit"
                      :loading="loading"
                  >
                    <template v-slot:loading>
                      <q-spinner-hourglass class="on-left"/>
                      {{ 注册 }} ...
                    </template>
                  </q-btn>
                </div>
                <div class="col text-right">
                  <q-btn
                      to="/user/login"
                      color="primary"
                      flat
                      no-caps
                      label="使用已有账号登录"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: null,
      nickname: null,
      password: null,
      confirmPassword: null,
      groupCode: null,
      groupName: null,
      phone: null,
      useGroupCode: true,
      accept: false,
      isPwd: true,
      loading: false,
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/user/register'),
        method: 'post',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password,
          telephone: this.phone,
          useGroupCode: this.useGroupCode,
          groupName: this.groupName,
          groupCode: this.groupCode,
        }
      }).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data)
          this.$q.notify({message: '注册成功', position: 'top'})
          setTimeout(() => {
            this.$router.push('/user/login')
          },1000)
        } else {
          this.$q.notify({type: 'negative', message: '注册异常：' + data.msg , position: 'top'})
        }
      })
      this.loading = false
    },
    /*
    uploadAvatar() {
      this.$http({
        url: "https://sm.ms/api/v2/upload",
        method: 'post',
        headers: {name: 'Authorization', value: 'PfbjhsOYxLfRGkIYKO9Y7ncgcu8hLXC2'},
        data: this.avatarFile
      }).then(({data}) => {
        console.log(data)
        this.userAvatar=data.data.url
      })
    }

     */
  },
  computed: {
    passwordValida: function () {
      return this.password === this.confirmPassword
    },
    groupToggleLabel: function () {
      return this.useGroupCode ? '加入旧团队' : '创建新团队'
    }
  }
}
</script>

<style scoped>

</style>
