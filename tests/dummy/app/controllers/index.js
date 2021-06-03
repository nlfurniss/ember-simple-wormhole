import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked renderInPlace = false;

  @tracked showDemoElemWormhole = true;

  initialName = 'Tomster';

  get demoElem() {
    return document.getElementById('destination-elem');
  }

  toggleRenderInPlace = () => {
    this.renderInPlace = !this.renderInPlace;
  };

  toggleShowingWormhole = () => {
    this.showDemoElemWormhole = !this.showDemoElemWormhole;
  };
}
