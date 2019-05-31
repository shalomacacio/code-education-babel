window.billPayListComponent = Vue.extend({
	template: `
		<style type="text/css">
			.pago {
				color: green;
			}
			.nao-pago {
				color: red;
			}
		</style>

		<table border="1" cellpadding="10">
			<thead>
				<tr>
					<td></td>
					<td>Vencimento</td>
					<td>Nome</td>
					<td>Valor</td>
					<td>Paga?</td>
					<td>Ações</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(index, bill) in bills">
					<td>{{ index + 1 }}</td>
					<td>{{ bill.date_due }}</td>
					<td>{{ bill.name }}</td>
					<td>{{ bill.value | numberFormat }}</td>
					<td :class="{'pago': bill.done, 'nao-pago': !bill.done}">
						{{ bill.done | doneLabel }}
					</td>
					<td style="cursor:pointer">
						<a v-link="{name: 'bill-pay.update', params: {id: bill.id}}">Editar</a> |
						<a @click.prevent="removeBill(bill)">Remover</a>
					</td>
				</tr>
			</tbody>
		</table>
	`,
	data() {
		return {
			bills: []
		};
	},
	created() {
	
		Bill.query().then((response)=> {
			this.bills = response.data;
		});
	},
	methods: {
        removeBill(bill) {
            if (confirm('Deseja excluir esta conta?')) {
            	Bill.delete({id: bill.id}).then((response) => {
            		this.bills.$remove(bill);
            		this.$dispatch('change-info');
            	});                
            }            
        }
	}
});