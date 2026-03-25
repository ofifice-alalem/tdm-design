import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { DatePicker } from '../ui/DatePicker';
import { Select } from '../ui/Select';

export const FilterPanel = ({ filters, onApply, onReset, inline = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localValues, setLocalValues] = useState({});

    const handleApply = () => {
        if (onApply) onApply(localValues);
        setIsOpen(false);
    };

    const renderField = (filter) => {
        if (filter.type === 'select') return (
            <Select
                options={filter.options}
                value={localValues[filter.key] || ''}
                onChange={(val) => setLocalValues({ ...localValues, [filter.key]: val })}
                placeholder="Select option..."
            />
        );
        if (filter.type === 'date') return (
            <DatePicker
                value={localValues[filter.key] || ''}
                onChange={(val) => setLocalValues({ ...localValues, [filter.key]: val })}
            />
        );
        return (
            <input
                type={filter.type || 'text'}
                placeholder={filter.placeholder}
                className="form-input"
                onChange={(e) => setLocalValues({ ...localValues, [filter.key]: e.target.value })}
            />
        );
    };

    if (inline) {
        return (
            <div className="filter-inline-wrapper">
                <div className="filter-noise" aria-hidden="true" />
                <div className="filter-inline-fields">
                    {filters.map((filter, idx) => (
                        <div key={idx} className="filter-field-group">
                            <label className="filter-field-label">{filter.label}</label>
                            {renderField(filter)}
                        </div>
                    ))}
                    <div className="filter-inline-actions">
                        <button onClick={handleApply} className="filter-apply-btn">Apply</button>
                        <button onClick={() => setLocalValues({})} className="filter-reset-btn">Clear</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="filter-popover-wrapper">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`filter-trigger-btn ${isOpen ? 'filter-trigger-btn-active' : ''}`}
            >
                <span className="filter-trigger-shine" aria-hidden="true" />
                <Filter className="filter-trigger-icon" />
                <span>Filters</span>
                <ChevronDown className={`filter-trigger-chevron ${isOpen ? 'filter-trigger-chevron-open' : ''}`} />
            </button>

            {isOpen && (
                <div className="filter-dropdown">
                    <div className="filter-dropdown-glow" aria-hidden="true" />

                    {/* Dropdown header */}
                    <div className="filter-dropdown-header">
                        <h3 className="filter-dropdown-title">Refine Results</h3>
                        <button onClick={() => setIsOpen(false)} className="modal-close-btn">
                            <X className="modal-close-icon" />
                        </button>
                    </div>

                    {/* Fields */}
                    <div className="filter-dropdown-fields">
                        {filters.map((filter, idx) => (
                            <div key={idx} className="filter-field-group">
                                <label className="filter-field-label">{filter.label}</label>
                                {renderField(filter)}
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="filter-dropdown-actions">
                        <button onClick={handleApply} className="filter-apply-btn">Apply</button>
                        <button onClick={() => { setLocalValues({}); if (onReset) onReset(); }} className="filter-reset-btn">Reset</button>
                    </div>
                </div>
            )}
        </div>
    );
};
