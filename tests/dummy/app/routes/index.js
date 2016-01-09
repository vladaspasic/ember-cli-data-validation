import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {

		this.store.push({
			data: {
				type: 'test',
				id: 1,
				attributes: {}
			}
		});

		return this.store.recordForId('test', 1);
	}
});
