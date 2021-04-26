<template>
    <q-page class="flex">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" style="height: 800px" container>
        <q-header elevated>
          <q-toolbar>
            <q-btn round flat>
              <q-avatar>
                <img :src="currentConversation.avatar">
              </q-avatar>
            </q-btn>

            <q-toolbar-title class="q-subtitle-1 q-pl-md">
              {{ currentConversation.name }}
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
          <q-toolbar class="bg-grey-2">
            <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search" placeholder="搜索消息">
              <template slot="prepend">
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>

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
                    {{ group.lastMessage }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>
                    {{ group.updateTime }}
                  </q-item-label>
                  <q-icon name="keyboard_arrow_down" />
                </q-item-section>

              </q-item>
              <!-- 组员私聊 -->
              <q-item
                  v-for="(member, index) in members"
                  :key="member.id"
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
                    {{ member.name }}
                  </q-item-label>
                  <q-item-label class="conversation__summary" caption>
                    <q-icon name="check" v-if="member.isRead"/>
                    {{ member.lastMessage }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>
                    {{ member.updateTime }}
                  </q-item-label>
                  <q-icon name="keyboard_arrow_down" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>

        </q-drawer>

        <!-- 聊天主界面 -->
        <q-page-container class="bg-grey-2">
          <q-page class="q-pa-md">
            <div v-for="(message, index) in messages" :key="index">
              <q-chat-message
                  :name="message.name"
                  :avatar="message.avatar"
                  :text="[message.message]"
                  :stamp="message.time"
                  :sent="message.id === 1"
              />
            </div>
          </q-page>
        </q-page-container>

        <q-footer>
          <q-toolbar class="bg-grey-3 text-black row">
            <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
            <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
            <q-btn round flat icon="mic" />
          </q-toolbar>
        </q-footer>

      </q-layout>
    </q-page>
</template>

<script>
export default {
  name: "ChatPage",

  data() {
    return {
      currentConversationIndex: 0,
      left: true,
      search: '',
      message: '',
      group: {
        name: "小组1",
        avatar: "https://syameimarukibou.github.io/img/logo.png",
        lastMessage: 'see you later',
        updateTime: '16:00',
        isRead: true
      },
      messages: [
        {
          id: 1,
          name: 'Kibou',
          avatar: 'https://syameimarukibou.github.io/img/logo.png',
          time: '15:00',
          message: '我会尽快处理'
        },
        {
          id: 2,
          name: 'Linus Torvalds',
          avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
          time: '15:01',
          message: '好的'
        },
        {
          id: 3,
          name: 'Yamada Suzuki',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          time: '15:02',
          message: 'OK👍'
        },
      ],
      members: [
        {
          id: 2,
          name: 'Linus Torvalds',
          avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
          state: 'online',
          lastMessage: 'see you later',
          updateTime: '16:00',
          isRead: true
        },
        {
          id: 3,
          name: 'Yamada Suzuki',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          state: 'online',
          lastMessage: 'see you later',
          updateTime: '16:00',
          isRead: true
        }
      ]
    }
  },
  sendMsg() {
    // 向父组件（的io-client）传值发送消息
    this.$emit()
  },

  computed: {
    currentConversation() {
      if (this.currentConversationIndex === -1)
        return this.group
      return this.members[this.currentConversationIndex]
    },
    style () {
      return {
        height: this.$q.screen.height + 'px'
      }
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
