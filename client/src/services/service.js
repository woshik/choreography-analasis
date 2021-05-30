import request from '@/utils/request';

export default class Service {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  add(data) {
    return request({
      url: this.apiURL,
      method: 'post',
      data,
    }).then((result) => result);
  }

  get(params) {
    return request({
      url: this.apiURL,
      method: 'get',
      params,
    }).then((result) => result);
  }

  getTotalCount() {
    return request({
      url: `${this.apiURL}/count`,
      method: 'get',
    }).then((result) => result);
  }

  getById(id) {
    return request({
      url: `${this.apiURL}/${id}`,
      method: 'get',
    }).then((result) => result);
  }

  update(id, data) {
    return request({
      url: `${this.apiURL}/${id}`,
      method: 'patch',
      data,
    }).then((result) => result);
  }

  delete(data) {
    return request({
      url: `${this.apiURL}`,
      method: 'delete',
      data,
    }).then((result) => result);
  }
}
