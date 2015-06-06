import PatternValidator from 'ember-cli-data-validation/pattern-validator';

/**
 * Validator that checks if the Attribute value
 * contains only digits.
 *
 * @class DigitValidator
 * @extends {PatternValidator}
 */
export default PatternValidator.extend({
  pattern: /^\d+$/
});
