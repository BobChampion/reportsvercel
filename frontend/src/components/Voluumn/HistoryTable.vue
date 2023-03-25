<template>
  <table>
    <thead>
      <tr>
        <th>Date Created</th>
        <th>Campaign Name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="test in tests" :key="test.id">
        <td>{{ test.date }}</td>
        <td>{{ test.campaign }}</td>
        <td :class="test.status === 'failed' ? 'failed' : 'passed'">
          {{ test.status }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HostoryTable',
  props: ['tests'],
};
</script>

<style scoped>
/* table */
table {
  border-collapse: collapse;
  width: 80%;
  height: auto;
}
thead th {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
tbody td {
  border: 1px solid #ddd;
  padding: 8px;
}
tbody tr {
  background-color: #ddd;
}
tbody tr:hover {
  background-color: #fff;
}
.status-passed {
  color: green;
}
.status-failed {
  color: red;
}
</style>
