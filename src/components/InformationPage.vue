<template>
  <div class="row q-mt-md q-px-md">
    <div class="col-9 q-mb-md q-px-sm">
    <q-card class="q-mb-md">
      <q-card-section class="bg-white">
        <q-avatar
            size="lg"
            class="q-mr-md"
            color="blue-1"
            icon="apps"
        ></q-avatar>
        <a class="text-h6">任务列表</a>
      </q-card-section>
      <q-separator/>
      <div class="q-mt-sm q-px-sm">
        <q-scroll-area
            horizontal
            :bar-style="{borderRadius: '9px', backgroundColor: '#027be3'}"
            style="height: 500px; min-width: 600px">
          <!-- 包括五种任务视图 -->
          <div class="row no-wrap q-gutter-md">
            <q-card class="mission-list" bordered>
              <q-card-section class="row bg-orange-1">
                <q-icon
                    class="q-mr-sm text-primary"
                    size="sm"
                    name="watch_later"/>
                <div class="subtitle-1">待接收</div>
              </q-card-section>
              <q-separator/>
              <q-card-section class="q-pa-sm">
                <div class="q-px-sm">
                  <q-scroll-area
                      class="q-pr-sm"
                      :bar-style="{borderRadius: '9px', backgroundColor: '#027be3'}"
                      style="height: 400px; max-width: 300px">
                    <q-card class="mission-card q-mt-sm"
                            v-for="(mission,index) in createdMissions"
                            :key="index"
                            bordered>
                      <q-item class="column q-pa-sm">
                        <q-item-section>
                          <q-item-label>{{ mission.title }}</q-item-label>
                          <q-item-label caption>{{ mission.content }}</q-item-label>
                        </q-item-section>
                        <div class="row q-mt-md justify-between">
                          <div class="row">
                            <q-avatar size="xs">
                              <img :src="members[hashMember[mission.bossId]].avatar">
                            </q-avatar>
                            <div>{{ members[hashMember[mission.bossId]].nickname }}</div>
                          </div>
                          <div class="row">
                            <q-icon
                                class="q-mr-xs"
                                size="xs"
                                name="alarm"/>
                            <div class="subtitle-2">{{ mission.createTime }}</div>
                          </div>
                        </div>
                      </q-item>
                    </q-card>
                  </q-scroll-area>
                </div>
              </q-card-section>
            </q-card>
            <q-card class="mission-list" bordered>
              <q-card-section class="row bg-blue-1">
                <q-icon
                    class="q-mr-sm text-primary"
                    size="sm"
                    name="autorenew"/>
                <div class="subtitle-1">进行中</div>
              </q-card-section>
              <q-separator/>
              <q-card-section class="q-pa-sm">
                <div class="q-px-sm">
                  <q-scroll-area
                      class="q-pr-sm"
                      :bar-style="{borderRadius: '9px', backgroundColor: '#027be3'}"
                      style="height: 400px; max-width: 300px">
                    <q-card class="mission-card q-mt-sm"
                            v-for="(mission,index) in acceptedMissions"
                            :key="index"
                            bordered>
                      <q-item class="column q-pa-sm">
                        <q-item-section>
                          <q-item-label>{{ mission.title }}</q-item-label>
                          <q-item-label caption>{{ mission.content }}</q-item-label>
                        </q-item-section>
                        <div class="row q-mt-md justify-between">
                          <div class="row">
                            <q-avatar size="xs">
                              <img :src="members[hashMember[mission.bossId]].avatar">
                            </q-avatar>
                            <div>{{ members[hashMember[mission.bossId]].nickname }}</div>
                          </div>
                          <div class="row">
                            <q-icon
                                class="q-mr-xs"
                                size="xs"
                                name="alarm"/>
                            <div class="subtitle-2">{{ mission.createTime }}</div>
                          </div>
                        </div>
                      </q-item>
                    </q-card>
                  </q-scroll-area>
                </div>
              </q-card-section>
            </q-card>
            <q-card class="mission-list" bordered>
              <q-card-section class="row bg-cyan-1">
                <q-icon
                    class="q-mr-sm text-primary"
                    size="sm"
                    name="check_circle"/>
                <div class="subtitle-1">已完成</div>
              </q-card-section>
              <q-separator/>
              <q-card-section class="q-pa-sm">
                <div class="q-px-sm">
                  <q-scroll-area
                      class="q-pr-sm"
                      :bar-style="{borderRadius: '9px', backgroundColor: '#027be3'}"
                      style="height: 400px; max-width: 300px">
                    <q-card class="mission-card q-mt-sm"
                            v-for="(mission,index) in doneMissions"
                            :key="index"
                            bordered>
                      <q-item class="column q-pa-sm">
                        <q-item-section>
                          <q-item-label>{{ mission.title }}</q-item-label>
                          <q-item-label caption>{{ mission.content }}</q-item-label>
                        </q-item-section>
                        <div class="row q-mt-md justify-between">
                          <div class="row">
                            <q-avatar size="xs">
                              <img :src="members[hashMember[mission.bossId]].avatar">
                            </q-avatar>
                            <div>{{ members[hashMember[mission.bossId]].nickname }}</div>
                          </div>
                          <div class="row">
                            <q-icon
                                class="q-mr-xs"
                                size="xs"
                                name="alarm"/>
                            <div class="subtitle-2">{{ mission.createTime }}</div>
                          </div>
                        </div>
                      </q-item>
                    </q-card>
                  </q-scroll-area>
                </div>
              </q-card-section>
            </q-card>
            <q-card class="mission-list" bordered>
              <q-card-section class="row bg-green-1">
                <q-icon
                    class="q-mr-sm text-primary"
                    size="sm"
                    name="done_all"/>
                <div class="subtitle-1">已审核</div>
              </q-card-section>
              <q-separator/>
              <q-card-section class="q-pa-sm">
                <div class="q-px-sm">
                  <q-scroll-area
                      class="q-pr-sm"
                      :bar-style="{borderRadius: '9px', backgroundColor: '#027be3'}"
                      style="height: 400px; max-width: 300px">
                    <q-card class="mission-card q-mt-sm"
                            v-for="(mission,index) in checkedMissions"
                            :key="index"
                            bordered>
                      <q-item class="column q-pa-sm">
                        <q-item-section>
                          <q-item-label>{{ mission.title }}</q-item-label>
                          <q-item-label caption>{{ mission.content }}</q-item-label>
                        </q-item-section>
                        <div class="row q-mt-md justify-between">
                          <div class="row">
                            <q-avatar size="xs">
                              <img :src="members[hashMember[mission.bossId]].avatar">
                            </q-avatar>
                            <div>{{ members[hashMember[mission.bossId]].nickname }}</div>
                          </div>
                          <div class="row">
                            <q-icon
                                class="q-mr-xs"
                                size="xs"
                                name="alarm"/>
                            <div class="subtitle-2">{{ mission.createTime }}</div>
                          </div>
                        </div>
                      </q-item>
                    </q-card>
                  </q-scroll-area>
                </div>
              </q-card-section>
            </q-card>
            <q-card class="mission-list" bordered>
              <q-card-section class="row bg-grey-1">
                <q-icon
                    class="q-mr-sm text-primary"
                    size="sm"
                    name="done_all"/>
                <div class="subtitle-1">已取消</div>
              </q-card-section>
              <q-separator/>
              <q-card-section class="q-pa-sm">
                <div class="q-px-sm">
                  <q-scroll-area
                      class="q-pr-sm"
                      :bar-style="{borderRadius: '9px', backgroundColor: '#027be3'}"
                      style="height: 400px; max-width: 300px">
                    <q-card class="mission-card q-mt-sm"
                            v-for="(mission,index) in canceledMissions"
                            :key="index"
                            bordered>
                      <q-item class="column q-pa-sm">
                        <q-item-section>
                          <q-item-label>{{ mission.title }}</q-item-label>
                          <q-item-label caption>{{ mission.content }}</q-item-label>
                        </q-item-section>
                        <div class="row q-mt-md justify-between">
                          <div class="row">
                            <q-avatar size="xs">
                              <img :src="members[hashMember[mission.bossId]].avatar">
                            </q-avatar>
                            <div>{{ members[hashMember[mission.bossId]].nickname }}</div>
                          </div>
                          <div class="row">
                            <q-icon
                                class="q-mr-xs"
                                size="xs"
                                name="alarm"/>
                            <div class="subtitle-2">{{ mission.createTime }}</div>
                          </div>
                        </div>
                      </q-item>
                    </q-card>
                  </q-scroll-area>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-scroll-area>
      </div>
    </q-card>
    </div>
    <div class="col-3 q-mb-md q-px-sm">
    <!-- 通知列表 -->
    <q-card class="q-mb-md">
      <q-card-section class="bg-white">
        <q-avatar
            size="lg"
            class="q-mr-md"
            color="blue-1"
            icon="apps"
        ></q-avatar>
        <a class="text-h6">通知列表</a>
      </q-card-section>
      <q-separator/>
      <div class="q-mt-md q-pa-md">
        <div class="no-wrap q-gutter-md">
          <q-card class="broadcast-card"
                  v-for="(broadcast,index) in broadcasts"
                  :key="index"
                  bordered>
            <q-card-section>
              <div class="text-h6">{{ broadcast.title }}</div>
              <div class="row reverse">
                <q-avatar size="sm">
                  <img :src="members[hashMember[broadcast.userId]].avatar">
                </q-avatar>
                <div class="subtitle-2 q-mr-sm">{{ members[hashMember[broadcast.userId]].nickname }}</div>
              </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section class="q-mt-md">
              {{ broadcast.content }}
            </q-card-section>
            <q-card-section class="q-pa-none">
              <div class="row reverse q-pr-sm q-pb-sm">
                <div class="row">
                  <q-icon
                      class="q-mr-xs"
                      size="xs"
                      name="alarm"/>
                  <div class="subtitle-2">{{ broadcast.createTime }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationPage",
  props: {
    user: Object,
    group: Object,
    members: Array
  },
  data() {
    return {
      hashMember: [],
      allMissions: [
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 1, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 2, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 3, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 4, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 0, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 1, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 2, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 3, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 4, createTime: "20-19-10", level: 1},
        {id: 1, title: '任务标题',content: '任务内容任务内容任务内容', bossId: 2, state: 0, createTime: "20-19-10", level: 1},
      ],
      broadcasts: [
        {id: 1, title: '一则通知', content: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容', createTime: '20-19-10 09:20:03', userId: 2},
        {id: 1, title: '一则通知', content: '通知内容通知内容通知内容', createTime: '20-19-10 09:20:03', userId: 2},
        {id: 1, title: '一则通知', content: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容', createTime: '20-19-10 09:20:03', userId: 2},
        {id: 1, title: '一则通知', content: '通知内容通知内容通知内容', createTime: '20-19-10 09:20:03', userId: 2},
      ],
    }
  },
  computed: {
    createdMissions () {
      return this.allMissions.filter((mission) => {
        return mission.state === 1
      })
    },
    acceptedMissions () {
      return this.allMissions.filter((mission) => {
        return mission.state === 2
      })
    },
    doneMissions () {
      return this.allMissions.filter((mission) => {
        return mission.state === 3
      })
    },
    checkedMissions () {
      return this.allMissions.filter((mission) => {
        return mission.state === 4
      })
    },
    canceledMissions () {
      return this.allMissions.filter((mission) => {
        return mission.state === 0
      })
    }
  },
  watch: {
    members: function () {
      this.init()
    }
  },
  methods: {
    init () {
      for (let i = 0; i < this.members.length; i++) {
        this.hashMember[this.members[i].id] = i
      }
    },
    getMissions() {

    },
    editMission() {

    },
    addMission() {

    },
    deleteMission() {

    }
  }

}
</script>

<style scoped>
.mission-list {
  min-width: 280px;
}
.mission-card {
  min-height: 70px;
}
.broadcast-card {
  width: 100%;
  height: 100%;
  min-width: 150px;
  max-width: 400px;
}
</style>
