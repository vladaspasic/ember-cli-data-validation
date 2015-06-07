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
	message: '%@ must be checked',

	validate: function(name, value, attribute, model) {
		if (value !== 'true' && (!isBoolean(value) || value === false)) {
			var label = this.formatAttributeLabel(name, attribute, model);

			return this.format(label);
		}
	}
});
