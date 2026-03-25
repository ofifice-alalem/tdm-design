import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ value, onChange, options, placeholder = 'Select...' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(o => o.value === value) || null;

    return (
        <div className="select-wrapper" ref={containerRef}>
            <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                {/* Specular shine */}
                <span className="select-shine" aria-hidden="true" />

                <span className={selectedOption ? 'select-value' : 'select-placeholder'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                <ChevronDown className={`select-chevron ${isOpen ? 'select-chevron-open' : ''}`} />
            </div>

            {isOpen && (
                <div className="select-dropdown">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={`select-option ${value === opt.value ? 'select-option-active' : 'select-option-inactive'}`}
                            onClick={() => {
                                if (onChange) onChange(opt.value);
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
