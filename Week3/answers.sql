-- Q1
CREATE TABLE student (
    id INT PRIMARY KEY,
    fullname VARCHAR(100)
    age INT
);

-- Q2
INSERT INTO student (id, fullname, age) VALUES
(1, 'Alice Johnson', 19),
(2, 'Brian Okello', 18),
(3, 'Chloe Muthee', 21);

-- Q3
UPDATE student
SET age = 20
WHERE id = 2;