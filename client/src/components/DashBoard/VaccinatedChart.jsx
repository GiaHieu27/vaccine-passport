import { colors } from '@mui/material';
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function VaccinatedChart({ chartData }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [
      `1 dose ${Math.floor(
        (chartData.userWithOneDose / chartData.totalUser) * 100
      )}%`,
      `Upper2 doses ${Math.floor(
        (chartData.userWithAboveTwoDose / chartData.totalUser) * 100
      )}%`,
      `0 dose ${Math.floor(
        (chartData.userWithZeroDose / chartData.totalUser) * 100
      )}%`,
    ],
    datasets: [
      {
        label: 'Vaccinated analyst',
        data: [
          chartData.userWithOneDose,
          chartData.userWithAboveTwoDose,
          chartData.userWithZeroDose,
        ],
        backgroundColor: [
          colors.yellow[700],
          colors.green[700],
          colors.red[700],
        ],
        boderColor: [colors.yellow[700], colors.green[700], colors.red[700]],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      }}
    />
  );
}

export default VaccinatedChart;
