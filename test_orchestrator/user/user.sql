--------------------------------------------------------
--  create application user
--------------------------------------------------------
create user application_user identified by app_user; 

grant CONNECT, CREATE SESSION, ALTER SESSION, CREATE DATABASE LINK, 
CREATE MATERIALIZED VIEW, CREATE PROCEDURE, CREATE PUBLIC SYNONYM, CREATE ROLE, CREATE SEQUENCE, CREATE SYNONYM, CREATE TABLE, 
CREATE TRIGGER, CREATE TYPE, CREATE VIEW, UNLIMITED TABLESPACE 
  to application_user;

exit;
