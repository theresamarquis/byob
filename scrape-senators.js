const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs'); //filesystem(fs) is built into node

nightmare
  .goto('https://www.senate.gov/general/contact_information/senators_cfm.xml')
  .wait(1000)
  .evaluate(() => {
    const senators = [...document.querySelectorAll('member')];

    const info = senators.map(senator => {
      return senator
      // let firstName = senator.querySelectorAll('first_name').innerText;
      // return { firstName }
    });

    return info;
  })
  .end()
  .then(result => {
    const output = JSON.stringify(result, null, 2);//save to a file rather than console.log
    fs.writeFile('./senatorsAll.json', output, 'utf8', err => { //utf8 means text,
      if (err) {
        return console.log('Error saving file: ', err)
      }
    })
    console.log('File saved');

  })
  .catch(err => {
    console.log('Error:', err)
  })