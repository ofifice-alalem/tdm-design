import React, { useState } from 'react';
import { Eye, Edit, Trash2, Phone, Printer, Filter, BarChart2, Users, Store, UserCheck, Info, UploadCloud, Download, History } from 'lucide-react';

const iconsMap = {
    view:       Eye,
    edit:       Edit,
    delete:     Trash2,
    call:       Phone,
    print:      Printer,
    filter:     Filter,
    statistics: BarChart2,
    users:      Users,
    stores:     Store,
    customers:  UserCheck,
    info:       Info,
    upload:     UploadCloud,
    backup:     Download,
    restore:    History,
};

const btnClassMap = {
    view:   'action-icon-btn action-icon-view',
    edit:   'action-icon-btn action-icon-edit',
    delete: 'action-icon-btn action-icon-delete',
    call:   'action-icon-btn action-icon-call',
};

const tooltipClassMap = {
    view:   'action-tooltip tooltip-blue',
    edit:   'action-tooltip tooltip-amber',
    delete: 'action-tooltip tooltip-red',
    call:   'action-tooltip tooltip-emerald',
};

export const ActionIcon = ({ type, onClick, tooltip }) => {
    const Icon = iconsMap[type];
    if (!Icon) return null;

    const btnClass    = btnClassMap[type]    ?? 'action-icon-btn action-icon-default';
    const tooltipClass = tooltipClassMap[type] ?? 'action-tooltip tooltip-default';

    return (
        <div className="action-icon-wrapper">
            <button onClick={onClick} className={btnClass}>
                <span className="action-icon-shine" aria-hidden="true" />
                <Icon className="action-icon-svg" />
            </button>

            {tooltip && (
                <div className={tooltipClass}>
                    {tooltip}
                    <span className="action-tooltip-arrow" aria-hidden="true" />
                </div>
            )}
        </div>
    );
};
