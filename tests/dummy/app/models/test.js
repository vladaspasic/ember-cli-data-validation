import DS from 'ember-data';
import ValidatorMixin from 'ember-cli-data-validation/mixins/validator';

export default DS.Model.extend(ValidatorMixin, {
	name: DS.attr('string', {
		validation: {
			required: true,
			min: 5,
			range: {
				from: 3,
				to: 10
			}
		}
	})
});
