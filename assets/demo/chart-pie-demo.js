// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var ctx = document.getElementById('myPieChart');
var myPieChart = new Chart(ctx, {
    type: 'doughnut',    
    data: {
      labels: ['Drought', 'Earthquake', 'Tropical Cyclone', 'Tsunami', 'Multi-Hazard'],
      datasets: [{
        data: [12.21, 15.58, 11.25, 8.32, 17.22],
        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#000']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
	  legend: {
		   position: 'right'
	  },
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          label: function(tooltipItem, data) {
            return '$' + fnum(data['datasets'][0]['data'][tooltipItem['index']]);
          },
          afterLabel: function(tooltipItem, data) {
            var dataset = data['datasets'][0];
            //var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][1]['total']) * 100)
			var percent = (dataset['data'][tooltipItem['index']] / dataset["_meta"][1]['total']) * 100
            return '(' + percent.toFixed(2) + '%)';
          }
        },
        backgroundColor: '#FFF',
        titleFontSize: 16,
        titleFontColor: '#0066ff',
        bodyFontColor: '#000',
        bodyFontSize: 14,
        displayColors: false
      }, 
      plugins: {
        labels: {
		  // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
          render: 'percentage',
          fontColor: ['white', 'white', 'white','white','white'],
          precision: 2
        }
      },
    }
});