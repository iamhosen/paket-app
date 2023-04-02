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
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <a @click="$router.go(-1)" v-html="back"></a>
  </div>
</template>

<script>
import { back, plus, edit, trash } from '@/assets/icons.js'

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
  },
  data() {
    return { back, plus, editIcon: edit, trashIcon: trash }
  },

  methods: {
    deleteItem() {
      this.$emit('delete')
    },
  },
}
</script>