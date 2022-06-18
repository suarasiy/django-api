const BASE_ENDPOINT = 'http://localhost:8000/api';
const loginForm = document.querySelector('#login-form');
const searchForm = document.querySelector('#search-form');
const contentContainer = document.querySelector('#content-container');
const resultContainer = document.querySelector('#result-container');

if (loginForm) loginForm.addEventListener('submit', handleLogin);
if (searchForm) searchForm.addEventListener('submit', handleSearch);

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
      'Content-Type': 'application/json',
    },
    body: bodyString,
  };
  fetch(loginEndpoint, options)
    .then((response) => {
      return response.json();
    })
    .then((authData) => {
      handleAuthData(authData, getProductList);
    })
    .catch((error) => {
      console.log(error);
    });
}

function handleSearch(event) {
  event.preventDefault();

  let formData = new FormData(searchForm);
  let data = Object.fromEntries(formData);
  let searchParams = new URLSearchParams(data);
  console.log(formData);
  console.log(data);
  console.log(searchParams);

  const endpoint = `${BASE_ENDPOINT}/search/?${searchParams}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const authToken = localStorage.getItem('access');
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

  const options = {
    method: 'GET',
    headers,
  };
  fetch(endpoint, options)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.hits);
      // writeToContent(data, contentContainer);
      const validData = tokenIsNotValid(data);
      if (validData && contentContainer) {
        if (data && data.hits) {
          let htmlStr = '';
          for (let result of data.hits) {
            htmlStr += '<li>' + result.title + '</li>';
          }
          contentContainer.innerHTML = htmlStr;
          if (data.hits.length === 0) {
            contentContainer.innerHTML = '<p>No results found.</p>';
          }
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function refreshJWT() {
  const endpoint = `${BASE_ENDPOINT}/token/refresh/`;
  const refresh = localStorage.getItem('refresh');
  localStorage.removeItem('refresh');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh,
    }),
  };

  fetch(endpoint, options)
    .then((response) => response.json())
    .then((data) => {
      handleAuthData(data, getProductList);
    })
    .catch((error) => {
      console.error('error occured: ', error);
    });
}

function verifyJWT() {
  console.log('verifying...');
  const endpoint = `${BASE_ENDPOINT}/token/verify/`;
  const token = localStorage.getItem('access');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  };

  fetch(endpoint, options)
    .then((response) => {
      console.log('one: ', response);
      if (response.status === 200) {
        console.info('Token active.');
      }
      return response.json();
    })
    .then((data) => {
      console.info('data', data);
      if (data.code && data.code === 'token_not_valid') refreshJWT();
    })
    .catch((error) => {
      console.error(error);
      alert('token rejected. please login again!');
    });
}

verifyJWT();

function handleAuthData(authData, callback) {
  localStorage.setItem('access', authData.access);
  localStorage.setItem('refresh', authData.refresh);
  if (callback) {
    callback();
  }
}

function writeToContent(data, container) {
  if (container) {
    container.innerHTML = '<pre>' + JSON.stringify(data, null, 4) + '</pre>';
  }
}

function getFetchOption(method, token, body) {
  return {
    method: method === null ? 'GET' : method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? body : null,
  };
}

function tokenIsNotValid(jsonData) {
  if (jsonData.code && jsonData.code === 'token_not_valid') {
    return false;
  }
  return true;
}

function getProductList() {
  const endpoint = `${BASE_ENDPOINT}/products/`;
  const token = localStorage.getItem('access');
  const options = getFetchOption('GET', token);

  fetch(endpoint, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const validData = tokenIsNotValid(data);
      if (validData) {
        writeToContent(data, contentContainer);
      }
    });
}
getProductList();
