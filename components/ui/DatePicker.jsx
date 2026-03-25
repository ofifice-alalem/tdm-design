import React from 'react';

export const DatePicker = ({ value, onChange }) => {
    const parts = value ? value.split('-') : ['', '', ''];
    const year  = parts[0] || '';
    const month = parts[1] || '';
    const day   = parts[2] || '';

    const handleChange = (y, m, d) => {
        if (onChange) onChange(`${y || ''}-${m || ''}-${d || ''}`);
    };

    return (
        <div className="datepicker-wrapper">
            <input
                type="text"
                placeholder="Day"
                maxLength="2"
                value={day}
                onChange={(e) => handleChange(year, month, e.target.value.replace(/\D/g, ''))}
                className="datepicker-input"
            />
            <span className="datepicker-sep">/</span>
            <input
                type="text"
                placeholder="Mn"
                maxLength="2"
                value={month}
                onChange={(e) => handleChange(year, e.target.value.replace(/\D/g, ''), day)}
                className="datepicker-input"
            />
            <span className="datepicker-sep">/</span>
            <input
                type="text"
                placeholder="Year"
                maxLength="4"
                value={year}
                onChange={(e) => handleChange(e.target.value.replace(/\D/g, ''), month, day)}
                className="datepicker-input datepicker-input-year"
            />
        </div>
    );
};
