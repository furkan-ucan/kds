// Prepare FusionCharts
FusionCharts.ready(function () {
    var myChart = new FusionCharts({
        type: "zoomline", // Change the chart type to zoomline
        renderAt: "chart-development-activity",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "Oda Doluluk Oranları Karşılaştırması",
                yaxisname: "# of Doluluk",
                subcaption: "Son hafta",
                numdivlines: "3",
                showvalues: "0",
                legenditemfontsize: "15",
                legenditemfontbold: "1",
                theme: "fusion",
                numberSuffix: "%"
            },
            categories: [
                { category: [] } // Initialize with an object that has a 'category' property
            ],
            dataset: [] // Initially an empty data set
        }
    }).render();

    // Fetch data from the API
    fetch('http://localhost:3000/api/dolulukOrani')
        .then(response => response.json())
        .then(data => {
            // Group the data by month and year
            const groupedMonths = data.reduce((acc, item) => {
                const monthYear = new Date(item.tarih).toLocaleString('default', { month: 'long', year: 'numeric' });
                if (!acc.includes(monthYear)) {
                    acc.push(monthYear);
                }
                return acc;
            }, []);

            // Convert the grouped months to the format required by the chart
            const processedMonths = groupedMonths.map(month => ({ label: month }));

            // Group the data by room type
            const groupedData = data.reduce((acc, item) => {
                let seriesname;
                switch (item.oda_id) {
                    case 1: seriesname = 'Standart Oda'; break;
                    case 3: seriesname = 'Suit Oda'; break;
                    case 14: seriesname = 'Deluxe Oda'; break;
                    case 15: seriesname = 'Aile Odası'; break;
                    case 16: seriesname = 'Ekonomik Oda'; break;
                }
                if (!acc[seriesname]) {
                    acc[seriesname] = [];
                }
                acc[seriesname].push({
                    value: item.eski_doluluk_orani.toString(),
                    price: "1000",
                    toolText: `<b>${item.eski_doluluk_orani}%</b> Doluluk ${seriesname} on ${new Date(item.tarih).toLocaleString('default', { month: 'long', year: 'numeric' })} <br/> Fiyat: 1000`
                });
                return acc;
            }, {});

            // Convert the grouped data to the format required by the chart
            const processedData = Object.entries(groupedData).map(([seriesname, data]) => ({ seriesname, data }));

            // Update the dataSource object
            const updatedDataSource = {
                categories: [
                    { category: processedMonths }
                ],
                dataset: processedData
            };

            // Merge the changes into the existing dataSource
            myChart.setJSONData(Object.assign({}, myChart.getJSONData(), updatedDataSource));
        })
        .catch(error => console.error('Error:', error));
});
