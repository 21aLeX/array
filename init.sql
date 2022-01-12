CREATE TABLE IF NOT EXISTS sorts (
    id SERIAL NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS values (
    id_sort INTEGER,
    value INTEGER,
    CONSTRAINT fk_id_sort FOREIGN KEY (id_sort) REFERENCES sort (id)
);
