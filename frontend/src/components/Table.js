import React from 'react';
import '../styles/components/table.css';

const Table = ({ columns, data, actions }) => {
  if (!Array.isArray(columns) || !Array.isArray(data)) {
    console.error('Table: Columns or Data is not an array');
    return null;
  }

  return (
    <table className="generic-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.label}</th>
          ))}
          {actions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{row[col.accessor]}</td>
            ))}
            {actions && (
              <td>
                <button onClick={() => actions.onClick(row)} className="action-button">
                  {actions.icon}
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
