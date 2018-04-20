var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    pieMoreOrLess: 'slightlyMore',
    trend: 'veryUp',
    timeline: "6 months",
    
    pie: {
      labels: [
        'javascript errors',
        'PHP errors'
      ],
      percent: [
        70,
        30
      ]
    },
    
    chart: {
      //type: 'line',
      labels: [100, 40, 60],
      points: [100, 40, 60],
      
      type: 'doughnut',
      
      options: {
        animation: {
          duration: 4000,
          onComplete: function(e) {
            console.log(e);
          }
        },
        scales: {
          yAxes: [{
            display: false
          }]
        }
        //beginZero: true
      }
    },
    
    
    
  },

  methods: {
    
    
    changeTimeline: function() {
      var self = this;
      var c;
      var m;
      if (self.timeline == "6 months") {
        c = 6;
        m = "month"
        
      } else if (self.timeline == "year") {
        c = 12;
        m = "month";
      } else if (self.timeline == "5 years") {
        c = 60;
        m = "month";
      } else if (self.timeline == "decade") {
        c = 10;
        m = "year"; 
      } else if (self.timeline == "20 years") {
        c = 20;
        m = "year"; 
      } else if (self.timeline == "50 years") {
        c = 50;
        m = "year";
      }
      
      
      var a = [];
      
      var d = moment().subtract( (c + 1), m);
      
      if (m == 'month') {
        for (var i = 0; i < c; i++) { 
          d = moment(d).add(1, m);
          a.push(moment(d).format('MMMM YYYY'));
        }
      } else if (m == 'year') {
        for (var i = 0; i < c; i++) { 
          d = moment(d).add(1, m);
          a.push(moment(d).format('YYYY'));
        }
      }
      
      self.chart.labels = a;
      
      self.changeTrend();
    },
    
    changeTrend: function() {
      var self = this;
      // GENERATE THE DATA POINTS
      var rMax;
      var rMin;
      if (self.trend == "veryUp") { rMax = 30; rMin = 7;
      } else if (self.trend == "slightlyUp") { rMax = 10; rMin = -2;
      } else if (self.trend == "flat") { rMax = 6; rMin = -3;
      } else if (self.trend == "slightlyDown") { rMax = -10; rMin = 2;
      } else if (self.trend == "veryDown") { rMax = -30; rMin = -7;
      }
      
      
      var a = [];
      var n = 7;
      for (var i = 0; i < self.chart.labels.length; i++) { 
        n = n + (n * (getRandomInt(rMax,rMin) / 100));
        a.push(n);
      }
      
      self.chart.points = a;
      
    },
    
    
    slicePie: function() {
      var self = this;
      
      var sliceCount = self.pie.labels.length
      var equalSlice = parseInt(100 / sliceCount);
      //alert(sliceCount);
      let a = [];
      let rMin;
      let rMax;
      if (self.pieMoreOrLess == "wayMore") {
        rMin = 50;
        rMax = 200;
      } else if (self.pieMoreOrLess == "slightlyMore") {
        rMin = 10;
        rMax = 24;
      }
      
      a.push(equalSlice + (equalSlice * (getRandomInt(rMax,rMin) / 100)));  
      for (let i = 1; i < sliceCount; i++) {
        a.push(equalSlice);
      }
      
      
      self.pie.percent = a;
      
      
      
    }
    
    
    
    
  },
  
  computed: {
    thanOrAs: function() {
      var self = this
      if (self.pieMoreOrLess == "same") {
        return ' as ';
      } else {
        return ' than ';
      }
      
    }
  }
  
});