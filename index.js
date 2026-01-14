const fs = require("fs");

// Leer CSV
const data = fs.readFileSync("sales_data.csv", "utf8");

// Separar líneas
const lines = data.split("\n");

// Encabezados
const headers = lines[0].split(",");

// Convertir a objetos
const records = lines.slice(1).map(line => {
  const values = line.split(",");
  const obj = {};
  headers.forEach((header, index) => {
    obj[header] = values[index];
  });
  return obj;
});

// Calcular total de ventas
const totalSales = records.reduce((sum, record) => {
  return sum + Number(record.total);
}, 0);

console.log("Total de ventas:", totalSales);
