'use strict';

window.billPayListComponent = Vue.extend({
	template: '\n\t\t<style type="text/css">\n\t\t\t.pago {\n\t\t\t\tcolor: green;\n\t\t\t}\n\t\t\t.nao-pago {\n\t\t\t\tcolor: red;\n\t\t\t}\n\t\t</style>\n\n\t\t<table border="1" cellpadding="10">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<td></td>\n\t\t\t\t\t<td>Vencimento</td>\n\t\t\t\t\t<td>Nome</td>\n\t\t\t\t\t<td>Valor</td>\n\t\t\t\t\t<td>Paga?</td>\n\t\t\t\t\t<td>A\xE7\xF5es</td>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t<tr v-for="(index, bill) in bills">\n\t\t\t\t\t<td>{{ index + 1 }}</td>\n\t\t\t\t\t<td>{{ bill.date_due }}</td>\n\t\t\t\t\t<td>{{ bill.name }}</td>\n\t\t\t\t\t<td>{{ bill.value | numberFormat }}</td>\n\t\t\t\t\t<td :class="{\'pago\': bill.done, \'nao-pago\': !bill.done}">\n\t\t\t\t\t\t{{ bill.done | doneLabel }}\n\t\t\t\t\t</td>\n\t\t\t\t\t<td style="cursor:pointer">\n\t\t\t\t\t\t<a v-link="{name: \'bill-pay.update\', params: {id: bill.id}}">Editar</a> |\n\t\t\t\t\t\t<a @click.prevent="removeBill(bill)">Remover</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t',
	data: function data() {
		return {
			bills: []
		};
	},
	created: function created() {
		var _this = this;

		Bill.query().then(function (response) {
			_this.bills = response.data;
		});
	},

	methods: {
		removeBill: function removeBill(bill) {
			var _this2 = this;

			if (confirm('Deseja excluir esta conta?')) {
				Bill.delete({ id: bill.id }).then(function (response) {
					_this2.bills.$remove(bill);
					_this2.$dispatch('change-info');
				});
			}
		}
	}
});