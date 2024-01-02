// FusionCharts configuration for the first chart
const chartConfig = {
    type: "msspline",
    renderAt: "dolulukOraniKarsilastirma",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: `Gelecek 12 Tahmini Doluluk Oranı `,
            yaxisname: "# of Doluluk",
            subcaption: "Eski Fiyat",
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
const chartConfig1 = {
    type: "msspline",
    renderAt: "dolulukOraniKarsilastirma1",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: "Gelecek 12 Tahmini Doluluk Oranı", // Adjust the caption as needed
            yaxisname: "# of Doluluk",
            subcaption: "Güncel Fiyat",
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
const chart = new FusionCharts(chartConfig);
const chart1 = new FusionCharts(chartConfig1);

function updateChart(selectedRoomType) {
    // Fetch data from the server based on the selected room type for the first chart
    $.get(`http://localhost:3000/api/karsilastirmaDoluluk/${selectedRoomType}`, (data) => {
        // Update FusionCharts data source with the fetched data for the first chart
        chart.setJSONData({
            chart: chartConfig.dataSource.chart,
            categories: [{ category: data.map(item => ({ label: new Date(item.tarih).toLocaleDateString() })) }],
            dataset: [{ data: data.map(item => ({ value: item.oran})) }]
        });
    });

    // Fetch data from the server based on the selected room type for the second chart
    $.get(`http://localhost:3000/api/karsilastirmaDoluluk1/${selectedRoomType}`, (data) => {
        // Update FusionCharts data source with the fetched data for the second chart
        chart1.setJSONData({
            chart: chartConfig1.dataSource.chart,
            categories: [{ category: data.map(item => ({ label: new Date(item.tarih).toLocaleDateString() })) }],
            dataset: [{ data: data.map(item => ({ value: item.oran})) }]
        });
    });
}
// Event listener for the room selection dropdown
$('#odaSec').change(function () {
    const selectedRoomType = $(this).val();
    updateChart(selectedRoomType);
});

// Initially, fetch and display data for the default room type
const defaultRoomType = $('#odaSec').val();
updateChart(defaultRoomType);

// Render the FusionCharts
chart.render();
chart1.render();
