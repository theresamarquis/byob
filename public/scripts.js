const submitHandler = document.querySelector('.button');

const getJwt = (event) => {
  event.preventDefault();
  const emailInput = document.querySelector('#email');
  const email = emailInput.value;
  const isTuring = email.split('@')[1];

  if (!email) {
    document.querySelector('.feedback').innerText = 'Please fill out required fields.';
  } else if (isTuring !== 'turing.io') {
    document.querySelector('.feedback').innerText = 'Must be a Turing staff member.';
  } else {
    return fetch('api/v1/authorize', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email, appName: "byob"})
    })
      .then(response => response.json())
      .then(result => {
        document.querySelector('.feedback').innerText = 'jwt:' +  JSON.stringify(result.token);
      })
      .catch(error => console.log(error));
  }
};

submitHandler.addEventListener('click', getJwt);