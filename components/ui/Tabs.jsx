import React, { useState, useRef, useEffect } from 'react';

export const Tabs = ({ tabs, defaultTab, onChange, className = '' }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef({});

    useEffect(() => {
        const activeNode = tabRefs.current[activeTab];
        if (activeNode) {
            setIndicatorStyle({
                left: activeNode.offsetLeft,
                width: activeNode.offsetWidth,
            });
        }
    }, [activeTab, tabs]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        if (onChange) onChange(tabId);
    };

    return (
        <div className={`tabs-wrapper ${className}`}>
            {/* Sliding indicator */}
            <div
                className="tabs-indicator"
                style={{ left: `${indicatorStyle.left}px`, width: `${indicatorStyle.width}px` }}
            />

            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        ref={el => tabRefs.current[tab.id] = el}
                        onClick={() => handleTabClick(tab.id)}
                        className={`tabs-btn ${isActive ? 'tabs-btn-active' : 'tabs-btn-inactive'}`}
                    >
                        {tab.icon && (
                            <tab.icon className={`tabs-btn-icon ${isActive ? 'tabs-btn-icon-active' : 'tabs-btn-icon-inactive'}`} />
                        )}
                        <span>{tab.label}</span>
                        {tab.hasAlert && <span className="tabs-alert-dot" />}
                    </button>
                );
            })}
        </div>
    );
};
