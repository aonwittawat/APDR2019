// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Multi-Hazard AAL Total','Considering Extensive Risk', 'Considering Indirect Losses'],
    datasets: [{
      label: 'Million US$',
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [148865680000, 193525384000, 270935537600],
    }],
  },
  options: {
      responsive: true,
      maintainAspectRatio: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return fnum(value);
                    }
                }
            }]
        },	  
	  plugins: {
		labels: {
			render: function (args) {
			  return '$' + fnum(args.value);
			},
			arc: true
		  }
	  }
  }
});