import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validator';

/**
 * Validator that could be used to validate minimum length,
 * if the attribute is String, or to validate the minimum value
 * if the Attribute is a Number.
 *
 * @class  MinValidator
 * @extends {Validator}
 */
export default Validator.extend({
	/**
	 * Min value for the validator.
	 *
	 * @property min
	 * @type {Number}
	 * @default null
	 */
	min: null,

	validate: function(name, value, attribute, model) {
		var type = attribute.type,
			minValue = this.get('min');

		Ember.assert('You must define a `min` for RangeValidator', Ember.isPresent(minValue));

		var invalid = false;

		if (type === 'number' && value < minValue) {
			invalid = true;
		} else if (type === 'string' && value.length < minValue) {
			invalid = true;
		} else {
			// it is invalid cause it should be a number or a string
			invalid = true;
		}

		if(invalid) {
			var label = this.formatAttributeLabel(name, attribute, model);

			return this.format(label, minValue);
		}
	}
});
