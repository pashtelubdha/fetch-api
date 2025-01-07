

const btn = document.querySelector('.btn');

btn.addEventListener('click', fetchData);

async function fetchData() {

    const deviceID = document.getElementById('deviceID').value;
    const keys = document.getElementById('keys').value;
    const startTs = document.getElementById('startTs').value;
    const endTs = document.getElementById('endTs').value;
    const limit = document.getElementById('limit').value;
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGwua210MjAwMEBnbWFpbC5jb20iLCJ1c2VySWQiOiJmMGM3ZDdlMC1kZjVmLTExZWUtYjhmZi00ZGQ4YzhkNDEwMjMiLCJzY29wZXMiOlsiQ1VTVE9NRVJfVVNFUiJdLCJzZXNzaW9uSWQiOiI0MDNjMDc3OC05ZDJkLTQ3MjItOGVhZC1iMzQ3OGJlM2E0N2YiLCJpc3MiOiJmbG93bGluYy5pbyIsImlhdCI6MTczNjI3MDMwMywiZXhwIjoxNzM2MzU2NzAzLCJmaXJzdE5hbWUiOiJTdXNoaWwiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiMTEyZjQ2ZjAtMmJlYy0xMWVjLWI1NGEtNTE3MGFiZWE5NDJkIiwiY3VzdG9tZXJJZCI6ImZiNGQzNTgwLWNhZmEtMTFlZS1iOGZmLTRkZDhjOGQ0MTAyMyJ9.TCMRFgu0mNytLK6xg-NF6m2N_6R50ru5c1QLvQ1_Qh4Yhh5m0_zwDlySr5W57BsEqpbZ2i5eGDQsgtRd2TpWlQ';
    const url = `https://samasth.io:443/api/plugins/telemetry/DEVICE/${deviceID}/values/timeseries?keys=${keys}&startTs=${startTs}&endTs=${endTs}&limit=${limit}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        convertToCSV(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function convertToCSV(data) {
    const headers = Object.keys(data).join(',');
    const rows = Object.entries(data)
        .map(([key, values]) =>
            values
                .map(item => `${key},${Object.values(item).join(',')}`)
                .join('\n')
        )
        .join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
