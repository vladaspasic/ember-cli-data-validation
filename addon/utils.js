import Ember from 'ember';

/**
 * Determines whether or not a value is empty
 *
 * @param  {*}  value
 * @return {Boolean}
 */
export function hasValue(value) {
	return Ember.isPresent(value) || !Ember.isEmpty(value);
}

/**
 * Determines if the value is Boolean.
 *
 * @param  {*}  obj
 * @return {Boolean}
 */
export function isBoolean(obj) {
	return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
}

/**
 * Converts the input to Date instance.
 *
 * If the value can not be converted, `null` is returned.
 * 
 * @param  {*} value
 * @return {Date}
 */
export function toDate(value) {
	if (Object.prototype.toString.call(value) === '[object Date]') {
		return value;
	}

	if (typeof value === 'number') {
		value = new Date(value);
	} else {
		value = Date.parse(value);
	}
	
	return !isNaN(value) ? new Date(value) : null;
}