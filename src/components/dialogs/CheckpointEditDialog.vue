<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section>
        <div v-if="isAdd && isCheckPoint" class="text-h6">添加里程碑</div>
        <div v-if="!isAdd && isCheckPoint" class="text-h6">修改里程碑信息</div>
        <div v-if="isAdd && !isCheckPoint" class="text-h6">添加阶段</div>
        <div v-if="!isAdd && !isCheckPoint" class="text-h6">修改阶段信息</div>
      </q-card-section>
      <q-card-section>
      <q-form
        ref="dataForm">
        <q-input class="q-mx-md q-mb-sm" outlined v-model="checkpoint.name" label="名称"/>
        <q-input class="q-mx-md q-mb-sm" outlined type="text" v-model="checkpoint.detail" label="详细信息"/>
        <!--
          <q-select outlined
                    v-model="checkpoint.projectId"
                    :options="periods"
                    :disable="isAdd"
                    label="所属阶段"
                    emit-value map-options>
            <template v-slot:append>
              <q-icon name="close"
                      @click.stop="checkpoint.projectId = ''" class="cursor-pointer" />
            </template>
          </q-select>
        -->
        <div class="row q-mx-md q-mb-sm">
          <q-input
              class="q-mr-sm"
              outlined type="date" v-model="checkpoint.startTime" label="起始时间"/>
          <q-input
              outlined type="date" v-model="checkpoint.endTime" label="结束时间"/>
        </div>
        <q-input
            v-if="isCheckPoint"
            outlined type="text" autogrow v-model="checkpoint.review" label="里程碑评审结果"/>

      </q-form>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="取消" v-close-popup />
        <q-btn flat label="确认修改" @click="emitChange"/>
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>

<script>
export default {
  name: "CheckpointEditDialog",
  props: {
    // 从父组件获取的基本信息
    projectId: Number
  },
  data() {
    return {
      show: false,
      isCheckPoint: true,
      isAdd: true,
      selectedProId: 0,
      checkpoint: {
        id: 0,
        name: '',
        detail: '',
        projectId: null,
        periodId: 0,
        state: 0,
        review: '',
        startTime: '1970/01/01',
        endTime: '1970/01/02',
      }
    }
  },

  methods: {
    init(data) {
      if (data) {
        this.show = true
        this.$nextTick(() => {
          this.isAdd = false
          // 深拷贝
          this.checkpoint = { ...data }
          if (!data.state || data.state === '') this.isCheckPoint = false
        })
      } else {
        this.isAdd = true
        this.checkpoint.projectId = this.projectId
      }
    },
    emitChange () {

    }
  }
}

</script>

<style scoped>

</style>
