window.billPayComponent = Vue.extend({
	components: {
		'menu-component': billPayMenuComponent
	},
   	template: `
   		<style type="text/css">
			.red {
				color: red;
			}

			.green {
				color: green;
			}

			.gray {
				color: gray;
			}
		</style>

		<h1>{{ title }}</h1>
		<h3 :class="{'gray': status === false, 'green': status === 0, 'red' : status > 0}">
			{{ status | statusGeneral }}
		</h3>
		<h3>{{ total | currency 'R$ ' }}</h3>
		<menu-component></menu-component>
        <router-view></router-view>
	`,
    data() { 
    	return {
	        title: "Contas a Pagar",
	        status: false,
	        total: 0
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

            let count = 0;
            for (let i in bills) {
                if (!bills[i].done) {
                    count++;
                }                
            }

            this.status = count;
		},
		updateStatus() {
			Bill.query().then((response) => {
				this.calculateStatus(response.data);
			});
		},
		updateTotal() {
			Bill.total().then((response) => {
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