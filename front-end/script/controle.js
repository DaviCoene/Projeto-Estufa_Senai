import { service } from "./firebaseConnect.js";

let Irri = 0;
let Quente = 0;
let portas = 0;

// --- FUNÇÃO PARA CARREGAR DADOS DO FIREBASE ---
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

// --- FUNÇÃO PARA ENVIAR DADOS PARA O FIREBASE ---
const set_data = async (data) => {
    try {
        await service.set(data.Darial);
    } catch (err) {
        console.error("Erro ao enviar dados:", err);
    }
};

document.addEventListener('DOMContentLoaded', async function () {

    service.user = "Darial";

    // --- ELEMENTOS DA PÁGINA ---
    const fanSlider = document.getElementById("velocidade-slider");
    const quenti = document.getElementById('toggle-quente');
    const modoManualToggle = document.getElementById('toggle-modo-manual');
    const ventilacaoToggle = document.getElementById('toggle-ventilacao');
    const slider = document.getElementById('velocidade-slider');
    const displayVelocidade = document.getElementById('display-velocidade');
    const portinhaToggle = document.getElementById('toggle-portinha');
    const portaDisplay = document.getElementById('display-porta');
    const irrigationButton = document.querySelector('.irrigation-button');
    const rainImage = document.querySelector('.chuva-image');
    const controlsContainer = document.getElementById('manual-controls-container');
    const plantasImage = document.querySelector('.plantas-image');
    const climaToggle = document.getElementById('toggle-clima');
    const climaDisplay = document.getElementById('display-clima');

    // --- FUNÇÕES AUXILIARES ---
    function updateSliderFill() {
        if (!slider) return;
        const min = Number(slider.min) || 0;
        const max = Number(slider.max) || 100;
        const value = Number(slider.value);
        const percentage = ((value - min) * 100) / (max - min);
        slider.style.setProperty('--fill-percentage', `${percentage}%`);
    }

    function atualizarStatusPorta() {
        if (portinhaToggle && portaDisplay) {
            portaDisplay.textContent = portinhaToggle.checked ? 'Aberta' : 'Fechada';
            portas = portinhaToggle.checked ? 1 : 0;
        }
    }

    function updateClimaStatus() {
        if (climaToggle && climaDisplay) {
            climaDisplay.textContent = climaToggle.checked ? 'Quente' : 'Frio';
        }
    }

    // --- FUNÇÃO CENTRAL DE CONTROLE ---
    function updateAllControlsState() {
        if (!modoManualToggle || !controlsContainer || !plantasImage || !ventilacaoToggle || !slider) return;

        const isManualOn = modoManualToggle.checked;
        const isVentilacaoOn = ventilacaoToggle.checked;

        // Habilita/desabilita elementos do container
        const allFormElements = controlsContainer.querySelectorAll('input, button');
        allFormElements.forEach(elem => elem.disabled = !isManualOn);

        if (isManualOn) {
            controlsContainer.classList.remove('disabled-controls');
            plantasImage.classList.remove('desativado');
        } else {
            controlsContainer.classList.add('disabled-controls');
            plantasImage.classList.add('desativado');
        }

        // O slider só pode ser usado se manual + ventilação estiverem ativos
        slider.disabled = !(isManualOn && isVentilacaoOn);

        // Se a ventilação estiver desligada, zera
        if (!isVentilacaoOn) {
            slider.value = 0;
            displayVelocidade.textContent = 0;
            updateSliderFill();
        }
    }

    // --- INICIALIZAÇÃO DOS ELEMENTOS ---
    if (slider && displayVelocidade) {
        displayVelocidade.textContent = slider.value;
        updateSliderFill();
        slider.addEventListener('input', function () {
            displayVelocidade.textContent = slider.value;
            updateSliderFill();
        });
    }

    if (portinhaToggle && portaDisplay) {
        atualizarStatusPorta();
        portinhaToggle.addEventListener('change', atualizarStatusPorta);
    }

    if (irrigationButton && rainImage) {
        irrigationButton.addEventListener('click', () => {
            irrigationButton.disabled = true;
            rainImage.style.opacity = '1';
            Irri = 1
            setTimeout(() => {
                Irri = 0
                rainImage.style.opacity = '0';
                irrigationButton.disabled = false;
            }, 4000);
        });
    }

    if (climaToggle && climaDisplay) {
        updateClimaStatus();
        climaToggle.addEventListener('change', updateClimaStatus);
    }

    if (modoManualToggle && ventilacaoToggle) {
        modoManualToggle.addEventListener('change', updateAllControlsState);
        ventilacaoToggle.addEventListener('change', updateAllControlsState);
        updateAllControlsState(); // estado inicial
    }

    if (quenti) {
        quenti.addEventListener('change', () => {
            Quente = quenti.checked ? 1 : 0;
        });
    }

    // --- LOOP DE SINCRONIZAÇÃO COM FIREBASE ---
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
