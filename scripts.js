document.getElementById('mapButton').addEventListener('click', loadCSV);

function loadCSV() {
    const version = document.getElementById('versionSelect').value;
    const tableType = document.querySelector('input[name="tableType"]:checked')?.value;

    let fileName = '';
    
    if (tableType === 'control' && version === '2022') {
        fileName = 'control2022.csv';
    } else if (tableType === 'control' && version === '2013') {
        fileName = 'control2013.csv';
    } else if (tableType === 'policy' && version === '2022') {
        fileName = 'policy2022.csv';
    } else if (tableType === 'policy' && version === '2013') {
        fileName = 'policy2013.csv';
    } else if (tableType === 'procedure' && version === '2022') {
        fileName = 'procedure2022.csv';
    } else if (tableType === 'procedure' && version === '2013') {
        fileName = 'procedure2013.csv';
    } else if (tableType === 'review' && version === '2022') {
        fileName = 'review2022.csv';
    } else if (tableType === 'review' && version === '2013') {
        fileName = 'review2013.csv';
    }

    if (fileName) {
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                parseCSV(data);
            })
            .catch(error => {
                console.error("Error fetching file:", error);
            });
    } else {
        alert("Please select both a radio button and a version.");
    }
}

function parseCSV(data) {
    const rows = data.split('\n');
    const tableData = rows.map(row => row.split(','));

    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';  // Clear the previous data

    tableData.forEach(row => {
        const tr = document.createElement('tr');
        
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell.trim();
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}
