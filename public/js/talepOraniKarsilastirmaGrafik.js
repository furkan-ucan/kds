// FusionCharts configuration for the first chart
const chartConfig4 = {
    type: "msspline",
    renderAt: "talepOraniKarsilastirma",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: `Gelecek 12 Tahmini Doluluk Oranı `,
            yaxisname: "# of İptal",
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
};

// FusionCharts configuration for the second chart
const chartConfig5 = {
    type: "msspline",
    renderAt: "talepOraniKarsilastirma1",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: "Gelecek 12 Tahmini İptal Oranı", // Adjust the caption as needed
            yaxisname: "# of İptal",
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
};

// Initialize FusionCharts instances
const chart4 = new FusionCharts(chartConfig4);
const chart5 = new FusionCharts(chartConfig5);

function updateChart2(selectedRoomType) {
    // Fetch data from the server based on the selected room type for the first chart
    $.get(`http://localhost:3000/api/karsilastirmaTalep/${selectedRoomType}`, (data) => {
        // Update FusionCharts data source with the fetched data for the first chart
        chart4.setJSONData({
            chart: chartConfig.dataSource.chart,
            categories: [{ category: data.map(item => ({ label: new Date(item.tarih).toLocaleDateString() })) }],
            dataset: [{ data: data.map(item => ({ value: item.oran})) }]
        });
    });

    // Fetch data from the server based on the selected room type for the second chart
    $.get(`http://localhost:3000/api/karsilastirmaTalep1/${selectedRoomType}`, (data) => {
        // Update FusionCharts data source with the fetched data for the second chart
        chart5.setJSONData({
            chart: chartConfig1.dataSource.chart,
            categories: [{ category: data.map(item => ({ label: new Date(item.tarih).toLocaleDateString() })) }],
            dataset: [{ data: data.map(item => ({ value: item.oran})) }]
        });
    });
}
// Event listener for the room selection dropdown
$('#odaSec').change(function () {
    const selectedRoomType = $(this).val();
    updateChart2(selectedRoomType);
});

// Initially, fetch and display data for the default room type
const defaultRoomType2 = $('#odaSec').val();
updateChart2(defaultRoomType2);

// Render the FusionCharts
chart4.render();
chart5.render();
