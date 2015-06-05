import Ember from 'ember';

function lookupValidator(continer, obj) {
	var validatorClass = continer.lookupFactory('validator:' + obj.type);

	Ember.assert('Could not find Validator `' + obj.type + '`.', Ember.canInvoke(validatorClass));

	return validatorClass.create(obj.value);
}

/**
 * Validator Mixin to be used on Serializers.
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
	 * @param  {Object}    meta
	 * @return {Validator}
	 */
	validatorsFor: function(meta) {
		var validations = Ember.get(meta, 'validations');

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
					value: validation[name]
				});
			});
		});

		return validators.map(function(validator) {
			return lookupValidator(this.continer, validator);
		}, this);
	},

	validateAttribute: function(attribute, model) {
		var validators = this.validatorsFor(attribute.options),
			name = attribute.name;

		var errors = model.get('errors');

		validators.forEach(function(validator) {
			var result = validator.validate(attribute, model.get(name), model);

			if(typeof result === 'string') {
				errors.add(name, result);
			}
		});
	},

	serializeIntoHash: function(hash, typeClass, snapshot, options) {
		this._super(hash, typeClass, snapshot, options);

		typeClass.eachAttribute(function(key, attribute) {
			this.validateAttribute(attribute, typeClass);
		}, this);

		var errors = Ember.get(typeClass, 'errors');

		if(!Ember.get(errors, 'isEmpty')) {
			throw errors;
		}
	},
});
