const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  port: 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: "ablebox",
  multipleStatements: true
});

connection.query(`
  CREATE DATABASE IF NOT EXISTS ablebox;

  USE ablebox;

  CREATE TABLE IF NOT EXISTS users (
    id MEDIUMINT(8) UNSIGNED AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL,
    password CHAR(60) BINARY NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS files (
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

  CREATE TABLE IF NOT EXISTS collab (
    id MEDIUMINT(8) UNSIGNED AUTO_INCREMENT,
    file_id MEDIUMINT(8) UNSIGNED NOT NULL,
    folder_id MEDIUMINT(8) UNSIGNED NOT NULL,
    user_id MEDIUMINT(8) UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (file_id) REFERENCES files(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX (folder_id)
  );

  CREATE TABLE IF NOT EXISTS pending_user_share (
    id MEDIUMINT(8) UNSIGNED AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL,
    file_id MEDIUMINT(8) UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (file_id) REFERENCES files(id),
    INDEX (email)
  );
`, err => err ? console.log(err) : undefined);

module.exports.connection = connection;
