<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input
      type="datetime-local"
      :id="id"
      :v-model="dateTime"
      @change="changeDate"
      :value="dateTime"
    />
  </div>
</template>

<script>
export default {
  name: 'DateSelect',
  props: ['id', 'label', 'dateTime'],
  methods: {
    changeDate(evt) {
      if (evt.target.value) {
        this.$emit('selected-date', evt);
      }
    },
  },
  emits: ['selected-date'],
};
</script>

<style scoped>
label {
  display: block;
  font-family: 'Roboto';
  text-align: center;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type='datetime-local'] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input[type='datetime-local']:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}
</style>
