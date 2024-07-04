import axios from 'axios';
// import FileSaver from 'file-saver';

// let tokensData = JSON.parse(sessionStorage.getItem('token'));

let tokensDataString = sessionStorage.getItem('token');
let tokensData: any;

if (tokensDataString) {
  tokensData = JSON.parse(tokensDataString);
} else {
  // Handle the case where tokensDataString is null
}

const API_URL = process.env.REACT_APP_API_PROFILE_SERVICE_URL + '/api/';

export const getPayslips = async (url: any) => {
  return await axios({
    method: 'get',
    url: API_URL + url,
    headers: {
      'Content-Type': 'text/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: ' Bearer ' + tokensData.token,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export const deletePayslip = async (url: any) => {
  return await axios({
    method: 'delete',
    url: API_URL + url,
    headers: {
      'Content-Type': 'text/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: ' Bearer ' + tokensData.token,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const downloadPayslip = async (url: any) => {
  return await axios({
    url: API_URL, //your url
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    console.log(response);
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);
    console.log(href);
    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createRequest = (url: any) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.setRequestHeader('Content-Type', '');
  request.setRequestHeader('Authorization', 'Bearer: ');
  request.responseType = 'blob';
  return request;
};

export const getFileName = (xhr: any) => {
  var filename = '';
  var disposition = xhr.getResponseHeader('Content-Disposition');
  if (disposition && disposition.indexOf('attachment') !== -1) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }
  return filename;
};
