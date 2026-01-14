const fs = require("fs");

// Leer el archivo CSV
const data = fs.readFileSync("sales_data.csv", "utf8");

// Separar líneas
const lines = data.split("\n");

// Separar encabezados
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

console.log(records);
