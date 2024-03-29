document.addEventListener('DOMContentLoaded', (event) => {
    createFusionChart();
    


});
google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart1)


function drawChart() {
    // id'si 0 olan için bir grafik oluştur
    var data0 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['%', 55], // customGauge0 için değer
    ]);
    var options = {
        width: 400,
        height: 300,
        redFrom: 0,
        redTo: 30,
        yellowFrom: 30,
        yellowTo: 70,
        greenFrom: 70,
        greenTo: 100,
        max: 100,
        minorTicks: 10,
        forceIFrame: false,
        animation: {
            duration: 0
        }
    };
    var chart0 = new google.visualization.Gauge(document.getElementById('customGauge0'));
    chart0.draw(data0, options);

    // id'si 1 olan için bir grafik oluştur
    var data1 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['%', 70], // customGauge1 için değer
    ]);

    var chart1 = new google.visualization.Gauge(document.getElementById('customGauge2'));
    chart1.draw(data1, options);
    // id'si 1 olan için bir grafik oluştur
    var data2 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['%', 60], // customGauge1 için değer
    ]);

    var chart2 = new google.visualization.Gauge(document.getElementById('customGauge4'));
    chart2.draw(data2, options);

    var data3 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['%', 50], // customGauge1 için değer
    ]);

    var chart3 = new google.visualization.Gauge(document.getElementById('customGauge6'));
    chart3.draw(data3, options);

}
function updateFusionChart(averagePercentage, tooltext) {
    var averagePercentage = calculateAveragePercentage();
    var difference = targetValue - averagePercentage;
    var differencePercentage = Math.abs(difference);
    var tooltext = difference < 0
        ? `<b>${differencePercentage.toFixed(2)}%</b> hedefin üzerinde`
        : `<b>${differencePercentage.toFixed(2)}%</b> hedefin altında`;

    var newDataSource = {

        dials: {
            dial: [
                {
                    value: averagePercentage.toString(),
                    tooltext: tooltext
                }
            ]
        },
        trendpoints: {
            point: [
                {
                    startvalue: targetValue.toString(),
                    displayvalue: "Hedef",
                    thickness: "2",
                    color: "#E15A26",
                    usemarker: "1",
                    markerbordercolor: "#E15A26",
                    markertooltext: targetValue + "%"
                }
            ]
        }
    };

    myChart2.setChartData(newDataSource, "json");

    myChart2.render();
}

function drawChart1() {
    var chartData = [
        { label: 'Oda Hizmeti', value: 70, id: 'customGauge1' },
        { label: 'Yemek Hizmeti', value: 60, id: 'customGauge3' },
        { label: 'Personel Hizmeti', value: 70, id: 'customGauge5' },
        { label: 'Etkinlik Hizmeti', value: 50, id: 'customGauge7' }
    ];

    // Grafikleri oluştur
    chartData.forEach(function (data) {
        drawGaugeChart(data.id, data.value);
    });

    // Gönder butonuna tıklanınca
    document.getElementById('btn').addEventListener('click', function () {
        var selectedMetric = document.getElementById('metricSelect').value;
        var selectedPara = document.getElementById('para').value;

        // Seçilen hizmete göre grafik değerlerini güncelle
        updateChartData(selectedMetric, selectedPara);
        updateFusionChart();
    });
}



function drawGaugeChart(chartId, value) {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['%', value],
    ]);

    var options = {
        width: 400,
        height: 300,
        redFrom: 0,
        redTo: 30,
        yellowFrom: 30,
        yellowTo: 70,
        greenFrom: 70,
        greenTo: 100,
        max: 100,
        minorTicks: 10,
        forceIFrame: false,
        animation: {
            duration: 0
        }
    };

    var chart = new google.visualization.Gauge(document.getElementById(chartId));
    chart.draw(data, options);
}
function updateChartData(selectedMetric, selectedPara) {
    var percentage;

    // Ortalama puanlar (0-10 arası)
    var odaHizmeti = 8;
    var yemekHizmeti = 7;
    var personelHizmeti = 9;
    var etkinlikHizmeti = 6;

    // Korelasyon katsayıları (-1 ile 1 arası)
    var odaYemek = 0.5; // Oda hizmeti ile yemek hizmeti arasındaki ilişki
    var odaPersonel = -0.2; // Oda hizmeti ile personel hizmeti arasındaki ilişki
    var odaEtkinlik = -0.4; // Oda hizmeti ile etkinlik hizmeti arasındaki ilişki
    var yemekPersonel = 0.6; // Yemek hizmeti ile personel hizmeti arasındaki ilişki
    var yemekEtkinlik = -0.3; // Yemek hizmeti ile etkinlik hizmeti arasındaki ilişki
    var personelEtkinlik = 0.4; // Personel hizmeti ile etkinlik hizmeti arasındaki ilişki

    switch (selectedMetric) {
        case '0': // Oda Hizmeti
            percentage = getPercentage(selectedPara);
            calculateNewValue('customGauge1', odaHizmeti + percentage * 10); // Oda hizmetinin puanı
            calculateNewValue('customGauge3', yemekHizmeti + percentage * 10 * odaYemek); // Oda hizmetinin yemek hizmetine etkisi
            calculateNewValue('customGauge5', personelHizmeti + percentage * 10 * odaPersonel); // Oda hizmetinin personel hizmetine etkisi
            calculateNewValue('customGauge7', etkinlikHizmeti + percentage * 10 * odaEtkinlik); // Oda hizmetinin etkinlik hizmetine etkisi
            break;
        case '1': // Yemek Hizmeti
            percentage = getPercentage(selectedPara);
            calculateNewValue('customGauge3', yemekHizmeti + percentage * 10); // Yemek hizmetinin puanı
            calculateNewValue('customGauge1', odaHizmeti + percentage * 10 * odaYemek); // Yemek hizmetinin oda hizmetine etkisi
            calculateNewValue('customGauge5', personelHizmeti + percentage * 10 * yemekPersonel); // Yemek hizmetinin personel hizmetine etkisi
            calculateNewValue('customGauge7', etkinlikHizmeti + percentage * 10 * yemekEtkinlik); // Yemek hizmetinin etkinlik hizmetine etkisi
            break;
        case '2': // Personel Hizmeti
            percentage = getPercentage(selectedPara);
            calculateNewValue('customGauge5', personelHizmeti + percentage * 10); // Personel hizmetinin puanı
            calculateNewValue('customGauge1', odaHizmeti + percentage * 10 * odaPersonel); // Personel hizmetinin oda hizmetine etkisi
            calculateNewValue('customGauge3', yemekHizmeti + percentage * 10 * yemekPersonel); // Personel hizmetinin yemek hizmetine etkisi
            calculateNewValue('customGauge7', etkinlikHizmeti + percentage * 10 * personelEtkinlik); // Personel hizmetinin etkinlik hizmetine etkisi
            break;
        case '3': // Etkinlik Hizmeti
            percentage = getPercentage(selectedPara);
            calculateNewValue('customGauge7', etkinlikHizmeti + percentage * 10); // Etkinlik hizmetinin puanı
            calculateNewValue('customGauge1', odaHizmeti + percentage * 10 * odaEtkinlik); // Etkinlik hizmetinin oda hizmetine etkisi
            calculateNewValue('customGauge3', yemekHizmeti + percentage * 10 * yemekEtkinlik); // Etkinlik hizmetinin yemek hizmetine etkisi
            calculateNewValue('customGauge5', personelHizmeti + percentage * 10 * personelEtkinlik); // Etkinlik hizmetinin personel hizmetine etkisi
            break;
        case '4': // Tüm Hizmetler
            percentage = getPercentage(selectedPara);
            calculateNewValue('customGauge1', odaHizmeti + percentage * 10);
            calculateNewValue('customGauge3', yemekHizmeti + percentage * 10);
            calculateNewValue('customGauge5', personelHizmeti + percentage * 10);
            calculateNewValue('customGauge7', etkinlikHizmeti + percentage * 10);
            break;
        default:
            return;
    }

    // Redraw all charts with updated values
    chartData.forEach(function (data) {
        drawGaugeChart(data.id, data.value);
    });
}

function getPercentage(selectedPara) {
    switch (selectedPara) {
        case '0': return 0.2;
        case '1': return 0.5;
        case '2': return -0.2;
        case '3': return -0.5;
        default: return 0;
    }
}


var chartData = [
    { label: 'Oda Hizmeti', value: 70, id: 'customGauge1' },
    { label: 'Yemek Hizmeti', value: 60, id: 'customGauge3' },
    { label: 'Personel Hizmeti', value: 70, id: 'customGauge5' },
    { label: 'Etkinlik Hizmeti', value: 50, id: 'customGauge7' }
];

function calculateNewValue(chartId, percentage) {
    // Find the chart data by its ID
    var chart = chartData.find(data => data.id === chartId);
    if (!chart) {
        console.error('No chart found with ID', chartId);
        return;
    }

    var currentValue = chart.value;
    var newValue = currentValue * (1 + percentage / 100);

    // Update the value in the chartData array
    chart.value = newValue < 0 ? 0 : (newValue > 100 ? 100 : newValue);
}

function calculateAveragePercentage() {
    var total = 0;
    var count = 0;

    chartData.forEach(function (data) {
        total += data.value;
        count++;
    });

    var average = total / count;

    // Convert to percentage
    var percentage = (average / 100) * 100; // Assuming 100 is the maximum value

    return percentage;
}






function createFusionChart() {
    var averagePercentage = calculateAveragePercentage();
    var difference = targetValue - averagePercentage;
    var differencePercentage = Math.abs(difference);
    var tooltext = difference < 0
        ? `<b>${differencePercentage.toFixed(2)}%</b> hedefin üzerinde`
        : `<b>${differencePercentage.toFixed(2)}%</b> hedefin altında`;

    var myChart1 = new FusionCharts({
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


    // İkinci grafik
    myChart2 = new FusionCharts({
        type: "angulargauge",
        renderAt: "chart-container2",
        width: "700",
        height: "300",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "6 Ay Sonrası için Müşteri Memnuniyeti Skoru",
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
                        value: averagePercentage.toString(),
                        tooltext: tooltext
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
        },
        "events": {
            "beforeRender": function (event, data) {
                // Check if data.sender is defined before calling setChartAttribute
                if (data.sender && typeof data.sender.setChartAttribute === 'function') {
                    // İkinci grafik için "candy" temasını açıkça belirliyoruz
                    data.sender.setChartAttribute('theme', 'candy');
                }
            }
        }
    })

    // Set the theme only once, outside the "beforeRender" event
    if (myChart2 && typeof myChart2.setChartAttribute === 'function') {
        myChart2.setChartAttribute('theme', 'candy');
    }

    myChart2.render();
}






var targetValue = 80; // Set your target value here
// var averagePercentage = calculateAveragePercentage();







