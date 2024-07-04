import axios from 'axios';
const API_URL = process.env.REACT_APP_API_PROFILE_SERVICE_URL;

class HRdashboardService {
  //Get all employee information
  async GetEmployeeListDataRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'get',
      url: API_URL + url,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: ' Bearer ' + barrerToken,
      },
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  }

  //Create new employee information
  async createNewEmployeeRequest(url: any, postData: any, barrerToken: any) {
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
        return error.response;
      });
  }

  //update employeee information
  async updatEmployeeRequest(url: any, postData: any, barrerToken: any) {
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
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  }

  //Delete employee information
  async deleteEmployeeRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'DELETE',
      url: API_URL + url,
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
        return error.response;
      });
  }

  //Get all the managers list
  async GetmanagersListDataRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'get',
      url: API_URL + url,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: ' Bearer ' + barrerToken,
      },
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  }

  //Get all the Roles list
  async GetRolesListDataRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'get',
      url: API_URL + url,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: ' Bearer ' + barrerToken,
      },
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  }
  //Documents upload
  async uploadDocumentsDataRequest(url: any, postData: any, barrerToken: any) {
    return await axios({
      method: 'post',
      url: API_URL + url,
      data: postData,
      headers: {
        'content-type': 'multipart/form-data',
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

  //Get all the Assets list
  async GetAssetListDataRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'get',
      url: API_URL + url,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: ' Bearer ' + barrerToken,
      },
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  }

  async updateAssetsRequest(url: any, postData: any, barrerToken: any) {
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new HRdashboardService();
