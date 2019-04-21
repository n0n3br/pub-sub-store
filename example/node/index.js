const Store = require('../../lib/index').default;

const store = new Store();

const callback = state => console.log(`received state -> ${JSON.stringify(state)}`);

const config = state => {
  return { name: state.name };
};

store.subscribe(callback, config);

store.setState({ name: 'Rogerio Luiz Aques de Amorim', age: 44 });

console.log(`store state ${JSON.stringify(store.state)}`);
