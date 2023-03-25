<template>
  <div class="voluumError">
    <div class="selectDate">
      <div class="dateInputs">
        <DateSelect
          id="start-date-time"
          label="Start Date/Time"
          :dateTime="setDefaultStartDate"
          @selected-date="handleDateSelected"
        />
        <DateSelect
          id="end-date-time"
          :dateTime="setDefaultEndDate"
          label="End Date/Time"
          @selected-date="handleDateSelected"
        />
      </div>
      <p class="dateError" v-show="isError">Please select date</p>
      <button class="getErrors" @click="getErrors">Get Errors</button>
    </div>
    <div class="errorTable" v-show="isClick">
      <Skeleton v-if="!haveData" :count="10" height="30px" />
      <table v-else>
        <thead>
          <tr>
            <th>Category</th>
            <th>Category Name</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="error in errors" :key="error.categoryName">
            <td>{{ error.category }}</td>
            <td>{{ error.categoryName }}</td>
            <td>
              {{ error.errors }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DateSelect from './DateSelect.vue';
import getDate, { getTodayDate } from '../../helpers/date';
import { Skeleton } from 'vue-loading-skeleton';

export default {
  components: { DateSelect, Skeleton },
  name: 'VoluumnError',
  data() {
    return {
      isError: false,
      isClick: false,
      haveData: false,
      errors: [],
      startDateTime: null,
      endDateTime: null,
    };
  },
  async mounted() {
    this.startDateTime = getTodayDate('start');
    this.endDateTime = getTodayDate('end');
    this.isClick = false;
    this.haveData = false;
    await axios
      .get(`/api/errors`, {
        params: { from: getDate(this.startDateTime), to: getDate(this.endDateTime) },
      })
      .then((response) => {
        if (response) {
          this.isClick = true;
          this.haveData = true;
        }
        this.errors = response.data.rows;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleDateSelected(evt) {
      switch (evt.target.id) {
        case 'start-date-time':
          this.startDateTime = evt.target.value;
          this.isError = false;
          break;
        case 'end-date-time':
          this.endDateTime = evt.target.value;
          this.isError = false;
          break;
        default:
          break;
      }
    },
    async getErrors() {
      if (this.startDateTime && this.endDateTime) {
        this.isClick = true;
        this.haveData = false;
        await axios
          .get(`/api/errors`, {
            params: { from: getDate(this.startDateTime), to: getDate(this.endDateTime) },
          })
          .then((response) => {
            if (response) {
              this.haveData = true;
            }
            this.errors = response.data.rows;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.isError = true;
      }
    },
  },
  computed: {
    setDefaultStartDate() {
      return getTodayDate('start');
    },
    setDefaultEndDate() {
      return getTodayDate('end');
    },
  },
};
</script>

<style scoped>
.voluumError {
  padding: 20px 0;
}
.selectDate {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
}
.dateInputs {
  display: flex;
  justify-content: center;
  gap: 50px;
}
.getErrors {
  display: inline-block;
  margin: 0 auto;
  border: 0;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 18px;
  padding: 10px 40px;
  border-radius: 20px;
  cursor: pointer;
  background: #000;
  color: #fff;
  transition: all 0.3s;
  border: 1px solid #000;
}
.getErrors:hover {
  background: #fff;
  color: #000;
}
.dateError {
  color: red;
}

/* table */
.errorTable {
  margin-top: 30px;
}
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
