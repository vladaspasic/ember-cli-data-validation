import Validator from 'ember-cli-data-validation/validator';
import {
	hasValue
} from 'ember-cli-data-validation/utils';
/**
 * Validator that checks if the value is set.
 *
 * @class  RequiredValidator
 * @extends {Validator}
 */
export default Validator.extend({
	validate: function(name, value) {
		if(!hasValue(value)) {
			return this.format();
		}
	}
});
