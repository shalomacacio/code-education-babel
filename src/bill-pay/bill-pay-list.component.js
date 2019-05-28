window.billPayListComponent = Vue.extend({
	template:
		`
		<style>
			.verde{color: green;
			}
			.vermelho{color: red;
			}
			.cinza{color: grey;
			}
		</style>
		<table border="1">
			<tr>
				<th>#</th>
				<th>Vencimento</th>
				<th>Nome</th>
				<th>Valor</th>
				<th>Paga</th>
				<th>Ações</th>
			</tr>
			<tbody>
				<tr v-for="o in bills">
					<td>{{o.id}}</td>
					<td>{{o.date_due }}</td>
					<td>{{o.name | uppercase  }}</td>
					<td>{{o.value | currency "R$ " 4}}</td>
					<td :class="{ 'verde': o.done, 'vermelho':!o.done}">
						{{o.done  | doneLable}}
					</td>
					<td>
						<a v-link="{name: 'bill-pay.update', params: {id : o.id} }">Editar</a>
						<a href="#" @click="deleteBill(o)">Delete</a>
					</td>
				</tr>
			</tbody>
		</table>
		`,

		data: function(){
		return {
			bills:[]			
		};
	},

	created: function(){
		var self = this;
		Bill.query().then(function(response){
			self.bills = response.data;
		})
	},

	methods: {

		deleteBill: function(bill){
			if(confirm('Deseja excluir')){
				var self = this;
				Bill.delete(id, bill.id).then(function(response){
					self.bills.$remove(bill);
					self.$dispatch('change-info');
				})
			}
		},
	},

});
