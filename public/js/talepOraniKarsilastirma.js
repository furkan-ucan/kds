const dataSource2 = {
    chart: {
        caption: "Talep Oranları Karşılaştırması",
        yaxisname: "# of Talepler",
        subcaption: "Son hafta",
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
        },
        {
            seriesname: "Otel 3",
            data: [
                { value: "20" },
                { value: "18" },
                { value: "22" },
                { value: "15" },
                { value: "16" },
                { value: "14" },
                { value: "17" }
            ]
        },
        {
            seriesname: "Otel 4",
            data: [
                { value: "25" },
                { value: "20" },
                { value: "23" },
                { value: "19" },
                { value: "21" },
                { value: "22" },
                { value: "24" }
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