'use strict';

window.billPayComponent = Vue.extend({

  components: {
    'menu-component': billPayMenuComponent
  },

  template: '\n \t<h1>{{title}} </h1>\n \t<h3 :class="{\'cinza\': status == \'Nenhuma conta cadastrada\'}"> {{ status }} </h3>\n \t<h3>{{ total | currency \'R$ \'}}</h3>\n\n \t<menu-component></menu-component>\n \t<router-view></router-view>\n\n \t',

  data: function data() {

    return {
      title: "Contas a Pagar",
      status: false,
      total: 0
    };
  },

  created: function created() {

    this.updateStatus();
    this.updateTotal();
  },

  methods: {

    calculateStatus: function calculateStatus(bills) {
      var bills = this.$root.$children[0].billsPay;
      if (!bills.lenght) {
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

    updateStatus: function updateStatus() {

      var self = this;
      Bill.query().then(function (response) {
        self.calculateStatus(response.data);
      });
    },

    updateTotal: function updateTotal() {
      var self = this;
      Bill.total().then(function (response) {
        self.total = response.data.total;
      });
    }
  },

  events: {
    'change-info': function changeInfo() {
      this.updateStatus;
      this.updateTotal;
    }
  }
});