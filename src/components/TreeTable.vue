<template>
  <div class='main'>
    <div
      class='table'
      v-if='treeItems.length !== 0'
    >
      <div class='table-head'>
        <span
          class='table-head__item'
          @click='changeSort("name")'
        >
          Имя
        </span>
        <span
          class='table-head__item'
          @click='changeSort("phone")'
        >
          Телефон
        </span>
      </div>
      <TreeItem
        class='tree-items'
        :tree-items='treeItems'
        :items='items'
        :change-callback='changeCallback'
        :sort-direction='sortDirection'
      />
    </div>
    <div v-else>
      Добавьте сотрудников
    </div>
    <div class='button-container'>
      <b-button
        class='button'
        variant='primary'
        @click='showModal = !showModal'
      >
        Добавить
      </b-button>
      <b-button
        v-if='treeItems.length !== 0'
        class='button'
        variant='danger'
        @click='deleteAll'
      >
        Удалить все
      </b-button>
    </div>
    <Modal
      :show-modal.sync='showModal'
      :items='items'
      @addPerson='addPerson'
    />
  </div>
</template>

<script>
import { treeBuilder } from '@/common/js/tree_builder'
import TreeItem from '@/components/TreeItem'
import Modal from '@/components/Modal'

export default {
  components: {
    TreeItem,
    Modal
  },
  data: () => ({
    items: [],
    treeItems: [],
    sortDirection: {
      type: 'name',
      direction: 1
    },
    showModal: false
  }),
  watch: {
    items (val) {
      this.treeItems = treeBuilder(val)
    }
  },
  mounted () {
    const storageItems = window.localStorage.getItem('tree-table-test') || '[]'
    this.items = JSON.parse(storageItems)
    window.addEventListener('unload', this.setStorage)
  },
  beforeDestroy () {
    this.setStorage()
  },
  methods: {
    setStorage () {
      window.localStorage.setItem('tree-table-test', JSON.stringify(this.items.map(el => ({ ...el, show: false }))))
      window.removeEventListener('unload', this.setStorage)
    },
    changeSort (type) {
      const prevType = this.sortDirection.type
      const { direction } = this.sortDirection
      const sortDirection = { type }
      if (prevType === type) {
        sortDirection.direction = direction > 0 ? -1 : 1
      }
      this.sortDirection = sortDirection
    },
    deleteAll () {
      this.items = []
    },
    addPerson (persona) {
      this.items.push(persona)
    },
    changeCallback (value) {
      this.items = value
    }
  }
}
</script>

<style lang='scss'>
.main {
  position: relative;
  width: 600px;
  text-align: center;
}
.tree-items {
  max-height: 300px;
  overflow-y: auto;
}
.button {
  margin-left: 10px;
}
.button-container {
  position: absolute;
  bottom: 20px;
  right: 15px;
}
.table {
  min-height: 400px;
  &-head {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid silver;
    &__item {
      width: 50%;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
