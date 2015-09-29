import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		save: function() {
			var model = this.get('model');

			model.save().catch(function(e) {
				console.error(e.stack);
			});
		}
	}
});
