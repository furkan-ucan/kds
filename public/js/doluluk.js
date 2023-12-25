FusionCharts.ready(function () {
    var revenueChart = new FusionCharts({
        type: 'msline',
        renderAt: 'chart-container',
        width: '100%',
        height: '300',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Doluluk Oranları",
                "subcaption": "Otel ve Rakip Oteller",
                "xaxisname": "Zaman",
                "yaxisname": "Doluluk Oranı (%)",
                "theme": "candy",
                "exportenabled": "1",
                "drawcrossline": "1"
            },
            "categories": [{
                "category": [{
                        "label": "Ocak"
                    },
                    {
                        "label": "Şubat"
                    },
                    {
                        "label": "Mart"
                    },
                    {
                        "label": "Nisan"
                    },
                    {
                        "label": "Mayıs"
                    },
                    {
                        "label": "Haziran"
                    }
                    // Diğer ayları ekleyin...
                ]
            }],
            "dataset": [{
                    "seriesname": "Oteliniz",
                    "data": [{
                            "value": "80"
                        },
                        {
                            "value": "85"
                        },
                        {
                            "value": "75"
                        },
                        {
                            "value": "90"
                        },
                        {
                            "value": "82"
                        },
                        {
                            "value": "88"
                        }
                        // Diğer verileri ekleyin...
                    ]
                },
                {
                    "seriesname": "Rakip Otel 1",
                    "data": [{
                            "value": "70"
                        },
                        {
                            "value": "75"
                        },
                        {
                            "value": "80"
                        },
                        {
                            "value": "85"
                        },
                        {
                            "value": "78"
                        },
                        {
                            "value": "80"
                        }
                        // Diğer verileri ekleyin...
                    ]
                },
                {
                    "seriesname": "Rakip Otel 2",
                    "data": [{
                            "value": "85"
                        },
                        {
                            "value": "88"
                        },
                        {
                            "value": "90"
                        },
                        {
                            "value": "92"
                        },
                        {
                            "value": "85"
                        },
                        {
                            "value": "88"
                        }
                        // Diğer verileri ekleyin...
                    ]
                }
                // Diğer otelleri ekleyin...
            ]
        }
    });
    revenueChart.render();
});