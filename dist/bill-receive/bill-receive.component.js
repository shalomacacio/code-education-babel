'use strict';

window.billReceiveComponent = Vue.extend({

	components: {
		'menu-component': billReceiveMenuComponent
	},

	template: '\n\t\t<h1>{{title}} </h1>\n\t\t<h3 :class="{\'gray\': status === false, \'green\': status === 0, \'red\' : status > 0}">\n\t\t{{ status | statusGeneral }}\n\t\t<h1>{{total}} </h1>\n\t\t<menu-component></menu-component>\n\t\t<router-view></router-view>\n\t\t',

	data: function data() {

		return {
			title: "Contas a receber",
			status: false,
			total: 0
		};
	},
	created: function created() {
		this.updateStatus();
		this.updateTotal();
	},

	methods: {
		calculateStatus: function calculateStatus(bills) {
			if (!bills.length) {
				this.status = false;
			}

			var count = 0;
			for (var i in bills) {
				if (!bills[i].done) {
					count++;
				}
			}

			this.status = count;
		},
		updateStatus: function updateStatus() {
			var _this = this;

			Receive.query().then(function (response) {
				_this.calculateStatus(response.data);
			});
		},
		updateTotal: function updateTotal() {
			var _this2 = this;

			Receive.total().then(function (response) {
				_this2.total = response.data.total;
			});
		}
	},
	events: {
		'change-info': function changeInfo() {
			this.updateStatus();
			this.updateTotal();
		}
	}
});