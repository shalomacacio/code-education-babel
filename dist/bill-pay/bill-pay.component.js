'use strict';

window.billPayComponent = Vue.extend({
	components: {
		'menu-component': billPayMenuComponent
	},
	template: '\n   \t\t<style type="text/css">\n\t\t\t.red {\n\t\t\t\tcolor: red;\n\t\t\t}\n\n\t\t\t.green {\n\t\t\t\tcolor: green;\n\t\t\t}\n\n\t\t\t.gray {\n\t\t\t\tcolor: gray;\n\t\t\t}\n\t\t</style>\n\n\t\t<h1>{{ title }}</h1>\n\t\t<h3 :class="{\'gray\': status === false, \'green\': status === 0, \'red\' : status > 0}">\n\t\t\t{{ status | statusGeneral }}\n\t\t</h3>\n\t\t<h3>{{ total | currency \'R$ \' }}</h3>\n\t\t<menu-component></menu-component>\n        <router-view></router-view>\n\t',
	data: function data() {
		return {
			title: "Contas a Pagar",
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

			Bill.query().then(function (response) {
				_this.calculateStatus(response.data);
			});
		},
		updateTotal: function updateTotal() {
			var _this2 = this;

			Bill.total().then(function (response) {
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