import Ember from 'ember';

// Implement Ember.String.fmt function, to avoid depreciation warnings
function format(str, formats) {
	var cachedFormats = formats;

	if (!Ember.isArray(cachedFormats) || arguments.length > 2) {
		cachedFormats = new Array(arguments.length - 1);

		for (var i = 1, l = arguments.length; i < l; i++) {
			cachedFormats[i - 1] = arguments[i];
		}
	}

	var idx = 0;
	return str.replace(/%@([0-9]+)?/g, function(s, argIndex) {
		argIndex = (argIndex) ? parseInt(argIndex, 10) - 1 : idx++;
		s = cachedFormats[argIndex];
		return (s === null) ? '(null)' : (s === undefined) ? '' : Ember.inspect(s);
	});
}

/**
 * Validator Class used to perform specific Attribute
 * Validation.
 *
 * @class Validator
 * @extends {Ember.Object}
 */
export default Ember.Object.extend({

	/**
	 * Validation message that is returned when an
	 * Attribute is invalid.
	 *
	 * By default Message is resolved using the
	 * `MessageResolver`.
	 *
	 * @property message
	 * @type String
	 */
	message: Ember.computed('attribute', function() {
		var attribute = this.get('attribute');

		return this.messageResolver.resolve(this, attribute);
	}),

	/**
	 * Returns a label format of the attribute name
	 * to make it more readable for the user.
	 *
	 * If a `label` property is available in the Attribute description,
	 * for this Attribute, this would be returned.
	 *
	 * Otherwise we would try to format the label from the
	 * Attribute name.
	 *
	 * @property attributeLabel
	 * @type {String}
	 */
	attributeLabel: Ember.computed('attribute', function() {
		var attribute = this.get('attribute');

		if (Ember.isPresent(attribute.options.label)) {
			return attribute.options.label;
		}

		return attribute.name.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
			return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
		}).replace(/_/g, ' ');
	}),

	/**
	 * Validates the Model attribute.
	 *
	 * This method should return a `falsy` value if the validation
	 * passes the test.
	 *
	 * Otherwise an error message would be returned.
	 *
	 * This method should be implemented by all extending classes.
	 *
	 * @method validate
	 * @param  {String}    name      Attribute name
	 * @param  {*}         value     Attribute value
	 * @param  {Attribute} attribute Attribute
	 * @param  {DS.Model}  model     Model instance
	 * @return {String|Boolean}
	 */
	validate: function( /*attribute, value, meta, model*/ ) {
		throw new Ember.Error('You must implement `validate` method on your Validator.');
	},

	/**
	 * Formats the validation error message.
	 *
	 * All arguments passed to this function would be used by the
	 * `Ember.String.fmt` method to format the message.
	 *
	 * @method format
	 * @return {String}
	 */
	format: function() {
		var message = this.get('message'),
			label = this.get('attributeLabel');

		Ember.assert('Message must be defined for this Validator', Ember.isPresent(message));

		var args = Array.prototype.slice.call(arguments);

		args.unshift(label);
		args.unshift(message);

		return format.apply(null, args);
	}

});