<template>
<div class="q-mt-md q-px-md">
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
      <v-sheet tile>
        <v-calendar
            :events="events"
        >
        </v-calendar>
      </v-sheet>
    </q-card-section>
  </q-card>
  <q-card class="q-mb-md">
    <q-card-section class="bg-white">
      <q-avatar
          size="lg"
          class="q-mr-md"
          color="blue-1"
          icon="apps"
      ></q-avatar>
      <a class="text-h6">项目进度图表</a>
    </q-card-section>
    <q-separator />
  </q-card>
</div>
</template>

<script>
export default {
  name: "ProjectPage",
  data() {
    return {
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
