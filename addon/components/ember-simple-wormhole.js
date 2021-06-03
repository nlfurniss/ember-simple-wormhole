import Ember from 'ember';
import Component from '@glimmer/component';

export default class EmberSimpleWormhole extends Component {
  // We allow isBrowser to be passed in for testing purposes only
  get isBrowser() {
    if (Ember.testing && this.args.isBrowser !== undefined) {
      return this.args.isBrowser;
    }
    return typeof FastBoot === 'undefined';
  }

  get destinationElement() {
    const { to: toArg } = this.args;

    if (typeof toArg !== 'string') {
      if (!(toArg instanceof Element)) {
        throw new Error(
          `The "to" argument must be a string or a DOM element. You passed: ${toArg}`
        );
      }
    }

    const destinationElement =
      toArg instanceof Element ? toArg : document.getElementById(toArg);
    if (destinationElement == null) {
      throw new Error(`Could not find ${toArg} in the DOM`);
    }

    return destinationElement;
  }

  get renderInPlace() {
    return this.args.renderInPlace ?? false;
  }
}
