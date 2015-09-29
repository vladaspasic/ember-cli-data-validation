/**
 * Error thrown when a Model validation fails.
 *
 * This error contains the `DS.Errors` object from the Model.
 *
 * @class ValidationError
 * @extends {Error}
 * @param {Srting}    message
 * @param {DS.Errors} errors
 */
function ValidationError(message, errors) {
	Error.call(this, message);

	if (Error.captureStackTrace) {
		Error.captureStackTrace(this, ValidationError);
	}

	this.message = message;
	this.errors = errors;
}

ValidationError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: ValidationError
	},
	name: {
		value: 'ValidationError'
	}
});

export default ValidationError;
