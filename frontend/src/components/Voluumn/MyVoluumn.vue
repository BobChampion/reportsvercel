<template>
  <div class="voluumn">
    <h1 class="appTitle">Campaign Validator</h1>
    <CampaignList @selected-campaign="handleCampaignSelected" />
    <HistoryTable :tests="tests" />
    <div class="btnsContainer">
      <button class="launchBtn" @click="createTest">launch</button>
      <button class="deleteBtn" @click="deleteHistory">delete history</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CampaignList from './CampaignList.vue';
import HistoryTable from './HistoryTable.vue';

export default {
  name: 'MyVoluumn',
  components: {
    CampaignList,
    HistoryTable,
  },
  data() {
    return {
      selectedCampaignName: '',
      tests: [],
    };
  },
  async mounted() {
    await axios
      .post(`/`)
      .then((response) => {
        console.log(response.data);
        this.tests = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .get('/api/tests')
      .then((response) => {
        this.tests = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async createTest() {
      await axios
        .post(`/api/tests/${this.selectedCampaignName}`)
        .then((response) => {
          this.tests = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteHistory() {
      await axios
        .delete('/api/tests')
        .then((response) => {
          this.tests = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
      this.tests = [];
    },
    async handleCampaignSelected(campaignName) {
      this.selectedCampaignName = campaignName;
    },
  },
};
</script>

<style scoped>
.voluumn {
  background: #5d5f66;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  height: 100%;
}
.appTitle {
  font-size: 45px;
  color: #fff;
}
.btnsContainer {
  display: flex;
  gap: 20px;
  align-items: center;
}
.launchBtn,
.deleteBtn {
  font-size: 25px;
  text-transform: capitalize;
  padding: 20px;
  border-radius: 20px;
  border: 0;
  background: rgba(55, 25, 235, 1);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in;
}
.launchBtn:hover {
  box-shadow: 0 0 10px rgba(55, 25, 235, 1);
}
.deleteBtn {
  background: red;
}
.deleteBtn:hover {
  box-shadow: 0 0 10px red;
}
</style>
