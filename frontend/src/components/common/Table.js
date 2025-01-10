import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/table.css'; // Asegúrate de tener estilos básicos para la tabla

const Table = ({ columns, data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.accessor}>
                  {column.render
                    ? column.render(row) // Si hay un render personalizado
                    : row[column.accessor]} 
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="no-data">
              No hay datos disponibles.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

// PropTypes para validar las props
Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func, // Opcional: Si deseas personalizar el contenido
    })
  ).isRequired,
  data: PropTypes.array.isRequired, // Lista de datos para llenar la tabla
};

export default Table;
