document.getElementById('mapButton').addEventListener('click', function() {
    const version = document.getElementById('versionSelect').value;
    const tableType = document.querySelector('input[name="tableType"]:checked').value;
    
    let csvFile = '';
    if (version === '2022' && tableType === 'control') {
        csvFile = 'control2022.csv';
    } else if (version === '2013' && tableType === 'control') {
        csvFile = 'control2013.csv';
    } else if (version === '2022' && tableType === 'policy') {
        csvFile = 'policy2022.csv';
    } else if (version === '2013' && tableType === 'policy') {
        csvFile = 'policy2013.csv';
    }
    else if (version === '2013' && tableType === 'review') {
        csvFile = 'Review2013.csv';
    }
    else if (version === '2022' && tableType === 'review') {
        csvFile = 'Review2022.csv';
    }
    else if (version === '2013' && tableType === 'procedure') {
        csvFile = 'Procedure2013.csv';
    }
    else if (version === '2022' && tableType === 'procedure') {
        csvFile = 'Procedure2022.csv';
    }
    // Add logic for other radio buttons similarly...

    // Fetch the CSV file and load data
    fetch(csvFile)
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split('\n');
            const tableHeaders = rows[0].split(','); // First row as headers
            const tableBodyRows = rows.slice(1);     // Rest of the rows as data

            const table = document.getElementById('dataTable');
            const thead = table.querySelector('thead');
            const tbody = table.querySelector('tbody');

            // Clear previous table data
            thead.innerHTML = '';
            tbody.innerHTML = '';

            // Dynamically create table headers
            let headerRow = '<tr>';
            tableHeaders.forEach(header => {
                headerRow += `<th>${header}</th>`;
            });
            headerRow += '</tr>';
            thead.innerHTML = headerRow;

            // Dynamically populate table body
            tableBodyRows.forEach(row => {
                const columns = row.split(',');
                let rowHtml = '<tr>';
                
                columns.forEach(column => {
                    const trimmedColumn = column.trim();
                    // Check if the column ends with '.html'
                    if (trimmedColumn.endsWith('.html')) {
                        // Remove '.html' and replace underscores with spaces for display
                        const displayText = trimmedColumn.replace('.html', '').replace(/_/g, ' ');
                        rowHtml += `<td><a href="${trimmedColumn}">${displayText}</a></td>`;
                    } else {
                        // Replace underscores with spaces for non-link columns
                        rowHtml += `<td>${trimmedColumn}</td>`;
                    }
                });
                
                rowHtml += '</tr>';
                tbody.innerHTML += rowHtml;
            });
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
        });
});
