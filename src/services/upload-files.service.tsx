import http from '../http-common';

// let tokensData = JSON.parse(sessionStorage.getItem('token'));

let tokensDataString = sessionStorage.getItem('token');
let tokensData: any;

if (tokensDataString) {
  tokensData = JSON.parse(tokensDataString);
} else {
  // Handle the case where tokensDataString is null
}

class UploadFilesService {
  upload(path: any, file: any, onUploadProgress: any) {
    let formData = new FormData();
    var url = process.env.REACT_APP_API_PROFILE_SERVICE_URL + '/api/' + path;
    formData.append('file', file);
    console.log(url);
    return http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: ' Bearer ' + tokensData.token,
      },
      onUploadProgress,
    });
  }

  // getFiles() {
  //   return http.get("/files");
  // }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UploadFilesService();
