const mysql2 = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;
const db = mysql2.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "assigment_6",
});

db.connect((err) => {
  if (err) {
    console.log(error);
  } else {
    console.log("DB connected success🚀");
  }
});
app.use(express.json());

db.query(`ALTER TABLE products ADD category VARCHAR(100)`);

db.query(`ALTER TABLE suppliers MODIFY contact_number VARCHAR(15)`);

db.query(`ALTER TABLE products MODIFY p_name VARCHAR(100) NOT NULL`);

db.query(`ALTER TABLE products MODIFY p_name VARCHAR(100) NOT NULL`);
db.query(
  `INSERT INTO Suppliers (s_name, contact_number)
   VALUES (?, ?)`,
  ["FreshFoods", "01001234567"]
);

db.query(
  `INSERT INTO Products (p_name, p_price, p_stockQuantity, p_supplierId)
   VALUES ?`,
  [
    [
      ["Milk", 15.0, 50, 1],
      ["Bread", 10.0, 30, 1],
      ["Eggs", 20.0, 40, 1],
    ],
  ]
);

db.query(
  `INSERT INTO Sales (product_id, quantity_sold, sale_data)
   VALUES (?, ?, ?)`,
  [1, 2, "2025-05-20"]
);

db.query(`UPDATE Products SET p_price = ? WHERE p_name = ?`, [25.0, "Bread"]);

db.query(`DELETE FROM Products WHERE p_name = ?`, ["Eggs"]);

db.query(
  `
SELECT p.p_name, SUM(s.quantity_sold) AS TotalSold
FROM Products p
LEFT JOIN Sales s ON p.p_id = s.product_id
GROUP BY p.p_name
`,
  (err, result) => {
    console.log("Total Sold:", result);
  }
);

db.query(
  `
SELECT p_name, quantity_sold
FROM Products
ORDER BY quantity_sold DESC
LIMIT 1
`,
  (err, result) => {
    console.log("Highest Stock:", result);
  }
);

db.query(
  `
SELECT * FROM Suppliers
WHERE s_name LIKE 'F%'
`,
  (err, result) => {
    console.log("Suppliers:", result);
  }
);

db.query(
  `
SELECT p.p_name
FROM Products p
LEFT JOIN Sales s ON p.p_id = s.sales_id
WHERE s.sales_id IS NULL
`,
  (err, result) => {
    console.log("Never Sold:", result);
  }
);

db.query(
  `
SELECT p.p_name, s.quantity_sold, s.sale_data
FROM Sales s
JOIN Products p ON s.sales_id = p.p_id
`,
  (err, result) => {
    console.log("Sales Info:", result);
  }
);
