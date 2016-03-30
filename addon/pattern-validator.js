import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validator';
import {
	hasValue
} from 'ember-cli-data-validation/utils';

/**
 * Validator that uses a RegExp pattern to test
 * the attribute value.
 *
 * You should be able to create a PatternValidator by
 * just assigning a `pattern` value.
 *
 * @class PatternValidator
 * @extends {Validator}
 */
export default Validator.extend({

	/**
	 * RegExp like pattern that would be used to test
	 * the Attribute value.
	 *
	 * @property pattern
	 * @type {RegExp}
	 * @default null
	 */
	pattern: null,

	validate: function(name, value /*, attribute, model*/) {
		const pattern = this.get('pattern');

		Ember.assert('You must define a RegExp pattern in order to validate.', pattern instanceof RegExp);

		if (hasValue(value) && !value.toString().match(pattern)) {
			return this.format();
		}
	},
});
