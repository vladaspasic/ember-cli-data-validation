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
		    // Format the Attribute name to human readable string
		    var label = this.formatAttributeLabel(name, attribute, model);

            // Format the error message
			return this.format(label);
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
