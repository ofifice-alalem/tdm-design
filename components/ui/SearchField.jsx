import React, { useState } from 'react';
import { Search, X, Command } from 'lucide-react';

export const SearchField = ({ placeholder = 'ابدأ البحث هنا...', onChange, className = '' }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        setQuery('');
        if (onChange) onChange('');
    };

    return (
        <div className={`search-wrapper ${className}`}>
            {/* Background layer */}
            <div className={`search-bg ${isFocused ? 'search-bg-focused' : ''}`} />

            {/* Search icon */}
            <Search className={`search-icon ${isFocused ? 'search-icon-focused' : ''}`} />

            {/* Input */}
            <input
                type="text"
                value={query}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    if (onChange) onChange(e.target.value);
                }}
                placeholder={placeholder}
                className="search-input"
            />

            {/* Right slot: clear btn or shortcut hint */}
            <div className="search-right-slot">
                {query ? (
                    <button onClick={handleClear} className="search-clear-btn">
                        <X className="search-clear-icon" />
                    </button>
                ) : (
                    <div className="search-shortcut">
                        <Command className="search-shortcut-icon" />
                        <span className="search-shortcut-key">K</span>
                    </div>
                )}
            </div>

            {/* Focus glow (dark mode) */}
            {isFocused && <div className="search-glow" aria-hidden="true" />}
        </div>
    );
};
