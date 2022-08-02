function fnum(x) {
	if(isNaN(x)) return x;

	if(x < 9999) {
		return x;
	}

	if(x < 1000000) {
		return Math.round(x/1000) + "K";
	}
	if( x < 10000000) {
		return (x/1000000).toFixed(2) + "M";
	}

	if(x < 1000000000) {
		return Math.round((x/1000000)) + "M";
	}

	if(x < 1000000000000) {
		return Math.round((x/1000000000)) + "B";
	}

	return "1T+";
}

function million(x) {
	if(isNaN(x)) return x;
	var m = x/1000000;
	return m.toFixed(2);
}

var map;
var	apMap;

function createMap() {
	//map = L.map('map', {maxZoom: 5, minZoom: 2}).setView([14.230993 ,  103.253911], 4);
	mapExtent = [14.230993 ,  103.253911];
	zoomLevel = 4;
	map = L.map('map', {
		zoomControl: false,
		maxZoom: 6, minZoom: 3
	}).setView(mapExtent, zoomLevel);

	//L.esri.basemapLayer('Gray').addTo(map);
	L.esri.tiledMapLayer({
		url: 'https://geoservices.un.org/arcgis/rest/services/ClearMap_WebGray/MapServer'
	  }).addTo(map);

    apMap = new L.esri.featureLayer({
		url: 'https://services.arcgis.com/Zoi8xtp32kQcxoKu/ArcGIS/rest/services/APDR2AGOL/FeatureServer/0'
    }).addTo(map);
	
	apMap.bindPopup(function (layer) {
		return L.Util.template('<strong>{Country}</strong>', layer.feature.properties);
	});
}

function getCountry () {
	$.ajax({
		url: 'https://services.arcgis.com/Zoi8xtp32kQcxoKu/ArcGIS/rest/services/APDR2AGOL/FeatureServer/0/query',
		dataType: 'jsonp',
		data: {
			where: '1=1',
			outFields: 'Country',
			returnGeometry: 'false',
			f: 'pjson'
		},
		success: function (response) {
			$.each(response.features, function (i, item){
				$("#categories").append('<option>'+item.attributes.Country+'</option>');
			});
			createMap();
		} 
	});
}

function mapControl (conuntry){
	// set map zoom
	apMap.eachFeature(function (layer) {
		if ($("#categories option:selected").val() != 'All Countries') {
			if (layer.feature.properties.Country === $("#categories option:selected").val()) {
				map.fitBounds(layer.getBounds());
			}
		} else {
			map.setView(mapExtent, zoomLevel);
		}
	});
	// filter map
//	if (conuntry != "All Countries") {
//		apMap.setWhere("Country = '" + conuntry + "'");
//	} else {
//		apMap.setWhere("1=1");
//	}
}


function countryChanged (country) {
	$.ajax({
		url: 'https://services.arcgis.com/Zoi8xtp32kQcxoKu/ArcGIS/rest/services/APDR2AGOL/FeatureServer/0/query',
		dataType: 'jsonp',
		data: {
			where: "Country = '" + country + "'",	
			outFields: '*',
			returnGeometry: 'false',
			f: 'pjson'},
		success: function (response) {
			var ISO3 = response.features[0].attributes.ISO3
			var country = response.features[0].attributes.Country
			var mhExposedAssest = million(response.features[0].attributes.MH_Exposed_Assest)
			
			var GDPTotal = million(response.features[0].attributes.GDP_Total_2018)
			var GDPAG = million(response.features[0].attributes.GDP_Agriculture_2018)
			
			var droughtValue = million(response.features[0].attributes.Drought_AAL_estimate_20)
			var droughtPer = response.features[0].attributes.Drought_AAL
			var droughtShr = response.features[0].attributes.Drought_AAL_Share_in_AP
			
			var earthquakeValue = million(response.features[0].attributes.Earthquake_AAL)
			var earthquakePer = response.features[0].attributes.Earthqua_1
			var earthquakeShr = response.features[0].attributes.Earthquake_AAL_Share_in_AP
			
			var tropicalcycloneValue = million(response.features[0].attributes.Tropical_Cyclone_AAL)
			var tropicalcyclonePer = response.features[0].attributes.Tropical_Cyclone_AAL_Percentage
			var tropicalcycloneShr = response.features[0].attributes.Tropical_Cyclone_AAL_share_in_A
			
			var tsunamiValue = million(response.features[0].attributes.Tsunami_AAL)
			var tsunamiPer = response.features[0].attributes.Tsunami_AAL_Percentage
			var tsunamiShr = response.features[0].attributes.Tusnami_AAL_share_in_AP
			
			var floodValue = million(response.features[0].attributes.Flood_AAL)
			var floodPer = response.features[0].attributes.Flood_AAL_Percentage
			var floodShr = response.features[0].attributes.Flood_AAL_share_in_AP
			
			var mhAAL = million(response.features[0].attributes.MH_AAL_Total)
			var mhPer = response.features[0].attributes.MH_AAL_Total_Percentage
			var mhShr = response.features[0].attributes.MH_AAL_share_in_AP
			
			var mhExtensive = million(response.features[0].attributes.MH_AAL_considering_extensive_ri)
			var mhIndirect = million(response.features[0].attributes.MH_AAL__considering_indirect_lo)

			var population = response.features[0].attributes.Total_Population

			// update Basic Country Statistics table
			//document.getElementById("country").innerHTML = country;
			//document.getElementById("population").innerHTML = population.toLocaleString();
			document.getElementById("mhExposedAssest").innerHTML = '$ ' + mhExposedAssest.toLocaleString()
			document.getElementById("GDPTotal").innerHTML = '$ ' + GDPTotal.toLocaleString();
			document.getElementById("GDPAG").innerHTML = '$ ' + GDPAG.toLocaleString();
			document.getElementById("mhAAL").innerHTML = '$ ' + mhAAL.toLocaleString();
			document.getElementById("mhExtensive").innerHTML = '$ ' + mhExtensive.toLocaleString();
			document.getElementById("mhIndirect").innerHTML = '$ ' + mhIndirect.toLocaleString();

			// update  Average Annual Loss (AAL) by hazard table		
			document.getElementById("drought").innerHTML = '$ ' + droughtValue.toLocaleString();
			document.getElementById("earthquake").innerHTML = '$ ' + earthquakeValue.toLocaleString();
			document.getElementById("tropicalcyclone").innerHTML = '$ ' + tropicalcycloneValue.toLocaleString()
			document.getElementById("tsunami").innerHTML = '$ ' + tsunamiValue.toLocaleString();
			document.getElementById("flood").innerHTML = '$ ' + floodValue.toLocaleString();
			document.getElementById("multi-hazard").innerHTML = '$ ' + mhAAL.toLocaleString();
			
			document.getElementById("droughtPer").innerHTML = (droughtPer*100).toFixed(2);
			document.getElementById("earthquakePer").innerHTML = (earthquakePer*100).toFixed(2);
			document.getElementById("tropicalcyclonePer").innerHTML = (tropicalcyclonePer*100).toFixed(2);
			document.getElementById("tsunamiPer").innerHTML = (tsunamiPer*100).toFixed(2);
			document.getElementById("floodPer").innerHTML = (floodPer*100).toFixed(2);
			document.getElementById("multi-hazardPer").innerHTML = (mhPer*100).toFixed(2);
			
			document.getElementById("droughtShr").innerHTML = (droughtShr*100).toFixed(2);
			document.getElementById("earthquakeShr").innerHTML = (earthquakeShr*100).toFixed(2);
			document.getElementById("tropicalcycloneShr").innerHTML = (tropicalcycloneShr*100).toFixed(2);
			document.getElementById("tsunamiShr").innerHTML = (tsunamiShr*100).toFixed(2);
			document.getElementById("floodShr").innerHTML = (floodShr*100).toFixed(2);
			document.getElementById("multi-hazardShr").innerHTML = (mhShr*100).toFixed(2);	

			//	update pie chart		
			myPieChart.data.datasets[0].data = [droughtValue, earthquakeValue, tropicalcycloneValue, tsunamiValue, floodValue, mhAAL];
			myPieChart.update();
			
			// update bar chart
			myBarChart.data.datasets[0].data = [mhAAL, mhExtensive, mhIndirect];
			myBarChart.update();	
			
			// update profile link
			var isoCode = 'profiles/' + ISO3 + '.pdf'
			document.getElementById('profile').setAttribute('href', isoCode);
		} 
	});
	mapControl(country);
}

$(document).ready(function (){
	if (!$('html').hasClass('lt-ie9')) {
		getCountry();
		$('#categories').change(function () {
			countryChanged($('option:selected', this).val());
			apMap.setWhere("Country = '" + $('option:selected', this).val() + "'");
		});		
	}
});
