<template>
  <div class="reports">
    <div class="repotsInner">
      <div class="tableBlock">
        <h2 class="tableBlockTitle">Streams</h2>
        <table>
          <thead class="tableTitles">
            <tr>
              <th>Name</th>
              <th>Account Id</th>
              <th>Stream Id</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stream in filterStreams" :key="stream.stream_id">
              <td>{{ stream.name }}</td>
              <td>{{ stream.account_id }}</td>
              <td>{{ stream.stream_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableBlock">
        <h2 class="tableBlockTitle">Streams With Click</h2>
        <Skeleton v-if="!haveData" :count="10" height="30px" />
        <table v-else v-show="!lengthZero">
          <thead class="tableTitles">
            <tr>
              <th>Name</th>
              <th>Click Count</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stream in streamswithclick" :key="stream.stream_id">
              <td>{{ stream.name }}</td>
              <td>{{ stream.clickCount }}</td>
              <td>{{ stream.createdDate }}</td>
            </tr>
          </tbody>
        </table>
        <p v-show="lengthZero">No data</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Skeleton } from 'vue-loading-skeleton';

export default {
  name: 'MyAdspect',
  components: {
    Skeleton,
  },
  data() {
    return {
      streams: [],
      streamswithclick: [],
      haveData: false,
      lengthZero: false,
    };
  },
  async mounted() {
    await axios
      .get('/api/streams')
      .then((response) => {
        this.streams = response.data;
        console.log(this.streams);
      })
      .catch((error) => {
        console.error(error);
      });

    await axios
      .get('/api/streamswithclick')
      .then((response) => {
        if (response) {
          this.haveData = true;
          if (response.data.length === 0) {
            this.lengthZero = true;
          }
        }
        this.streamswithclick = response.data;
        console.log(this.streamswithclick);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    filterStreams() {
      return this.streams.filter(
        (stream) =>
          stream.money_pages[0].page === 'https://black.com' ||
          stream.safe_pages[0].page === 'https://white.com',
      );
    },
  },
};
</script>

<style>
/* report */
.reports {
  height: 100%;
}
.repotsInner {
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  padding: 50px 0;
  height: 100%;
}
.tableBlock {
  width: 100%;
  max-height: 50%;
  overflow-y: scroll;
}
.tableBlockTitle {
  margin-bottom: 20px;
  margin-left: 10px;
}

/* table */
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  font-family: 'Roboto';
  height: 100%;
}

table th,
table td {
  border: 1px solid #dee2e6;
  padding: 0.75rem;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
  font-weight: 600;
}

table tbody tr:hover {
  background-color: #f5f5f5;
}

table td:first-child,
table th:first-child {
  border-left: none;
}

table td:last-child,
table th:last-child {
  border-right: none;
}
</style>
