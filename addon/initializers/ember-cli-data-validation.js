import DefaultMessageResolver from 'ember-cli-data-validation/message-resolver';

export function initialize( container, application ) {
	application.register('ember-cli-data-validation@resolver:validation-message', DefaultMessageResolver);
}

export default {
  name: 'data-validation',
  initialize: initialize
};
