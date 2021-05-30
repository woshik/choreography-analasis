import request from '@/utils/request';
import Service from './service';

export default class User extends Service {
  constructor() {
    const API = 'trainer';
    super(API);
  }

  profileUpdate(data) {
    return request({
      url: `${this.apiURL}/update`,
      method: 'patch',
      data,
    }).then((result) => result);
  }

  passwordUpdate(data) {
    return request({
      url: `${this.apiURL}/password`,
      method: 'patch',
      data,
    }).then((result) => result);
  }

  deactivateAccount() {
    return request({
      url: `${this.apiURL}/deactivate`,
      method: 'patch',
    }).then((result) => result);
  }

  login(params) {
    return request({
      url: `${this.apiURL}/login`,
      method: 'post',
      data: params,
    }).then((result) => result);
  }
}
