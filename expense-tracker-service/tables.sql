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
CREATE TYPE transactionType AS ENUM ('INCOME','EXPENSE')
CREATE TABLE transaction (
    id char(36) PRIMARY KEY,
    amount decimal (10,2),
    categoryId char (36),
    type transactionType,
    date varchar(10), text
    time TIME, 
    payee varchar(64),
    note TEXT,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
)

insert into transaction values('asd', 1000, '0af443e8-e4ea-4a68-8b60-3b46ab194738', 'INCOME', CURRENT_DATE , 'Sarnai', 'Oroo tolov')

select transaction.amount, transaction.type, categories.name, categories.icon, categories.color from transaction left join categories on transaction.categoryId = categories.id 
