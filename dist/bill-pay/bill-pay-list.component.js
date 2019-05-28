'use strict';

window.billPayListComponent = Vue.extend({
	template: '\n\t\t<style>\n\t\t\t.verde{color: green;\n\t\t\t}\n\t\t\t.vermelho{color: red;\n\t\t\t}\n\t\t\t.cinza{color: grey;\n\t\t\t}\n\t\t</style>\n\t\t<table border="1">\n\t\t\t<tr>\n\t\t\t\t<th>#</th>\n\t\t\t\t<th>Vencimento</th>\n\t\t\t\t<th>Nome</th>\n\t\t\t\t<th>Valor</th>\n\t\t\t\t<th>Paga</th>\n\t\t\t\t<th>A\xE7\xF5es</th>\n\t\t\t</tr>\n\t\t\t<tbody>\n\t\t\t\t<tr v-for="o in bills">\n\t\t\t\t\t<td>{{o.id}}</td>\n\t\t\t\t\t<td>{{o.date_due }}</td>\n\t\t\t\t\t<td>{{o.name | uppercase  }}</td>\n\t\t\t\t\t<td>{{o.value | currency "R$ " 4}}</td>\n\t\t\t\t\t<td :class="{ \'verde\': o.done, \'vermelho\':!o.done}">\n\t\t\t\t\t\t{{o.done  | doneLable}}\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a v-link="{name: \'bill-pay.update\', params: {id : o.id} }">Editar</a>\n\t\t\t\t\t\t<a href="#" @click="deleteBill(o)">Delete</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t',

	data: function data() {
		return {
			bills: []
		};
	},

	created: function created() {
		var self = this;
		Bill.query().then(function (response) {
			self.bills = response.data;
		});
	},

	methods: {

		deleteBill: function deleteBill(bill) {
			if (confirm('Deseja excluir')) {
				var self = this;
				Bill.delete(id, bill.id).then(function (response) {
					self.bills.$remove(bill);
					self.$dispatch('change-info');
				});
			}
		}
	}

});