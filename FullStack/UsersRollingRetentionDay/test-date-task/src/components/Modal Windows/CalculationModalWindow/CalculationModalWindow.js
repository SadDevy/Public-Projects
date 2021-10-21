import React from 'react'
import { Bar } from 'react-chartjs-2'

import './CalculationModalWindow.css'

const CalculationModalWindow = ({ users, hidden, setHidden, day, setDay, rollingRetentionDay }) => {
    const usersId = users.map(user => user.id);
    const usersData = users.map(user => {
        const datesDifference = new Date(user.lastActivityDate) - new Date(user.regestrationDate);
        return Math.ceil(datesDifference / (1000 * 60 * 60 * 24));
    });

    const state = {
        labels: usersId,
        datasets: [
            {
                label: 'Life time',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: usersData
            }
        ]
    };

    const handleCloseClick = (event) => {
        event.preventDefault();

        setHidden(true);
        setDay(0);
    };

    return (
        <div className="calculation-modal-window" hidden={hidden}>
            <div className="calculation-modal-window__title">
                Calculated data
                <a href=" " className="calculation-modal-window__closeBtn" onClick={handleCloseClick}>
                </a>
            </div>
            <div className="calculation-modal-window__content">
                <div className="content__chart chart">
                    <Bar
                        data={state}
                        options={{
                            title: {
                                display: true,
                                text: 'Life time in days',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
                <div className="content__day-output day-output">Rolling retention {day} day: {rollingRetentionDay}</div>
            </div>
        </div>
    );
}

export default CalculationModalWindow