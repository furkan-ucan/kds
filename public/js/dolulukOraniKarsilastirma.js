// Fetch data from the API
fetch('http://localhost:3000/api/dolulukOraniKarsilastirma')
    .then(response => response.json())
    .then(data => {
        // Update the 'arabaSayisi' element with the 2024 average occupancy rate
        document.getElementById('arabaSayisi').textContent = data.average2024.toFixed(2) + '%';

        // Calculate the difference between the 2024 average and the 2023 average
        const difference = data.average2024 - data.average2023;

        // Update the 'difference' element with the calculated difference
        const differenceElement = document.querySelector('.card-footer p span');
        differenceElement.textContent = (difference >= 0 ? '+' : '') + difference.toFixed(2) + '% ';
        differenceElement.className = difference >= 0 ? 'text-success text-sm font-weight-bolder' : 'text-danger text-sm font-weight-bolder';
    })
    .catch(error => console.error('Error:', error));

// Fetch data from the API
fetch('http://localhost:3000/api/iptalOraniKarsilastirma')
    .then(response => response.json())
    .then(data => {
        // Update the 'musteriSayisi' element with the 2024 average occupancy rate
        document.getElementById('musteriSayisi').textContent = data.average2024.toFixed(2) + '%';

        // Calculate the difference between the 2024 average and the 2023 average
        const difference = data.average2024 - data.average2023;

        // Update the 'difference' element with the calculated difference
        const differenceElement = document.querySelector('#iptal p span'); // Corrected selector
        differenceElement.textContent = (difference >= 0 ? '+' : '') + difference.toFixed(2) + '% ';
        differenceElement.className = difference >= 0 ? 'text-success text-sm font-weight-bolder' : 'text-danger text-sm font-weight-bolder';
    })
    .catch(error => console.error('Error:', error));


// Fetch data from the API
fetch('http://localhost:3000/api/talepOraniKarsilastirma')
    .then(response => response.json())
    .then(data => {
        // Update the 'musteriSayisi' element with the 2024 average occupancy rate
        document.getElementById('rezSayisi').textContent = data.average2024.toFixed(2) + '%';

        // Calculate the difference between the 2024 average and the 2023 average
        const difference = data.average2024 - data.average2023;

        // Update the 'difference' element with the calculated difference
        const differenceElement = document.querySelector('#talep p span'); // Corrected selector
        differenceElement.textContent = (difference >= 0 ? '+' : '') + difference.toFixed(2) + '% ';
        differenceElement.className = difference >= 0 ? 'text-success text-sm font-weight-bolder' : 'text-danger text-sm font-weight-bolder';
    })
    .catch(error => console.error('Error:', error));