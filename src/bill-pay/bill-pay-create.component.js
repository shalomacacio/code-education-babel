window.billPayCreateComponent = Vue.extend({
	template:
	`
	<!-- @submit é a abreviação de v-on:submit-->
	<form name="form" @submit.prevent="submit" :form-type="formType">
	<label>Vencimento</label>
	<input type="text" v-model="bill.date_due">
	<br/><br/>
	<label>Nome</label>
	<select v-model="bill.name">
	<!-- :value é a abreviação de v-bind:value-->
	<!-- value deixa de ser apnena propriedad do DOM e passa a ser uma propriedade de ligação-->
	<option v-for="o in names" :value="o">{{o}}</option>
	</select>
	<br/><br/>
	<label>Valor</label>
	<input type="text" v-model="bill.value">
	<br/><br/>
	<label>Paga?</label>
	<input type="checkbox" v-model="bill.done">


	<input type="submit" value="Enviar">

	</form>
	`,
		http: {
		root:'http://localhost:8000/api'
	},

	data: function(){
		return {
			formType:"insert",
			names: [
			'Luz',
			'agua',
			'telefone',
			'supermercado',
			'cartao',
			'emprestimo',
			'gasolina'
			],
			//limpar os dados form
			bill:{date_due:'', name:'', value: 0, done:0}
		};
	},

	created: function(){
		var self = this;
		if(this.$route.name == 'bill.update'){
			self.formType = 'update';
			self.getBill(this.$route.params.id)
		}
	},

	methods: {

		submit: function(){
			var self = this;
			if(self.formType =="insert"){
				Bill.save({}, this.bill).then(function(response){
					self.$dispatch('change-info');
					self.$router.go({name: 'bill-pay.list'});
				})
			}else{
				Bill.update({id: this.bill.id}, this.bill).then(function(response){
					self.$dispatch('change-info');
					self.$router.go({name: 'bill-pay.list'});
				})
			}
		},

		getBill: function(index){
			var self = this;
			Bill.get({id:id}).then(function(response){
				self.bills = response.data;
			})
		}
},

events:{
	'new-bill' : function(bill){
		self.bill = bill;
	},
}

});