"use strict";

window.dashboardComponent = Vue.extend({
	template: "\n\t <h1>Saldo: <span>{{totalReceive - totalPay | currency \"R$ \" 2}}<span></h1>\n\t <h3>Receitas: {{totalReceive | currency \"R$ \" 2}}<h3>\n\t <h3>Despesas: {{totalPay | currency \"R$ \" 2}}<h3>\n\t",

	data: function data() {
		return {
			bills: [],
			totalPay: 0,
			totalReceive: 0
		};
	},
	created: function created() {
		this.updateTotalPay();
		this.updateTotalReceive();
		//alert("Bem Vindo");
	},

	methods: {

		updateTotalPay: function updateTotalPay() {
			var self = this;
			Bill.total().then(function (response) {
				self.totalPay = response.data.total;
			});
		},

		updateTotalReceive: function updateTotalReceive() {
			var self = this;
			Receive.total().then(function (response) {
				self.totalReceive = response.data.total;
			});
		}
	}

});