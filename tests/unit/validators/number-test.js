import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/number';

var attribute = {
	options: {},
	name: 'stars'
};

var validator = Validator.create({
	message: '%@ must be a number',
	attribute: attribute
});

module('Number Validator test');

test('validate', function() {
	deepEqual(validator.validate('stars', '100.000', attribute, {}), undefined);
	deepEqual(validator.validate('stars', 9, attribute, {}), undefined);
	deepEqual(validator.validate('stars', 0, attribute, {}), undefined);
	deepEqual(validator.validate('stars', '12345', attribute, {}), undefined);
	deepEqual(validator.validate('stars', '78.98', attribute, {}), undefined);

	// Should not validate empty values
	deepEqual(validator.validate('url', undefined, attribute, {}), undefined);
	deepEqual(validator.validate('url', null, attribute, {}), undefined);
	deepEqual(validator.validate('url', '', attribute, {}), undefined);

	deepEqual(validator.validate('stars', '78.98,00', attribute, {}), 'Stars must be a number');
	deepEqual(validator.validate('stars', false, attribute, {}), 'Stars must be a number');
	deepEqual(validator.validate('stars', 'some value', attribute, {}), 'Stars must be a number');
});
