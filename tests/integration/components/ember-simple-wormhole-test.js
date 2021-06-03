import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ember-simple-wormhole', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders content to the destination when "to" is a string', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <div id="test-div"></div>
      <EmberSimpleWormhole @to="test-div">
        Test Text
      </EmberSimpleWormhole>
    `);

    assert.dom('#test-div').hasText('Test Text');
  });

  test('it renders content to the destination when "to" is an element', async function (assert) {
    assert.expect(1);

    // Don't render the component until we can get the test dev element
    this.set('show', false);

    await render(hbs`
      <div id="test-div"></div>
      {{#if this.show}}
        <EmberSimpleWormhole @to={{this.testDivElem}}>
          Test Text
        </EmberSimpleWormhole>
      {{/if}}
    `);

    this.set('testDivElem', this.element.querySelector('#test-div'));
    this.set('show', true);

    assert.dom('#test-div').hasText('Test Text');
  });

  test('it throws an error if "to" is neither a string nor an Element (integer)', async function (assert) {
    assert.expect(1);

    setupOnerror((error) => {
      assert.ok(error.message.match('You passed: 13'));
    });

    this.set('toArg', 13);
    await render(hbs`
      <EmberSimpleWormhole @to={{this.toArg}}>
        Test Text
      </EmberSimpleWormhole>
    `);
  });

  test('it throws an error if "to" is neither a string nor an Element (undefined)', async function (assert) {
    assert.expect(1);

    setupOnerror((error) => {
      assert.ok(error.message.match('You passed: undefined'));
    });

    this.set('toArg', undefined);
    await render(hbs`
      <EmberSimpleWormhole @to={{this.toArg}}>
        Test Text
      </EmberSimpleWormhole>
    `);
  });

  test('it throws an error if "to" is neither a string nor an Element (null)', async function (assert) {
    assert.expect(1);

    setupOnerror((error) => {
      assert.ok(error.message.match('You passed: null'));
    });

    this.set('toArg', null);
    await render(hbs`
      <EmberSimpleWormhole @to={{this.toArg}}>
        Test Text
      </EmberSimpleWormhole>
    `);
  });

  test('it renders in place correctly', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <div id="test-div"></div>
      <EmberSimpleWormhole @to="test-div" @renderInPlace={{true}}>
        Test Text
      </EmberSimpleWormhole>
    `);

    assert.dom('#test-div').hasNoText();
    assert.dom(this.element).hasText('Test Text');
  });

  test('it appends additional content into the same destination', async function (assert) {
    assert.expect(2);

    this.set('renderSecondComponent', false);

    await render(hbs`
      <div id="test-div"></div>
      <EmberSimpleWormhole @to="test-div"}}>
        Test Text
      </EmberSimpleWormhole>
      {{#if this.renderSecondComponent}}
        <EmberSimpleWormhole @to="test-div">
          Appended Content
        </EmberSimpleWormhole>
      {{/if}}
    `);

    assert.dom('#test-div').hasText('Test Text');

    this.set('renderSecondComponent', true);

    assert
      .dom('#test-div')
      .hasText(
        'Test Text Appended Content',
        'Original and appended text are present'
      );
  });

  test('existing markup in the destination elem is preserved', async function (assert) {
    assert.expect(3);

    this.set('renderWormhole', false);

    await render(hbs`
      <div id="test-div">Existing Text</div>
      {{#if this.renderWormhole}}
        <EmberSimpleWormhole @to="test-div">
          Appended Text
        </EmberSimpleWormhole>
      {{/if}}
    `);

    assert
      .dom('#test-div')
      .hasText('Existing Text', 'Existing text is present');

    this.set('renderWormhole', true);
    assert
      .dom('#test-div')
      .hasText(
        'Existing Text Appended Text',
        'Original and appended text are present'
      );

    this.set('renderWormhole', false);
    assert
      .dom('#test-div')
      .hasText(
        'Existing Text',
        'Existing text is still present after the wormhole is removed'
      );
  });

  test('it does not render when isBrowser is false', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <div id="test-div"></div>
      <EmberSimpleWormhole @to="test-div" @isBrowser={{false}}>
        Test Text
      </EmberSimpleWormhole>
    `);

    assert.dom('#test-div').hasNoText();
  });
});
