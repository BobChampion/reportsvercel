const phoneNumbers = {
  CA: [
    '+1-416-555-1234',
    '+1-416-555-5678',
    '+1-416-555-9012',
    '+1-416-555-3456',
    '+1-416-555-7890',
    '+1-416-555-2345',
    '+1-416-555-6789',
    '+1-416-555-0123',
    '+1-416-555-4567',
    '+1-416-555-8901',
  ],
  AU: [
    '+61-480089161',
    '+61-409425134',
    '+61-476857122',
    '+61-423572135',
    '+61-485826281',
    '+61-488824684',
    '+61-485800490',
    '+61-480049961',
    '+61-480053389',
    '+61-480050332',
  ],
  IT: [
    '+39-06-5555-1234',
    '+39-06-5555-5678',
    '+39-06-5555-9012',
    '+39-06-5555-3456',
    '+39-06-5555-7890',
    '+39-06-5555-2345',
    '+39-06-5555-6789',
    '+39-06-5555-0123',
    '+39-06-5555-4567',
    '+39-06-5555-8901',
  ],
  DE: [
    '+49-15510261768',
    '+49-15510262523',
    '+49-1627188895',
    '+49-01747707507',
    '+49-15205115013',
    '+49-15213057800',
    '+49-15510623982',
    '+49-01627183786',
    '+49-15227272312',
    '+49-15134876966',
  ],
};

const cities = [
  'Roma',
  'Milano',
  'Napoli',
  'Torino',
  'Palermo',
  'Genova',
  'Bologna',
  'Firenze',
  'Bari',
  'Catania',
  'Venezia',
  'Verona',
  'Messina',
  'Padova',
  'Trieste',
  'Brescia',
  'Parma',
  'Modena',
  'Reggio Calabria',
  'Reggio Emilia',
  'Perugia',
  'Livorno',
  'Ravenna',
  'Cagliari',
  'Foggia',
  'Forlì',
  'Udine',
  'Taranto',
  'Piacenza',
  'Ancona',
];

function getRandomPhoneNumber(countryCode) {
  if (phoneNumbers.hasOwnProperty(countryCode)) {
    const countryPhoneNumbers = phoneNumbers[countryCode];
    const randomIndex = Math.floor(Math.random() * countryPhoneNumbers.length);
    const phoneNumber = countryPhoneNumbers[randomIndex];
    const splitPhoneNumber = phoneNumber.split('-');
    return splitPhoneNumber;
  } else {
    return 'Country code not found in the phoneNumbers object.';
  }
}
function randomPassword(len = 8, minUpper = 0, minLower = 0, minNumber = -1, minSpecial = -1) {
  let chars = String.fromCharCode(...Array(127).keys()).slice(33), //chars
    A2Z = String.fromCharCode(...Array(91).keys()).slice(65), //A-Z
    a2z = String.fromCharCode(...Array(123).keys()).slice(97), //a-z
    zero2nine = String.fromCharCode(...Array(58).keys()).slice(48), //0-9
    specials = chars.replace(/\w/g, '');
  if (minSpecial < 0) chars = zero2nine + A2Z + a2z;
  if (minNumber < 0) chars = chars.replace(zero2nine, '');
  let minRequired = minSpecial + minUpper + minLower + minNumber;
  let rs = [].concat(
    Array.from(
      { length: minSpecial ? minSpecial : 0 },
      () => specials[Math.floor(Math.random() * specials.length)],
    ),
    Array.from(
      { length: minUpper ? minUpper : 0 },
      () => A2Z[Math.floor(Math.random() * A2Z.length)],
    ),
    Array.from(
      { length: minLower ? minLower : 0 },
      () => a2z[Math.floor(Math.random() * a2z.length)],
    ),
    Array.from(
      { length: minNumber ? minNumber : 0 },
      () => zero2nine[Math.floor(Math.random() * zero2nine.length)],
    ),
    Array.from(
      { length: Math.max(len, minRequired) - (minRequired ? minRequired : 0) },
      () => chars[Math.floor(Math.random() * chars.length)],
    ),
  );
  return rs.sort(() => Math.random() > Math.random()).join('');
}

function getMonth(monthStr) {
  return new Date(monthStr + '-1-01').getMonth() + 1;
}
function doMonthNumber(monthName) {
  let month;

  switch (monthName) {
    case 'January':
      month = '1';
      break;
    case 'February':
      month = '2';
      break;
    case 'March':
      month = '3';
      break;
    case 'April':
      month = '4';
      break;
    case 'May':
      month = '5';
      break;
    case 'June':
      month = '6';
      break;
    case 'July':
      month = '7';
      break;
    case 'August':
      month = '8';
      break;
    case 'September':
      month = '9';
      break;
    case 'October':
      month = '10';
      break;
    case 'November':
      month = '11';
      break;
    case 'December':
      month = '12';
      break;
    default: // If the month name is not valid
      month = -1;
      break;
  }

  return month;
}

function generateRandomPostcode() {
  let postcode = '';

  // Italian postcodes have a length of 5 digits
  for (let i = 0; i < 5; i++) {
    postcode += Math.floor(Math.random() * 10);
  }

  return postcode;
}

function generateRandomCityName() {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

module.exports = {
  getRandomPhoneNumber,
  randomPassword,
  getMonth,
  doMonthNumber,
  generateRandomPostcode,
  generateRandomCityName,
};
