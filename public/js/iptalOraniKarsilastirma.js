const dataSource1 = {
  chart: {
      caption: "İptal Oranları Karşılaştırması",
      yaxisname: "# of İptaller",
      subcaption: "Son Sene",
      numdivlines: "3",
      showvalues: "0",
      legenditemfontsize: "15",
      legenditemfontbold: "1",
      plottooltext: "<b>$dataValue</b> İptal $seriesName on $label",
      theme: "fusion",
      numberSuffix: "%"
  },
  categories: [
      {
          category: [
              { label: "2023-Ocak" },
              { label: "2023-Şubat" },
              { label: "2023-Mart" },
              { label: "2023-Nisan"},
              { label: "2023-Mayıs" },
              { label: "2023-Haziran" },
              { label: "2023-Temmuz" },
              { label: "2023-Ağustos" },
              { label: "2023-Eylül" },
              { label: "2023-Ekim" },
              { label: "2023-Kasım" },
              { label: "2023-Aralık" },
          ]
      }
  ],
  dataset: [
      {
          seriesname: "My Hotel",
          data: [
              { value: "30" },
              { value: "29" },
              { value: "30" },
              { value: "27" },
              { value: "27" },
              { value: "26" },
              { value: "30" },
              { value: "26" },
              { value: "30" },
              { value: "31" },
              { value: "29" },
              { value: "29" }, // 2022-Ocak
              
          ]
      },
      {
          seriesname: "Otel 2",
          data: [
              { value: "35" },
              { value: "34" },
              { value: "35" },
              { value: "36" },
              { value: "40" },
              { value: "42" },
              { value: "39" },
              { value: "38" }, 
              { value: "37" },
              { value: "36" }, 
              { value: "40" } ,
              { value: "40" }  
          
          ]
      },
      {
          seriesname: "Otel 3",
          data: [
              { value: "40" },
              { value: "41" },
              { value: "45" },
              { value: "47" },
              { value: "46" },
              { value: "40" },
              { value: "43" },
              { value: "44" },
              { value: "42" } ,
              { value: "41" },
              { value: "40" },
              { value: "40" }
             
          ]
      },
      {
          seriesname: "Otel 4",
          data: [
              { value: "43" },
              { value: "44" },
              { value: "45" },
              { value: "41" },
              { value: "40" },
              { value: "43" },
              { value: "42" },
              { value: "42" }, 
              { value: "40" }, 
              { value: "39" },
              { value: "36" },
              { value: "40" }
          ]
      }
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
      type: "msspline",
      renderAt: "chart-development-activity1",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: dataSource1
  }).render();
});
