import Ember from 'ember';
import MessageResolver from 'ember-cli-data-validation/message-resolver';
import defaultMessages from 'ember-cli-data-validation/messages';
import {
	module, test
}
from 'qunit';

module('Unit | MessageResolver');

var resolver = MessageResolver.create();

test('test deep messages', function(assert) {
	deepEqual(resolver.resolve({
		typeKey: 'min'
	}, {
		type: "string"
	}), defaultMessages.min.string);

	deepEqual(resolver.resolve({
		typeKey: 'min'
	}, {
		type: "number"
	}), defaultMessages.min.number);

	deepEqual(resolver.resolve({
		typeKey: 'max'
	}, {
		type: "string"
	}), defaultMessages.max.string);

	deepEqual(resolver.resolve({
		typeKey: 'max'
	}, {
		type: "number"
	}), defaultMessages.max.number);

	deepEqual(resolver.resolve({
		typeKey: 'range'
	}, {
		type: "string"
	}), defaultMessages.range.string);

	deepEqual(resolver.resolve({
		typeKey: 'range'
	}, {
		type: "number"
	}), defaultMessages.range.number);
});

test('test normal messages', function(assert) {
	deepEqual(resolver.resolve({
		typeKey: 'required'
	}, {
		type: "string"
	}), defaultMessages.required);

	deepEqual(resolver.resolve({
		typeKey: 'email'
	}, {
		type: "string"
	}), defaultMessages.email);

	deepEqual(resolver.resolve({
		typeKey: 'url'
	}, {
		type: "string"
	}), defaultMessages.url);

	deepEqual(resolver.resolve({
		typeKey: 'acceptance'
	}, {
		type: "string"
	}), defaultMessages.acceptance);
});

test('should throw missing message', function(assert) {

	throws(function() {
		resolver.resolve({
			typeKey: 'unknown-type'
		}, {
			type: "string"
		});
	}, function(err) {
		return err.message === "Assertion Failed: Could not resolve message for `unknown-type` Validator and  `string` ";
	});
});

test('should resolve right validator key', function(assert) {

	deepEqual(resolver.parseValidatorType({
		typeKey: 'required'
	}), 'required');

	deepEqual(resolver.parseValidatorType({
		constructor: {
			typeKey: 'required'
		}
	}), 'required');

	deepEqual(resolver.parseValidatorType({}), '');
});


test('should resolve right attribute key', function(assert) {

	deepEqual(resolver.parseAttributeType({
		type: 'string'
	}), 'string');
});

test('should parseName', function(assert) {

	var parsedName = resolver.parseName({
		typeKey: 'required'
	}, {
		type: "string"
	});

	deepEqual(parsedName.attributeType, 'string');
	deepEqual(parsedName.validatorType, 'required');
	deepEqual(parsedName.fullName, 'required.string');
});
