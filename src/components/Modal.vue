<template>
  <b-modal
    v-model='showModal'
    no-close-on-backdrop
    centered
    @show='setItems'
    title='Добавить сотрудника'
  >
    <template #modal-header>
      Добавить сотрудника
    </template>
    <div>
      <span>Имя сотрудника</span>
      <b-input v-model='name'></b-input>
    </div>
    <div>
      <span>Телефон</span>
      <b-input
        v-model='phone'
        type='number'
      ></b-input>
    </div>
    <div v-if='items.length > 0'>
      <span>Отвественное лицо</span>
      <b-form-select
        v-model='parent'
        :options='selectOptions'
      ></b-form-select>
    </div>
    <template #modal-footer>
      <b-button
        :disabled='name.length === 0 || phone.length === 0'
        variant='primary'
        @click='addWorker'
      >
        Добавить
      </b-button>
      <b-button
        variant='secondary'
        @click='closeModal'
      >
        Закрыть
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['showModal', 'items'],
  data: () => ({
    name: '',
    phone: '',
    parent: null,
    selectOptions: []
  }),
  methods: {
    addWorker () {
      const mapWorkersIds = this.items.length === 0 ? [0] : this.items.map(el => el.id)
      const maxId = Math.max(...mapWorkersIds)
      const model = {
        name: this.name,
        phone: this.phone,
        parentId: this.parent,
        id: maxId + 1,
        show: false,
        node: []
      }
      this.$emit('addPerson', model)
      this.$nextTick(() => this.setItems())
    },
    setItems () {
      const mapWorkersOptions = this.items.map(item => ({ value: item.id, text: item.name }))
      mapWorkersOptions.push({ text: 'Без ответственного', value: null })
      this.selectOptions = mapWorkersOptions
    },
    clearForm () {
      this.name = ''
      this.phone = ''
      this.parent = null
    },
    closeModal () {
      this.clearForm()
      this.$emit('update:showModal', !this.showModal)
    }
  }
}
</script>

<style>

</style>
