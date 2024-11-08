const ctxCombinedChart = document.getElementById('combined-chart').getContext('2d');

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const values = [12, 19, 3, 5, 2, 3, 7];

// Gráfico combinado (histograma y diagrama lineal)
const combinedChart = new Chart(ctxCombinedChart, {
    type: 'bar',
    data: {
        labels: daysOfWeek,
        datasets: [
            {
                type: 'bar',
                label: 'Histograma',
                data: values,
                backgroundColor: 'rgb(143, 163, 84)', // Color de las barras
                borderColor: 'rgb(0, 120, 57)', // Color del borde de las barras
                borderWidth: 1
            },
            {
                type: 'line',
                label: 'Diagrama Lineal',
                data: values,
                borderColor: 'rgb(0, 120, 57)', // Color de la línea
                backgroundColor: 'rgb(143, 163, 84)', // Color del área bajo la línea
                fill: true,
                tension: 0.1,
                pointBackgroundColor: 'rgb(0, 120, 57)', // Color de los puntos de datos
                pointBorderColor: 'rgb(143, 163, 84)', // Color del borde de los puntos de datos
                pointRadius: 5, // Tamaño de los puntos de datos
                pointHoverRadius: 7 // Tamaño de los puntos al pasar el cursor
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
