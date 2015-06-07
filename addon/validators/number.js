import PatternValidator from 'ember-cli-data-validation/pattern-validator';

/**
 * Validator that checks if the Attribute value
 * is a number.
 *
 * @class NumberValidator
 * @extends {PatternValidator}
 */
export default PatternValidator.extend({
  pattern: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/
});
