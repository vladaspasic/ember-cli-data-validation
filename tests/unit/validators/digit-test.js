import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/digit';

var validator = Validator.create({
	message: '%@ must be a digit'
});

var attribute = {
	options: {},
	name: 'Digit'
};

module('Digit Validator test');

test('validate', function() {
	deepEqual(validator.validate('digit', 1, attribute, {}), undefined);
	deepEqual(validator.validate('digit', 9, attribute, {}), undefined);
	deepEqual(validator.validate('digit', '12345', attribute, {}), undefined);

	deepEqual(validator.validate('digit', null, attribute, {}), 'Digit must be a digit');
	deepEqual(validator.validate('digit', false, attribute, {}), 'Digit must be a digit');
	deepEqual(validator.validate('digit', undefined, attribute, {}), 'Digit must be a digit');
	deepEqual(validator.validate('digit', 'some value', attribute, {}), 'Digit must be a digit');
});
