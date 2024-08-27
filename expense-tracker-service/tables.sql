CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color varchar(16),
    icon varchar(16)
)

ALTER TABLE categories
    add column color varchar(16),
    add column icon varchar(16);

-- CREATE TYPE GENDER AS ENUM('M','F');

-- CREATE TABLE employees(
--     emp_no SERIAL,
--     first_name VARCHAR(14) NOT NULL,
--     last_name TEXT NOT NULL,
--     gender GENDER NOT NULL,
--     birth_date DATE NOT NULL,
--     hire_date DATE NOT NULL
-- )

