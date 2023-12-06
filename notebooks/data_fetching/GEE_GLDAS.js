
//First import the shapefile named Algeria_shapefile.zip (found in this folder) automatically in the GEE console
//Second Paste this code there
var startDate = ee.Date('2010-01-01')
var endDate = ee.Date('2023-12-06')
var data = ee.ImageCollection("NASA/GLDAS/V022/CLSM/G025/DA1D")
              .filterDate(startDate,endDate)
              
var days = endDate.difference(startDate, 'days');
var daysStep = 1;
var timeSeries = ee.ImageCollection(
  ee.List.sequence(0, days.subtract(1), daysStep)
    .map(function (offsetDays) {
      var start = startDate.advance(offsetDays, 'days');
      var end = start.advance(daysStep, 'days');
      var composite = data
        .filterDate(start, end)
        .mean(); 
      return composite
        .set('system:time_start', start.millis())
        .set('empty', composite.bandNames().size().eq(0));
    })
  ).filterMetadata('empty', 'equals', 0);
print('timeSeries');

//print(timeSeries);
var Algiers_ROI = ROI.filter(ee.Filter.eq('ADM1_EN', 'Alger'));
var AlgiersCities = Algiers_ROI.aggregate_array('ADM2_EN')
//print(AlgiersCities)


 function lst_district(number){
 var city_name = AlgiersCities.get(number)
 var city_ROI = ROI.filter(ee.Filter.eq('ADM1_EN', 'Alger'));
 var final_csv = processing(city_ROI,city_name);

print("csv before export",final_csv)

Export.table.toDrive({
    collection: final_csv,
    folder: "GLDAS-2.2",
    selectors:['date','city','ACond_tavg',
    'AvgSurfT_tavg','CanopInt_tavg','ECanop_tavg','ESoil_tavg','EvapSnow_tavg',
    'Evap_tavg','GWS_tavg','Lwnet_tavg','Qg_tavg','Qh_tavg',
    'Qle_tavg','Qsb_tavg','Qsm_tavg','Qs_tavg','SnowDepth_tavg',
    'SnowT_tavg','SoilMoist_P_tavg','SoilMoist_RZ_tavg','SoilMoist_S_tavg',
    'SWE_tavg','Swnet_tavg','TVeg_tavg','TWS_tavg'],

    fileNamePrefix: "Algiers_"+city_name.getInfo()+"_2010_2023" ,
    fileFormat: "CSV"
  });

  
  
  
 }

   
function processing(city_ROI,city_name){

  var final_csv = timeSeries.map(function(img){
                        
  var landUse = (img.reduceRegion({reducer:ee.Reducer.mean(),geometry:city_ROI,scale:27830}))
  

  var date = img.date().format("YY-MM-dd")

 
  var dict = {date:date,city:city_name,
  ACond_tavg:landUse.get('ACond_tavg'),
    AvgSurfT_tavg:landUse.get('AvgSurfT_tavg'),
    CanopInt_tavg:landUse.get('CanopInt_tavg'),
    ECanop_tavg:landUse.get('ECanop_tavg'),
    ESoil_tavg:landUse.get('ESoil_tavg'),
    EvapSnow_tavg:landUse.get('EvapSnow_tavg'),
    Evap_tavg:landUse.get('Evap_tavg'),
    GWS_tavg:landUse.get('GWS_tavg'),
    Lwnet_tavg:landUse.get('Lwnet_tavg'),
    Qg_tavg:landUse.get('Qg_tavg'),
    Qh_tavg:landUse.get('Qh_tavg'),
    Qle_tavg:landUse.get('Qle_tavg'),
    Qsb_tavg:landUse.get('Qsb_tavg'),
    Qsm_tavg:landUse.get('Qsm_tavg'),
    Qs_tavg:landUse.get('Qs_tavg'),
    SnowDepth_tavg:landUse.get('SnowDepth_tavg'),
    SnowT_tavg:landUse.get('SnowT_tavg'),
    SoilMoist_P_tavg:landUse.get('SoilMoist_P_tavg'),
    SoilMoist_RZ_tavg:landUse.get('SoilMoist_RZ_tavg'),
    SoilMoist_S_tavg:landUse.get('SoilMoist_S_tavg'),
    SWE_tavg:landUse.get('SWE_tavg'),
    Swnet_tavg:landUse.get('Swnet_tavg'),
    TVeg_tavg:landUse.get('TVeg_tavg'),
    TWS_tavg:landUse.get('TWS_tavg')  
  }
  
     return ee.Feature(null).set(dict)
  })
  
  return final_csv
}        


 for (var i = 0; i <56; i = i + 1) {
 lst_district(i)
     }