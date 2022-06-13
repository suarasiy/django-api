const BASE_ENDPOINT = 'http://localhost:8000/api';
const loginForm = document.querySelector('#login-form');

if (loginForm) loginForm.addEventListener('submit', handleLogin);

function handleLogin(event) {
  console.log(event);
  event.preventDefault();

  const loginEndpoint = `${BASE_ENDPOINT}/token/`;
  let loginFormData = new FormData(loginForm);
  let loginObjectData = Object.fromEntries(loginFormData); // { data1: ..., dataN: ...}
  let bodyString = JSON.stringify(loginObjectData);
  const options = {
    method: 'POST',
    headers: {
      ContentType: 'application/json',
    },
    body: bodyString,
  };
  fetch(loginEndpoint, options)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((x) => {
      console.log(x);
    })
    .catch((error) => {
      console.log(error);
    });
}
