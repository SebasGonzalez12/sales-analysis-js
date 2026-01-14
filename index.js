const fs = require("fs");

// Leer CSV
const data = fs.readFileSync("sales_data.csv", "utf8");

// Separar líneas
const lines = data.split("\n");

// Encabezados
const headers = lines[0]
  .split(",")
  .map(header => header.trim());

// Convertir a objetos
const records = lines
  .slice(1)
  .filter(line => line.trim() !== "")
  .map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index]?.trim();
    });
    return obj;
  });


// Calcular total de ventas
const totalSales = records.reduce((sum, record) => {
  return sum + Number(record.total);
}, 0);

console.log("Total de ventas:", totalSales);



// 3. Calcular promedio de ventas
let total = 0;
let count = 0;

records.forEach(record => {
  const value = Number(record.total);

  if (!isNaN(value)) {
    total += value;
    count++;
  }
});

const averageSales = count > 0 ? total / count : 0;

console.log("Promedio de ventas:", averageSales);

// Calcular ventas por producto
const salesByProduct = {};

records.forEach(record => {
  const product = record.product;
  const value = Number(record.total);

  if (!isNaN(value)) {
    if (!salesByProduct[product]) {
      salesByProduct[product] = 0;
    }
    salesByProduct[product] += value;
  }
});

console.log("Ventas por producto:");
console.log(salesByProduct);

// Exportar ventas por producto a CSV
let csvContent = "product,total_sales\n";

for (const product in salesByProduct) {
  csvContent += `${product},${salesByProduct[product]}\n`;
}

fs.writeFileSync("sales_by_product.csv", csvContent);

console.log("Archivo sales_by_product.csv creado");
