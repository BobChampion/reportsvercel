<template>
  <select class="campaignsList" v-model="chooseCampaign" @change="emitSelectedCampaign">
    <option class="campaignOption" disabled value="">Please Select</option>
    <option
      class="campaignOption"
      :value="campaign"
      v-for="campaign in campaigns"
      :key="campaign.id"
    >
      {{ campaign.name }}
    </option>
  </select>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CampaignList',
  data() {
    return {
      chooseCampaign: '',
      campaigns: [],
    };
  },
  async mounted() {
    await axios
      .get('/api/campaigns')
      .then((response) => {
        this.campaigns = response.data;
        console.log(this.campaigns);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async emitSelectedCampaign() {
      this.$emit('selected-campaign', this.chooseCampaign.name);
    },
  },
  emits: ['selected-campaign'],
};
</script>

<style scoped>
select.campaignsList {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

select.campaignsList:hover {
  border-color: #999;
}

select.campaignsList:focus {
  outline: none;
  border-color: #4d90fe;
  box-shadow: 0 0 0 2px rgba(77, 144, 254, 0.2);
}

.campaignOption {
  font-size: 14px;
  font-weight: normal;
}

.campaignOption:hover {
  background-color: #f2f2f2;
}
</style>
