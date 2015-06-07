import Ember from 'ember';

function lookupValidator(container, obj) {
	var typeKey = obj.type;

	var validatorClass = container.lookupFactory('validator:' + typeKey) ||
		container.lookupFactory('ember-cli-data-validation@validator:' + typeKey);

	Ember.assert('Could not find Validator `' + typeKey + '`.', typeof validatorClass === 'function');

	var messageResolver = container.lookup('resolver:validation-message') ||
		container.lookupFactory('ember-cli-data-validation@resolver:validation-message');

	var value = obj.value;

	if(typeof value !== 'object') {
		value = {};
	}

	Ember.merge(value, {
		attribute: obj.attribute,
		messageResolver: messageResolver
	});

	validatorClass.typeKey = Ember.String.camelize(typeKey);

	return validatorClass.create(value);
}

/**
 * Validator Mixin to be used on a DS.Model.
 *
 * Exposes the validation functionality for Ember Models.
 *
 * @class ValidatorMixin
 */
export default Ember.Mixin.create({

	/**
	 * Resolves the List of Validators for a given attribute.
	 *
	 * @method validatorsFor
	 * @param  {Attribute}  attribute
	 * @return {Validator}
	 */
	validatorsFor: function(attribute) {
		var meta = attribute.options;
		var validations = Ember.get(meta, 'validation');

		if (Ember.isEmpty(validations)) {
			return [];
		}

		if (!Ember.isArray(validations)) {
			validations = [validations];
		}

		var validators = [];

		validations.forEach(function(validation) {
			var keys = Ember.keys(validation);

			keys.forEach(function(name) {
				validators.push({
					type: name,
					value: validation[name],
					attribute: attribute
				});
			});
		});

		return validators.map(function(validator) {
			return lookupValidator(this.container, validator);
		}, this);
	},

	/**
	 * Validate a single Attribute.
	 *
	 * If the Attribute has defined validation, it would try to resolve
	 * the the required Validators and run validation.
	 *
	 * For each failed validation, error message is added to the Errors
	 * object for it's attribute name.
	 *
	 * @param  {Attribute} attribute
	 * @private
	 */
	_validateAttribute: function(attribute) {
		var validators = this.validatorsFor(attribute),
			name = attribute.name;

		var errors = this.get('errors');

		validators.forEach(function(validator) {
			var result = validator.validate(name, this.get(name), attribute, this);

			if(typeof result === 'string') {
				errors.add(name, result);
			}
		}, this);
	},

	/**
	 * Validates the Model.
	 *
	 * If the Model is valid, this method would return `true`.
	 *
	 * If the validation fails, Model Errors would be populated
	 * by validation errors and it would transition into an invalid
	 * state.
	 *
	 * @return {Boolean}
	 */
	validate: function() {
		var errors = this.get('errors'),
			store = this.get('store');


		errors.clear();

		this.eachAttribute(function(key, attribute) {
			Ember.run(this, '_validateAttribute', attribute);
		}, this);

		var isValid = Ember.get(errors, 'isEmpty');

		if(!isValid) {
			this.transitionTo('updated.uncommitted');
        	store.recordWasInvalid(this, errors);
		}

		return isValid;
	},

	save: function() {
		var isValid = this.validate();

		if(isValid) {
			return this._super();
		}

		return Ember.RSVP.reject(this.get('errors'));
	}
});
