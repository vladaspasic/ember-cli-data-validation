import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/email';

var attribute = {
	options: {},
	name: 'email'
};

var validator = Validator.create({
	message: '%@ must be a valid email',
	attribute: attribute
});

module('Email Validator test');

test('validate', function() {
	deepEqual(validator.validate('email', 'vlada.spasic@gmail.com', attribute, {}), undefined);
	deepEqual(validator.validate('email', 'vlada.1234.e@dev.dom.net', attribute, {}), undefined);

	deepEqual(validator.validate('email', null, attribute, {}), 'Email must be a valid email');
	deepEqual(validator.validate('email', false, attribute, {}), 'Email must be a valid email');
	deepEqual(validator.validate('email', undefined, attribute, {}), 'Email must be a valid email');
	deepEqual(validator.validate('email', 'some value', attribute, {}), 'Email must be a valid email');
});
