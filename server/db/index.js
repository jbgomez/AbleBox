const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: "ablebox",
  multipleStatements: true
});

connection.connect();

const createDB = `
  DROP DATABASE IF EXISTS ablebox;

  CREATE DATABASE ablebox;

  USE ablebox;

  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    id MEDIUMINT(8) UNSIGNED AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL,
    password CHAR(60) BINARY NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  );

  DROP TABLE IF EXISTS files;

  CREATE TABLE files (
    id MEDIUMINT(8) UNSIGNED AUTO_INCREMENT,
    user_id MEDIUMINT(8) UNSIGNED NOT NULL,
    folder_id MEDIUMINT(8) UNSIGNED DEFAULT 0,
    name VARCHAR(200) NOT NULL,
    file_ext VARCHAR(32) DEFAULT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_folder TINYINT(1) NOT NULL DEFAULT 0,
    is_public TINYINT(1) NOT NULL DEFAULT 0,
    s3_objectId VARCHAR(400) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX (folder_id),
    INDEX (is_folder),
    INDEX (is_public)
  );

  DROP TABLE IF EXISTS collab;

  CREATE TABLE collab (
    id MEDIUMINT(8) UNSIGNED AUTO_INCREMENT,
    file_id MEDIUMINT(8) UNSIGNED NOT NULL,
    folder_id MEDIUMINT(8) UNSIGNED NOT NULL,
    user_id MEDIUMINT(8) UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (file_id) REFERENCES files(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX (folder_id)
  );

  DROP TABLE IF EXISTS pending_user_share;

  CREATE TABLE pending_user_share (
    id MEDIUMINT(8) UNSIGNED AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL,
    file_id MEDIUMINT(8) UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (file_id) REFERENCES files(id),
    INDEX (email)
  );
`;

connection.query(createDB, err => { err ? throw err : null });

module.exports.connection = connection;
