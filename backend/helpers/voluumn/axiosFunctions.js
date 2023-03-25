const axios = require('axios');
require('dotenv').config();

// need functions
const { doMonthNumber, getRandomPhoneNumber } = require('./needFunctions');

const data = {
  email: process.env.VOLUUMN_EMAIL,
  password: process.env.VOLUUMN_PASSWORD,
};

// const fromDateTime = '2023-01-01T00:00:00Z'; // replace with your desired start date and time
// const toDateTime = '2023-03-17T00:00:00Z'; // replace with your desired end date and time

let getCampaigns = async (token) => {
  try {
    const response = await axios.get('https://api.voluum.com/campaign', {
      headers: {
        'cwauth-token': token,
        Accept: 'application/json',
      },
    });
    if (response.data) {
      const data = [];
      response.data.campaigns.forEach((campaign) => {
        data.push({
          campaignName: campaign.name,
          url: campaign.url,
          country: campaign.country,
        });
      });
      let word = 'slotimo';
      let campaigns = [
        ...new Set(
          response.data.campaigns.filter(
            (campaign) =>
              campaign.workspace.id === '16e94927-2abd-4d19-bb75-db6fd44f79c3' &&
              campaign.namePostfix.includes(word),
          ),
        ),
      ];
      return campaigns;
    }
  } catch (error) {
    console.error(error);
  }
};

let getErrors = async (token, fromDateTime, toDateTime) => {
  try {
    const response = await axios.get('https://api.voluum.com/report/errors/category', {
      headers: {
        'cwauth-token': token,
        Accept: 'application/json',
      },
      params: {
        from: fromDateTime,
        to: toDateTime,
      },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

let voluumnAuth = async (type, fromDateTime, toDateTime) => {
  try {
    const response = await axios.post('https://api.voluum.com/auth/session', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data) {
      if (type === 'campaigns') {
        const data = await getCampaigns(response.data.token);
        return data;
      }

      if (type === 'errors') {
        console.log(fromDateTime, toDateTime);
        const data = await getErrors(response.data.token, fromDateTime, toDateTime);
        return data;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

let getData = async (user, person) => {
  try {
    const response = await axios.get(`https://randomuser.me/api/?nat=${user}&gender=male`);
    const data = response.data.results[0];
    console.log(data);
    // name
    person.name = data.name.first;
    // surname
    person.surname = data.name.last;
    // email
    person.email = data.email;
    // birthday
    const birthday = new Date(data.dob.date);
    const formattedBirthday = birthday.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let day =
      Number(formattedBirthday.split(' ')[1]) < 10
        ? '0' + formattedBirthday.split(' ')[1]
        : formattedBirthday.split(' ')[1];
    console.log(day);
    person.birthday.day = day;
    person.birthday.month = doMonthNumber(formattedBirthday.split(' ')[0]);
    person.birthday.year = formattedBirthday.split(' ')[2];

    // city
    person.city = data.location.city;
    // phone
    person.phone = getRandomPhoneNumber(user).slice(1).join('');

    // street
    person.street = data.location.street.name + data.location.street.number;
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  voluumnAuth,
  getData,
};
