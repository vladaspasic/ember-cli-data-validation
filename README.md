[![Build Status](https://travis-ci.org/vladaspasic/ember-cli-data-validation.svg?branch=master)](https://travis-ci.org/vladaspasic/ember-cli-data-validation)

# Ember-cli-data-validation

Ember addon for adding validation functionality to your Ember Data Models.

## Installation

* `ember install ember-cli-data-validation`

## Usage
To add validation to your Models you must use the `ValidatorMixin` provided by the addon and define `validation` options to your Attributes.

```javascript
import DS from 'ember-data';
import ValidatorMixin from 'ember-cli-data-validation/mixins/validator';

export DS.Model.extend(ValidatorMixin, {
    name: DS.atrt('string', {
        validation: {
            required: true,
            min: 5
        }
    }),

    email: DS.atrt('string', {
        validation: {
            required: true,
            email: true,
            max: 254
        }
    })

    age: DS.atrt('number', {
        validation: {
            digit: true,
            range: {
                from: 12,
                to: 99
            }
        }
    }),

    website: DS.atrt('string', {
        validation: {
            url: true
        }
    }),

    newsletter: DS.atrt('boolean', {
        validation: {
            acceptance: true
        }
    })
});
```

Validation of the Model is executed in the `save` method of the Model. If the validation fails, promise is rejected with `DS.Errors` Object.
You can also manually call the `validate` method directly on the Model, if the Model is valid, this would return `true` otherwise `false`.

## Validators
This addon comes with couple of built in `Validators`:

* RequiredValidator
* AcceptanceValidator
* DigitValidator
* EmailValidator
* MaxValidator
* MinValidator
* NumberValidator
* RangeValidator
* URLValidator
* PatternValidator

You can also create your own custom `Validators` by using the provided blueprint.

```bash
ember generate validator validator-name
```
And you would get something like this:
```javascript
import Validator from 'ember-cli-data-validation/validator';

export default Validator.extend({
    message: 'something is wrong with %@',

    validate: function(name, value, attribute, model) {
        if(this.get('optionForYourValidator' && name) {
            // this would format the Error message
            return this.format();
        }
    }
});

```

And use your validator like so:

```javascript
import DS from 'ember-data';
import ValidatorMixin from 'ember-cli-data-validation/mixins/validator';

export DS.Model.extend(ValidatorMixin, {
    validation: {
        validatorName: {
            optionForYourValidator: false
        }
    }
});
```
As you may have noticed we are relying on a simple naming convention to run validation. In this example, we have defined additional property for our `Validator` instance. You can also pass a `message` property that would have precedence over the existing `message` property defined in the `ValidatorNameValidator`.

or if you wish to create a regex based `Validator`:
```bash
ember generate pattern-validator pattern-validator-name
```
```javascript
import PatternValidator from 'ember-cli-data-validation/pattern-validator';

export default PatternValidator.extend({
    message: '%@ is not passing the test',
    pattern: /my pattern/
});

```

```javascript
import DS from 'ember-data';
import ValidatorMixin from 'ember-cli-data-validation/mixins/validator';

export DS.Model.extend(ValidatorMixin, {
    validation: {
        patternValidatorName: true
    }
});
```
You can also do this manualy, but keep in mind that all validators must be either placed in the `validators` folder or be directly registered in the Ember container with the type `validator`.

## Message Resolver

This addon comes with built in validation error messages. You may wish to change this.

The simplest way to that is by overiding the `resolveMessage` method in the `MessageResolver`. You can place your implementation in the `resolvers` folder, register the Resolver in the container manually with key `resolver:validation-message` or just simply reopen the class.

##### How Message Resolver works

Message Resolver would first try to find a Message with a formated key which consitst of the Validator type and Attrbite type. So if you have the following settings for you attribute validation:

```javascript
    DS.Model.extend({
        name: DS.attr('string', {
            validation: {
                required: true
            }
        })
    })
```

The key would be `required.string`, if the message for that key is not found, then the `resolveMessage` method would be invoked again with the `required` key.

```javascript
import MessageResolver from 'ember-cli-data-validation/message-resolver';

export default MessageResolver.extend({
    catalog: Ember.computed(function() {
        return this.container.lookup('i18n:messages');
    }),
    resolveMessage: function(key) {
        var catalog = this.get('catalog');

        return Ember.get(catalog, key);
    }
});
```

Keep in mind that `MessageResolver` is caching the messages for each key that returned a value. If you have a Message catalog that is based on a locale, you must clear the cache when the locale changes.

A simple example:

```javascript
import MessageResolver from 'ember-cli-data-validation/message-resolver';

export default MessageResolver.extend({
    locale: Ember.computed(function() {
        return 'en_GB';
    }),
    catalog: Ember.computed('locale', function() {
        return this.container.lookup('locale:' + this.get('locale'));
    }),
    clearCache: Ember.observer('locale', function() {
        this._cache = {};
    }),
    resolveMessage: function(key) {
        var catalog = this.get('catalog');

        return Ember.get(catalog, key);
    }
});
```

More documentation to follow...

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
