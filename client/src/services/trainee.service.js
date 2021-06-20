import request from '@/utils/request';
import Service from './service';

export default class Trainee extends Service {
  constructor() {
    const API = 'trainee';
    super(API);
  }

  resetPassword(data) {
    return request({
      url: `${this.apiURL}/reset`,
      method: 'patch',
      data,
    }).then((result) => result);
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

  assignExercise(id, data) {
    return request({
      url: `${this.apiURL}/assign/${id}`,
      method: 'post',
      data,
    }).then((result) => result);
  }

  getActiveExerciseList() {
    return request({
      url: `${this.apiURL}/active-exercise`,
      method: 'get',
    }).then((result) => result);
  }

  getExerciseData(id) {
    return request({
      url: `${this.apiURL}/active-exercise/${id}`,
      method: 'get',
    }).then((result) => result);
  }

  exercisePerformed(id, data) {
    return request({
      url: `${this.apiURL}/performed/${id}`,
      method: 'post',
      data,
    }).then((result) => result);
  }

  getCompleteExerciseList(id) {
    return request({
      url: `${this.apiURL}/complete-exercise/${id}`,
      method: 'get',
    }).then((result) => result);
  }

  getExerciseReport(id, exerciseId) {
    return request({
      url: `${this.apiURL}/complete-exercise/${id}/${exerciseId}`,
      method: 'get',
    }).then((result) => result);
  }

  login(params) {
    return request({
      url: `${this.apiURL}/login`,
      method: 'post',
      data: params,
    }).then((result) => result);
  }

  getAutomaticExerciseList() {
    return request({
      url: `${this.apiURL}/automatic-exercise`,
      method: 'get',
    }).then((result) => result);
  }

  getAutomaticExercise(id) {
    return request({
      url: `${this.apiURL}/automatic-exercise/${id}`,
      method: 'get',
    }).then((result) => result);
  }

  automaticExerciseCount(id) {
    return request({
      url: `${this.apiURL}/automatic-exercise/count/${id}`,
      method: 'post',
    }).then((result) => result);
  }
}
