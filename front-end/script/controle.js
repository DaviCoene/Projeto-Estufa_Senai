document.addEventListener('DOMContentLoaded', function() {

    // --- PARTE 1: DEFINIÇÃO DE TODOS OS ELEMENTOS ---
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

    // --- PARTE 2: FUNÇÕES AUXILIARES ---
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
        }
    }
    
    function updateClimaStatus() {
        if (climaToggle && climaDisplay) {
            climaDisplay.textContent = climaToggle.checked ? 'Quente' : 'Frio';
        }
    }

    // --- PARTE 3: FUNÇÃO CENTRAL DE CONTROLE (LÓGICA CORRIGIDA) ---
    function updateAllControlsState() {
        if (!modoManualToggle || !controlsContainer || !plantasImage || !ventilacaoToggle || !slider) return;

        const isManualOn = modoManualToggle.checked;
        const isVentilacaoOn = ventilacaoToggle.checked;
        
        // Pega todos os inputs e botões que serão controlados pelo MODO MANUAL
        const allFormElements = controlsContainer.querySelectorAll('input, button');
        
        // Habilita ou desabilita todos os elementos com base no Modo Manual
        allFormElements.forEach(elem => {
            elem.disabled = !isManualOn;
        });

        // Aplica o efeito visual de desabilitado ao container e à imagem
        if (isManualOn) {
            controlsContainer.classList.remove('disabled-controls');
            plantasImage.classList.remove('desativado');
        } else {
            controlsContainer.classList.add('disabled-controls');
            plantasImage.classList.add('desativado');
        }

        // REGRA ESPECIAL E DEFINITIVA PARA O SLIDER:
        // O slider só pode ser movido se o MODO MANUAL E a VENTILAÇÃO estiverem LIGADOS.
        // Se UMA DAS DUAS condições for falsa, ele fica desabilitado.
        if (!isManualOn || !isVentilacaoOn) {
            slider.disabled = true;
        } else {
            slider.disabled = false;
        }

        // Se a ventilação for desligada, zera os valores do slider, mesmo que o modo manual esteja ligado
        if (!isVentilacaoOn) {
            slider.value = 0;
            displayVelocidade.textContent = 0;
            updateSliderFill();
        }
    }


    // --- PARTE 4: INICIALIZAÇÃO DE TODAS AS FUNCIONALIDADES ---

    if (slider && displayVelocidade) {
        displayVelocidade.textContent = slider.value;
        updateSliderFill();
        slider.addEventListener('input', function() {
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
            setTimeout(() => {
                rainImage.style.opacity = '0';
                irrigationButton.disabled = false;
            }, 4000);
        });
    }
    
    if (climaToggle && climaDisplay) {
        updateClimaStatus();
        climaToggle.addEventListener('change', updateClimaStatus);
    }

    // Adiciona os "escutadores" para os toggles principais que usam a função central
    if (modoManualToggle && ventilacaoToggle) {
        modoManualToggle.addEventListener('change', updateAllControlsState);
        ventilacaoToggle.addEventListener('change', updateAllControlsState);
        
        // Roda a função uma vez no início para definir o estado correto da página
        updateAllControlsState();
    }
});
