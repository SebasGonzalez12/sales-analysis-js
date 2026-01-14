console.log("Ejecutando la versión CORRECTA de index.js");

const fs = require('fs');
const path = require('path');

// Ruta del archivo CSV
const filePath = path.join(__dirname, 'sales_data.csv');

// Leer el archivo
const data = fs.readFileSync(filePath, 'utf8');

// Separar filas
const rows = data.split('\n');

// Quitar la fila de encabezado
const header = rows.shift();

// Inicializar total
let totalVentas = 0;

// Contador de filas válidas
let count = 0;

// Recorrer cada fila
rows.forEach(row => {
  if (row.trim() === '') return; // Ignorar filas vacías

  const columns = row.split(','); // Suponiendo que el CSV usa coma como separador de columnas
  let venta = columns[1]; // Suponiendo que la columna 2 tiene la venta

  // Normalizar número: quitar puntos de miles y cambiar coma decimal por punto
  venta = venta.replace(/\./g, '').replace(',', '.');

  // Convertir a número
  const ventaNum = parseFloat(venta);

  if (!isNaN(ventaNum)) {
    totalVentas += ventaNum;
    count++;
  }
});

const promedio = count > 0 ? totalVentas / count : 0;

console.log(`Total de ventas: ${totalVentas.toFixed(2)}`);
console.log(`Promedio de ventas: ${promedio.toFixed(2)}`);
