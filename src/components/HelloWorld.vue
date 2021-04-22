<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="../assets/logo.png">
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
            :text="['hey, how are you?']"
            sent
        />
        <q-chat-message
            :text="['doing fine, how r you?']"
        />
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'HelloWorld'
}
</script>
