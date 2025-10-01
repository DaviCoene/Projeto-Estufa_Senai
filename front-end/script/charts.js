document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('myLineChart');
    if (!ctx) return;

    const labels = ['3h atrás', '2h atrás', '1h atrás', 'Agora'];
    const temperaturaData = [22, 56, 22.5, 24];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatura Interna (°C)',
                data: temperaturaData,
                borderColor: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
});
