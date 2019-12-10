import React from 'react';
import { Line } from 'react-chartjs-2';
import translate from '../util/localization/i18n';
import legendRed from '../public/images/chart_legend_red.png';
import legendGreen from '../public/images/chart_legend_green.png';
import legendBlue from '../public/images/chart_legend_blue.png';

const Chart = React.forwardRef(({ data }, ref) => {
  // Format all probabilities to xx.xx precision
  const fData = data.map(d => d.map(dd => (dd * 100).toFixed(2)));

  // Remove overlapping lines.
  for (let i = 0; i < fData[0].length - 1; i++) {
    fData[1][i] = null;
    fData[2][i] = null;
  }

  const ivfData = { labels: [1, 2, 3, 4, 5],
    datasets: [
      { label: translate('chart_cumulative_probability'),
        data: fData[0],
        borderColor: 'rgba(204,0,0,0.7)',
        borderWidth: '3',
        backgroundColor: 'rgba(204,0,0,0.7)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: '10',
        pointHoverRadius: '12',
        fill: false,
        yAxisId: 'y-axis' },
      { label: translate('chart_max_cumulative'),
        data: fData[1],
        borderColor: 'rgba(63, 191, 63,0.7)',
        borderWidth: '3',
        // borderDash: [10, 10],
        backgroundColor: 'rgba(63, 191, 63,0.7)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: '10',
        pointHoverRadius: '12',
        fill: false,
        yAxisId: 'y-axis' },
      { label: translate('chart_min_cumulative'),
        data: fData[2],
        borderColor: 'rgba(63,127,191,0.7)',
        borderWidth: '3',
        // borderDash: [10, 10],
        backgroundColor: 'rgba(63,127,191,0.7)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointRadius: '10',
        pointHoverRadius: '12',
        fill: false,
        yAxisId: 'y-axis' }
    ] };


  return (
    <div className="chartWrapper" id="chartanchor">
      <div className="chartLabels">
        <div className="chartLabel">
          <img src={legendRed} alt={translate('chart_cumulative_probability')} className="chartCP" />
          <p>{translate('chart_cumulative_probability')}</p>
        </div>
        <div className="chartLabel">
          <img src={legendGreen} alt={translate('chart_max_cumulative')} className="chartCPMax" />
          <p>{translate('chart_max_cumulative')}</p>
        </div>
        <div className="chartLabel">
          <img src={legendBlue} alt={translate('chart_min_cumulative')} className="chartCPMin" />
          <p>{translate('chart_min_cumulative')}</p>
        </div>
      </div>
      <div ref={ref} className="ivfChart" id="myChart">
        <Line
          data={ivfData}
          options={{ maintainAspectRatio: false,
            responsive: true,
            layout: {
              padding: {
                right: 20,
                left: 10
              }
            },
            scales:
            { yAxes:
            [{ type: 'linear',
              id: 'y-axis',
              ticks:
              { beginAtZero: true,
                min: 0,
                max: 100,
                suggestedMin: 0,
                suggestedMax: 100,
                padding: 15,
                stepSize: 20,
                callback: value => `${value}%` },
              gridLines: {
                color: 'rgba(0,0,0,0.4)',
                drawBorder: false
              },
              scaleLabel: {
                display: true,
                labelString: translate('chart_y_axis_label'),
                fontSize: 15
              } }],
            xAxes:
              [{ ticks: {
                padding: 10
              },
              gridLines: {
                color: 'rgba(0,0,0,0.4)',
                drawBorder: true,
                offsetGridLines: true
              },
              scaleLabel: {
                display: true,
                labelString: translate('chart_x_axis_label'),
                fontSize: 15
              } }] },
            legend: {
              labels: {
                usePointStyle: false,
                boxWidth: 40,
                fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif',
                fontSize: 15,
                padding: 30
              },
              display: false
            } }
            }
        />
      </div>
    </div>
  );
});

export default Chart;
