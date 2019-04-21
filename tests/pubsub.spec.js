import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Pubsub from '../src/pubsub';

chai.use(sinonChai);

describe('pubsub', () => {
  let instance;

  beforeEach(() => {
    instance = new Pubsub();
  });

  describe('smoke tests', () => {
    it('should expose publish method', () => {
      expect(instance.publish).to.be.a('function');
    });
    it('should expose subscribe method', () => {
      expect(instance.subscribe).to.be.a('function');
    });
  });

  describe('subscribe', () => {
    it('should accept only functions as arguments', () => {
      expect(() => instance.subscribe(() => true, () => false)).not.to.throw;
      expect(() => instance.subscribe(1, 2)).to.throw;
      expect(() => instance.subscribe(1, () => true)).to.throw;
      expect(() => instance.subscribe(() => true, 2)).to.throw;
    });

    it('should add item to callbakList', () => {
      instance.subscribe(() => 1, () => 2);
      expect(instance.callbackList.length).to.be.equal(1);
      expect(instance.callbackList[0].callback()).to.be.equal(1);
      expect(instance.callbackList[0].config()).to.be.equal(2);
    });
  });
  describe('publish', () => {
    it('should accept only objects as arguments', () => {
      expect(() => instance.publish({}, {}).not.to.throw);
      expect(() => instance.publish(1, {}).to.throw);
      expect(() => instance.publish({}, () => 3).to.throw);
    });
    it('should call the callback function when needed', () => {
      const callback = sinon.fake();
      const config = state => {
        return { a: state.a };
      };
      instance.subscribe(callback, config);
      instance.publish({ a: 1 }, {});
      expect(callback).to.be.calledOnceWith({ a: 1 });
    });
    it("should't call the callback function when not needed", () => {
      const callback = sinon.fake();
      const config = state => {
        return { a: state.a };
      };
      instance.subscribe(callback, config);
      instance.publish({ a: 1, b: 2 }, { a: 1 });
      expect(callback).not.to.be.called;
    });
  });
});
