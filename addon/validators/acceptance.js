import Validator from 'ember-cli-data-validation/validator';

function isBoolean(obj) {
    return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
}

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
