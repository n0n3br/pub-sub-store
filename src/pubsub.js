import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';

class PubSub {
  constructor() {
    this.callbackList = [];
  }

  publish(newState, oldState) {
    if (!isObject(newState)) throw new Error('pubsub.publish -> newState should be and object');
    if (!isObject(oldState))
      throw new Error('pubsub.publish -> previsouState should be and object');
    this.callbackList.forEach(item => {
      const newValue = item.config(newState);
      const oldValue = item.config(oldState);
      if (!isEqual(newValue, oldValue)) {
        item.callback(newValue);
      }
    });
  }

  subscribe(callback, config) {
    if (typeof callback !== 'function')
      throw new Error('pubsub.subscribe -> callback should be a function');
    if (typeof config !== 'function')
      throw new Error('pubsub.subscribe -> config should be a function');
    this.callbackList = [
      ...this.callbackList,
      {
        callback,
        config,
      },
    ];
    return true;
  }
}

export default PubSub;
