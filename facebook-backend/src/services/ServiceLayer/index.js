import axios from "axios";
import moment from "moment";
import https from "https";
import { config, CREDENTIALS, SAP_BASE_URL } from "../../constants/sap.js";

class ServiceLayer {
  constructor() {
    this.instance = null;
    this.sessionTimeout = 0;
    this.startSessionTime = null;
    this.endSessionTime = null;
    this.config = null;
  }

  async createSession(config, countPerPage) {
    this.config = config;
    axios.defaults.withCredentials = true;
    this.instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      baseURL: `${SAP_BASE_URL}`,
    });
    const result = await this.instance.post("Login", CREDENTIALS);
    this.instance.defaults.headers.common.Cookie = `B1SESSION=${result.data.SessionId};CompanyDB=${CREDENTIALS.CompanyDB};`;
    if (countPerPage !== undefined) {
      this.instance.defaults.headers.common["Prefer"] = `odata.maxpagesize=${countPerPage}`;
    }
    this.sessionTimeout = result.data.SessionTimeout;
    this.startSessionTime = moment();
    this.endSessionTime = moment();
    this.endSessionTime.add(this.sessionTimeout - 1, "minutes");
  }

  async refreshSession(count) {
    await this.createSession(config, count);
  }

  async get(resource, count) {
    try {
      await this.refreshSession(count);
      const result = await this.instance.get(resource);

      return result.data;
    } catch (error) {
      if (error.response) {
        console.error("ERROR RESPONSE SERVICE LAYER:");
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        return { error: true, message: error.response.data };
      }
      if (error.request) {
        console.error("ERROR REQUEST");
        return { error: true, message: "ERROR REQUEST" };
      }
      return { error: true, message: error.message };
    }
  }
}

export const sapService = new ServiceLayer();
