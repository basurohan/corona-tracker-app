import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/index';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: {confirmed, recovered, deaths}, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPIData = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPIData();
    }, []);

    const lineChart = () => (
        dailyData.length ?
        (<Line 
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [
                    {
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    },
                    {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }
                ]
            }}
        />) : null
    );

    const barChart = () => (
        confirmed ?
        (<Bar
            data={{
                labels: ['Infected', 'Receoverd', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)' 
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: {display: false},
                title: {display: true, text: `Current state in ${country}`}
            }}
        />) : null
    );

    let display;
    if (country && country !== 'global') {
        display = barChart();
    } else {
        display = lineChart();
    }

    return (
        <div className={styles.container}>
            {display}
        </div>
    )
}

export default Chart;