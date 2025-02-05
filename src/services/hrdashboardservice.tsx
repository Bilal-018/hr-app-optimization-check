import axios from 'axios';
const API_URL = process.env.REACT_APP_API_PROFILE_SERVICE_URL;

class HRdashboardService {
  //Get all employee information
  async GetEmployeeListDataRequest(url: any, barrerToken: any) {
    try {
      const response = await axios({
        method: 'get',
        url: API_URL + url,
        headers: {
          'Content-Type': 'text/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: ' Bearer ' + barrerToken,
        },
      })
      return response;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }

  //Create new employee information
  async createNewEmployeeRequest(url: any, postData: any, barrerToken: any) {
    try {
      const response = await axios({
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
      return response.data;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }

  //update employeee information
  async updatEmployeeRequest(url: any, postData: any, barrerToken: any) {
    try {
      const response = await axios({
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
      return response;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }

  //Delete employee information
  async deleteEmployeeRequest(url: any, barrerToken: any) {
    try {
      const response = await axios({
        method: 'DELETE',
        url: API_URL + url,
        headers: {
          'Content-Type': 'text/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: ' Bearer ' + barrerToken,
        },
      })
      return response.data;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }

  //Get all the managers list
  async GetmanagersListDataRequest(url: any, barrerToken: any) {
    try {
      const response = await axios({
        method: 'get',
        url: API_URL + url,
        headers: {
          'Content-Type': 'text/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: ' Bearer ' + barrerToken,
        },
      })
      return response;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }

  //Get all the Roles list
  async GetRolesListDataRequest(url: any, barrerToken: any) {
    try {
      const response = await axios({
        method: 'get',
        url: API_URL + url,
        headers: {
          'Content-Type': 'text/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: ' Bearer ' + barrerToken,
        },
      })
      return response;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }
  //Documents upload
  async uploadDocumentsDataRequest(url: any, postData: any, barrerToken: any) {
    try {
      const response = await axios({
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
      return response.data;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }

  //Get all the Assets list
  async GetAssetListDataRequest(url: any, barrerToken: any) {
    try {
      const response = await axios({
        method: 'get',
        url: API_URL + url,
        headers: {
          'Content-Type': 'text/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: ' Bearer ' + barrerToken,
        },
      })
      return response;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }

  async updateAssetsRequest(url: any, postData: any, barrerToken: any) {
    try {
      const response = await axios({
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
      return response.data;
    } catch (error) {
      return this.handleError(error, barrerToken);
    };
  }

  private async handleError(error: any, barrerToken: any) {
    if (error.response && error.response.status === 401) {
      const authDataString = sessionStorage.getItem('token');
      if (!authDataString) {
        // Handle the case where authData is null
        return Promise.reject(error);
      }

      const authData = JSON.parse(authDataString);

      const payload = {
        email: authData.employeedetail.email,
        refreshToken: authData.refreshToken,
      };

      let apiResponse = await axios.post(
        API_URL + 'api/Authenticate/RefreshToken',
        payload
      );
      if (apiResponse.data.status && apiResponse.data.status != 'Error')
        sessionStorage.setItem('token', JSON.stringify(apiResponse.data));

      error.config.headers.Authorization = 'Bearer ' + apiResponse.data.token;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new HRdashboardService();
