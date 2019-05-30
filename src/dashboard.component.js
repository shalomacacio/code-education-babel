window.dashboardComponent = Vue.extend({
	template:
	`
	 <h1>Saldo: <span>{{totalReceive - totalPay | currency "R$ " 2}}<span></h1>
	 <h3>Receitas: {{totalReceive | currency "R$ " 2}}<h3>
	 <h3>Despesas: {{totalPay | currency "R$ " 2}}<h3>
	`,

	data: function() {
		return {
			bills: [],
			totalPay:0,
			totalReceive:0
		};
	},
	created: function() {
		this.updateTotalPay();
		this.updateTotalReceive();
	},

	methods: {

		updateTotalPay: function() {
			var self = this;
			Bill.total().then(function(response) {
				self.totalPay = response.data.total;
			})

		},

		updateTotalReceive: function() {
			var self = this;
			Receive.total().then(function(response) {
				self.totalReceive = response.data.total;
			})

		}
	}

});
