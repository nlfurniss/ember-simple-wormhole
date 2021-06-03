import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CurrentUser extends Component {
  @tracked _name;

  get name() {
    return this._name ?? this.args.initialName;
  }

  updateName = ({ target }) => {
    this._name = target.value;
  };
}
