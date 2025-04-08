-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cliente` (
  `id_Cliente` INT NOT NULL AUTO_INCREMENT,
  `nombre(s)` VARCHAR(45) NOT NULL,
  `Apellidos` VARCHAR(80) NOT NULL,
  `Fecha de nacimiento` DATE NOT NULL,
  `Telefono` VARCHAR(10) NOT NULL,
  `Domicilio` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`id_Cliente`),
  UNIQUE INDEX `id_Cliente_UNIQUE` (`id_Cliente` ASC) VISIBLE,
  UNIQUE INDEX `Telefono_UNIQUE` (`Telefono` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pedidos` (
  `id_Pedidos` INT NOT NULL AUTO_INCREMENT,
  `cantidad_productos` INT NOT NULL,
  `fecha_pedido` DATETIME NOT NULL,
  `descuento` TINYINT NOT NULL,
  `total` DOUBLE NOT NULL,
  `Cliente_id_Cliente` INT NOT NULL,
  PRIMARY KEY (`id_Pedidos`, `Cliente_id_Cliente`),
  UNIQUE INDEX `id_Pedidos_UNIQUE` (`id_Pedidos` ASC) VISIBLE,
  INDEX `fk_Pedidos_Cliente1_idx` (`Cliente_id_Cliente` ASC) VISIBLE,
  CONSTRAINT `fk_Pedidos_Cliente1`
    FOREIGN KEY (`Cliente_id_Cliente`)
    REFERENCES `mydb`.`Cliente` (`id_Cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`productos` (
  `id_productos` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(45) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_productos`),
  UNIQUE INDEX `id_productos_UNIQUE` (`id_productos` ASC) VISIBLE,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pedidos_has_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pedidos_has_productos` (
  `Pedidos_id_Pedidos` INT NOT NULL,
  `productos_id_productos` INT NOT NULL,
  PRIMARY KEY (`Pedidos_id_Pedidos`, `productos_id_productos`),
  INDEX `fk_Pedidos_has_productos_productos1_idx` (`productos_id_productos` ASC) VISIBLE,
  INDEX `fk_Pedidos_has_productos_Pedidos_idx` (`Pedidos_id_Pedidos` ASC) VISIBLE,
  CONSTRAINT `fk_Pedidos_has_productos_Pedidos`
    FOREIGN KEY (`Pedidos_id_Pedidos`)
    REFERENCES `mydb`.`Pedidos` (`id_Pedidos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedidos_has_productos_productos1`
    FOREIGN KEY (`productos_id_productos`)
    REFERENCES `mydb`.`productos` (`id_productos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
