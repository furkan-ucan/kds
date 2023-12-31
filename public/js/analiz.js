async function getComparisonData() {
    const odaId = document.getElementById('odaSec').value.split('-')[0].trim(); // Extract the oda_id from the selected option
    const fiyat = document.getElementById('fiyatGir').value;

    const response = await fetch('http://localhost:3000/api/fiyatPerformans', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oda_id: odaId, yeni_fiyat: fiyat }),
    });

    if (!response.ok) {
        console.error('An error occurred');
        return;
    }

    const data = await response.json();

    // Now you can use the data to update your charts
    // This will depend on what library you're using to create the charts
}



