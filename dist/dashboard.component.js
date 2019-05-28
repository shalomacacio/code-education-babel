'use strict';

window.dashboardComponent = Vue.extend({
	template: '\n\t\t<h1>Saldo: <span>{{totalReceive - totalPay | currency "R$ " 2}}<span></h1>\n\t\t<h3>Receitas: {{totalReceive | currency "R$ " 2}}<h3>\n\t\t<h3>Despesas: {{totalPay | currency "R$ " 2}}<h3>\n\n\t\t<table name="pays-tab" border="1">\n\t\t\t<tr>\n\t\t\t\t<th>#</th>\n\t\t\t\t<th>Vencimento</th>\n\t\t\t\t<th>Nome</th>\n\t\t\t\t<th>Valor</th>\n\t\t\t</tr>\n\t\t\t<tbody>\n\t\t\t\t<tr v-for="(index,o) in pays">\n\t\t\t\t\t<td>{{index +1 | pluralize \'item\'}}</td>\n\t\t\t\t\t<td>{{o.date_due }}</td>\n\t\t\t\t\t<td>{{o.name | uppercase  }}</td>\n\t\t\t\t\t<td>{{o.value | currency "R$ " 2}}</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td colspan=3>Total</td>\n\t\t\t\t\t<td>{{totalPay}}</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<br/>\n\t\t<table name="receive-tab" border="1">\n\t\t\t<tr>\n\t\t\t\t<th>#</th>\n\t\t\t\t<th>Vencimento</th>\n\t\t\t\t<th>Nome</th>\n\t\t\t\t<th>Valor</th>\n\t\t\t\t\n\t\t\t</tr>\n\t\t\t<tbody>\n\t\t\t\t<tr v-for="(index,o) in receives">\n\t\t\t\t\t<td>{{index +1 | pluralize \'item\'}}</td>\n\t\t\t\t\t<td>{{o.date_due }}</td>\n\t\t\t\t\t<td>{{o.name | uppercase  }}</td>\n\t\t\t\t\t<td>{{o.value | currency "R$ " 2}}</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td colspan=3>Total</td>\n\t\t\t\t\t<td>{{totalReceive}}</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t',
	data: function data() {
		return {
			pays: this.$root.$children[0].billsPay,
			receives: this.$root.$children[0].billsReceive
		};
	},

	computed: {
		totalPay: function totalPay() {
			var pays = this.$root.$children[0].billsPay;
			var sum = 0;

			pays.forEach(function (e) {
				sum += Number(e.value);
			});
			return sum;
		},

		totalReceive: function totalReceive() {
			var pays = this.$root.$children[0].billsReceive;
			var sum = 0;

			pays.forEach(function (e) {
				sum += Number(e.value);
			});
			return sum;
		}

	},

	/*
 for (var i in bills){
 				if(!bills[i].done){
 					count++;
 				}
 			}
 */

	methods: {

		deleteBill: function deleteBill(bill) {
			if (confirm('Deseja excluir')) {
				this.$root.$children[0].billsReceive.$remove(bill);
			}
		}
	}

});