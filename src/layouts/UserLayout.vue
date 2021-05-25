<template>
  <div>
    <q-layout view="hHh LpR fff" class="user-container">
      <q-header class="bg-white text-primary shadow-1">
        <q-toolbar>
          <q-toolbar-title> Tachyon</q-toolbar-title>
          <div>Powered by Quasar</div>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page>
          <div class="q-mt-lg absolute-center center-card">
            <q-card class="q-gutter-y-sm">
              <q-card-section class="bg-blue platform-introduce">
                <div class="q-pa-lg">
                  <div class="text-h5">Tachyon Platform</div>
                  <div class="text-subtitle-1">协同开发平台</div>
                </div>
              </q-card-section>
              <q-card-section>
                <router-view/>
              </q-card-section>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
name: "UserLayout"
}
</script>

<style scoped>
.user-container {
  background-image: url("https://cdn.jsdelivr.net/gh/syameimarukibou/imagebox/img/background-4876990_1920.jpg");
}
.center-card {
}
</style>
