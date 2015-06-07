import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/acceptance';

var attribute = {
	options: {},
	name: 'check'
};

var validator = Validator.create({
	message: '%@ must be checked',
	attribute: attribute
});

module('Acceptance Validator test');

test('validate', function() {
	deepEqual(validator.validate('check', true, attribute, {}), undefined);
	deepEqual(validator.validate('check', 'true', attribute, {}), undefined);

	deepEqual(validator.validate('check', null, attribute, {}), 'Check must be checked');
	deepEqual(validator.validate('check', false, attribute, {}), 'Check must be checked');
	deepEqual(validator.validate('check', undefined, attribute, {}), 'Check must be checked');
	deepEqual(validator.validate('check', 'some value', attribute, {}), 'Check must be checked');
});
