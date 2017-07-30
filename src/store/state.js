import _ from 'lodash';

export default class State {
  constructor() {
    this._data = {};
  }
  
  getByPath(path, defaultValue) {
    return _.get(this._data, path, defaultValue);
  }
}