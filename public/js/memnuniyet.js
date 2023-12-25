const data = {
    chart: {
        caption: "Müşteri Memnuniyeti Skoru",
        subcaption: "2022",
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
                value: "85", // Müşteri memnuniyeti skorunuzu buraya girin
                tooltext: "<b>%85</b> memnuniyet"
            }
        ]
    },
    trendpoints: {
        point: [
            {
                startvalue: "90", // Hedef memnuniyet skorunuzu buraya girin
                displayvalue: "Hedef",
                thickness: "2",
                color: "#E15A26",
                usemarker: "1",
                markerbordercolor: "#E15A26",
                markertooltext: "90%"
            }
        ]
    }
};

FusionCharts.ready(function() {
    var myChart = new FusionCharts({
        type: "angulargauge",
        renderAt: "musteri-container",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource: data
    }).render();
});