 window.billReceiveComponent = Vue.extend({
 	
	components: {
		'menu-component': billReceiveMenuComponent
	},
	
	template:
		`
		<h1>{{title}} </h1>
		<h3 :class="{'gray': status === false, 'green': status === 0, 'red' : status > 0}">
		{{ status | statusGeneral }}
		<h1>{{total}} </h1>
		<menu-component></menu-component>
		<router-view></router-view>
		`,

	data(){
		
		return {
			title: "Contas a receber",
			 status: false,
			 total:0
		};
	},

	created() {
		this.updateStatus();
		this.updateTotal();
	},
	methods: {
		calculateStatus(bills) {
			if(!bills.length) {
                this.status = false;
            }

            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }                
            }

            this.status = count;
		},
		updateStatus() {
			Receive.query().then((response) => {
				this.calculateStatus(response.data);
			});
		},
		updateTotal() {
			Receive.total().then((response) => {
				this.total = response.data.total;
			});
		}
	},
	events: {
		'change-info'() {
			this.updateStatus();
			this.updateTotal();
		}
	}
});