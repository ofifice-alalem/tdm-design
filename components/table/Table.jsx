import React from 'react';
import { ArrowUpDown, MoreVertical } from 'lucide-react';

export const Table = ({ columns, data, emptyMessage = 'لا توجد سجلات حالياً.', onRowClick, viewMode = 'table', cardClassName }) => {

    if (viewMode === 'grid') {
        return (
            <div className="table-grid">
                {data.map((row, idx) => (
                    <div
                        key={idx}
                        className={`table-card ${cardClassName ? cardClassName(row) : ''}`}
                        onClick={() => onRowClick && onRowClick(row)}
                    >
                        {/* Specular highlight */}
                        <div className="table-card-shine" aria-hidden="true" />

                        {/* Status glow */}
                        {row.status && (
                            <div className={`table-card-status-glow ${
                                row.status.includes('approved') ? 'status-glow-approved' :
                                row.status.includes('reject')   ? 'status-glow-rejected' :
                                                                   'status-glow-pending'
                            }`} aria-hidden="true" />
                        )}

                        {/* Card header */}
                        <div className="table-card-header">
                            <div className="table-card-id-group">
                                <span className="table-card-id">{row.reqId || row.id}</span>
                                <h4 className="table-card-title">
                                    {columns.find(c => c.accessor === 'product' || c.accessor === 'user')?.render
                                        ? columns.find(c => c.accessor === 'product' || c.accessor === 'user').render(row)
                                        : (row.product || row.user)}
                                </h4>
                            </div>
                            <div className="table-card-more">
                                <MoreVertical className="table-card-more-icon" />
                            </div>
                        </div>

                        {/* Card fields */}
                        <div className="table-card-fields">
                            {columns
                                .filter(c => !['id', 'product', 'reqId', 'user', 'actions'].includes(c.accessor))
                                .map((col, colIndex) => (
                                    <div key={colIndex} className="table-card-field">
                                        <span className="table-card-field-label">{col.header}</span>
                                        <div className="table-card-field-value">
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Actions */}
                        {columns.find(c => c.accessor === 'actions') && (
                            <div className="table-card-actions">
                                {columns.find(c => c.accessor === 'actions').render(row)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <div className="table-scroll">
                <table className="table-el">
                    <thead className="table-head">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className="table-th">
                                    <div className="table-th-inner">
                                        {col.header}
                                        {col.sortable && <ArrowUpDown className="table-sort-icon" />}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => onRowClick && onRowClick(row)}
                                    className="table-row"
                                >
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="table-td">
                                            {colIndex === 0 && <div className="table-row-indicator" aria-hidden="true" />}
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="table-empty-cell">
                                    <div className="table-empty-state">
                                        <div className="table-empty-icon-wrap">
                                            <MoreVertical className="table-empty-icon" />
                                        </div>
                                        <p className="table-empty-msg">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
