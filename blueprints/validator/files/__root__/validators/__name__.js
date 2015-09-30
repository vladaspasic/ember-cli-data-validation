import Validator from 'ember-cli-data-validation/validator';

export default Validator.extend({
  validate: function(name, value, attribute, model) {
    // add your custom validation
  }
});
