window.billReceiveListComponent = Vue.extend({
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
				<tr v-for="o in receives">
					<td>{{o.id}}</td>
					<td>{{o.date_due }}</td>
					<td>{{o.name | uppercase  }}</td>
					<td>{{o.value | currency "R$ " 2}}</td>
					<td :class="{ 'verde': o.received, 'vermelho':!o.received}">
						{{o.received  | doneLabel}}
					</td>
					<td>
						<a v-link="{name: 'bill-receive.update', params: {id: o.id} }">Editar</a>
						<a href="#" @click="deleteBill(o)">Delete</a>
					</td>
				</tr>
			</tbody>
		</table>
		`,
	data: function() {
		return {
			receives: []
		};
	},
	created: function() {
		var self = this;
		Receive.query().then(function(response) {
			self.receives = response.data;
		});
	},
	methods: {
        removeBill : function(receive) {
            if (confirm('Deseja excluir esta conta?')) {
            	var self = this;
            	Receive.delete({id: bill.id}).then(function(response) {
            		self.receives.$remove(bill);
            		self.$dispatch('change-info');
            	});                
            }            
        }
	}

});
