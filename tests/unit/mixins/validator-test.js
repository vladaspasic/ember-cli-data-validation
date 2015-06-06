import Ember from 'ember';
import ValidatorMixin from 'ember-cli-data-validation/mixins/validator';
import { module, test } from 'qunit';

module('Unit | Mixin | validator');

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidatorObject = Ember.Object.extend(ValidatorMixin);
  var subject = ValidatorObject.create();
  assert.ok(subject);
});
