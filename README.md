[![Build Status](https://travis-ci.org/vladaspasic/ember-cli-data-validation.svg?branch=master)](https://travis-ci.org/vladaspasic/ember-cli-data-validation) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-data-validation.svg)](http://emberobserver.com/addons/ember-cli-data-validation)

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

Validation of the Model is executed in the `save` method of the Model. If the validation fails, promise is rejected with `ValidationError` that contains the `DS.Errors` object.
You can also manually call the `validate` method directly on the Model, if the Model is valid, this would return `true` otherwise `false`.

## Validators
This addon comes with couple of built in `Validators`:

* [RequiredValidator](#requiredvalidator)
* [AcceptanceValidator](#acceptancevalidator)
* [DigitValidator](#digitvalidator)
* [DateValidator](#datevalidator)
* [DateBeforeValidator](#datebeforevalidator)
* [DateAfterValidator](#dateaftervalidator)
* [EmailValidator](#emailvalidator)
* [InValidator (EnumValidator)](#invalidator)
* [MaxValidator](#maxvalidator)
* [MinValidator](#minvalidator)
* [NumberValidator](#numbervalidator)
* [RangeValidator](#rangevalidator)
* [URLValidator](#urlvalidator)
* [UUIDValidator](#uuidvalidator)
* [PatternValidator](#patternvalidator)

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

This addon comes with a `MessageResolver` that resolves an error message for a failed attribute validation. By default, this addon uses built in validation error messages. You may wish to change them and your own error messages for your application.

The simplest way to do that is by overiding the `resolveMessage` method in the `MessageResolver`. You can place your implementation in the `resolvers` folder, this way it would be automatically picked up by the Ember Resolver. You can register the Resolver in the container manually with key `resolver:validation-message` or just simply reopen the class.

##### How Message Resolver works

When a validation of the attribute fails, `Validator` creates an error message by invoking the `MessageResolver.resolve` method. This method will create an object that contains couple of message keys. These keys are used to locate the error message from the configured message catalog.

For instance if we have a Model with 2 attributes, declared like this in your `models/user.js` file:

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string', {
        validation: {
            required: true
        }
    }),
    age: DS.attr('number', {
        validation: {
            required: true,
            min: 18
        }
    })
});
```

And we have created our own implementation of the `MessageResolver` that we placed in the `resolvers/message-resolver.js` file. Here we are going to declare our own catalog of error messages.

```javascript
import MessageResolver from 'ember-cli-data-validation/message-resolver';

export default MessageResolver.extend({
    catalog: Ember.computed(function() {
        return {
            'required': 'Field %@ is required',
            'min.string': 'String must have more than %@ characters',
            'user': {
                'age': {
                    'min': 'You must have more than 18 years to register.'
                }
            }
        };
    }),
    resolveMessage: function(key) {
        var catalog = this.get('catalog');

        return Ember.get(catalog, key);
    }
});
```

When the `MessageResolver.resolve` method is invoked for the `name` attribute from the `required` validator, Resolver would create this set of keys for which it will search the catalog:

```javascript
{
  attributeType: 'string',
  validatorType: 'required',
  modelType: 'user',
  validatorPath: 'required.string',
  modelPath: 'user.name.required'
}
```

Once the keys are generated, the `MessageResolver.resolve` method would first invoke the `resolveMessage` method with the `modelPath` value. If the message does not exists, it would try again to find a message with a `validatorPath` value. If the message is still not resolved, it tries again with the `validatorType` value or it would throw an Assertion Error.

So when the validation fails for the `name` attribute with `required` Validator, the `resolveMessage` would be invoked with the `modelPath` value, which is `user.name.required`. This key does not exists in our catalog, so the resolver will try again with the `validatorPath` value, which is `required.string`. This will again fail to resolve the message, as this key does not exists. Next iteration would be with the `validatorType` value. This key exists, and the `Field %@ is required` would be returned.

In the case when the `min` Validator fails for the `age` attribute, `MessageResolver` would generate these keys:

```javascript
{
  attributeType: 'number',
  validatorType: 'age',
  modelType: 'user',
  validatorPath: 'min.number',
  modelPath: 'user.age.min'
}
```

The error message for this case, would be resolved to `You must have more than 18 years to register`.

Once the message is found, it is stored in the cache for the current looked up key.

`MessageResolver` also resolves the message for the `ValidationError` that is thrown when the validation fails when calling `DS.Model.save` method. The key used for this message is `error`.

You can also register the messages in the container, and they can be fetched from there and used inside the `MessageResolver`.

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
    localeDidChange: Ember.observer('locale', function() {
        this.clearCache();
    }),
    resolveMessage: function(key) {
        var catalog = this.get('catalog');

        return Ember.get(catalog, key);
    }
});
```

## Validators

Examples on how to use validators.

### RequiredValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string', {
        validation: {
            required: true
        }
    })
});

```

### AcceptanceValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    published: DS.attr('boolean', {
        validation: {
            acceptance: true
        }
    })
});

```

### DigitValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    age: DS.attr('number', {
        validation: {
            digit: true
        }
    })
});

```

### DateValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    dateOfBirth: DS.attr('date', {
        validation: {
            date: true
        }
    })
});

```

### DateBeforeValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    dateOfBirth: DS.attr('date', {
        validation: {
            before: new Date()
        }
    })
});

```

Or with a function

```javascript
import moment from 'moment';
import DS from 'ember-data';

export default DS.Model.extend({
    dateOfBirth: DS.attr('date', {
        validation: {
            before: function() {
                return moment().startOf('d').toDate();
            }
        }
    })
});

```

### DateAfterValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    dateOfBirth: DS.attr('date', {
        validation: {
            after: new Date()
        }
    })
});

```

Or with a function

```javascript
import moment from 'moment';
import DS from 'ember-data';

export default DS.Model.extend({
    dateOfBirth: DS.attr('date', {
        validation: {
            after: function() {
                return moment().startOf('d').toDate();
            }
        }
    })
});

```

### EmailValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string', {
        validation: {
            email: true
        }
    })
});
```

### InValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    property: DS.attr('string', {
        validation: {
            in: {
                values: ['foo', 'bar']
            }
        }
    })
});
```

### MaxValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    age: DS.attr('number', {
        validation: {
            max: 18
        }
    })
});
```

### MinValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    age: DS.attr('number', {
        validation: {
            min: 18
        }
    })
});
```

### NumberValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    age: DS.attr('number', {
        validation: {
            number: true
        }
    })
});
```

### RangeValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    age: DS.attr('number', {
        validation: {
            range: {
                from: 0,
                to: 18
            }
        }
    })
});
```

Or with a String length

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    password: DS.attr('string', {
        validation: {
            range: {
                from: 8,
                to: 12
            }
        }
    })
});
```

### URLValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    website: DS.attr('string', {
        validation: {
            url: true
        }
    })
});
```

### UUIDValidator

Here you can pass `all`, `3`, `4` or `5` as a `version` property value. If `all` is passed it validates the 1 and 2 UUID verions.

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    uuid: DS.attr('string', {
        validation: {
            uuid: {
                version: 3
            }
        }
    })
});
```

### PatternValidator

```javascript
import DS from 'ember-data';

export default DS.Model.extend({
    pattern: DS.attr('string', {
        validation: {
            pattern: 'some regex rule'
        }
    })
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
