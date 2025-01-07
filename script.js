
        async function fetchData() {
            const deviceID = document.getElementById('deviceID').value;
            const keys = document.getElementById('keys').value;
            const startTs = document.getElementById('startTs').value;
            const endTs = document.getElementById('endTs').value;
            const limit = document.getElementById('limit').value;
            const orderBy = document.getElementById('orderBy').value;
            const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNodGVsdWJkaGFAZ21haWwuY29tIiwidXNlcklkIjoiNWZiYWY4YzAtYmViZC0xMWVmLThjOWYtYmZmMGM0ZTBlNjlmIiwic2NvcGVzIjpbIkNVU1RPTUVSX1VTRVIiXSwic2Vzc2lvbklkIjoiZGE3MTE0MWMtNTAxNC00MGNjLTkyYWEtMjM5MTk0NzRjMTU1IiwiaXNzIjoiZmxvd2xpbmMuaW8iLCJpYXQiOjE3MzYyNjczNTUsImV4cCI6MTczNjM1Mzc1NSwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6IjExMmY0NmYwLTJiZWMtMTFlYy1iNTRhLTUxNzBhYmVhOTQyZCIsImN1c3RvbWVySWQiOiJmYjRkMzU4MC1jYWZhLTExZWUtYjhmZi00ZGQ4YzhkNDEwMjMifQ.OflJrIdnE_pU7JX8PJk8f3TSW6HSSIX0zPEmKbnOALXxO7Ms1-xIGxf0zvJ_spG-NloMm8UqpWHuALewjvlLvA'; // Replace with your actual ThingsBoard token

            const url = `https://samasth.io:443/api/plugins/telemetry/DEVICE/e4785a30-bf7b-11ef-8c9f-bff0c4e0e69f/values/timeseries?keys=FLOW&startTs=1735725600000&endTs=1736157600000&limit=100&orderBy=ASC`;
            const headers = {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${token}`
            };

            try {
                const response = await fetch(url, { headers });
                const data = await response.json();
                console.log(data);
                
                convertToExcel(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        function convertToExcel(data) {
            const header = Object.keys(data).join(',');
            const rows = Object.values(data).map(entry => entry.map(item => Object.values(item).join(',')).join('\n')).join('\n');
            const csvContent = `data:text/csv;charset=utf-8,${header}\n${rows}`;

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "data.csv");
            document.body.appendChild(link);

            link.click();
            document.body.removeChild(link);
        }