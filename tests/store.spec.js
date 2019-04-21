import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Store from '../src/store';
chai.use(sinonChai);

describe('store', () => {
  let instance;
  beforeEach(() => {
    instance = new Store({ a: 1 });
  });
  describe('smoke tests', () => {
    it('should have a state', () => {
      expect(instance.state).not.to.be.undefined;
    });
    it('should have a setState method', () => {
      expect(instance.setState).to.be.a('function');
    });
    it('should have a subscribe method', () => {
      expect(instance.subscribe).to.be.a('function');
    });
    it('should not expose #internalState', () => {
      expect(instance['#internalState']).to.be.undefined;
    });
  });

  describe('state', () => {
    it('should accept only object as paramenter', () => {
      expect(() => {
        const a = new Store(() => true);
      }).to.throw;
      expect(() => {
        const a = new Store(1);
      }).to.throw;
      expect(() => {
        const a = new Store('a');
      }).to.throw;
      expect(() => {
        const a = new Store(true);
      }).to.throw;
      expect(() => {
        const a = new Store({});
      }).not.to.throw;
    });
    it('should have an empty state if none is passed', () => {
      const a = new Store();
      expect(a.state).to.be.eql({});
    });
    it('should accept initial state as parameter', () => {
      expect(instance.state).to.be.eql({ a: 1 });
    });
    it('should let you mutate the state directly', () => {
      instance.state = { a: 2 };
      expect(instance.state).to.be.eql({ a: 1 });
    });
  });

  describe('setState', () => {
    it('should accept only object as parameter', () => {
      expect(() => instance.setState(1)).to.throw;
      expect(() => instance.setState(() => true)).to.throw;
      expect(() => instance.setState(false)).to.throw;
      expect(() => instance.setState('a')).to.throw;
      expect(() => instance.setState()).to.throw;
      expect(() => instance.setState({ a: 1 })).not.to.throw;
    });
    it('should mutate the state correctly', () => {
      const value = { f: 2, b: [{ c: 1, d: 2 }, { e: true }] };
      const expectedState = { a: 1, f: 2, b: [{ c: 1, d: 2 }, { e: true }] };
      instance.setState(value);
      expect(instance.state).to.be.eql(expectedState);
      value.f = 3;
      expect(instance.state).to.be.eql(expectedState);
    });
    it('should call subscribed callback when subscribed value changed', () => {
      const fna = sinon.fake();
      const fnb = sinon.fake();
      const configa = state => {
        return {
          a: state.a,
        };
      };
      const configb = state => {
        return {
          b: state.b,
        };
      };
      instance.subscribe(fna, configa);
      instance.subscribe(fnb, configb);
      instance.setState({ a: 2, b: 3 });
      expect(fna).to.be.calledOnceWith({ a: 2 });
      expect(fnb).to.be.calledOnceWith({ b: 3 });
    });
    it("should't call subscribed callback when not subscribed value change", () => {
      const fna = sinon.fake();
      const configa = state => {
        return {
          a: state.a,
        };
      };
      instance.subscribe(fna, configa);
      instance.setState({ b: 2 });
      expect(fna).not.to.be.called;
    });
  });
});
