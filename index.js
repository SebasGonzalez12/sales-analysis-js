const fs = require("fs");

// Leer CSV
const data = fs.readFileSync("sales_data.csv", "utf8");

// Separar líneas
const lines = data.split("\n");

// Encabezados (Excel en español usa ;)
const headers = lines[0]
  .split(";")
  .map(h => h.trim());

// Convertir a objetos
const records = lines
  .slice(1)
  .filter(line => line.trim() !== "")
  .map(line => {
    const values = line.split(";");
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index]?.trim();
    });
    return obj;
  });

// Calcular total de ventas (quitando puntos de miles)
const totalSales = records.reduce((sum, record) => {
  const cleanNumber = record.total.replace(/\./g, "");
  return sum + Number(cleanNumber);
}, 0);

console.log("Total de ventas:", totalSales);

// Calcular promedio
let total = 0;
let count = 0;

records.forEach(record => {
  const cleanNumber = record.total.replace(/\./g, "");
  const value = Number(cleanNumber);

  if (!isNaN(value)) {
    total += value;
    count++;
  }
});

const averageSales = count > 0 ? total / count : 0;

console.log("Promedio de ventas:", averageSales);
