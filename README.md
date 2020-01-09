# VulnNodeApp
A vulnerable node.js application
The application made using node.js, express server and ejs template engine.
This application is meant for educational purpose only. 

# Setup
## Clone this repository

`URL`

## Application setup:
- Install latest node.js version with npm.
- Open terminal/command prompt and navigate to the location of downloaded/cloned repository.
- Run command: `npm install`
 
## DB setup
- Install latest mysql version and start the mysql service/deamon
- Login with root user in mysql and run below sql script:

```sql
CREATE USER 'vulnnodeapp'@'localhost' IDENTIFIED BY 'password';
create database vuln_node_app_db;
GRANT ALL PRIVILEGES ON vuln_node_app_db.* TO 'vulnnodeapp'@'localhost';
create table users (id int AUTO_INCREMENT PRIMARY KEY, fullname varchar(255), username varchar(255),password varchar(255), email varchar(255), phone varchar(255), profilepic varchar(255));
insert into users(fullname,username,password,email,phone) values("test1","test1","test1","test1@test.com","976543210");
insert into users(fullname,username,password,email,phone) values("test2","test2","test2","test2@test.com","9887987541");
insert into users(fullname,username,password,email,phone) values("test3","test3","test3","test3@test.com","9876987611");
insert into users(fullname,username,password,email,phone) values("test4","test4","test4","test4@test.com","9123459876");
insert into users(fullname,username,password,email,phone) values("test5","test5","test5","test5@test.com","7893451230");
```

## Set basic environment variable
- User need to set below environment variable.
    * DATABASE_HOST (E.g: localhost, 127.0.0.1, etc...)
    * DATABASE_NAME (E.g: vuln_node_app_db or DB name you change in above DB script)
    * DATABASE_USER (E.g: vulnnodeapp or user name you change in above DB script)
    * DATABASE_PASS (E.g: password or password you change in above DB script)

- Below is the script for linux users
```bash
export DATABASE_HOST=127.0.0.1
export DATABASE_NAME=vuln_node_app_db
export DATABASE_USER=vulnnodeapp
export DATABASE_PASS=password
```

## Start the server
- Open the command prompt/terminal and navigate to the location of your repository
- Run command: `npm start`
- Access the application at http://localhost:3000

## Vulnerability covered
- SQL Injection
- Cross Site Scripting (XSS)
- Insecure Direct Object Reference (IDOR)
- Command Injection
- Arbitrary File Retrieval
- Regular Expression Injection
- External XML Entity Injection (XXE)
- Node js Deserialization
- Security Misconfiguration
- Insecure Session Management

# TODO
- Will add new vulnerabilities such as CORS, Template Injection, etc...
- Improve application documentation

# Contributation
- In case of bugs in the application, feel free to create an issue on github.


You can reach me at [Gaurav Nayak](https://github.com/4auvar) or DM me at [@4auvar](https://twitter.com/4auvar)