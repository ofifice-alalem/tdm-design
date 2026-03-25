import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const DynamicRowInput = ({ columns, onChange, minRows = 1 }) => {
    const generateEmptyRow = () =>
        columns.reduce((acc, col) => ({ ...acc, [col.key]: '' }), { id: Date.now() + Math.random() });

    const [rows, setRows] = useState(Array.from({ length: minRows }).map(generateEmptyRow));

    const handleAddRow = () => {
        const updated = [...rows, generateEmptyRow()];
        setRows(updated);
        if (onChange) onChange(updated);
    };

    const handleRemoveRow = (id) => {
        if (rows.length <= minRows) return;
        const updated = rows.filter(row => row.id !== id);
        setRows(updated);
        if (onChange) onChange(updated);
    };

    const handleChange = (id, key, value) => {
        const updated = rows.map(row => row.id === id ? { ...row, [key]: value } : row);
        setRows(updated);
        if (onChange) onChange(updated);
    };

    const canDelete = rows.length > minRows;

    return (
        <div className="form-surface">

            {/* Header row (desktop only) */}
            <div className="dri-header">
                {columns.map(col => (
                    <div key={col.key} className="dri-header-cell">
                        {col.label || col.placeholder}
                    </div>
                ))}
                <div className="dri-header-spacer" />
            </div>

            {/* Rows */}
            <div className="dri-rows">
                {rows.map((row, index) => (
                    <div key={row.id} className="dri-row">

                        {/* Mobile row badge */}
                        <div className="dri-row-mobile-header">
                            <span className="dri-row-badge">صف {index + 1}</span>
                        </div>

                        {/* Inputs */}
                        <div className="dri-inputs">
                            {columns.map(col => (
                                <div key={col.key} className="dri-input-group">
                                    <label className="dri-mobile-label">
                                        {col.label || col.placeholder}
                                    </label>
                                    <input
                                        type={col.type || 'text'}
                                        placeholder={col.placeholder || ''}
                                        value={row[col.key]}
                                        onChange={e => handleChange(row.id, col.key, e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Delete button */}
                        <button
                            onClick={() => handleRemoveRow(row.id)}
                            disabled={!canDelete}
                            title={canDelete ? 'حذف الصف' : 'لا يمكن حذف الصف الأخير'}
                            className="row-delete-btn"
                        >
                            <Trash2 className="row-btn-icon" />
                            حذف
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="dri-footer">
                <button onClick={handleAddRow} className="row-add-btn">
                    <Plus className="row-btn-icon" />
                    إضافة صف
                </button>
                <span className="dri-row-count">
                    {rows.length} {rows.length === 1 ? 'صف' : 'صفوف'}
                </span>
            </div>
        </div>
    );
};
