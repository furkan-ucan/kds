// FusionCharts configuration for the first chart
const chartConfig2 = {
    type: "msspline",
    renderAt: "iptalOraniKarsilastirma",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: `Gelecek 12 Tahmini İptal Oranı `,
            yaxisname: "# of İptal",
            subcaption: "Eski Fİyat",
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
const chartConfig3 = {
    type: "msspline",
    renderAt: "iptalOraniKarsilastirma1",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: "Gelecek 12 Tahmini İptal Oranı", // Adjust the caption as needed
            yaxisname: "# of İptal",
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
const chart2 = new FusionCharts(chartConfig2);
const chart3 = new FusionCharts(chartConfig3);

function updateChart1(selectedRoomType) {
    // Fetch data from the server based on the selected room type for the first chart
    $.get(`http://localhost:3000/api/karsilastirmaIptal/${selectedRoomType}`, (data) => {
        // Update FusionCharts data source with the fetched data for the first chart
        chart2.setJSONData({
            chart: chartConfig2.dataSource.chart,
            categories: [{ category: data.map(item => ({ label: new Date(item.tarih).toLocaleDateString() })) }],
            dataset: [{ data: data.map(item => ({ value: item.oran})) }]
        });
    });

    // Fetch data from the server based on the selected room type for the second chart
    $.get(`http://localhost:3000/api/karsilastirmaIptal1/${selectedRoomType}`, (data) => {
        // Update FusionCharts data source with the fetched data for the second chart
        chart3.setJSONData({
            chart: chartConfig3.dataSource.chart,
            categories: [{ category: data.map(item => ({ label: new Date(item.tarih).toLocaleDateString() })) }],
            dataset: [{ data: data.map(item => ({ value: item.oran})) }]
        });
    });
}
// Event listener for the room selection dropdown
$('#odaSec').change(function () {
    const selectedRoomType = $(this).val();
    updateChart1(selectedRoomType);
});

// Initially, fetch and display data for the default room type
const defaultRoomType1 = $('#odaSec').val();
updateChart1(defaultRoomType1);

// Render the FusionCharts
chart2.render();
chart3.render();
