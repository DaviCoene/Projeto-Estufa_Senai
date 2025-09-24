document.addEventListener('DOMContentLoaded', function() {
    
    // =======================================================
    // PARTE 1: LÓGICA DOS POP-UPS (MODALS) - JÁ EXISTENTE
    // =======================================================
    function setupModal(openBtnId, modalId) {
        const openButton = document.getElementById(openBtnId);
        const modal = document.getElementById(modalId);
        
        if (!openButton || !modal) return;

        const closeButton = modal.querySelector('.modal-close');

        function open() { modal.classList.add('visible'); }
        function close() { modal.classList.remove('visible'); }

        openButton.addEventListener('click', (event) => {
            event.preventDefault();
            open();
        });

        if (closeButton) closeButton.addEventListener('click', close);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) close();
        });
    }

    setupModal('open-help-modal', 'help-modal');
    setupModal('open-config-modal', 'config-modal');

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const visibleModal = document.querySelector('.modal-overlay.visible');
            if (visibleModal) visibleModal.classList.remove('visible');
        }
    });


    // =======================================================
    // NOVA PARTE 2: LÓGICA PARA SALVAR E CARREGAR CONFIGURAÇÕES
    // =======================================================
    const configForm = document.querySelector('.config-form');
    const configModal = document.getElementById('config-modal');

    // Função para CARREGAR os dados do localStorage
    function carregarConfiguracoes() {
        const tempMax = localStorage.getItem('config_temp_max');
        const tempMin = localStorage.getItem('config_temp_min');
        const umidMax = localStorage.getItem('config_umid_max');
        const umidMin = localStorage.getItem('config_umid_min');

        if (tempMax) document.getElementById('temp-max').value = tempMax;
        if (tempMin) document.getElementById('temp-min').value = tempMin;
        if (umidMax) document.getElementById('umid-max').value = umidMax;
        if (umidMin) document.getElementById('umid-min').value = umidMin;
    }

    if (configForm) {
        // Adiciona um "escutador" para o evento de SUBMIT do formulário
        configForm.addEventListener('submit', function(event) {
            // 1. Impede que a página recarregue (comportamento padrão do form)
            event.preventDefault();

            // 2. Pega os valores atuais dos campos
            const tempMax = document.getElementById('temp-max').value;
            const tempMin = document.getElementById('temp-min').value;
            const umidMax = document.getElementById('umid-max').value;
            const umidMin = document.getElementById('umid-min').value;

            // 3. Salva cada valor no localStorage com uma chave única
            localStorage.setItem('config_temp_max', tempMax);
            localStorage.setItem('config_temp_min', tempMin);
            localStorage.setItem('config_umid_max', umidMax);
            localStorage.setItem('config_umid_min', umidMin);

            // 4. Dá um feedback para o usuário e fecha o pop-up
            alert('Configurações salvas com sucesso!');
            if (configModal) configModal.classList.remove('visible');
        });
    }

    // Finalmente, chama a função para carregar os dados assim que a página abre
    carregarConfiguracoes();

});
