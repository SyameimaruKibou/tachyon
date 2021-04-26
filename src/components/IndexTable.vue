<template>
  <q-layout view="hHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            @click="drawer = !drawer"
            icon="menu"
        />

        <q-toolbar-title>
          Tachyon Platform
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- 侧边菜单栏 -->
    <q-drawer
        v-model="drawer"
        show-if-above
        mini-to-overlay

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"

        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <template v-for="(menuItem, index) in menuList">
            <q-item :key="index" @click="switchIndex(index)" clickable :active="index === menuIndex">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <home-page :user="userInfo" v-show="menuIndex === 0"/>
      <chat-page v-show="menuIndex === 3"/>
      <project-page v-show="menuIndex === 2"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import ChatPage from "./ChatPage";
import HomePage from "./HomePage";
import ProjectPage from "./ProjectPage";

export default {
  name: "IndexTable",
  components: {ProjectPage, HomePage, ChatPage},
  data () {
    return {
      drawer: false,
      miniState: true,
      menuIndex: 0,
      menuList: [
        {
          icon: 'dashboard',
          label: '主页',
          path: '/home',
          separator: true
        },
        {
          icon: 'assessment',
          label: '团队信息',
          path: '/routine',
          separator: false
        },
        {
          icon: 'assignment',
          label: '项目进度',
          path: '/schedule',
          separator: false
        },
        {
          icon: 'forum',
          label: '聊天',
          path: '/chat',
          separator: true
        },
        {
          icon: 'settings',
          label: '个人设置',
          separator: false
        },
        {
          icon: 'group',
          label: '团队管理',
          separator: false
        }
      ],
      userInfo: {

      },
      groupInfo: {

      }
    }
  },

  mounted() {
  },
  methods: {
    // 切换窗口显示菜单
    switchIndex(index) {
      this.menuIndex = index;
    },
    /*
    startSocketClient() {
      this.socket = io(process.env.SOCKETIO_URL || "/")
    }

    */

  }



}
</script>

<style scoped>

</style>
