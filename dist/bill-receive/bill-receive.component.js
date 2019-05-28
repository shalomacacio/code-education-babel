"use strict";

window.billReceiveComponent = Vue.extend({

	components: {
		'menu-component': billReceiveMenuComponent
	},

	template: "\n\t\t<h1>{{title}} </h1>\n\t\t\n\t\t<h3 :class=\"{'cinza': status == 'Nenhuma conta cadastrada'}\"> {{ status }} </h3>\n\t\t\n\t\t<menu-component></menu-component>\n\t\t<router-view></router-view>\n\t\t",

	data: function data() {

		return {
			title: "Contas a receber"
		};
	},

	computed: {
		status: function status() {
			var bills = this.$root.$children[0].billsReceive;

			if (bills.length <= 0) {
				return " Nenhuma conta cadastrada";
			}
			var count = 0;
			for (var i in bills) {
				if (!bills[i].received) {
					count++;
				}
			}
			return !count ? "Nenhuma conta a receber" : "Existem " + count + " contas a receber";
		}
	}
});