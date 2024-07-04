import axios from 'axios';
//import authHeader from './AuthHeader';

const API_URL = process.env.REACT_APP_API_PROFILE_SERVICE_URL;
const devURL = process.env.REACT_APP_API_LEAVE_SERVICE_URL;

class UserService {
  async getProfileRequest(url: any, barrerToken: any) {
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
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async postRequest(url: any, postData: any, barrerToken: any) {
    return await axios({
      method: 'post',
      url: url,
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

  async getProfilePictureURLRequest(url: any, barrerToken: any) {
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
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async getProfilePrivateRequest(url: any, barrerToken: any) {
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
        return error;
      });
  }

  async updateProfileDataRequest(url: any, postData: any, barrerToken: any) {
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
        return error;
      });
  }

  /* Get Bank Details */
  async getGetBankDetailsRequest(url: any, barrerToken: any) {
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
        return error;
      });
  }

  async updateBankDetailsRequest(url: any, postData: any, barrerToken: any) {
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

  /* Get Documents Details */
  async GetDocumentListRequest(url: any, barrerToken: any) {
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
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

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

  async uploadBankDocumentRequest(url: any, postData: any, barrerToken: any) {
    return await axios({
      method: 'post',
      url: API_URL + url,
      data: postData,
      headers: {
        //"content-type": "multipart/form-data",
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

  async deleteDocumentRequest(url: any, barrerToken: any, filename: any) {
    return await axios({
      method: 'delete',
      url: API_URL + url,
      headers: {
        'Content-Type': 'text/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: ' Bearer ' + barrerToken,
      },
    })
      .then((response: any) => response.blob())
      .then((response) => {
        // create "a" HTML element with href to file & click
        const href = URL.createObjectURL(response);
        console.log(href);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', filename); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch(function (error) {
        return error;
      });
  }
  async downloadDocumentRequest(url: any, barrerToken: any) {
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
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
  /**********************Get Assets data********************** */
  async GetAssetsListDataRequest(url: any, barrerToken: any) {
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
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
  /**********************Get Leaves data********************** */

  async GetLeavesListDataRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'get',
      url: devURL + url,
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

  async GetLeavesConfigurationDataRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'get',
      url: devURL + url,
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

  async GetCaluclateLeavesDataRequest(
    url: any,
    postData: any,
    barrerToken: any
  ) {
    return await axios({
      method: 'post',
      url: devURL + url,
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

  async createNewLeaveRequest(url: any, postData: any, barrerToken: any) {
    return await axios({
      method: 'post',
      url: devURL + url,
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

  async GetLeavesHistoryListDataRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'get',
      url: devURL + url,
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

  async GetManagerLeavesListDataRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'get',
      url: devURL + url,
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

  async ApproveLeavesRequest(url: any, postData: any, barrerToken: any) {
    return await axios({
      method: 'post',
      url: devURL + url,
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
  async DeleteLeavesRequest(url: any, barrerToken: any) {
    return await axios({
      method: 'delete',
      url: devURL + url,
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

  /* getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }*/
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
