// Veri setiniz
const dataSource = {
    chart: {
        caption: "Oda Doluluk Oranları Karşılaştırması",
        yaxisname: "# of Doluluk",
        subcaption: "Son hafta",
        numdivlines: "3",
        showvalues: "0",
        legenditemfontsize: "15",
        legenditemfontbold: "1",
        theme: "fusion",
        numberSuffix: "%" // Set the numberSuffix to "%" to display values as percentages
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
                // ... diğer aylar
            ]
        }
    ],
    dataset: [
        {
            seriesname: "Suit Oda",
            data: [
                { value: "15", price: "1000", toolText: "<b>15%</b> Doluluk Suit Oda on Ocak <br/> Fiyat: 1000" },
                { value: "10", price: "1000", toolText: "<b>10%</b> Doluluk Suit Oda on Şubat <br/> Fiyat: 1000" },
                { value: "12", price: "1000", toolText: "<b>12%</b> Doluluk Suit Oda on Mart <br/> Fiyat: 1000" },
                { value: "8", price: "1000", toolText: "<b>8%</b> Doluluk Suit Oda on Nisan <br/> Fiyat: 1000" },
                { value: "6", price: "1000", toolText: "<b>6%</b> Doluluk Suit Oda on Mayıs <br/> Fiyat: 1000" },
                { value: "4", price: "1000", toolText: "<b>4%</b> Doluluk Suit Oda on Haziran <br/> Fiyat: 1000" },
                { value: "5", price: "1000", toolText: "<b>5%</b> Doluluk Suit Oda on Temmuz <br/> Fiyat: 1000" }
                // ... diğer ayların değerleri
            ]
        },
        {
            seriesname: "Standart Oda",
            data: [
                { value: "10", price: "500", toolText: "<b>10%</b> Doluluk Standart Oda on Ocak <br/> Fiyat: 500" },
                { value: "8", price: "500", toolText: "<b>8%</b> Doluluk Standart Oda on Şubat <br/> Fiyat: 500" },
                { value: "15", price: "500", toolText: "<b>15%</b> Doluluk Standart Oda on Mart <br/> Fiyat: 500" },
                { value: "5", price: "500", toolText: "<b>5%</b> Doluluk Standart Oda on Nisan <br/> Fiyat: 500" },
                { value: "7", price: "500", toolText: "<b>7%</b> Doluluk Standart Oda on Mayıs <br/> Fiyat: 500" },
                { value: "10", price: "500", toolText: "<b>10%</b> Doluluk Standart Oda on Haziran <br/> Fiyat: 500" },
                { value: "6", price: "500", toolText: "<b>6%</b> Doluluk Standart Oda on Temmuz <br/> Fiyat: 500" }
                // ... diğer ayların değerleri
            ]
        },
        {
            seriesname: "Deluxe Oda",
            data: [
                { value: "12", price: "1500", toolText: "<b>12%</b> Doluluk Deluxe Oda on Ocak <br/> Fiyat: 1500" },
                { value: "7", price: "1500", toolText: "<b>7%</b> Doluluk Deluxe Oda on Şubat <br/> Fiyat: 1500" },
                { value: "14", price: "1500", toolText: "<b>14%</b> Doluluk Deluxe Oda on Mart <br/> Fiyat: 1500" },
                { value: "9", price: "1500", toolText: "<b>9%</b> Doluluk Deluxe Oda on Nisan <br/> Fiyat: 1500" },
                { value: "8", price: "1500", toolText: "<b>8%</b> Doluluk Deluxe Oda on Mayıs <br/> Fiyat: 1500" },
                { value: "5", price: "1500", toolText: "<b>5%</b> Doluluk Deluxe Oda on Haziran <br/> Fiyat: 1500" },
                { value: "10", price: "1500", toolText: "<b>10%</b> Doluluk Deluxe Oda on Temmuz <br/> Fiyat: 1500" }
                // ... diğer ayların değerleri
            ]
        }
        // İhtiyacınıza göre diğer oda türlerinin veri setlerini ekleyin
    ]
};

// Doluluk oranını güncelleme fonksiyonu
function updateChart() {
    const roomPrice = parseFloat(document.getElementById("roomPrice").value);

    // Her bir oda türü için doluluk oranını güncelle
    dataSource.dataset.forEach((roomType) => {
        roomType.data.forEach((dataPoint, index) => {
            const price = parseFloat(dataPoint.price);
            const totalRevenue = price * dataPoint.value; // Toplam gelir
            const totalCapacity = 1000; // Örneğin, toplam kullanılabilir kapasite
            const occupancyRate = (totalRevenue / totalCapacity) * 100; // Doluluk oranı

            // Doluluk oranını güncelle
            dataPoint.value = occupancyRate.toFixed(2);
            // Tooltext'i güncelle
            dataPoint.toolText = `<b>${dataPoint.value}%</b> Doluluk ${roomType.seriesname} on ${dataSource.categories[0].category[index].label} <br/> Fiyat: ${roomPrice}`;
        });
    });

    // Grafik nesnesini güncelle
    const myChart = FusionCharts("chart-development-activity");
    myChart.setChartData(dataSource);
}

FusionCharts.ready(function () {
    var myChart = new FusionCharts({
        type: "msspline",
        renderAt: "chart-development-activity",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource
    }).render();

    // Call updateChart function after the chart is rendered
    updateChart();
});
