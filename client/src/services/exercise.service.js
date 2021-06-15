import request from '@/utils/request';
import Service from './service';

export default class Exercise extends Service {
  constructor() {
    const API = 'exercise';
    super(API);
  }

  getAutomaticExercise(id) {
    return request({
      url: `${this.apiURL}/automatic/${id}`,
      method: 'get',
    }).then((result) => result);
  }

  assignAutomaticExercise(id, data) {
    return request({
      url: `${this.apiURL}/assign/${id}`,
      method: 'post',
      data,
    }).then((result) => result);
  }
}
