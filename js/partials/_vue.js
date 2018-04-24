// jshint -W104
// jshint -W117

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    pieMoreOrLess: 'slightlyMore',
    
    comparison: [
      {
        trend: 'goesUp'
      },
      {
        trend: 'goesDown'
      }
    ],
    
    trend: 'veryUp',
    timeline: "6 months",

    pie: {
      labels:  randomFrom(pieComparisons),
      percent: [ 70, 30, 40 ]
    },

    chart: {
      type: 'lines',

      labels: [1,2,3,4,5,6],
      points: [],

      options: {
        cutoutPercentage: 10,
        legend: {
          position: 'top',
          //padding: 50
          labels: {
            fontFamily: '"Bitter", serif',
            fontColor: '#333333',
            fontSize: 24,
            padding: 36
          }
        },
        tooltips: {
          enabled: false
        },
        animation: {
          duration: 2000,
          /*
          onComplete: function(e) {
            console.log(e);
          },
          */
          
          animateScale: true,
          
        },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return '';
              },
              beginAtZero:true,
            }
          }]
        }
      }
    },

    line: [
      {
        label: randomFrom(lineMeasures),
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.3)",
        borderColor: "rgba(75,192,192,6)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(242,213,18,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
        spanGaps: false
      }
    ],
    
    lines: [
      {
        label: 'Fart',
        fill: false,
        lineTension: 0.1,
        //backgroundColor: "rgba(75,192,192,0.3)",
        borderColor: randomColor({ hue: 'red', luminosity: 'dark' }),
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        //pointBorderColor: "rgba(75,192,192,1)",
        //pointBackgroundColor: "#fff",
        //pointBorderWidth: 20,
        pointHoverRadius: 0,
        //pointHoverBackgroundColor: "rgba(242,213,18,1)",
        //pointHoverBorderColor: "rgba(220,220,220,1)",
        //pointHoverBorderWidth: 2,
        pointRadius: 0,
        //pointHitRadius: 10,
        data: [],
        spanGaps: false,
        borderWidth: 15
      },
      {
        label: 'Burp',
        fill: false,
        lineTension: 0.1,
        //backgroundColor: "rgba(75,192,192,0.3)",
        borderColor: randomColor({ hue: 'blue', luminosity: 'dark' }),
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        //pointBorderColor: "rgba(75,192,192,1)",
        //pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        //pointHoverBackgroundColor: "rgba(242,213,18,1)",
        //pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
        spanGaps: false,
        borderWidth: 15
      }
    ]

  },

  methods: {


    changeTimeline: function() {
      var self = this;

      var c;
      var m;
      if (self.timeline == "6 months") {
        c = 6;
        m = "month";

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
        for (let i = 0; i < c; i++) { 
          d = moment(d).add(1, m);
          a.push(moment(d).format('MMMM YYYY'));
        }
      } else if (m == 'year') {
        for (let i = 0; i < c; i++) { 
          d = moment(d).add(1, m);
          a.push(moment(d).format('YYYY'));
        }
      }

      self.chart.labels = a;

      self.changeTrend();
    },

    changeTrend: function() {

      var self = this;

      let rC = randomColor({ luminosity: 'dark', format: 'rgb' });
      self.line[0].backgroundColor = rC.replace(')', ', 0.3)').replace('rgb', 'rgba');
      self.line[0].borderColor = rC.replace(')', ', 0.6)').replace('rgb', 'rgba');
      self.line[0].pointBorderColor = rC;
      self.line[0].pointHoverBorderColor = rC;
      self.line[0].pointHoverBackgroundColor = rC;

      var self = this;
      // GENERATE THE DATA POINTS
      var rMax;
      var rMin;
      if (self.trend == "veryUp") { rMax = 30; rMin = 7;
      } else if (self.trend == "slightlyUp") { rMax = 10; rMin = -2;
      } else if (self.trend == "flat") { // handled differently.
      } else if (self.trend == "slightlyDown") { rMax = -10; rMin = 2;
      } else if (self.trend == "veryDown") { rMax = -30; rMin = -7;
      }


      var a = [];
      let n = 100;

      for (var i = 0; i < self.chart.labels.length; i++) { 

        if (self.trend == "flat") { 

          var flip = randomNumber(1,6);
          if (flip == 1) {
            n = n + (n * (randomNumber(1,2) / 100) );
          } else if (flip == 2) {
            n = n - (n * (randomNumber(1,2) / 100) );
          } else {
            n = n;
          }

        } else {
          n = n + (n * (randomNumber(rMin,rMax) / 100));
        }

        a.push(n);
      }

      self.chart.points = a;
      self.line[0].data = a;

      self.chart.options.legend.position = 'bottom';

    },
    
    newComparison: function() {
      var self = this;
      
      let a = [];
      let b = [];
      
      let n = 100;
      let o = 100;
      
      let rMax;
      let rMin;
      
      
      if (self.comparison[0].trend == 'goesUp') {
        rMax = 30;
        rMin = 7;
      }
      
      
      for (let i = 0; i < self.chart.labels.length; i++) { 
        n = n + (n * (randomNumber(rMin,rMax) / 100));
        a.push(n);
      }
      
      self.lines[0].data = a;
      
      if (self.comparison[1].trend == 'goesDown') {
        rMax = 30;
        rMin = 7;
      }
      
      o = n;
      
      for (let i = 0; i < self.chart.labels.length; i++) { 
        o = o - (o * (randomNumber(30,7) / 100));
        b.push(o);
      }
      
      self.lines[1].data = b;

      //self.chart.points = a;
      //self.line[0].data = a;

      //self.chart.options.legend.position = 'bottom';
      
    },

    slicePie: function() {
      var self = this;

      const sliceCount = self.pie.labels.length;
      let equalSlice = parseInt(100 / sliceCount);
      //alert(sliceCount);
      let a = [];
      let rMin;
      let rMax;

      let firstSlice;

      let percentLeft = 100;

      if (self.pieMoreOrLess == "wayMore") { firstSlice = randomNumber(43,70); 
      } else if (self.pieMoreOrLess == "slightlyMore") { firstSlice = equalSlice + (equalSlice * (randomNumber(13,26) / 100));
      } else if (self.pieMoreOrLess == "same") { firstSlice =  equalSlice + randomNumber(-2,2);
      } else if (self.pieMoreOrLess == "slightlyLess") { firstSlice = equalSlice - (equalSlice * (randomNumber(13,26) / 100));
      } else if (self.pieMoreOrLess == "wayLess") { firstSlice = randomNumber(6,13);
      }
      
      self.chart.options.scales.yAxes[0].display = false;
      self.chart.options.scales.yAxes[0].ticks.beginAtZero = false;

      a.push(firstSlice);

      percentLeft = percentLeft - firstSlice; 
      let slicesLeft = sliceCount - 1;

      for (let i = 1; i < sliceCount; i++) {
        let thisSlice = (percentLeft / slicesLeft);
        thisSlice = thisSlice + (thisSlice * (randomNumber(-10,10) / 100));
        percentLeft = percentLeft - thisSlice;
        slicesLeft--;
        a.push(thisSlice);
      }

      self.chart.options.cutoutPercentage = randomNumber(1,45);

      self.pie.percent = a;
      self.chart.labels = self.pie.labels;
      self.chart.points = self.pie.percent;

    }

  },

  computed: {
    thanOrAs: function() {
      var self = this;
      if (self.pieMoreOrLess == "same") {
        return ' as ';
      } else {
        return ' than ';
      }

    }
  },

  beforeMount: function() {
    var self = this;
    
    if (self.chart.type == 'line') {
      self.changeTimeline();
    } else if (self.chart.type == 'lines') {
      self.newComparison();
    } else if (self.chart.type == 'pie') {
      self.slicePie();
    }
    
  }

});