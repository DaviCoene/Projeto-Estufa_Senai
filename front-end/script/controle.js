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
    let decreaseInterval = null; // Variável para controlar a animação de diminuir

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

    function gradualDecrease() {
        if (decreaseInterval) clearInterval(decreaseInterval);
        decreaseInterval = setInterval(() => {
            let currentValue = Number(slider.value);
            if (currentValue > 0) {
                slider.value = currentValue - 1;
                displayVelocidade.textContent = slider.value;
                updateSliderFill();
            } else {
                clearInterval(decreaseInterval);
                decreaseInterval = null;
            }
        }, 20);
    }

    // --- PARTE 3: FUNÇÕES DE CONTROLE DE ESTADO ---
    
    // Função que REAGE às MUDANÇAS do usuário (com animação)
    function handleControlsChange() {
        if (!modoManualToggle || !ventilacaoToggle || !slider) return;
        const isManualOn = modoManualToggle.checked;
        const isVentilacaoOn = ventilacaoToggle.checked;

        const allFormElements = controlsContainer.querySelectorAll('input, button');
        allFormElements.forEach(elem => { elem.disabled = !isManualOn; });

        if (isManualOn) {
            controlsContainer.classList.remove('disabled-controls');
            plantasImage.classList.remove('desativado');
        } else {
            controlsContainer.classList.add('disabled-controls');
            plantasImage.classList.add('desativado');
        }

        if (!isManualOn || !isVentilacaoOn) {
            slider.disabled = true;
        } else {
            slider.disabled = false;
        }
        
        if (!isVentilacaoOn) {
            gradualDecrease();
        } else {
            if (decreaseInterval) {
                clearInterval(decreaseInterval);
                decreaseInterval = null;
            }
        }
    }
    
    // Função que define o ESTADO INICIAL da página 
    function setInitialState() {
        if (!modoManualToggle || !ventilacaoToggle || !slider) return;
        const isManualOn = modoManualToggle.checked;
        const isVentilacaoOn = ventilacaoToggle.checked;

        const allFormElements = controlsContainer.querySelectorAll('input, button');
        allFormElements.forEach(elem => { elem.disabled = !isManualOn; });

        if (isManualOn) {
            controlsContainer.classList.remove('disabled-controls');
            plantasImage.classList.remove('desativado');
        } else {
            controlsContainer.classList.add('disabled-controls');
            plantasImage.classList.add('desativado');
        }

        if (!isManualOn || !isVentilacaoOn) {
            slider.disabled = true;
            slider.value = 0;
            displayVelocidade.textContent = 0;
            updateSliderFill();
        }
    }

    // --- PARTE 4: INICIALIZAÇÃO DE TODAS AS FUNCIONALIDADES ---
    if (slider && displayVelocidade) {
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
    if (modoManualToggle && ventilacaoToggle) {
        setInitialState(); // Roda a função de estado inicial (sem animação)
        modoManualToggle.addEventListener('change', handleControlsChange); // Usa a função com animação para os cliques
        ventilacaoToggle.addEventListener('change', handleControlsChange); // Usa a função com animação para os cliques
    }
});
