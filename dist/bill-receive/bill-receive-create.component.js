'use strict';

window.billReceiveCreateComponent = Vue.extend({
	template: '\n\t\t\t<!-- @submit \xE9 a abrevia\xE7\xE3o de v-on:submit-->\n\t\t\t<form name="form" @submit.prevent="submit" :form-type="formType">\n\t\t\t\t<label>Vencimento</label>\n\t\t\t\t<input type="text" v-model="bill.date_due">\n\t\t\t\t<br/><br/>\n\t\t\t\t<label>Nome</label>\n\t\t\t\t<input type="text"v-model="bill.name">\n\t\t\t\t<br/><br/>\n\t\t\t\t<label>Valor</label>\n\t\t\t\t<input type="text" v-model="bill.value">\n\t\t\t\t<br/><br/>\n\t\t\t\t<label>Recebido?</label>\n\t\t\t\t<input type="checkbox" v-model="bill.received">\n\t\t\t\t<input type="submit" value="Enviar">\n\t\t\t</form>\n\t\t',
	data: function data() {
		return {
			formType: "insert",
			//limpar os dados form
			bill: { date_due: '', name: '', value: 0, received: 0 }
		};
	},

	created: function created() {
		if (this.$route.name == 'bill-receive.update') {
			this.formType = 'update';
			this.getBill(this.$route.params.index);
		}
	},

	methods: {

		submit: function submit() {
			if (this.formType == "insert") {
				this.$root.$children[0].billsReceive.push(this.bill);
			}
			this.bill = { date_due: '', name: '', value: 0, received: 0 };
			//this.router component implicito
			this.$router.go({ name: 'bill-receive.list' });
		},

		getBill: function getBill(index) {
			this.bill = this.$root.$children[0].billsReceive[index];
		}
	},

	events: {
		'new-bill': function newBill(bill) {
			this.bill = bill;
		}
	}

});