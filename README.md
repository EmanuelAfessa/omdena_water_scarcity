# Water Scarcity Backend MVP
Backend data ideas and implementations for water scarcity app
## Data integration from different sources & benefits 
Integration of different sources and types (api calls for time series, remote sensing, etc.. ) into one instance. 
The benefits is one common, scalable and realtime database for Algeria and Bhopal. We then query it to extract data subsets for required for a task in particular. 

 ![sources](assets/sources_back_front.png) 

## Possible Datalake schema
A schema that can answer our project questions is here : 
 ![datalake](assets/datalake_schema.png) 

## Implemented aspects for data backend
The data queries can be extracted and some examples in csv formats available here in github https://github.com/EmanuelAfessa/omdena_water_scarcity

![queryall](assets/query_all.png) 
![queryml](assets/query_ML_rainfall.png) 

A front test on a small python analytics app :
![front](assets/front_test.png) 