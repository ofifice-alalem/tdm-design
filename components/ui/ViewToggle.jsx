import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

export const ViewToggle = ({ onViewChange, defaultView = 'table', className = '' }) => {
    const [view, setView] = useState(defaultView);

    const handleToggle = (newView) => {
        setView(newView);
        if (onViewChange) onViewChange(newView);
    };

    return (
        <div className={`view-toggle-wrapper ${className}`}>
            <button
                onClick={() => handleToggle('table')}
                className={view === 'table' ? 'view-toggle-btn-active' : 'view-toggle-btn-inactive'}
            >
                <List className="view-toggle-icon" />
            </button>
            <button
                onClick={() => handleToggle('grid')}
                className={view === 'grid' ? 'view-toggle-btn-active' : 'view-toggle-btn-inactive'}
            >
                <LayoutGrid className="view-toggle-icon" />
            </button>
        </div>
    );
};
