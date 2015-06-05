import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validator';

/**
 * Validator that could be used to validate maximum length,
 * if the attribute is String, or to validate the maximum value
 * if the Attribute is a Number.
 *
 * @class  MaxValidator
 * @extends {Validator}
 */
export default Validator.extend({
	/**
	 * Max value for the validator.
	 *
	 * @property max
	 * @type {Number}
	 * @default null
	 */
	max: null,

	validate: function(name, value, attribute, model) {
		var type = attribute.type,
			maxValue = this.get('max');

		Ember.assert('You must define a `max` for RangeValidator', Ember.isPresent(maxValue));

		var invalid = false;

		if (type === 'number' && value > maxValue) {
			invalid = true;
		} else if (type === 'string' && value.length > maxValue) {
			invalid = true;
		} else {
			// it is invalid cause it should be a number or a string
			invalid = true;
		}

		if(invalid) {
			var label = this.formatAttributeLabel(name, attribute, model);

			return this.format(label, maxValue);
		}
	}
});
