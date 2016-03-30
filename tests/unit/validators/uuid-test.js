import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/uuid';

var attribute = {
	options: {},
	name: 'uuid'
};

module('uuid Validator test');

function validate(validator, valid, invalid) {

	valid.forEach(function(uuid) {
		deepEqual(validator.validate('uuid', uuid, attribute, {}), undefined);
	});

	invalid.forEach(function(uuid) {
		deepEqual(validator.validate('uuid', uuid, attribute, {}), 'Uuid must be a valid UUID');
	});

	// Should not validate empty values
	deepEqual(validator.validate('uuid', undefined, attribute, {}), undefined);
	deepEqual(validator.validate('uuid', null, attribute, {}), undefined);
	deepEqual(validator.validate('uuid', '', attribute, {}), undefined);

}

test('validate all', function() {
	var validator = Validator.create({
		message: '%@ must be a valid UUID',
		attribute: attribute
	});

	validate(validator, [
		'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
		'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
		'A987FBC9-4BED-5078-AF07-9141BA07C9F3'
	], [
		false,
		'934859',
		'987FBC9-4BED-3078-CF07A-9141BA07C9F3',
		'AAAAAAAA-1111-1111-AAAG-111111111111',
		'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
		'A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx',
		'A987FBC94BED3078CF079141BA07C9F3'
	]);
});

test('validate v3', function() {
	var validator = Validator.create({
		version: 3,
		message: '%@ must be a valid UUID',
		attribute: attribute
	});

	validate(validator, [
		'A987FBC9-4BED-3078-CF07-9141BA07C9F3'
	], [
		false,
		'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
		'934859', 'AAAAAAAA-1111-1111-AAAG-111111111111',
		'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
		'A987FBC9-4BED-5078-AF07-9141BA07C9F3'
	]);
});

test('validate v4', function() {
	var validator = Validator.create({
		version: 4,
		message: '%@ must be a valid UUID',
		attribute: attribute
	});

	validate(validator, [
		'713ae7e3-cb32-45f9-adcb-7c4fa86b90c1',
		'625e63f3-58f5-40b7-83a1-a72ad31acffb',
		'57b73598-8764-4ad0-a76a-679bb6640eb1',
		'9c858901-8a57-4791-81fe-4c455b099bc9'
	], [
		false,
		'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
		'934859',
		'AAAAAAAA-1111-1111-AAAG-111111111111',
		'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
		'A987FBC9-4BED-3078-CF07-9141BA07C9F3'
	]);
});

test('validate v5', function() {
	var validator = Validator.create({
		version: 5,
		message: '%@ must be a valid UUID',
		attribute: attribute
	});

	validate(validator, [
		'987FBC97-4BED-5078-AF07-9141BA07C9F3',
		'987FBC97-4BED-5078-BF07-9141BA07C9F3',
		'987FBC97-4BED-5078-8F07-9141BA07C9F3',
		'987FBC97-4BED-5078-9F07-9141BA07C9F3'
	], [
		false,
		'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
		'934859',
		'AAAAAAAA-1111-1111-AAAG-111111111111',
		'9c858901-8a57-4791-81fe-4c455b099bc9',
		'A987FBC9-4BED-3078-CF07-9141BA07C9F3'
	]);
});