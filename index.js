const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const filePath = path.join(__dirname, 'sales_data.csv');

let totalVentas = 0;
let count = 0;

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    try {
      // Buscar columnas posibles de quantity y unit_price (insensible a mayúsculas)
      const quantityKey = Object.keys(row).find(k => k.toLowerCase().includes('quantity'));
      const priceKey = Object.keys(row).find(k => k.toLowerCase().includes('unit_price') || k.toLowerCase().includes('price'));

      if (!quantityKey || !priceKey) return; // Si no existen las columnas, ignorar fila

      // Trim y conversión a número
      const quantityStr = row[quantityKey]?.trim().replace(/[^0-9]/g, '');
      const priceStr = row[priceKey]?.trim().replace(/[^0-9]/g, '');

      const quantity = parseInt(quantityStr, 10);
      const unitPrice = parseInt(priceStr, 10);

      if (!isNaN(quantity) && !isNaN(unitPrice)) {
        totalVentas += quantity * unitPrice;
        count++;
      }
    } catch (err) {
      console.log('Fila ignorada por error:', row, err.message);
    }
  })
  .on('end', () => {
    const promedio = count > 0 ? totalVentas / count : 0;

    console.log('--- RESULTADO ---');
    console.log(`Total de ventas: $${totalVentas.toLocaleString('es-CO')}`);
    console.log(`Promedio de ventas: $${promedio.toLocaleString('es-CO')}`);
  });
