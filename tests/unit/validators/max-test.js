import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/max';

module('Max Validator test');

test('test missing max value', function() {
	var attribute = {
		type: 'string',
		options: {},
		name: 'email'
	};

	var validator = Validator.create({
		attribute: attribute
	});

	throws(function() {
		validator.validate('email', 'value', attribute);
	}, function(err) {
		return err.message === "Assertion Failed: You must define a `max` for MaxValidator";
	});
});

test('validate string', function() {
	var attribute = {
		type: 'string',
		options: {},
		name: 'email'
	};

	var validator = Validator.create({
		message: '%@ must not be longer than %@',
		max: 10,
		attribute: attribute
	});

	deepEqual(validator.validate('email', 'v', attribute, {}), undefined);
	deepEqual(validator.validate('email', 'vlada', attribute, {}), undefined);
	deepEqual(validator.validate('email', '', attribute, {}), undefined);

	deepEqual(validator.validate('email', null, attribute, {}), 'Email must not be longer than 10');
	deepEqual(validator.validate('email', false, attribute, {}), 'Email must not be longer than 10');
	deepEqual(validator.validate('email', undefined, attribute, {}), 'Email must not be longer than 10');
	deepEqual(validator.validate('email', 'some email value', attribute, {}), 'Email must not be longer than 10');
});

test('validate number', function() {
	var attribute = {
		type: 'number',
		options: {},
		name: 'rating'
	};

	var validator = Validator.create({
		message: '%@ must not be bigger than %@',
		max: 5,
		attribute: attribute
	});

	deepEqual(validator.validate('rating', '3', attribute, {}), undefined);
	deepEqual(validator.validate('rating', 1, attribute, {}), undefined);

	deepEqual(validator.validate('rating', null, attribute, {}), 'Rating must not be bigger than 5');
	deepEqual(validator.validate('rating', false, attribute, {}), 'Rating must not be bigger than 5');
	deepEqual(validator.validate('rating', undefined, attribute, {}), 'Rating must not be bigger than 5');
});
