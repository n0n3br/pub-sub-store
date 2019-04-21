import isObject from 'lodash/isObject';
import cloneDeep from 'lodash/cloneDeep';
import Pubsub from './pubsub';

class Store {
  #internalState;

  #pubsub;

  constructor(initialState = {}) {
    if (!isObject(initialState)) throw new Error('initial state must be a object');
    this.#internalState = initialState;
    this.#pubsub = new Pubsub();
  }

  get state() {
    return cloneDeep(this.#internalState);
  }

  set state(value) {
    return value;
  }

  setState(v) {
    if (!isObject(v)) throw new Error('paramenter should be a object');
    const oldState = cloneDeep(this.#internalState);
    const value = cloneDeep(v);
    const newState = Object.assign(this.#internalState, value);
    this.#pubsub.publish(newState, oldState);
    this.#internalState = newState;
  }

  subscribe(callback, config) {
    this.#pubsub.subscribe(callback, config);
  }
}

export default Store;
