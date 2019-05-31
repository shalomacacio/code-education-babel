window.dashboardComponent = Vue.extend({
	template:
	`
	 <h1>Saldo: <span>{{totalReceive - totalPay | currency "R$ " 2}}<span></h1>
	 <h3>Receitas: {{totalReceive | currency "R$ " 2}}<h3>
	 <h3>Despesas: {{totalPay | currency "R$ " 2}}<h3>
	`,

	data() {
		return {
			bills: [],
			totalPay:0,
			totalReceive:0
		};
	},
	created() {
		this.updateTotalPay();
		this.updateTotalReceive();
	},

	methods: {

		updateTotalPay() {
			var self = this;
			Bill.total().then(function(response) {
				self.totalPay = response.data.total;
			})

		},

		updateTotalReceive() {
			var self = this;
			Receive.total().then(function(response) {
				self.totalReceive = response.data.total;
			})

		}
	}

});
