'use strict';

window.billPayCreateComponent = Vue.extend({
	template: '\n\t<!-- @submit \xE9 a abrevia\xE7\xE3o de v-on:submit-->\n\t<form name="form" @submit.prevent="submit" :form-type="formType">\n\t<label>Vencimento</label>\n\t<input type="text" v-model="bill.date_due">\n\t<br/><br/>\n\t<label>Nome</label>\n\t<select v-model="bill.name">\n\t<!-- :value \xE9 a abrevia\xE7\xE3o de v-bind:value-->\n\t<!-- value deixa de ser apnena propriedad do DOM e passa a ser uma propriedade de liga\xE7\xE3o-->\n\t<option v-for="o in names" :value="o">{{o}}</option>\n\t</select>\n\t<br/><br/>\n\t<label>Valor</label>\n\t<input type="text" v-model="bill.value">\n\t<br/><br/>\n\t<label>Paga?</label>\n\t<input type="checkbox" v-model="bill.done">\n\n\n\t<input type="submit" value="Enviar">\n\n\t</form>\n\t',
	http: {
		root: 'http://localhost:8000/api'
	},

	data: function data() {
		return {
			formType: "insert",
			names: ['Luz', 'agua', 'telefone', 'supermercado', 'cartao', 'emprestimo', 'gasolina'],
			//limpar os dados form
			bill: { date_due: '', name: '', value: 0, done: 0 }
		};
	},

	created: function created() {
		var self = this;
		if (this.$route.name == 'bill.update') {
			self.formType = 'update';
			self.getBill(this.$route.params.id);
		}
	},

	methods: {

		submit: function submit() {
			var self = this;
			if (self.formType == "insert") {
				Bill.save({}, this.bill).then(function (response) {
					self.$dispatch('change-info');
					self.$router.go({ name: 'bill-pay.list' });
				});
			} else {
				Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
					self.$dispatch('change-info');
					self.$router.go({ name: 'bill-pay.list' });
				});
			}
		},

		getBill: function getBill(index) {
			var self = this;
			Bill.get({ id: id }).then(function (response) {
				self.bills = response.data;
			});
		}
	},

	events: {
		'new-bill': function newBill(bill) {
			self.bill = bill;
		}
	}

});