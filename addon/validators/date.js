import Validator from 'ember-cli-data-validation/validator';
import {
	hasValue,
	toDate
} from '../utils';

/**
 * Validator that checks if the Attribute value is a valid Date.
 *
 * @class DateValidator
 * @extends {Validator}
 */
export default Validator.extend({
	validate: function(name, value) {
		if(hasValue(value)) {
			const date = toDate(value);
		
			if(isNaN(date) || date === null) {
				return this.format(value);
			}
		}
	}
});