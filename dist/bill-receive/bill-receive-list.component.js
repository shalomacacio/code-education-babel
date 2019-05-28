'use strict';

window.billReceiveListComponent = Vue.extend({
	template: '\n\t\t<style>\n\t\t\t.verde{color: green;\n\t\t\t}\n\t\t\t.vermelho{color: red;\n\t\t\t}\n\t\t\t.cinza{color: grey;\n\t\t\t}\n\t\t</style>\n\t\t<table border="1">\n\t\t\t<tr>\n\t\t\t\t<th>#</th>\n\t\t\t\t<th>Vencimento</th>\n\t\t\t\t<th>Nome</th>\n\t\t\t\t<th>Valor</th>\n\t\t\t\t<th>Paga</th>\n\t\t\t\t<th>A\xE7\xF5es</th>\n\t\t\t</tr>\n\t\t\t<tbody>\n\t\t\t\t<tr v-for="(index,o) in bills">\n\t\t\t\t\t<td>{{index +1 | pluralize \'item\'}}</td>\n\t\t\t\t\t<td>{{o.date_due }}</td>\n\t\t\t\t\t<td>{{o.name | uppercase  }}</td>\n\t\t\t\t\t<td>{{o.value | currency "R$ " 2}}</td>\n\t\t\t\t\t<td :class="{ \'verde\': o.received, \'vermelho\':!o.received}">\n\t\t\t\t\t\t{{o.received  | receivedLable}}\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a v-link="{name: \'bill-receive.update\', params: {index: index} }">Editar</a>\n\t\t\t\t\t\t<a href="#" @click="deleteBill(o)">Delete</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t',
	data: function data() {
		return {
			bills: this.$root.$children[0].billsReceive
		};
	},

	methods: {

		deleteBill: function deleteBill(bill) {
			if (confirm('Deseja excluir')) {
				this.$root.$children[0].billsReceive.$remove(bill);
			}
		}
	}

});