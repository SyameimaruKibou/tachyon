<template>
<div class="q-mt-md q-px-md">
  <q-card class="q-mb-md">
    <q-card-section class="bg-white">
      <div class="no-wrap items-center row justify-between">
        <div>
          <q-avatar
              size="lg"
              class="q-mr-md"
              color="blue-1"
              icon="apps"
          ></q-avatar>
          <a class="text-h6">项目进度</a>
        </div>
          <q-select rounded outlined
                    v-model="selectedProId"
                    emit-value
                    map-options
                    :options="projects"></q-select>
          <q-btn rounded icon="add" label="添加新项目"></q-btn>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-section class="row no-wrap q-my-md">
      <!-- 项目日历部分 -->
      <div class="col-8 q-mr-sm">
      <v-sheet class="q-mb-sm">
        <v-toolbar outlined>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            今天
          </v-btn>
          <q-space></q-space>
          <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prevMonth"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>

          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>

          <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="nextMonth"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>

          <q-space></q-space>
          <v-btn
              fab
              small
            @click="addNewPeriod">
            <v-icon >
              mdi-plus
            </v-icon>
          </v-btn>

        </v-toolbar>
      </v-sheet>
      <v-sheet height="500">
        <v-calendar
            ref="calendar"
            :events="events"
            v-model="focus"
            type="month"
            color="primary"
            @click:event="showEvent"
            @change="updateData"
        >
        </v-calendar>
      </v-sheet>
      </div>
      <q-separator />
      <div class="col-4">
        <q-card
          flat
          bordered>
          <q-card-section>
            <div class="text-h6">里程碑状态</div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section class="q-pa-xs">
            <q-list>
              <div v-for="(checkpoint,index) in checkpoints" :key="index">
              <q-item>
                <q-item-section class="q-pa-none">
                  <q-item-label>{{checkpoint.name}}</q-item-label>
                  <q-item-label caption>{{checkpoint.detail}}</q-item-label>
                  <q-item-label>{{checkpoint.startTime}}~{{checkpoint.endTime}}</q-item-label>
                </q-item-section>
                <q-item-section side top >
                  <q-chip
                      v-if="checkpoint.state === 1"
                      outline
                      square
                      color="blue"
                      class="bg-blue-1"
                      label="已完成"
                  />
                  <q-chip
                      v-else-if="checkpoint.age === 0"
                      outline
                      square
                      color="green"
                      class="bg-green-1"
                      label="未到时间"
                  />
                  <q-chip
                      v-else-if="checkpoint.age === 2"
                      outline
                      square
                      color="red"
                      class="bg-red-1"
                      label="已失效"
                  />

                  <q-chip
                      v-else
                      outline
                      square
                      color="orange"
                      class="bg-orange-1"
                      label="未审核"
                  />
                </q-item-section>
                <q-item-section side>
                  <q-btn round icon="edit" size="xs" @click="editCheckpoint(index)"/>
                </q-item-section>
              </q-item>
                <q-separator></q-separator>
              </div>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-card>

  <checkpoint-edit-dialog ref="editCP" :projectId="selectedProId"></checkpoint-edit-dialog>
</div>
</template>

<script>
import CheckpointEditDialog from "./dialogs/CheckpointEditDialog";
export default {
  name: "ProjectPage",
  components: {CheckpointEditDialog},
  data() {
    return {
      focus: '',
      selectedProId: 1,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      projects: [
        { label: '新项目1', value: 1},
        { label: '新项目2', value: 2}
      ],
      periods: [
      ],
      checkpoints: [
        {id: 1, name: '检查点1', detail: '详细介绍详细介绍', state: 0, age: 1 , review: '', startTime: '2021-01-01', endTime:'2021-01-02'},
        {id: 2, name: '检查点2', detail: '详细介绍详细介绍', state: 1, age: 1 , review: '已经审查', startTime: '2020-01-01', endTime:'2020-01-02'},
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
  },
  watch: {
  },
  created() {

  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    getProjectInfo() {

    },
    editCheckpoint(key) {
      this.$refs.editCP.init(this.checkpoints[key])
    },
    deleteCheckpoint() {

    },
    addCheckPoint() {

    },
    addNewProject() {

    },

    getAge(time1,time2) {
      if (Date.now() > new Date(time2)) return 2
      else if (Date.now() < new Date(time1)) return 0
      return 1
    },
    updateData() {

    },
    setToday() {
      this.focus = ''
    },
    prevMonth() {
      this.$refs.calendar.prev()
    },
    nextMonth() {
      this.$refs.calendar.next()
    },
    showEvent () {
    }
  }
}
</script>

<style scoped>

</style>
