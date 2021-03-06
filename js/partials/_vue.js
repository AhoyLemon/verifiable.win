// jshint -W104
// jshint -W117

var app = new Vue({
  el: '#app',
  data: {
    pieMoreOrLess: 'slightlyMore',
    r: {
      lineMeasures: lineMeasures
    },
    comparison: [
      {
        trend: 'goesUp'
      },
      {
        trend: 'goesDown'
      }
    ],
    allChartTypes: chartTypes,
    showChart: false,
    trend: 'veryUp',
    timeline: "6 months",
    browserWidth: window.innerWidth,

    bars: {
      labels: randomFrom(barComparisons),
      barSizes: barSizes,
      amounts: [],
      backgroundColors: [],
      amount: [99,66,33,11]
    },
    pie: {
      labels:  randomFrom(pieComparisons),
      backgroundColors: [],
      percent: [ 70, 30, 40 ]
    },

    chart: {
      type: 'bars',
      responsive:true,
      chartArea: {
        backgroundColor: 'rgba(251, 85, 85, 0.9)'
      },
      maintainAspectRatio:true,
      labels: [1,2,3,4,5,6],
      points: [],

      options: {
        cutoutPercentage: 10,
        legend: {
          position: 'top',
          labels: {
            fontFamily: '"Bitter", serif',
            fontColor: '#aaaaaa',
            fontSize: 24,
            padding: 36
          }
        },
        tooltips: {
          enabled: false
        },
        animation: {
          duration: 2000,
          onComplete: function(e) {
            //var c = document.getElementsByTagName("canvas")[0];
          },
          animateScale: true,

        },
        scales: {
          xAxes: [
            { display: true,
             ticks: {
               fontColor: "#fff"
             }
            }
            //fontColor: '#0000FF'
          ],
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
        label: '',
        fill: false,
        lineTension: 0.1,
        borderColor: randomColor({ hue: 'red', luminosity: 'bright' }),
        borderCapStyle: 'round',
        pointBackgroundColor: "#fff",
        data: [],
        borderWidth: 9,
        pointRadius: 2
        //pointBorderColor: randomColor({ hue: 'red', luminosity: 'bright' }),
        //pointRadius: 5

      },
      {
        label: '',
        fill: false,
        lineTension: 0.1,
        borderColor: randomColor({ hue: 'blue', luminosity: 'bright' }),
        borderCapStyle: 'round',
        borderJoinStyle: 'miter',
        data: [],
        borderWidth: 9,
        pointRadius: 2
        //pointBorderColor: randomColor({ hue: 'blue', luminosity: 'bright' }),
        //pointRadius: 5
      }
    ]

  },

  created: function () {
    window.addEventListener('keyup', function(e) {
      console.log('you pressed ' + e.which);
      if ((e.keyCode || e.which) == 32) {
        // Code here, if you want it.
      }
    }, true);
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
      } else if (self.timeline == "2 weeks") {
        c = 14;
        m = "day";
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
      } else if (m == 'day') {
        for (let i = 0; i < c; i++) { 
          d = moment(d).add(1, m);
          a.push(moment(d).format('MMM Do'));
        }
      }

      self.chart.labels = a;

      self.changeTrend();
    },

    changeTrend: function() {

      var self = this;

      let rC = randomColor({ luminosity: 'bright', format: 'rgb' });
      self.line[0].backgroundColor = rC.replace(')', ', 0.3)').replace('rgb', 'rgba');
      self.line[0].borderColor = rC.replace(')', ', 0.6)').replace('rgb', 'rgba');
      self.line[0].pointBorderColor = rC;
      self.line[0].pointHoverBorderColor = rC;
      self.line[0].pointHoverBackgroundColor = rC;

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

      let n = 1000;
      let o = 1000;

      let rMax;
      let rMin;

      self.chart.labels = [];

      for (let i = 0; i < 20; i++) { 
        self.chart.labels.push(i);
      }

      //alert(self.chart.labels.length);

      for (let i = 0; i < self.chart.labels.length; i++) { 
        if (self.comparison[0].trend == 'goesUp') {
          n = n + (n * (randomNumber(2,16) / 100));
        } else if (self.comparison[0].trend == 'goesDown') {
          n = n - (n * (randomNumber(2,16) / 100));
        } else if (self.comparison[0].trend == 'fluxuates') {
          n = n + (n * (randomNumber(-22,22) / 100));
        } else if (self.comparison[0].trend == 'flat') {
          n = n + (n * (randomNumber(-2,2) / 100));
        }

        a.push(n);
      }

      self.lines[0].data = a;

      o = n;

      for (let i = 0; i < self.chart.labels.length; i++) { 
        if (self.comparison[1].trend == 'goesUp') {
          o = o + (n * (randomNumber(2,16) / 100));
        } else if (self.comparison[1].trend == 'goesDown') {
          o = o - (n * (randomNumber(2,16) / 100));
        } else if (self.comparison[1].trend == 'fluxuates') {
          o = o + (n * (randomNumber(-22,22) / 100));
        } else if (self.comparison[1].trend == 'flat') {
          o = o + (n * (randomNumber(-2,2) / 100));
        }
        b.push(o);
      }

      self.lines[1].data = b;

    },

    slicePie: function() {
      var self = this;

      const sliceCount = self.pie.labels.length;
      let equalSlice = parseInt(100 / sliceCount);
      let a = [];
      let rMin;
      let rMax;

      let firstSlice;

      let percentLeft = 100;


      // Generate Slice colors
      self.pie.backgroundColors = [];

      let h = shuffle(hues);

      for (let i = 0; i < sliceCount; i++) {
        if (i === 0) {
          self.pie.backgroundColors.push(randomColor({ hue: h[i], luminosity:'bright', alpha:1 }));
        } else {
          self.pie.backgroundColors.push(randomColor({ format: 'rgba', luminosity:'bright', hue: h[i], alpha:0.75 }));
        }
      }

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

      self.chart.options.cutoutPercentage = randomNumber(1,30);

      self.pie.percent = a;
      self.chart.labels = self.pie.labels;
      self.chart.points = self.pie.percent;

    },

    buildBars: function() {
      var self = this;


      // Figure out the colors
      let h = shuffle(hues);
      for (let i = 0; i < self.bars.labels.length; i++) {
        if (i === 0) {
          self.bars.backgroundColors.push(randomColor({ hue: h[i], luminosity:'bright', alpha:1 }));
        } else {
          self.bars.backgroundColors.push(randomColor({ format: 'rgba', luminosity:'bright', hue: h[i], alpha:0.75 }));
        }
      }

      self.chart.points = [];
      for (let i = 0; i < self.bars.labels.length; i++) {
        let n = 0;
        if (self.bars.amounts[i] == 100)     { n = (randomNumber(90,110) * 5); }
        else if (self.bars.amounts[i] == 75) { n = (randomNumber(65,85) * 4); }
        else if (self.bars.amounts[i] == 50) { n = (randomNumber(40,60) * 3); }
        else if (self.bars.amounts[i] == 25) { n = (randomNumber(15,35) * 2); }
        else if (self.bars.amounts[i] == 5)  { n = randomNumber(1,9); }
        else if (self.bars.amounts[i] < 5)  { n = 0; }
        self.chart.points.push(n);
      }

      self.chart.labels = self.bars.labels;
      self.chart.options.legend.display = false;

      self.chart.options.scales.yAxes[0].display = false;

    },

    setupChart() {
      var self = this;

      if (self.chart.type == 'line') {
        self.changeTimeline();
      } else if (self.chart.type == 'lines') {
        let x = randomFrom(lineComparisons);
        self.lines[0].label = x[0];
        self.lines[1].label = x[1];
        self.chart.options.scales.xAxes[0].display = false;
        self.newComparison();
      } else if (self.chart.type == 'pie') {
        self.chart.options.scales.xAxes[0].display = false;
        self.slicePie();
      } else if (self.chart.type == 'bars') {
        self.bars.labels.forEach(function(element) {
          self.bars.amounts.push(randomFrom(barSizes).value);
        });
        self.buildBars();
      }

    },
    
    downloadCanvas: function (width, height, filename) {
      var c = document.getElementsByTagName("canvas")[0];
      Canvas2Image.saveAsJPEG(c, width, height, filename);
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

    self.chart.type = randomFrom(chartTypes);
    //self.chart.type = "lines";
    self.setupChart();

  }

});