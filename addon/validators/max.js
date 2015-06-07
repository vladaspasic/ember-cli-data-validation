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

	message: '%@ must not be longer/bigger than %@',
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

		Ember.assert('You must define a `max` for MaxValidator', Ember.isPresent(maxValue));

		var invalid = true;

		if(type === 'string') {
			value = value && value.length || 0;
		}

		if (value && (type === 'number' || type === 'string')) {
			invalid = value > maxValue;
		}

		if(invalid) {
			var label = this.formatAttributeLabel(name, attribute, model);

			return this.format(label, maxValue);
		}
	}
});
