const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const filePath = path.join(__dirname, 'sales_data.csv');

let totalVentas = 0;
let count = 0;

fs.createReadStream(filePath)
  .pipe(csv()) // Coma como separador por defecto
  .on('data', (row) => {
    // Convertir quantity y unit_price a números
    const quantity = parseInt(row['quantity'], 10);
    const unitPrice = parseInt(row['unit_price'], 10);

    if (!isNaN(quantity) && !isNaN(unitPrice)) {
      const venta = quantity * unitPrice;
      totalVentas += venta;
      count++;
    }
  })
  .on('end', () => {
    const promedio = count > 0 ? totalVentas / count : 0;
    console.log(`Total de ventas: ${totalVentas.toLocaleString('es-CO')}`); // Formato colombiano
    console.log(`Promedio de ventas: ${promedio.toLocaleString('es-CO')}`);
  });
