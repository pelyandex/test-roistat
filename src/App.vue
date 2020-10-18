<template>
  <div id='app'>
    <TreeTable />
  </div>
</template>

<script>
import TreeTable from '@/components/TreeTable'

export default {
  name: 'App',
  components: {
    TreeTable
  }
}
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
