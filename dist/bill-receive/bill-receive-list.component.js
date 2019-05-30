'use strict';

window.billReceiveListComponent = Vue.extend({
	template: '\n\t\t<style>\n\t\t\t.verde{color: green;\n\t\t\t}\n\t\t\t.vermelho{color: red;\n\t\t\t}\n\t\t\t.cinza{color: grey;\n\t\t\t}\n\t\t</style>\n\t\t<table border="1">\n\t\t\t<tr>\n\t\t\t\t<th>#</th>\n\t\t\t\t<th>Vencimento</th>\n\t\t\t\t<th>Nome</th>\n\t\t\t\t<th>Valor</th>\n\t\t\t\t<th>Paga</th>\n\t\t\t\t<th>A\xE7\xF5es</th>\n\t\t\t</tr>\n\t\t\t<tbody>\n\t\t\t\t<tr v-for="o in receives">\n\t\t\t\t\t<td>{{o.id}}</td>\n\t\t\t\t\t<td>{{o.date_due }}</td>\n\t\t\t\t\t<td>{{o.name | uppercase  }}</td>\n\t\t\t\t\t<td>{{o.value | currency "R$ " 2}}</td>\n\t\t\t\t\t<td :class="{ \'verde\': o.received, \'vermelho\':!o.received}">\n\t\t\t\t\t\t{{o.received  | doneLabel}}\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a v-link="{name: \'bill-receive.update\', params: {id: o.id} }">Editar</a>\n\t\t\t\t\t\t<a href="#" @click="deleteBill(o)">Delete</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t',
	data: function data() {
		return {
			receives: []
		};
	},
	created: function created() {
		var self = this;
		Receive.query().then(function (response) {
			self.receives = response.data;
		});
	},
	methods: {
		removeBill: function removeBill(receive) {
			if (confirm('Deseja excluir esta conta?')) {
				var self = this;
				Receive.delete({ id: bill.id }).then(function (response) {
					self.receives.$remove(bill);
					self.$dispatch('change-info');
				});
			}
		}
	}

});