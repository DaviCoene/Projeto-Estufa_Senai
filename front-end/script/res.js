async function fetchLatestSensorData() {
    try {
        const response = await fetch(`http://localhost:5555/api/visu/latest`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.status}`);
        }
        const data = await response.json();
        console.log("chegou")
        console.log(data)
        updateSensorDisplay(data);
    } catch (error) {
        console.error("Erro ao buscar os dados mais recentes:", error);
    }
}

function updateSensorDisplay(data) {
    const sensorDataElements = document.querySelectorAll(".sensor-data");
    if (sensorDataElements.length > 0) {

        sensorDataElements[0].textContent = `${data.temp_inter || 0}°C`,
        sensorDataElements[1].textContent = `${data.temp_ext || 0}°C`,
        sensorDataElements[2].textContent = `${data.umid_inter || 0}`,
        sensorDataElements[3].textContent = `${data.umid_ext || 0}`,
        sensorDataElements[4].textContent = `${data.nível_água || 0}`,
        sensorDataElements[5].textContent = `${data.luminosidade || 0}`,
        sensorDataElements[6].textContent = `${data.porta.data || 0}`,
        sensorDataElements[7].textContent = `${data.ventilação_rpm || 0}`

    } else {
        console.error("Elementos .sensor-data não encontrados no DOM.");
    }
}


document.addEventListener("DOMContentLoaded", fetchLatestSensorData);

