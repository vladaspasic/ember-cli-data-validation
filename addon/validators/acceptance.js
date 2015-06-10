import Validator from 'ember-cli-data-validation/validator';
import {
	isBoolean
} from 'ember-cli-data-validation/utils';

/**
 * Acceptance Validator used to validate boolean like
 * Attributes.
 *
 * @class  AcceptanceValidator
 * @extends {Validator}
 */
export default Validator.extend({
	validate: function(name, value) {
		if (value !== 'true' && (!isBoolean(value) || value === false)) {
			return this.format();
		}
	}
});
