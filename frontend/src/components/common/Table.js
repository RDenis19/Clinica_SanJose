const Table = ({ columns, data }) => {
  return (
    <table className="generic-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.accessor}>
                {col.accessor === 'accion' ? (
                  row[col.accessor] // Botón de acción dinámico
                ) : (
                  row[col.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
