const puppeteer = require('puppeteer');
let ports = require('../../files/port.json');
require('dotenv').config();

const tests = [];

// axios function
const { getData } = require('../voluumn/axiosFunctions');

// need functions
const {
  randomPassword,
  getMonth,
  generateRandomPostcode,
  generateRandomCityName,
} = require('./needFunctions');

let doPuppetterTask = async (campaignName, campaigns, res) => {
  let withFakeNameService = false;
  let campiagn = campaigns.find((campaign) => campaign.name === campaignName);
  let user = campiagn.country.code;
  let selectCountry;
  switch (user) {
    case 'DE':
      withFakeNameService = false;
      selectCountry = 'gr';
      break;
    case 'IT':
      withFakeNameService = true;
      selectCountry = 'it';
      break;
    case 'CA':
      withFakeNameService = false;
      selectCountry = 'ca';
      break;
    case 'AU':
      withFakeNameService = false;
      selectCountry = 'au';
      break;
    default:
      break;
  }

  const person = {
    name: '',
    surname: '',
    email: '',
    password: randomPassword(8, 1, 1, 1),
    birthday: {
      day: '',
      month: '',
      year: '',
    },
    phone: '',
    street: '',
    city: generateRandomCityName(),
    postcode: generateRandomPostcode(),
  };

  if (selectCountry !== 'it') {
    getData(user, person);
  }
  let status = 'testing good';

  (async () => {
    const port = Math.floor(
      Math.random() * (ports[user].max - ports[user].min + 1) + ports[user].min,
    );
    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      args: [
        '--disable-blink-features=AutomationControlled',
        `--proxy-server=${user.toLowerCase()}-pr.oxylabs.io:${port}`,
        '--no-sandbox',
      ],
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
    });
    const userAgent = await browser.userAgent();
    await page.setUserAgent(userAgent.replaceAll(/HeadlessChrome/gi, 'Chrome'));
    // let newUserAgent = await page.evaluate('navigator.userAgent');
    await page.authenticate({
      username: process.env.OXYLABS_USERNAME,
      password: process.env.OXYLABS_PASS,
    });
    await page.goto('https://scamalytics.com/');
    await page.waitForSelector('.gform_button.button', { visible: true, clickable: true });
    await page.click('.gform_button.button');
    // await page.keyboard.type(person.name);
    if (withFakeNameService) {
      await page.goto('https://www.fakenamegenerator.com/');

      await page.waitForSelector('select#gen');
      await page.select('select#gen', 'male');
      await page.waitForSelector('select#n');
      await page.select('select#n', selectCountry);
      await page.waitForSelector('select#c');
      await page.select('select#c', selectCountry);
      await page.waitForSelector('#genbtn');
      await page.click('#genbtn');

      // name and surname
      await page.waitForSelector('.address h3');
      let fullname = await page.evaluate(() => {
        let emailText = document.querySelector('.address h3').innerText;
        return emailText;
      });
      person.name = fullname.split(' ')[0];
      person.surname =
        fullname.split(' ')[1] + (fullname.split(' ')[2] ? fullname.split(' ')[2] : '');

      // email
      await page.waitForSelector('.extra > dl.dl-horizontal:nth-child(12) dd');
      let email = await page.evaluate(() => {
        let emailText = document
          .querySelector('.extra > dl.dl-horizontal:nth-child(12) dd')
          .innerText.split('\n')[0];
        return emailText;
      });
      person.email = email;

      // birthday
      await page.waitForSelector('.extra > dl.dl-horizontal:nth-child(8) dd');
      let birthday = await page.evaluate(() => {
        let birthdayText = document
          .querySelector('.extra > dl.dl-horizontal:nth-child(8) dd')
          .innerText.split(' ');
        return birthdayText;
      });
      person.birthday.day = birthday[1].split(',')[0];
      person.birthday.month = getMonth(birthday[0]) + '';
      person.birthday.year = Number(birthday[2]) < 10 ? '0' + birthday[2] : birthday[2];

      // phone
      await page.waitForSelector('.extra > dl.dl-horizontal:nth-child(5) dd');
      let phone = await page.evaluate(() => {
        let phoneText = document
          .querySelector('.extra > dl.dl-horizontal:nth-child(5) dd')
          .innerText.split(' ')
          .join('')
          .substring(1);
        return phoneText;
      });
      person.phone = phone;

      // street
      await page.waitForSelector('div.adr');
      let street = await page.evaluate(() => {
        let streetText = document.querySelector('div.adr').innerText.split('\n')[0];
        return streetText;
      });
      person.street = street;
      console.log(person);
    }

    await page.goto(campiagn.url);
    if (selectCountry === 'ca' && campaignName === 'Facebook casino - Canada - slotimo') {
      await page.waitForSelector('.gold.button', { visible: true, clickable: true });
      await page.click('.gold.button');
      await page.waitForSelector('.store.button', { visible: true, clickable: true });
      await page.click('.store.button');
    }
    await page.waitForSelector('.cl-register-button', { visible: true, clickable: true });
    await page.click('.cl-register-button');

    // 1
    await page.focus('#reg_form_email');
    await page.keyboard.type(person.email);
    await page.focus('#reg_form_username');
    await page.keyboard.type(person.name + person.postcode);
    await page.focus('#reg_form_password');
    await page.keyboard.type(person.password);
    await page.click('#next-registration-step');

    // 2
    await page.setViewport({
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
    });

    await page.waitForSelector('#reg_form_fname', { visible: true, clickable: true });
    await page.focus('#reg_form_fname');
    await page.keyboard.type(person.name);
    await page.focus('#reg_form_lname');
    await page.keyboard.type(person.surname);
    await page.waitForSelector('select#reg_form_currency_id', { visible: true, clickable: true });
    await page.select('select#reg_form_currency_id', 'Euro');
    await page.focus('input#register-user-modal');
    await page.keyboard.type(person.phone);
    await page.waitForSelector('select#reg_form_birthday_day', { visible: true, clickable: true });
    await page.select('select#reg_form_birthday_day', person.birthday.day + '');
    await page.waitForSelector('select#reg_form_birthday_month', {
      visible: true,
      clickable: true,
    });
    await page.select('select#reg_form_birthday_month', person.birthday.month);
    await page.waitForSelector('select#reg_form_birthday_year', { visible: true, clickable: true });
    await page.select('select#reg_form_birthday_year', person.birthday.year);
    await page.evaluate(() => {
      document.querySelector('div#register-user-modal').scrollBy(0, 1000);
    });
    await page.waitForSelector('#submit-reg-form', { visible: true, clickable: true });
    await page.click('#submit-reg-form');

    await browser.close();
  })()
    .catch((err) => {
      console.error(err);
      status = 'failed';
    })
    .finally(() => {
      const newTest = { date: new Date(), campaign: campaignName, status: status };
      tests.push(newTest);
      res.send(tests);
    });
};

module.exports = {
  doPuppetterTask,
  tests,
};
