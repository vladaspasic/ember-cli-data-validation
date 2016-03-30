import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/before';

var attribute = {
	options: {},
	name: 'Date'
};

var validator = Validator.create({
	message: '%@ must be before the set date',
	before: function() {
		return new Date();
	},
	attribute: attribute
});

module('Date Before Validator test');

test('validate', function() {
	deepEqual(validator.validate('date', Date.now() - 1000, attribute, {}), undefined);
	deepEqual(validator.validate('date', 'Mon Aug 17 2001 00:24:56 GMT-0500 (CDT)', attribute, {}), undefined);
	deepEqual(validator.validate('date', 'Tue, 15 Nov 2000 12:45:26 GMT', attribute, {}), undefined);

	// Should not validate empty values
	deepEqual(validator.validate('date', null, attribute, {}), undefined);
	deepEqual(validator.validate('date', undefined, attribute, {}), undefined);
	deepEqual(validator.validate('date', false, attribute, {}), undefined);
	deepEqual(validator.validate('date', '', attribute, {}), undefined);
	deepEqual(validator.validate('date', [], attribute, {}), undefined);

	deepEqual(validator.validate('date', Date.now() + (10 * 60 * 1000), attribute, {}), 'Date must be before the set date');
	deepEqual(validator.validate('date', 'Mon Aug 17 2045 00:24:56 GMT-0500 (CDT)', attribute, {}), 'Date must be before the set date');
	deepEqual(validator.validate('date', 'Tue, 15 Nov 2045 12:45:26 GMT', attribute, {}), 'Date must be before the set date');
});
