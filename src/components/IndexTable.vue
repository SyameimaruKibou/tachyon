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
      <!--  -->
      <q-page>
        <div class="q-mt-md">
          <home-page :user="userInfo" :group="groupInfo" :members="members" v-show="menuIndex === 0"/>
          <InformationPage :user="userInfo" :group="groupInfo" :members="members" v-show="menuIndex === 1"/>
          <project-page v-show="menuIndex === 2"/>
          <chat-page :user="userInfo" :group="groupInfo" :members="members" v-show="menuIndex === 3"/>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import ChatPage from "./ChatPage";
import HomePage from "./HomePage";
import ProjectPage from "./ProjectPage";
import InformationPage from "./InformationPage";

export default {
  name: "IndexTable",
  components: {InformationPage, ProjectPage, HomePage, ChatPage},
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
          label: '通知与任务',
          path: '/tasks',
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
          icon: 'file',
          label: '文件',
          path: '/file',
          separator: false
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
      hash: [],
      userInfo: {
      },
      groupInfo: {
      },
      members: [
        {id: 0,name: '用户加载中...',avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',role: 1, state: 0}
      ]
    }
  },
  // sockets 监听列表
  sockets: {
    connect: function () {
      //this.notifyMsg('connected')
      console.log('connected')
    },
    // 刷新在线用户状态
    users: function (data) {
      this.members.forEach(function (item) {
        if(item.id != window.sessionStorage.getItem("loginId")) item.state = 0
      })
      console.log(data)
      for (let id of data) {
        this.members.forEach(function (item) {
          if (item.id === id) item.state = 1
        })
      }
      console.log(this.members)
    }
  },
  created() {
    this.init()
    this.updateOnlineState()

  },
  mounted() {

  },
  methods: {
    // 切换窗口显示菜单
    switchIndex(index) {
      this.menuIndex = index;
    },
    init() {
      let id = window.sessionStorage.getItem('loginId')
      this.$http({
        url: this.$http.adornUrl('/user/getUserFullInfo'),
        method: 'get',
        params: {id: id}
      }).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data)
          this.userInfo = data.user
          this.groupInfo = data.group
          this.members = data.member
          this.modifyData()
          this.register()
          this.updateOnlineState()
        } else {
          this.$q.notify({type: 'negative', message: '异常:' + data.msg , position: 'top'})
        }
      })
    },
    register() {
      this.$socket.emit('register',{userId: this.userInfo.id, groupId: this.groupInfo.id})
    },
    updateOnlineState() {
      this.$socket.emit('checkOnlineUsers',{id: this.groupInfo.id})
    },
    modifyData() {
      for (let i = 0; i < this.members.length;i++) {
        this.$set(this.members[i], "state", 0)
      }
    }
  }



}
</script>

<style scoped>

</style>
