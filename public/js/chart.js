FusionCharts.ready(function() {
    var myChart = new FusionCharts({
        type: "angulargauge",
        renderAt: "chart-container",
        width: "700",
        height: "300",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "Müşteri Memnuniyeti Skoru",
                lowerlimit: "0",
                upperlimit: "100",
                showvalue: "1",
                numbersuffix: "%",
                theme: "candy"
            },
            colorrange: {
                color: [
                    {
                        minvalue: "0",
                        maxvalue: "50",
                        code: "#F2726F"
                    },
                    {
                        minvalue: "50",
                        maxvalue: "75",
                        code: "#FFC533"
                    },
                    {
                        minvalue: "75",
                        maxvalue: "100",
                        code: "#62B58F"
                    }
                ]
            },
            dials: {
                dial: [
                    {
                        value: "71", // Müşteri memnuniyeti skorunuzu buraya girin
                        tooltext: "<b>9%</b> hedefin altında"
                    }
                ]
            },
            trendpoints: {
                point: [
                    {
                        startvalue: "80",
                        displayvalue: "Hedef",
                        thickness: "2",
                        color: "#E15A26",
                        usemarker: "1",
                        markerbordercolor: "#E15A26",
                        markertooltext: "80%"
                    }
                ]
            }
        }
    }).render();
});