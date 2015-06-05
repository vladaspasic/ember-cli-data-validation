import Ember from 'ember';

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
	 * @property message
	 * @type String
	 * @default null
	 */
	message: null,

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
	validate: function(/*attribute, value, meta, model*/) {
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
		var message = this.get('message');

		Ember.assert('Message must be defined for this Validator', Ember.isPresent(message));

		var args = Array.prototype.slice.call(arguments);

		args.unshift(message);

		return Ember.String.fmt.apply(args);
	},

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
	 * @method formatAttributeLabel
	 * @param  {String}    name      Attribute name
	 * @param  {Attribute} attribute Attribute
	 * @param  {DS.Model}  model     Model instance
	 * @return {String}
	 */
	formatAttributeLabel: function(attribute, attribute/*, model*/) {
		if (Ember.isPresent(attribute.options.label)) {
			return attribute.options.label;
		}

		return attribute.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
			return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
		}).replace(/_/g, ' ');
	}

});
