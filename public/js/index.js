const dataSource1 = {
    chart: {
        caption: "Otel Doluluk Oranları Karşılaştırması",
        subCaption: "Rakip Otellerle Karşılaştırma",
        theme: "fusion",
        numberSuffix: "%",
    },
    categories: [
        {
            category: "2022-01-01|2022-02-01|2022-03-01|2022-04-01|2022-05-01|2022-06-01",
        }
    ],
    dataset: [
        {
            seriesname: "Otelimiz",
            data: [
                { "value": 75 },
                { "value": 80 },
                { "value": 85 },
                { "value": 90 },
                { "value": 95 },
                { "value": 100 }
            ]
        },
        {
            seriesname: "Rakip Otel 1",
            data: [
                { "value": 65 },
                { "value": 70 },
                { "value": 75 },
                { "value": 80 },
                { "value": 85 },
                { "value": null }
            ]
        },
        {
            seriesname: "Rakip Otel 2",
            data: [
                { "value": 80 },
                { "value": 85 },
                { "value": 90 },
                { "value": 95 },
                { "value": 100 },
                { "value": null }
            ]
        }
    ]
};

FusionCharts.ready(function () {
    var myChart = new FusionCharts({
        type: "zoomline",
        renderAt: "chart-development-activity",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: dataSource1
    }).render();
});
