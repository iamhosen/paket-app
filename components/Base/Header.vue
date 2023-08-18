<template>
  <div class="w-full flex justify-between items-center h-[40px] mb-6 px-4">
    <nuxt-link v-if="add" :to="add">
      <span v-html="plus"></span>
    </nuxt-link>
    <nuxt-link v-if="edit" :to="edit">
      <span v-html="editIcon"></span>
    </nuxt-link>
    <a v-if="trash" @click="deleteItem">
      <span v-html="trashIcon"></span>
    </a>

    <div v-if="title == 'logo'" class="h-10" v-html="paket"></div>
    <h1 v-else class="text-2xl font-bold">{{ title }}</h1>

    <nuxt-link v-if="alert" to="/notification">
      <button
        class="bg-primary bg-opacity-10 w-10 h-10 flex justify-center items-center rounded-[14px]"
        v-html="alertIcon"
      ></button>
    </nuxt-link>
    <a v-if="!alert" @click="$router.go(-1)" v-html="back"></a>
  </div>
</template>

<script>
import { back, plus, edit, trash, paket, alert } from '@/assets/icons.js'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    add: {
      type: String,
      default: '',
    },
    edit: {
      type: String,
      default: '',
    },
    trash: {
      type: Boolean,
      default: false,
    },
    alert: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      back,
      plus,
      editIcon: edit,
      trashIcon: trash,
      paket,
      alertIcon: alert,
    }
  },

  methods: {
    deleteItem() {
      this.$emit('delete')
    },
  },
}
</script>