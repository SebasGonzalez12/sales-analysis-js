const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const filePath = path.join(__dirname, 'sales_data.csv');

let totalVentas = 0;
let count = 0;

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    // Trim para quitar espacios y convertir a número
    const quantityStr = row['quantity']?.trim();
    const unitPriceStr = row['unit_price']?.trim();

    const quantity = parseInt(quantityStr, 10);
    const unitPrice = parseInt(unitPriceStr, 10);

    if (!isNaN(quantity) && !isNaN(unitPrice)) {
      const venta = quantity * unitPrice;
      totalVentas += venta;
      count++;
    } else {
      console.log('Fila ignorada por valor inválido:', row);
    }
  })
  .on('end', () => {
    const promedio = count > 0 ? totalVentas / count : 0;
    console.log(`Total de ventas: ${totalVentas.toLocaleString('es-CO')}`);
    console.log(`Promedio de ventas: ${promedio.toLocaleString('es-CO')}`);
  });
