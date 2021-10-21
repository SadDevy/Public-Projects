import React from 'react'
import { useState } from 'react/cjs/react.development';
import CalculationModalWindow from '../CalculationModalWindow/CalculationModalWindow';

import './CalculateQueryModalWindow.css'

const CalculateQueryModalWindow = ({ users, hidden, setHidden }) => {
    const [hiddenModal, setHiddenModal] = useState(true)
    const [retentionDay, setRetentionDay] = useState(0)
    const [rollingRetentionDay, setRollingRetentonDay] = useState(0)
    const handleCalculateClick = (event) => {
        event.preventDefault();

        setHiddenModal(!hiddenModal);
        setHidden(true);

        const uri = `http://www.usersdata.somee.com/api/rollingRetention/${retentionDay}`;
        const getRollingRetentionDay = async (uri) => {
            const response = await fetch(uri);

            let json;
            if (response.ok)
                json = await response.json();

            return json;
        };

        getRollingRetentionDay(uri)
        .then(result => setRollingRetentonDay(result));
    };

    const handleCloseClick = (event) => {
        event.preventDefault();

        setHidden(true);
        setRetentionDay(0);
    };

    const handleInput = (event) => {
        const value = event.target.value;

        setRetentionDay(value);
    }

    return (
        <div>
            <div className="calculate-query-modal-window" hidden={hidden}>
                <div className="calculate-query-modal-window__title">
                    Calculate rolling retention day
                    <a href=" " className="calculate-query-modal-window__closeBtn" onClick={handleCloseClick}>
                    </a>
                </div>
                <div className="calculate-query-modal-window__content">
                    <p className="retention-day">
                        Rolling retention day
                        <input type="number" min="0" className="retention-day__input" value={retentionDay} onChange={handleInput} />
                    </p>

                    <a href=" " className="calculate-query-modal-window__cancelBtn" onClick={handleCloseClick}>
                        Cancel
                    </a>
                    <a href=" " className="calculate-query-modal-window__calculateBtn" onClick={handleCalculateClick}>
                        Calculate
                    </a>
                </div>
            </div>

            <CalculationModalWindow
                users={users}
                hidden={hiddenModal}
                setHidden={setHiddenModal}
                day={retentionDay}
                setDay={setRetentionDay}
                rollingRetentionDay={rollingRetentionDay}
            />
        </div>

    );
}

export default CalculateQueryModalWindow