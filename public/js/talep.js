// Prepare FusionCharts
FusionCharts.ready(function () {
    // Define the room types and their corresponding chart container ids
    const roomTypes = [
        { id: 1, name: 'Standart Oda', containerId: 'chart-development-activity-11' },
        { id: 3, name: 'Suit Oda', containerId: 'chart-development-activity-12' },
        { id: 14, name: 'Deluxe Oda', containerId: 'chart-development-activity-13' },
        { id: 15, name: 'Aile Odası', containerId: 'chart-development-activity-14' },
        { id: 16, name: 'Ekonomik Oda', containerId: 'chart-development-activity-15' },
    ];

    // Create a chart for each room type
    roomTypes.forEach(roomType => {
        var myChart = new FusionCharts({
            type: "msspline", // Change the chart type to zoomline
            renderAt: roomType.containerId,
            width: "100%",
            height: "400",
            dataFormat: "json",
            dataSource: {
                chart: {
                    caption: `Gelecek 12 Tahmini Talep Oranı - ${roomType.name}`,
                    yaxisname: "# of Talep",
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
        fetch('http://localhost:3000/api/talepOrani')
            .then(response => response.json())
            .then(data => {
                // Filter the data to include only entries for the current room type from January 1, 2024, and onwards
                const filteredData = data.filter(item => item.oda_id === roomType.id && new Date(item.tarih) >= new Date(2024, 0, 1));

                // Group the filtered data by month and year
                const groupedMonths = filteredData.reduce((acc, item) => {
                    const monthYear = new Date(item.tarih).toLocaleString('default', { month: 'long', year: 'numeric' });
                    if (!acc.includes(monthYear)) {
                        acc.push(monthYear);
                    }
                    return acc;
                }, []);
                // Convert the grouped months to the format required by the chart
                const processedMonths = groupedMonths.map(month => ({ label: month }));

                // Group the data by room type
                const groupedData = filteredData.reduce((acc, item) => {
                    acc.push({
                        value: item.talep_oranı.toString(),
                        toolText: `<b>${item.talep_oranı}%</b> Doluluk ${roomType.name} on ${new Date(item.tarih).toLocaleString('default', { month: 'long', year: 'numeric' })} <br/> `
                    });
                    return acc;
                }, []);

                // Update the dataSource object
                const updatedDataSource = {
                    categories: [
                        { category: processedMonths }
                    ],
                    dataset: [{ data: groupedData }]
                };

                // Merge the changes into the existing dataSource
                myChart.setJSONData(Object.assign({}, myChart.getJSONData(), updatedDataSource));
            })
            .catch(error => console.error('Error:', error));
    });
});
