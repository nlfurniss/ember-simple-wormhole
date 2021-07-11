[![CI](https://github.com/nlfurniss/ember-simple-wormhole/actions/workflows/CI.yml/badge.svg?branch=master)](https://github.com/nlfurniss/ember-simple-wormhole/actions/workflows/CI.yml)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/nlfurniss/ember-simple-wormhole)

# ember-simple-wormhole

This addon provides a component that allows for rendering a block in a DOM element somewhere else on the page. It's inspired by [ember-wormhole](https://github.com/yapplabs/ember-wormhole), but written using Octane idioms and leveraging the Ember helper [in-element](https://github.com/emberjs/ember.js/blob/master/packages/%40ember/-internals/glimmer/lib/syntax/in-element.ts).

## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v10 or above


## Installation

```
ember install ember-simple-wormhole
```


## Usage

### Basic example:
```
<div id="destination-elem">
  {{!-- Text will appear here --}}
</div>

<EmberSimpleWormhole @to="destination-string">
  <p>This text is rendered in "destination-string"</p>
</EmberSimpleWormhole>
```

### `renderInPlace` example:
```
<div id="destination-elem"></div>

<EmberSimpleWormhole @to="destination-string" @renderInPlace={{true}}>
  <p>This text is rendered in "destination-string"</p>
  {{!-- Text will appear here --}}
</EmberSimpleWormhole>
```

### Placement of destination elements
The destination element must be in the DOM when the wormhole component is invoked, otherwise it will not be found. For use cases such as a modal that could be triggered on multiple routes, consider placing the destination element in the application template to ensure it will always be present. 

### Mutliple wormholes with the same destination element
If multiple `EmberSimpleWormhole`s have the same destination element, content from each wormhole will be appended to the destination and will not override any existing markup.

### FastBoot
This component does not render inside FastBoot, as it's not possible to query the DOM to get the destination element.

## API reference
|  Option  | Type | Description |
|:---|:--------|:------------|
| @to | String/Element | The element into which the inner block should be rendered |
| @renderInPlace | Boolean | Instead of rendering the inner block in another element, it's rendered in line. **Note**: this overrides the `@to` argument |
