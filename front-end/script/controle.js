import { service } from "./firebaseConnect.js";

let Irri = 0;
let Quente = 0;
let portas = 0;

// Função para carregar dados do Firebase
const load_data = async () => {
    try {
        const response = await fetch(`https://greengarden-fd823-default-rtdb.firebaseio.com/.json`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erro ao carregar dados:", err);
        return {};
    }
};

// Função para enviar dados para o Firebase
const set_data = async (data) => {
    try {
        await service.set(data.Darial);
    } catch (err) {
        console.error("Erro ao enviar dados:", err);
    }
};

document.addEventListener('DOMContentLoaded', async function () {
    
    service.user = "Darial";
    const portaDisplay = document.getElementById("display-porta");
    const fanSlider = document.getElementById("velocidade-slider");
    const displayVelocidade = document.getElementById("display-velocidade");
    const quenti = document.getElementById('toggle-quente');
    const portinhaToggle = document.getElementById('toggle-portinha');
    const irrigationButton = document.querySelector('.irrigation-button');
    const rainImage = document.querySelector('.chuva-image');
    const modoManualToggle = document.getElementById('toggle-modo-manual');
    const controlsContainer = document.getElementById('manual-controls-container');
    const plantasImage = document.querySelector('.plantas-image');
    const ventilacaoToggle = document.getElementById('toggle-ventilacao');

    // --- Atualiza slider ---
    function updateSliderFill() {
        if (!fanSlider) return;
        const min = Number(fanSlider.min) || 0;
        const max = Number(fanSlider.max) || 100;
        const value = Number(fanSlider.value);
        const percentage = ((value - min) * 100) / (max - min);
        fanSlider.style.setProperty('--fill-percentage', `${percentage}%`);
        if (displayVelocidade) displayVelocidade.textContent = value;
    }

    if (fanSlider && displayVelocidade) {
        updateSliderFill();
        fanSlider.addEventListener('input', updateSliderFill);
    }

    // --- Atualiza porta ---
    function atualizarStatusPorta() {
        if (portinhaToggle && portaDisplay) {
            portaDisplay.textContent = portinhaToggle.checked ? 'Aberta' : 'Fechada';
            portas = portinhaToggle.checked ? 1 : 0;
        }
    }

    if (portinhaToggle && portaDisplay) {
        atualizarStatusPorta();
        portinhaToggle.addEventListener('change', atualizarStatusPorta);
    }

    // --- Irrigação ---
    if (irrigationButton && rainImage) {
        irrigationButton.addEventListener('click', () => {
            irrigationButton.disabled = true;
            rainImage.style.opacity = '1';
            Irri = 1;
            setTimeout(() => {
                Irri = 0;
                rainImage.style.opacity = '0';
                irrigationButton.disabled = false;
            }, 4000);
        });
    }

    // --- Modo manual ---
    function toggleManualControls() {
        if (!modoManualToggle || !controlsContainer || !plantasImage) return;
        const isManualModeOn = modoManualToggle.checked;
        const formElements = controlsContainer.querySelectorAll('input, button');

        if (isManualModeOn) {
            controlsContainer.classList.remove('disabled-controls');
            plantasImage.classList.remove('desativado');
            formElements.forEach(elem => elem.disabled = false);
        } else {
            controlsContainer.classList.add('disabled-controls');
            plantasImage.classList.add('desativado');
            formElements.forEach(elem => elem.disabled = true);
        }
    }

    if (modoManualToggle) {
        toggleManualControls();
        modoManualToggle.addEventListener('change', toggleManualControls);
    }

    // --- Ventilação ---
    function handleVentilacaoState() {
        if (!ventilacaoToggle || !fanSlider || !displayVelocidade) return;
        if (ventilacaoToggle.checked) {
            fanSlider.disabled = false;
        } else {
            fanSlider.disabled = true;
            fanSlider.value = 0;
            updateSliderFill();
        }
    }

    if (ventilacaoToggle) {
        handleVentilacaoState();
        ventilacaoToggle.addEventListener('change', handleVentilacaoState);
    }

    // Atualiza aquecedor
    if (quenti) {
        quenti.addEventListener('change', () => {
            Quente = quenti.checked ? 1 : 0;
        });
        Quente = quenti.checked ? 1 : 0;
    }

    // Loop de atualização do Firebase
    setInterval(async () => {
        const data = await load_data();
        if (!data.Darial) return;
        data.Darial.Controle.Fan = Number(fanSlider?.value || 0);
        data.Darial.Controle.Porta = portas;
        data.Darial.Controle.Irrigação = Irri;
        data.Darial.Controle.Aquecedor = Quente;

        await set_data(data);
    }, 1000);
});
