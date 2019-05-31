Vue.filter('doneLabel', (value) => value == 0 ? "Não" : "Sim");

Vue.filter('statusGeneral', (value) => {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar";
    } else {
        if (value > 1) {
            return "Existem " + value + " contas ";
        } else {
            return "Existe " + value + " conta ";
        }
    }
});

Vue.filter('numberFormat' , {
    
    read(value){

        var number = 0;

        if(value && typeof value !== undefined ){
            number = value.toString().match(/\d+(\.{1\d{1,2}){0,1}/g)[0] || 0;
        }
        return new Intl.NumberFormat('pt-Br', 
        { 
            minimumFractionDigits:2, 
            maximumFractionDigits:2, 
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    
    write(value){
        var number = 0;
        if(number.length >0 ){ //"R$ 70.99" -> "70,99" -> "70.99"
            number = value.replace(/[^\d\,]/g, '')
            .replace(/\,/g ,'.')
            number = isNan(number) ? 0 : parseFloat(nuber)
        }
        return number;
    }

});