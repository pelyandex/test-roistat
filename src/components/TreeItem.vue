<template>
  <div>
    <div
      v-for='node of localItems'
      :key='node.id'
    >
      <div class='table-head table-row'>
        <div
          :style='shift(node)'
          class='tree-item table-head__item'
        >
          <span
            @click='reShow(node)'
            v-if='node.node.length !== 0'
            class='arrow'
          >
            {{ node.show ? '&uarr;' : '&darr;'  }}
          </span>
          <span :title='node.name'>
            {{node.name}}
          </span>
        </div>
        <div class='table-head__item'>{{node.phone}}</div>
      </div>
      <TreeItem
        v-if='node.node.length !== 0'
        v-show='node.show'
        :req='req + 10 || 10'
        :tree-items='node.node'
        :sort-direction='sortDirection'
        :items='items'
        :change-callback='changeCallback'
      />
    </div>
  </div>
</template>

<script>
import deep from 'clone-deep'
import { compareStrings } from '@/common/js/utilites'

export default {
  name: 'TreeItem',
  props: ['treeItems', 'items', 'changeCallback', 'req', 'sortDirection'],
  data: () => ({
    localItems: []
  }),
  watch: {
    treeItems: {
      immediate: true,
      handler () {
        this.localItems = deep(this.treeItems)
        this.localSort()
      }
    },
    sortDirection () {
      this.localSort()
    }
  },
  methods: {
    localSort () {
      const { type, direction } = this.sortDirection
      this.localItems.sort((a, b) => compareStrings(a[type], b[type], direction))
    },
    reShow (item) {
      const items = [...this.items]
      items.find(el => el.id === item.id).show = !item.show
      this.changeCallback(items)
    },
    shift (node) {
      return {
        width: `calc(50% - ${this.req}px)`,
        marginLeft: `${this.req || 0}px`,
        paddingLeft: `${node.node.length !== 0 ? '20px' : '10px'}`
      }
    }
  }
}
</script>

<style scoped>
  .tree-item {
    text-align: left;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: auto;
  }
  .table-row {
    border-bottom: 1px solid silver;
  }
  .table-row:hover {
    background-color: rgba(150, 150, 150, 0.3);
  }
  .arrow {
    cursor: pointer;
    position:absolute;
    top:0;
    left:10px
  }
</style>
