"use strict";

window.billPayMenuComponent = Vue.extend({

	template: "\n\t\t<nav>\n\t\t\t<ul>\n\t\t\t\t<li v-for=\"o in menus\">\n\t\t\t\t\t<!-- @click \xE9 a abrevia\xE7\xE3o do evento v-on:click-->\n\t\t\t\t\t<a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t\t",
	data: function data() {

		return {
			menus: [
			//{id:0, name:"Listar Conta", url:'/bills'},
			//{id:1, name:"Criar Contas" , url:'/bill/create'}
			{ name: "Listar Conta", routeName: 'bill-pay.list' }, { name: "Criar Contas", routeName: 'bill-pay.create' }]
		};
	}
});