<template>
  <div class="chart-container">
    <h1>Employee Distribution by Department</h1>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { onMounted, ref } from 'vue';

export default {
  name: 'DepartmentChart',
  setup() {
    const chartCanvas = ref(null);

    onMounted(() => {
      
      Chart.register(...registerables);

      
      const hrData = {
        departments: [
          { name: "Engineering", employees: 42, color: "#4361ee" },
          { name: "Marketing", employees: 28, color: "#4cc9f0" },
          { name: "Sales", employees: 35, color: "#f72585" },
          { name: "Human Resources", employees: 12, color: "#7209b7" },
          { name: "Operations", employees: 15, color: "#38b000" },
          { name: "Finance", employees: 10, color: "#ffaa00" }
        ],
        totalEmployees: 142
      };

      const labels = hrData.departments.map(dept => dept.name);
      const data = hrData.departments.map(dept => dept.employees);
      const backgroundColors = hrData.departments.map(dept => dept.color);

      
      new Chart(chartCanvas.value, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColors,
            borderWidth: 0,
            hoverOffset: 15
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 12,
                padding: 20,
                font: {
                  size: 13
                },
                generateLabels: function(chart) {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    return data.labels.map(function(label, i) {
                      const value = data.datasets[0].data[i];
                      const percentage = Math.round((value / hrData.totalEmployees) * 100);
                      
                      return {
                        text: `${label}: ${value} (${percentage}%)`,
                        fillStyle: data.datasets[0].backgroundColor[i],
                        hidden: false,
                        index: i
                      };
                    });
                  }
                  return [];
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const percentage = Math.round((value / hrData.totalEmployees) * 100);
                  return `${label}: ${value} employees (${percentage}%)`;
                }
              }
            }
          },
          cutout: '65%',
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    });

    return {
      chartCanvas
    };
  }
};
</script>

<style scoped>
.chart-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin: auto;
}

h1 {
  color: #3a0ca3;
  text-align: center;
  margin-top: 0;
}

.chart-wrapper {
  position: relative;
  height: 400px;
  width: 100%;
}

@media (max-width: 768px) {
  .chart-container {
    width: 90%;
    padding: 20px;
  }
  
  .chart-wrapper {
    height: 300px;
  }
}
</style>