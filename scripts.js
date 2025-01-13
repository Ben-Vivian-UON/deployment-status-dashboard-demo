/**
 * Sort table by column index and data type.
 * @param {number} colIndex - Index of the column to sort.
 * @param {string} type - Type of data to sort ('string', 'date', 'status').
 */
function sortTable(colIndex, type) {
  const table = document.querySelector('table');
  const rows = Array.from(table.rows).slice(1); // Exclude header row
  let sortedRows;

  if (type === 'string') {
    // Sort strings alphabetically
    sortedRows = rows.sort((a, b) => {
      const cellA = a.cells[colIndex].innerText.toLowerCase();
      const cellB = b.cells[colIndex].innerText.toLowerCase();
      return cellA.localeCompare(cellB);
    });
  } else if (type === 'date') {
    // Sort dates chronologically
    sortedRows = rows.sort((a, b) => {
      const cellA = new Date(a.cells[colIndex].innerText);
      const cellB = new Date(b.cells[colIndex].innerText);
      return cellA - cellB;
    });
  } else if (type === 'status') {
    // Sort by status (success > fail)
    const statusOrder = { success: 1, fail: 0 };
    sortedRows = rows.sort((a, b) => {
      const cellA = a.cells[colIndex].innerText.toLowerCase();
      const cellB = b.cells[colIndex].innerText.toLowerCase();
      return statusOrder[cellB] - statusOrder[cellA];
    });
  }

  // Toggle between ascending and descending
  const isDescending = table.getAttribute('data-sort-desc') === 'true';
  if (isDescending) sortedRows.reverse();
  table.setAttribute('data-sort-desc', !isDescending);

  // Append sorted rows back to the table
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  sortedRows.forEach((row) => tbody.appendChild(row));
}
