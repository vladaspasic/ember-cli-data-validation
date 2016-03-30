import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/date';

var attribute = {
	options: {},
	name: 'Date'
};

var validator = Validator.create({
	message: '%@ must be a date',
	attribute: attribute
});

module('Date Validator test');

test('validate', function() {
	deepEqual(validator.validate('date', Date.now(), attribute, {}), undefined);
	deepEqual(validator.validate('date', new Date(), attribute, {}), undefined);
	deepEqual(validator.validate('date', new Date().toISOString(), attribute, {}), undefined);
	deepEqual(validator.validate('date', '2/22/23', attribute, {}), undefined);
	deepEqual(validator.validate('date', '11/2/23 12:24', attribute, {}), undefined);
	deepEqual(validator.validate('date', 'Mon Aug 17 2015 00:24:56 GMT-0500 (CDT)', attribute, {}), undefined);
	deepEqual(validator.validate('date', 'Tue, 15 Nov 1994 12:45:26 GMT', attribute, {}), undefined);

	// Should not validate empty values
	deepEqual(validator.validate('date', null, attribute, {}), undefined);
	deepEqual(validator.validate('date', undefined, attribute, {}), undefined);
	deepEqual(validator.validate('date', '', attribute, {}), undefined);
	deepEqual(validator.validate('date', [], attribute, {}), undefined);

	deepEqual(validator.validate('date', false, attribute, {}), 'Date must be a date');
	deepEqual(validator.validate('date', {}, attribute, {}), 'Date must be a date');
	deepEqual(validator.validate('date', 'some value', attribute, {}), 'Date must be a date');
	deepEqual(validator.validate('date', '2011-foo-04', attribute, {}), 'Date must be a date');
	deepEqual(validator.validate('date', '2009367', attribute, {}), 'Date must be a date');
	deepEqual(validator.validate('date', '2009M511', attribute, {}), 'Date must be a date');
	deepEqual(validator.validate('date', '2010-02-18T16,25:23:48,444', attribute, {}), 'Date must be a date');
});
