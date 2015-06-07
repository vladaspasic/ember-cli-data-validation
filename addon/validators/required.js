import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validator';

/**
 * Validator that checks if the value is set.
 *
 * @class  RequiredValidator
 * @extends {Validator}
 */
export default Validator.extend({
	validate: function(name, value) {
		if(!Ember.isPresent(value) || Ember.isEmpty(value)) {
			return this.format();
		}
	}
});
