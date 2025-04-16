async function fetchLatestSensorData() {
    try {
        const response = await fetch(`http://localhost:8080/api/visu/latest`);
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
        sensorDataElements[2].textContent = `${data.umid_inter || 0}°C`,
        sensorDataElements[3].textContent = `${data.umid_ext || 0}°C`,
        sensorDataElements[4].textContent = `${data.nível_água || 0}°C`,
        sensorDataElements[5].textContent = `${data.luminosidade || 0}°C`,
        sensorDataElements[6].textContent = `${data.porta.data || 0}°C`,
        sensorDataElements[7].textContent = `${data.ventilação_rpm || 0}°C`,
        sensorDataElements[8].textContent = `${data.auto.data || 0}°C`,
        sensorDataElements[9].textContent = `${data.data_hora || 0}°C`

    } else {
        console.error("Elementos .sensor-data não encontrados no DOM.");
    }
}

document.addEventListener("DOMContentLoaded", fetchLatestSensorData);