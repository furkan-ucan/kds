window.onload = function () {
    try {
        const odaOption = document.getElementById('odaSec');
        for (let i = 0; i < odaOption.options.length; i++) {
            const option = odaOption.options[i];
            const odaId = option.value.split('-')[0].trim();
            const storedPrice = localStorage.getItem(odaId);
            if (storedPrice) {
                updateSelectedOptionPrice(storedPrice, i);
            }
        }
    } catch (error) {
        console.error('An error occurred during page load:', error);
    }
};

async function getComparisonData() {
    try {
        const odaOption = document.getElementById('odaSec');
        const odaId = odaOption.value.split('-')[0].trim();
        const fiyatInput = document.getElementById('fiyatGir');
        const yeniFiyat = fiyatInput.value;

        // Update the price in the selected option text
        const selectedOptionIndex = odaOption.selectedIndex;
        updateSelectedOptionPrice(yeniFiyat, selectedOptionIndex);

        // Save the data to local storage
        localStorage.setItem(odaId, yeniFiyat);

        const response = await fetch('http://localhost:3000/api/fiyatPerformans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oda_id: odaId, yeni_fiyat: yeniFiyat }),
        });

        if (!response.ok) {
            throw new Error('Fetch request failed');
        }

        const data = await response.json();

        // Handle the response data as needed for updating charts (this depends on your chart library)

        console.log('Reloading page...');
        location.reload(); // Reload the page to update the charts
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function updateSelectedOptionPrice(newPrice, optionIndex) {
    const odaOption = document.getElementById('odaSec');
    const selectedOptionText = odaOption.options[optionIndex].text;

    // Update the price in the selected option text
    const eskiFiyat = selectedOptionText.match(/Fiyat: (\d+)/)[1];
    const yeniOptionText = selectedOptionText.replace(`Fiyat: ${eskiFiyat}`, `Fiyat: ${newPrice}`);
    odaOption.options[optionIndex].text = yeniOptionText;
}
