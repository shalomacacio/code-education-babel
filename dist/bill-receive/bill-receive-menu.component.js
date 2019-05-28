"use strict";

window.billReceiveMenuComponent = Vue.extend({

	template: "\n\t\t<nav>\n\t\t\t<ul>\n\t\t\t\t<li v-for=\"o in menus\">\n\t\t\t\t\t<!-- @click \xE9 a abrevia\xE7\xE3o do evento v-on:click-->\n\t\t\t\t\t<a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t\t",
	data: function data() {

		return {
			menus: [{ name: "Listar Rececimento", routeName: 'bill-receive.list' }, { name: "Criar Recebimento", routeName: 'bill-receive.create' }]
		};
	}
});