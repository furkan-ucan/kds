const dataSource = {
  chart: {
    caption: "Rezervasyon İptal Oranları Karşılaştırması",
    yaxisname: "# of İptaller",
    subcaption: "Son hafta",
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
        { label: "Ocak" },
        { label: "Şubat" },
        { label: "Mart" },
        { label: "Nisan" },
        { label: "Mayıs" },
        { label: "Haziran" },
        { label: "Temmuz" }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Otel 1",
      data: [
        { value: "15" },
        { value: "10" },
        { value: "12" },
        { value: "8" },
        { value: "6" },
        { value: "4" },
        { value: "5" }
      ]
    },
    {
      seriesname: "Otel 2",
      data: [
        { value: "10" },
        { value: "8" },
        { value: "15" },
        { value: "5" },
        { value: "7" },
        { value: "10" },
        { value: "6" }
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
    dataSource
  }).render();
});