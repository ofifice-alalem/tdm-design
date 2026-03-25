import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, icon: Icon, theme = 'primary' }) => {
    if (!isOpen) return null;

    const themeMap = {
        primary: { panel: 'modal-panel modal-panel-primary', glow: 'modal-glow modal-glow-primary', icon: 'modal-icon-primary' },
        danger:  { panel: 'modal-panel modal-panel-danger',  glow: 'modal-glow modal-glow-danger',  icon: 'modal-icon-danger'  },
        warning: { panel: 'modal-panel modal-panel-warning', glow: 'modal-glow modal-glow-warning', icon: 'modal-icon-warning' },
    };

    const s = themeMap[theme] ?? themeMap.primary;

    return (
        <div className="modal-overlay">
            <div className="modal-backdrop" onClick={onClose} />
            <div className={s.panel}>
                <div className={s.glow} />

                {/* Header */}
                <div className="modal-header">
                    <div className="modal-header-left">
                        {Icon && (
                            <div className="modal-icon-wrap">
                                <Icon className={`modal-icon-svg ${s.icon}`} strokeWidth={2} />
                            </div>
                        )}
                        <h3 className="modal-title">{title}</h3>
                    </div>
                    <button onClick={onClose} className="modal-close-btn">
                        <X className="modal-close-icon" />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};
