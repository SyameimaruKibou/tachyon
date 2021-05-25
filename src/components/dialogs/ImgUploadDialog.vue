<template>
  <q-dialog>
    <q-card class="row">
      <q-card-section>
        <q-avatar size="100px">
          <img :src='userAvatar'>
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <q-uploader
            style="max-width: 300px"
            url="https://sm.ms/api/v2/upload"
            label="头像上传到此处"
            :headers="[{name: 'Authorization', value: 'PfbjhsOYxLfRGkIYKO9Y7ncgcu8hLXC2'}]"
            max-files="1"
            auto-upload
            @uploaded="imgUploaded"
            accept=".jpg, image/*"
            @rejected="onRejected"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ImgUploadDialog",
  data() {
    return {
      userAvatar: 'https://cdn.jsdelivr.net/gh/syameimarukibou/imagebox/img/capital_k.png'
    }
  },
  props: {
    isShow: Boolean
  },
  methods: {
    imgUploaded(info) {
      this.$q.notify(info);
    }
  }
}
</script>

<style scoped>

</style>
