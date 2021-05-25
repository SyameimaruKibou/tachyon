<template>
  <div class="q-mt-md">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" style="height: 800px" container>
        <q-header elevated>
          <q-toolbar>
            <q-btn round flat>
              <q-avatar>
                <img :src="currentConversation.avatar">
              </q-avatar>
            </q-btn>

            <q-toolbar-title class="q-subtitle-1 q-pl-md">
              {{ currentConversation.nickname || currentConversation.name }}
            </q-toolbar-title>

            <q-btn round flat icon="search" />
            <q-btn round flat>
              <q-icon name="attachment" class="rotate-135" />
            </q-btn>
            <q-btn round flat icon="more_vert">
              <q-menu auto-close :offset="[110, 0]">
                <q-list style="min-width: 150px">
                  <q-item clickable>
                    <q-item-section>查看历史记录</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>静默提醒</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>清除消息</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-toolbar>

        </q-header>

        <!-- 侧栏聊天列表 -->
        <q-drawer
            v-model="left"
            side="left"
            show-if-above
            bordered
            :breakpoint="700"
        >

          <q-scroll-area style="height: calc(100% - 100px)">
            <q-list>
              <!-- 小组群聊 -->
               <q-item
                  clickable
                  @click="currentConversationIndex = -1"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="group.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    {{ group.name }}
                  </q-item-label>
                  <q-item-label class="conversation__summary" caption>
                    <q-icon name="check" v-if="group.isRead"/>
                    {{ lastGroupMsg || '' }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>
                    {{ lastGroupTime || '' }}
                  </q-item-label>
                  <q-icon name="keyboard_arrow_down" />
                </q-item-section>

              </q-item>

              <!-- 组员私聊 -->
              <q-item
                  v-for="(member, index) in friends"
                  :key="index"
                  clickable
                  @click="currentConversationIndex = index"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="member.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    {{ member.nickname }}
                  </q-item-label>
                  <q-item-label class="conversation__summary" caption>
                    <q-icon name="check" v-if="member.isRead"/>
                    {{ lastMsgs[index] || '' }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>
                    {{ lastTimes[index] || '' }}
                  </q-item-label>
                  <q-icon name="keyboard_arrow_down" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>

        </q-drawer>

        <!-- 聊天主界面(主内容) -->
        <q-page-container class="bg-grey-2">
          <q-page class="q-pa-md">
            <div v-for="(message, index) in currentMsgBox" :key="index">
              <q-chat-message
                  :name="members[hashMember[message.userId]].nickname"
                  :avatar="members[hashMember[message.userId]].avatar"
                  :text="[message.msg]"
                  :stamp="message.time"
                  :sent="message.userId !== user.id"
              />
            </div>
          </q-page>
        </q-page-container>

        <q-footer>
          <q-toolbar class="bg-grey-3 text-black row">
            <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
            <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
            <q-btn round flat icon="mic" @click="send"/>
          </q-toolbar>
        </q-footer>
      </q-layout>
  </div>
</template>

<script>

export default {
  name: "ChatPage",
  data() {
    return {
      currentConversationIndex: 0,
      left: true,
      // 除去自己的表现层
      nowTime: new Date(),
      friends: [],
      search: '',
      message: '',
      hashMember: [],
      hashFriend: [],
      groupMsgNum: 0,
      totMsgNum: 0,
      memMsgNums: [],
      // 所有消息的容器
      groupMsgList: [],
      msgList: [[]],
      lastMsgs: [],
      lastGroupMsg: '',
      lastTimes: [],
      lastGroupTime: '',

    }
  },
  // 监听事件列表
  sockets: {
    // 监听单聊事件
    p2pchat: function (data) {
      console.log(data)
      // 向表示层的数据中压入数据
      this.msgList[this.hashFriend[data.userId]].push(data)
      console.log(this.msgList)
    },
    groupchat: function (data) {
      console.log(data)
      // 向表示层的数据中压入数据，如果是自己发送的消息那么不发送
      if(data.userId !== this.user.id) this.groupMsgList.push(data)
      console.log(this.groupMsgList)
    }
  },
  props: {
    // 从父组件获取的基本信息
    user: Object,
    group: Object,
    members: Array
  },
  created() {
  },

  mounted() {

  },
  watch: {
    members: function() {
      this.initializeMsg()
    }
  },
  computed: {
    currentConversation() {
      if (this.currentConversationIndex === -1)
        return this.group
      return this.friends[this.currentConversationIndex]
    },
    style () {
      return {
        height: this.$q.screen.height + 'px'
      }
    },
    lastUpdateTime() {
      if (this.currentConversationIndex === -1) {
        if (this.groupMsgNum === 0) return ''
        return this.msgList[0].time
      } else {
        if (this.memMsgNums[this.currentConversationIndex] === 0) return ''
        return this.msgList[this.currentConversationIndex].time
      }
    },
    currentMsgBox() {
      let idx = this.currentConversationIndex
      return idx === -1 ? this.groupMsgList : this.msgList[idx]
    }
  },
  methods: {
    initializeMsg() {
      // 更新friends信息
      this.friends = this.members.filter(function (member)  {
        return member.id != window.sessionStorage.getItem("loginId")
      })
      for (let i = 0; i < this.members.length; i++) {
        this.hashMember[this.members[i].id] = i
      }
      // 创建的映射，并初始化消息容器
      for (let i = 0; i < this.friends.length; i++) {
        //创建 userid -> messageList 的映射
        this.hashFriend[this.friends[i].id] = i
        this.msgList[i] = []
        this.memMsgNums[i] = 0
      }
    },

    send() {
      let idx = this.currentConversationIndex
      if (idx === -1) {
        let data = {userId: this.user.id, msg: this.message.slice(0), to: 0, time: this.codeTime()}
        this.groupMsgList.push(data)
        this.$socket.emit('groupchat',data)
      } else {
        let data = {userId: this.user.id, msg: this.message.slice(0), to: this.friends[idx].id, time: this.codeTime()}
        this.msgList[idx].push(data)
        this.$socket.emit('p2pchat',data)
      }
      this.message = ''
    },
    notifyMsg(message) {
      this.$q.notify({message: message, color: 'purple'})
    },
    getUser(id) {
      return this.friends[this.hashMember[id]]
    },

    codeTime() {
      let now = new Date()
      return "" + now.getHours() + ":" + now.getMinutes();
    }
  }
}
</script>

<style lang="sass" scoped>
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
