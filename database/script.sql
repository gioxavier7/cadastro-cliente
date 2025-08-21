create database db_cadastro_clientes_jest;
use db_cadastro_clientes_jest;

create table tbl_cliente(
  id int primary key auto_increment,
  nome varchar(80) not null,
  email varchar(80) not null,
  telefone int not null
);