import Ember from 'ember';
import Validator from 'ember-cli-data-validation/validators/in';

var attribute = {
	options: {},
	name: 'enum'
};

var validator = Validator.create({
	values: ['foo', 'bar'],
	message: '%@ must be in range %@',
	attribute: attribute
});

module('enum Validator test');

test('validate', function() {
	deepEqual(validator.validate('enum', 'foo', attribute, {}), undefined);
	deepEqual(validator.validate('enum', 'bar', attribute, {}), undefined);

	// Should not validate empty values
	deepEqual(validator.validate('enum', undefined, attribute, {}), undefined);
	deepEqual(validator.validate('enum', null, attribute, {}), undefined);
	deepEqual(validator.validate('enum', '', attribute, {}), undefined);

	deepEqual(validator.validate('enum', 'vlada.spasic@gmail.com', attribute, {}), 'Enum must be in range foo, bar');
	deepEqual(validator.validate('enum', 'vlada.1234.e@dev.dom.net', attribute, {}), 'Enum must be in range foo, bar');
	deepEqual(validator.validate('enum', false, attribute, {}), 'Enum must be in range foo, bar');
	deepEqual(validator.validate('enum', 'some value', attribute, {}), 'Enum must be in range foo, bar');
});
