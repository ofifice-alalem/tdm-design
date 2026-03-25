import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatisticsCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    accent = 'blue'
}) => {
    const accentConfig = {
        blue:   { card: 'stat-card-blue',   sphere: 'stat-sphere-blue',   icon: 'stat-icon-blue',   label: 'stat-label-blue'   },
        green:  { card: 'stat-card-green',  sphere: 'stat-sphere-green',  icon: 'stat-icon-green',  label: 'stat-label-green'  },
        red:    { card: 'stat-card-red',    sphere: 'stat-sphere-red',    icon: 'stat-icon-red',    label: 'stat-label-red'    },
        purple: { card: 'stat-card-purple', sphere: 'stat-sphere-purple', icon: 'stat-icon-purple', label: 'stat-label-purple' },
    };

    const config = accentConfig[accent] ?? accentConfig.blue;

    return (
        <div className={`stat-card ${config.card}`}>
            {/* Texture & glow layers */}
            <div className="stat-noise"     aria-hidden="true" />
            <div className="stat-glow-top"  aria-hidden="true" />
            <div className={`stat-sphere ${config.sphere}`} aria-hidden="true" />

            {/* Header row */}
            <div className="stat-header">
                <p className={`stat-title ${config.label}`}>{title}</p>
                {Icon && (
                    <div className={`stat-icon-wrap ${config.icon}`}>
                        <Icon className="stat-icon-svg" />
                    </div>
                )}
            </div>

            {/* Value + trend */}
            <div className="stat-body">
                <h3 className="stat-value">{value}</h3>
                {trend && (
                    <span className={`stat-badge ${trend === 'up' ? 'stat-badge-up' : 'stat-badge-down'}`}>
                        {trend === 'up'
                            ? <TrendingUp  className="stat-badge-icon" />
                            : <TrendingDown className="stat-badge-icon" />}
                        {trendValue}
                    </span>
                )}
            </div>
        </div>
    );
};
