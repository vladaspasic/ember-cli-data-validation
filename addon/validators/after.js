import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validator';
import {
	hasValue,
	toDate
}
from '../utils';

/**
 * Validator that checks if the Attribute value 
 * is after the specified date
 *
 * @class DateAfterValidator
 * @extends {Validator}
 */
export default Validator.extend({

	/**
	 * after Date to be compared
	 *
	 * @property after
	 * @type {Date|Function}
	 * @default null
	 */
	after: null,

	validate: function(name, value, attribute, model) {
		if(hasValue(value)) {
			const date = toDate(value);
			const after = this._resolveAfterDate(model);

			if(this._compareDates(date, after)) {
				return this.format(date, after);
			}
		}
	},

	/**
	 * Resolves the `after` property to a Valid Date.
	 *
	 * If the property is a function, it would be invoked
	 * with a Model instance context.
	 *
	 * @method _resolveAfterDate
	 * @private
	 * @param  {DS.Model} model
	 * @return {Date}
	 */
	_resolveAfterDate: function(model) {
		let after = this.get('after');

		if(Ember.typeOf(after) === 'function') {
			after = Ember.run(model, after);
		}

		Ember.assert('You must define a `after` Date for DateAfterValidator', Ember.isPresent(after));

		return toDate(after);
	},

	/**
	 * Compares the two given Dates.
	 *
	 * @method _compareDates
	 * @private
	 * @param  {Date} date
	 * @param  {Date} after
	 * @return {Boolean}
	 */
	_compareDates: function(date, after) {
		return !!(date && after && date < after);
	}
});