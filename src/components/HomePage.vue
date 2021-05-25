<template>
    <div class="q-mt-md row q-px-sm">
      <!-- 左侧板块 -->
      <div class="col-8 q-mb-md q-px-sm">
        <!-- 快捷链接卡片 -->
        <q-card class="q-mb-md">
          <q-card-section class="bg-white">
            <q-avatar
              size="lg"
              class="q-mr-md"
              color="blue-1"
              icon="apps"
            ></q-avatar>
            <a class="text-h6">快捷链接</a>
          </q-card-section>
          <q-separator />
          <q-card-section class="row q-pa-sm">
            <!-- 快捷链接项 -->
            <q-card-section style="align-items: center" class="column q-mx-md" v-for="(link, index) in links" :key="index">
              <q-btn class="q-my-sm" round :ripple="true">
              <q-avatar size="120px">
                <img :src="link.avatar">
              </q-avatar>
              </q-btn>
              <span>{{link.name}}</span>
            </q-card-section>
          </q-card-section>
        </q-card>

        <!-- 项目进度卡片 -->
        <q-card class="q-mb-md">
          <q-card-section class="bg-white">
            <q-avatar
                size="lg"
                class="q-mr-md"
                color="blue-1"
                icon="apps"
            ></q-avatar>
            <a class="text-h6">项目进度</a>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-my-md">
            <v-sheet tile height="600px">
              <v-calendar
                  :events="events"
              >

              </v-calendar>
            </v-sheet>
          </q-card-section>

        </q-card>

      </div>
      <!-- 右侧板块 -->
      <div class="col-4 q-mb-md q-px-sm">

        <!-- 今日日程总和 -->
        <q-card class="q-mb-md">
          <q-card-section class="bg-white">
            <q-avatar
                size="lg"
                class="q-mr-md"
                color="blue-1"
                icon="apps"
            ></q-avatar>
            <a class="text-h6">今日日程</a>
          </q-card-section>
          <q-separator />
        </q-card>

        <!-- 成员状态卡片 -->
        <q-card class="q-mb-md">
          <q-card-section class="bg-white">
            <q-avatar
                size="lg"
                class="q-mr-md"
                color="blue-1"
                icon="apps"
            ></q-avatar>
            <a class="text-h6">成员状态</a>
          </q-card-section>
          <q-separator />
          <q-list>
            <q-item
                class="q-mb-sm"
                v-for="(item, index) in members"
                :key="index"
            >
              <q-item-section avatar>
                <q-avatar>
                  <q-img :src="item.avatar" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.nickname }}</q-item-label>
                <q-item-label caption lines="1">{{
                    item.position
                  }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-chip
                    v-if="item.state === 1"
                    outline
                    square
                    color="blue"
                    class="bg-blue-1"
                    label="在线"
                    style="width: 56px"
                />
                <q-chip
                    v-else
                    outline
                    square
                    color="red"
                    class="bg-red-1"
                    label="离线"
                    style="width: 56px"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
        <!-- 成员动态卡片 -->
        <q-card class="q-mb-md">
          <q-card-section class="bg-white">
            <q-avatar
                size="lg"
                class="q-mr-md"
                color="blue-1"
                icon="apps"
            ></q-avatar>
            <a class="text-h6">成员动态</a>
          </q-card-section>
          <q-separator />
          <q-list>
            <div
                v-for="(movement, index) in movements"
                :key="index"
                class="q-mb-sm"
            >
              <q-item class="q-py-md">
                <q-item-section avatar>
                  <q-avatar>
                    <img alt="" :src="movement.avatar" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="q-mb-xs">
                    <span class="text-weight-bold q-pr-xs">{{
                        movement.name
                      }}</span>
                    <span>{{movement.operation}}</span>
                    <span class="text-primary q-pl-xs">{{
                        movement.title
                      }}</span>
                  </q-item-label>
                  <q-item-label class="text-grey-6" lines="1">
                    {{ movement.date }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset="" />
            </div>
          </q-list>
        </q-card>
      </div>
    </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {
    user: Object,
    group: Object,
    members: Array
  },
  data() {
    return {
      links: [
        {
          name: '项目代码库',
          type: 'github',
          avatar: 'https://cdn.jsdelivr.net/gh/syameimarukibou/imagebox/img/github2.webp',
          src: ''
        },
        {
          name: '项目容器',
          type: 'qcloud',
          avatar: 'https://cdn.jsdelivr.net/gh/syameimarukibou/imagebox/img/qcloud.webp',
          src: ''
        },
        {
          name: 'CI/CD平台',
          type: 'tarvis',
          avatar: 'https://cdn.jsdelivr.net/gh/syameimarukibou/imagebox/img/tarvis-cli.png',
          src: ''
        }
      ],
      movements: [
        {
          name: 'Linus Torvalds',
          operation: '发布了通知',
          avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
          title: '修改了api文档',
          date: '2021-04-20 16:40'
        },
        {
          name: 'Yamada Suzuki',
          operation: '上传了文件',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          title: 'img_source.zip',
          date: '2021-04-20 13:30'
        },
        {
          name: 'Linus Torvalds',
          operation: '发布了通知',
          avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
          title: '修改了api文档',
          date: '2021-04-20 16:40'
        },
        {
          name: 'Yamada Suzuki',
          operation: '上传了文件',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          title: 'img_source.zip',
          date: '2021-04-20 13:30'
        }
      ],

      events: [
        {
          name: '第一次迭代',
          start: '2021-04-12',
          end: '2021-04-21',
          color: 'blue',
          timed: false
        },
        {
          name: '检查点：调通基本功能',
          start: '2021-04-22',
          end: '2021-04-22',
          color: 'red',
          timed: false
        },
        {
          name: '检查点：完成系统结构',
          start: '2021-04-20',
          end: '2021-04-20',
          color: 'red',
          timed: false
        },
        {
          name: '第二次迭代',
          start: '2021-04-24',
          end: '2021-04-30',
          color: 'blue',
          timed: false
        },
      ]

    }
  }
}
</script>

<style scoped>

</style>
