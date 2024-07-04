import axios from 'axios';

const base_url = process.env.REACT_APP_API_PROFILE_SERVICE_URL + '/api/';

const barrerToken = sessionStorage.getItem('token_key');
const empId = sessionStorage.getItem('empId_key');

const skills = axios.create({
  baseURL: base_url,
  headers: {
    'Content-Type': 'text/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: ' Bearer ' + barrerToken,
  },
});

class SkillsService {
  async getSkillDashboardForManagers() {
    return await skills
      .get('/GetSkillDashboardForManager')
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  //

  async getSkillConfigurations() {
    return await skills
      .get('/SkillConfiguration/GetSkillConfigurationList')
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }

  async getSkillExpertiesConfigurations() {
    return await skills
      .get('/SkillConfiguration/GetSkillExpertiseList')
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }

  async GetSkillListDataRequest(empployeeDetailId = empId) {
    return await skills
      .get(
        '/EmployeeSkill/GetSkillDashboardByEmployeeDetailId?EmployeeDetailId=' +
          empployeeDetailId
      )
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async deleteSkillRequest(id: any) {
    return await skills
      .delete('/EmployeeSkill/DeleteEmployeeSkills?EmployeeSkillId=' + id)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async createNewSkillRequest(url: any, postData: any, barrerToken: any) {
    return await axios({
      method: 'post',
      url: base_url + url,
      data: postData,
      headers: {
        //"content-type": "multipart/form-data",
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
  //
  //manager
  async GetManagerSkillListDataRequest() {
    return await skills
      .get('/SkillManager/GetSkillDashboardForManager')
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async GetSkillDashboardByExpertise() {
    return await skills
      .get('/GetSkillDashboardByExpertise')
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async GetSkillByEmployeeDetailId(empployeeDetailId = empId) {
    return await skills
      .get(`/GetSkillByEmployeeDetailId?EmployeeDetailId=${empployeeDetailId}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }

  async GetSkillDetailBySkillConfigurationId(
    skillConfigurationId: any,
    skillExpertise: any
  ) {
    return await skills
      .get(
        `/GetSkillDetailBySkillConfigurationId?SkillExpertise=${skillExpertise}&SkillConfigurationId=${skillConfigurationId}`
      )
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
}

export default SkillsService;
