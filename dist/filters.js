"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {
    return value == 0 ? "Não" : "Sim";
});

Vue.filter('statusGeneral', function (value) {
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

Vue.filter('numberFormat', {
    read: function read(value) {

        var number = 0;

        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            number = value.toString().match(/\d+(\.{1\d{1,2}){0,1}/g)[0] || 0;
        }
        return new Intl.NumberFormat('pt-Br', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (number.length > 0) {
            //"R$ 70.99" -> "70,99" -> "70.99"
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNan(number) ? 0 : parseFloat(nuber);
        }
        return number;
    }
});