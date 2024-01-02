const dataSource2 = {
    chart: {
        caption: "Talep Oranları Karşılaştırması",
        yaxisname: "# of Talepler",
        subcaption: "Son Sene",
        numdivlines: "3",
        showvalues: "0",
        legenditemfontsize: "15",
        legenditemfontbold: "1",
        plottooltext: "<b>$dataValue</b> Talep $seriesName on $label",
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
                { value: "65" },
                { value: "67" },
                { value: "68" },
                { value: "70" },
                { value: "69" },
                { value: "66" },
                { value: "68" },
                { value: "70" },
                { value: "70" },
                { value: "70" },
                { value: "71" },
                { value: "72" }, // 2022-Ocak
                
            ]
        },
        {
            seriesname: "Otel 2",
            data: [
                { value: "60" },
                { value: "63" },
                { value: "62" },
                { value: "64" },
                { value: "70" },
                { value: "72" },
                { value: "72" },
                { value: "74" }, 
                { value: "72" },
                { value: "68" }, 
                { value: "70" } ,
                { value: "72" }  
            
            ]
        },
        {
            seriesname: "Otel 3",
            data: [
                { value: "58" },
                { value: "60" },
                { value: "65" },
                { value: "66" },
                { value: "70" },
                { value: "72" },
                { value: "72" },
                { value: "75" },
                { value: "74" } ,
                { value: "72" },
                { value: "70" },
                { value: "68" }
               
            ]
        },
        {
            seriesname: "Otel 4",
            data: [
                { value: "66" },
                { value: "69" },
                { value: "69" },
                { value: "70" },
                { value: "72" },
                { value: "77" },
                { value: "78" },
                { value: "78" }, 
                { value: "80" }, 
                { value: "82" },
                { value: "82" },
                { value: "82" }
            ]
        }
    ]
};

FusionCharts.ready(function() {
    var myChart = new FusionCharts({
        type: "msspline",
        renderAt: "chart-development-activity2",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: dataSource2
    }).render();
});
