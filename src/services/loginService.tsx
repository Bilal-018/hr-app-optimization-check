import axios from 'axios';
//import authHeader from './AuthHeader';

const API_URL = process.env.REACT_APP_API_PROFILE_SERVICE_URL;

class loginService {
  async validateLoginUserRequest(url: any, postData: any) {
    return await axios({
      method: 'post',
      url: API_URL + url,
      data: postData,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async authenticatingUserTokenRequest(url: any, token: any) {
    return await axios({
      method: 'post',
      url: API_URL + url,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: ' Bearer ' + token,
      },
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async updateFirsttimePasswordRequest(
    url: any,
    postData: any,
    barrerToken: any
  ) {
    return await axios({
      method: 'post',
      url: API_URL + url,
      data: postData,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: ' Bearer ' + barrerToken,
      },
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async updateforgetPasswordRequest(url: any, postData: any) {
    return await axios({
      method: 'post',
      url: API_URL + url,
      data: postData,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async getTokenrequest(url: any, postData: any) {
    return await axios({
      method: 'get',
      url: API_URL + url,
      data: postData,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new loginService();
