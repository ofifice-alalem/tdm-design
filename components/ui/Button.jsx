import React from 'react';

export const Button = ({
    variant = 'primary',
    icon,
    label,
    onClick,
    className = '',
    children,
    ...props
}) => {
    const variantClass = {
        primary: 'btn-primary',
        danger:  'btn-danger',
        outline: 'btn-outline',
        ghost:   'btn-ghost',
    }[variant] ?? 'btn-primary';

    return (
        <button
            className={`btn ${variantClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {/* Specular highlight */}
            <span className="btn-shine" aria-hidden="true" />

            {icon && (
                React.isValidElement(icon)
                    ? icon
                    : React.createElement(icon, { className: 'btn-icon-inner' })
            )}

            {(label || children) && <span>{label || children}</span>}
        </button>
    );
};
