const names = ['Conta de Luz','Conta de água','Conta de Internet','Conta de telefone','Conta de Condominio','Gasolina','Refeição','Supermercado'];

window.billPayCreateComponent = Vue.extend({
	template: `
		<form name="form" @submit.prevent="submit">
			<label>Vencimento:</label>
			<input type="text" v-model="bill.date_due">
			<br><br>

			<label>Nome:</label>
			<select v-model="bill.name">
				<option v-for="name in names" :value=" name">{{ name }}</option>
			</select>
			<br><br>

			<label>Valor:</label>
			<input type="text" v-model="bill.value | numberFormat">
			<br><br>
			
			<label>Pago?</label>
			<input type="checkbox" v-model="bill.done">
			<br><br>

			<input type="submit" value="Enviar">
		</form>
	`,
	data() {
		return {
			formType: 'insert',
			names: names,
			
	        bill: {
	            date_due: '',
	            name: '',
	            value: 0,
	            done: false
	        }
		}
	},
	created() {
		if(this.$route.name == 'bill-pay.update') {
			this.formType = 'update';
			this.getBill(this.$route.params.id);
		}
	},
	methods: {
		submit(){
            if (this.formType == 'insert') {
            	Bill.save({}, this.bill).then((response) =>{
            		this.$dispatch('change-info');
            		this.$router.go({name: 'bill-pay.list'});
            	});
            } else {
            	Bill.update({id: this.bill.id}, this.bill).then((response)=> {
            		this.$dispatch('change-info');
            		this.$router.go({name: 'bill-pay.list'});
				})
			}
		},

        getBill(id) {
	        Bill.get({id: id}).then((response)=> {
				this.bill = response.data;
			});
        }
	}
});