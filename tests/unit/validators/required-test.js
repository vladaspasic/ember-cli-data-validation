import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/required';

var attribute = {
	options: {},
	name: 'check'
};

var validator = Validator.create({
	message: '%@ is required',
	attribute: attribute
});

module('Required Validator test');

test('validate', function() {
	deepEqual(validator.validate('check', true, attribute, {}), undefined);
	deepEqual(validator.validate('check', 'true', attribute, {}), undefined);
	deepEqual(validator.validate('check', false, attribute, {}), undefined);
	deepEqual(validator.validate('check', 'some value', attribute, {}), undefined);
	deepEqual(validator.validate('check', 0, attribute, {}), undefined);

	deepEqual(validator.validate('check', '', attribute, {}), 'Check is required');
	deepEqual(validator.validate('check', null, attribute, {}), 'Check is required');
	deepEqual(validator.validate('check', undefined, attribute, {}), 'Check is required');

});
