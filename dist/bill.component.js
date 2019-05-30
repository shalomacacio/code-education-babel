'use strict';

window.billComponent = Vue.extend({
	template: '\n\t\t<nav>\n\t\t\t<ul>\n\t\t\t\t<li v-for="menu in menus">\n\t\t\t\t\t<a v-link="{name: menu.routeName}" style="cursor:pointer">{{ menu.name }}</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t\t<router-view></router-view>\n\t',
	data: function data() {
		return {
			menus: [{ name: "Dashboard", routeName: 'dashboard' }, { name: 'Contas a Pagar', routeName: 'bill-pay.list' }, { name: 'Contas a Receber', routeName: 'bill-receive' }]
		};
	}
});