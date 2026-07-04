-- Q1
SELECT 
    e.firstName,
    e.lastName,
    e.email,
    e.officeCode
FROM employees AS e
INNER JOIN offices AS o
    ON e.officeCode = o.officeCode;

-- Q2
SELECT 
    p.productName,
    p.productVendor,
    p.productLine
FROM products AS p
LEFT JOIN productlines AS pl
    ON p.productLine = pl.productLine;

-- Q3
SELECT 
    o.orderDate,
    o.shippedDate,
    o.status,
    o.customerNumber
FROM customers AS c
RIGHT JOIN orders AS o
    ON c.customerNumber = o.customerNumber
LIMIT 10;
