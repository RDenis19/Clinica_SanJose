-- MySQL Script generated by MySQL Workbench
-- Mon Jan 13 03:36:10 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema clinica_sanjose
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `clinica_sanjose` ;

-- -----------------------------------------------------
-- Schema clinica_sanjose
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clinica_sanjose` DEFAULT CHARACTER SET utf8 ;
USE `clinica_sanjose` ;

-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Usuario` (
  `identificacion` VARCHAR(10) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `nombres` VARCHAR(50) NOT NULL,
  `apellidos` VARCHAR(50) NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `direccionDomicilio` VARCHAR(200) NOT NULL,
  `telefono` VARCHAR(10) NOT NULL,
  `sexo` ENUM('F', 'M') NOT NULL,
  `estadoCivil` ENUM('Sol', 'Cas', 'Uni', 'Div', 'Viu') NOT NULL,
  `especialidad` VARCHAR(100) NOT NULL,
  `fotografia` BLOB NULL,
  `consultorio` VARCHAR(10) NULL,
  `estado` ENUM('Act', 'Ina', 'Sus') NOT NULL,
  `rol` ENUM('Admin', 'Doctor', 'Enfermera') NOT NULL,
  `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaModificacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`identificacion`),
  UNIQUE INDEX `idUsuarios_UNIQUE` (`identificacion` ASC) VISIBLE,
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`HistoriaClinica`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`HistoriaClinica` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`HistoriaClinica` (
  `idHistoriaClinica` INT NOT NULL AUTO_INCREMENT,
  `nroHistoriaClinica` VARCHAR(6) NULL,
  `fechaCreacionHC` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaUltimaEdicion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idHistoriaClinica`),
  UNIQUE INDEX `idHistoria Clinica_UNIQUE` (`idHistoriaClinica` ASC) VISIBLE,
  UNIQUE INDEX `nroHistoriaClinica_UNIQUE` (`nroHistoriaClinica` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Plantilla_Formulario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Plantilla_Formulario` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Plantilla_Formulario` (
  `idPlantilla_Formulario` INT NOT NULL AUTO_INCREMENT,
  `nroTipoFormulario` INT NULL,
  `nombreTipoFormulario` VARCHAR(150) NOT NULL,
  `Estructura` JSON NOT NULL,
  PRIMARY KEY (`idPlantilla_Formulario`),
  UNIQUE INDEX `idFormulario_Tipo_UNIQUE` (`idPlantilla_Formulario` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Establecimiento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Establecimiento` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Establecimiento` (
  `idEstablecimiento` INT NOT NULL AUTO_INCREMENT,
  `nombreEstablecimiento` VARCHAR(200) NULL,
  `codigoEstablecimiento` VARCHAR(10) NULL,
  `institucionSistema` VARCHAR(45) NULL,
  `codigoParroquiaUO` SMALLINT NULL,
  `codigoCantonUO` SMALLINT NULL,
  `codigoProvinciaUO` SMALLINT NULL,
  PRIMARY KEY (`idEstablecimiento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Formulario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Formulario` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Formulario` (
  `idFormulario` INT NOT NULL AUTO_INCREMENT,
  `nroHistoriaClinica` INT NULL,
  `fechaCreacionF` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaUltimaModificacionF` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `contenido` JSON NULL,
  `estadoFormulario` ENUM('Abierto', 'Cerrado', 'Cancelado') NULL,
  `notas` VARCHAR(45) NULL,
  `observaciones` VARCHAR(45) NULL,
  `HistoriaClinica_idHistoriaClinica` INT NOT NULL,
  `Plantilla_Formulario_idPlantilla_Formulario` INT NOT NULL,
  `Establecimiento_idEstablecimiento` INT NOT NULL,
  PRIMARY KEY (`idFormulario`, `HistoriaClinica_idHistoriaClinica`, `Plantilla_Formulario_idPlantilla_Formulario`, `Establecimiento_idEstablecimiento`),
  UNIQUE INDEX `idFormulario_UNIQUE` (`idFormulario` ASC) VISIBLE,
  INDEX `fk_Formulario_HistoriaClinica1_idx` (`HistoriaClinica_idHistoriaClinica` ASC) VISIBLE,
  INDEX `fk_Formulario_Plantilla_Formulario1_idx` (`Plantilla_Formulario_idPlantilla_Formulario` ASC) VISIBLE,
  INDEX `fk_Formulario_Establecimiento1_idx` (`Establecimiento_idEstablecimiento` ASC) VISIBLE,
  CONSTRAINT `fk_Formulario_HistoriaClinica1`
    FOREIGN KEY (`HistoriaClinica_idHistoriaClinica`)
    REFERENCES `clinica_sanjose`.`HistoriaClinica` (`idHistoriaClinica`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Formulario_Plantilla_Formulario1`
    FOREIGN KEY (`Plantilla_Formulario_idPlantilla_Formulario`)
    REFERENCES `clinica_sanjose`.`Plantilla_Formulario` (`idPlantilla_Formulario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Formulario_Establecimiento1`
    FOREIGN KEY (`Establecimiento_idEstablecimiento`)
    REFERENCES `clinica_sanjose`.`Establecimiento` (`idEstablecimiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Paciente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Paciente` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Paciente` (
  `idPaciente` INT NOT NULL AUTO_INCREMENT,
  `identificacion` VARCHAR(11) NOT NULL,
  `apellidoParteno` VARCHAR(50) NULL,
  `apellidoMaterno` VARCHAR(50) NULL,
  `primerNombre` VARCHAR(50) NULL,
  `segundoNombre` VARCHAR(50) NULL,
  `direccionResidenciaHab` INT NULL,
  `barrio` VARCHAR(40) NULL,
  `parroquia` VARCHAR(40) NULL,
  `canton` VARCHAR(40) NULL,
  `provincia` VARCHAR(40) NULL,
  `zona` ENUM('U', 'R') NULL,
  `telefonoPaciente` VARCHAR(15) NULL,
  `fechaNacimiento` DATE NULL,
  `lugarNacimiento` VARCHAR(40) NULL,
  `nacionalidad` VARCHAR(40) NULL,
  `grupoCultural` VARCHAR(45) NULL,
  `sexo` ENUM('F', 'M') NULL,
  `estadoCivil` ENUM('Sol', 'Cas', 'Uni', 'Div', 'Viu') NULL,
  `instruccionUltimoAnioAprov` VARCHAR(45) NULL,
  `direccionPaciente` VARCHAR(200) NULL,
  `correo` VARCHAR(200) NULL,
  `fechaCreacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `ocupacion` VARCHAR(45) NULL,
  `empresaTrabajo` VARCHAR(45) NULL,
  `tipoSeguroSalud` VARCHAR(45) NULL,
  `alergias` VARCHAR(500) NULL,
  `grupoSanguineo` ENUM('O-', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+') NULL,
  `observaciones` VARCHAR(200) NULL,
  `HistoriaClinica_idHistoriaClinica` INT NOT NULL,
  PRIMARY KEY (`idPaciente`, `HistoriaClinica_idHistoriaClinica`),
  UNIQUE INDEX `idPaciente_UNIQUE` (`idPaciente` ASC) VISIBLE,
  UNIQUE INDEX `identificacion_UNIQUE` (`identificacion` ASC) VISIBLE,
  INDEX `fk_Paciente_HistoriaClinica1_idx` (`HistoriaClinica_idHistoriaClinica` ASC) VISIBLE,
  CONSTRAINT `fk_Paciente_HistoriaClinica1`
    FOREIGN KEY (`HistoriaClinica_idHistoriaClinica`)
    REFERENCES `clinica_sanjose`.`HistoriaClinica` (`idHistoriaClinica`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Titulo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Titulo` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Titulo` (
  `idTitulo` INT NOT NULL AUTO_INCREMENT,
  `nombreTitulo` VARCHAR(100) NULL,
  `institucionEducacionSuperior` VARCHAR(150) NULL,
  `tipoTitulo` ENUM('Nacional', 'Extranjero') NULL,
  `reconocidoPor` VARCHAR(100) NULL,
  `numeroRegistro` VARCHAR(45) NULL,
  `fechaRegistro` DATETIME NULL,
  `areaConocimiento` VARCHAR(50) NULL,
  `Usuario_identificacion` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idTitulo`, `Usuario_identificacion`),
  UNIQUE INDEX `idtitulo_UNIQUE` (`idTitulo` ASC) VISIBLE,
  INDEX `fk_Titulo_Usuario1_idx` (`Usuario_identificacion` ASC) VISIBLE,
  CONSTRAINT `fk_Titulo_Usuario1`
    FOREIGN KEY (`Usuario_identificacion`)
    REFERENCES `clinica_sanjose`.`Usuario` (`identificacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Jornada`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Jornada` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Jornada` (
  `idJornada` INT NOT NULL AUTO_INCREMENT,
  `supervisor` VARCHAR(45) NULL,
  `fechaContratacion` DATETIME NULL,
  `fechaFinContratacion` DATETIME NULL,
  `inicioJornada` TIME NULL,
  `finJornada` TIME NULL,
  `Usuario_identificacion` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idJornada`, `Usuario_identificacion`),
  UNIQUE INDEX `idInternaClinica_UNIQUE` (`idJornada` ASC) VISIBLE,
  INDEX `fk_Jornada_Usuario1_idx` (`Usuario_identificacion` ASC) VISIBLE,
  CONSTRAINT `fk_Jornada_Usuario1`
    FOREIGN KEY (`Usuario_identificacion`)
    REFERENCES `clinica_sanjose`.`Usuario` (`identificacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`RegistroModificaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`RegistroModificaciones` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`RegistroModificaciones` (
  `idRegistroModificaciones` INT NOT NULL AUTO_INCREMENT,
  `fechaCambio` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accion` ENUM('Creacion', 'Modificacion') NULL,
  `camposModificados` JSON NULL,
  `notas` VARCHAR(200) NULL,
  `Formulario_idFormulario` INT NOT NULL,
  `Usuario_identificacion` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idRegistroModificaciones`, `Formulario_idFormulario`, `Usuario_identificacion`),
  UNIQUE INDEX `idFormulario_Log_UNIQUE` (`idRegistroModificaciones` ASC) VISIBLE,
  INDEX `fk_RegistroModificaciones_Formulario1_idx` (`Formulario_idFormulario` ASC) VISIBLE,
  INDEX `fk_RegistroModificaciones_Usuario1_idx` (`Usuario_identificacion` ASC) VISIBLE,
  CONSTRAINT `fk_RegistroModificaciones_Formulario1`
    FOREIGN KEY (`Formulario_idFormulario`)
    REFERENCES `clinica_sanjose`.`Formulario` (`idFormulario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RegistroModificaciones_Usuario1`
    FOREIGN KEY (`Usuario_identificacion`)
    REFERENCES `clinica_sanjose`.`Usuario` (`identificacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Referido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Referido` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Referido` (
  `idReferido` INT NOT NULL AUTO_INCREMENT,
  `nombreReferido` VARCHAR(45) NULL,
  `parentescoReferido` VARCHAR(45) NULL,
  `direccionReferido` VARCHAR(45) NULL,
  `telefonoReferido` VARCHAR(15) NULL,
  `Paciente_idPaciente` INT NOT NULL,
  PRIMARY KEY (`idReferido`, `Paciente_idPaciente`),
  INDEX `fk_Referido_Paciente1_idx` (`Paciente_idPaciente` ASC) VISIBLE,
  CONSTRAINT `fk_Referido_Paciente1`
    FOREIGN KEY (`Paciente_idPaciente`)
    REFERENCES `clinica_sanjose`.`Paciente` (`idPaciente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`FirmaElectronica`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`FirmaElectronica` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`FirmaElectronica` (
  `idFirmaElectronica` INT NOT NULL AUTO_INCREMENT,
  `nombreCertificado` VARCHAR(255) NULL,
  `serialNumber` VARCHAR(255) NULL,
  `validoDesde` DATETIME NULL,
  `validoHasta` DATETIME NULL,
  `clavePublica` TEXT NULL,
  `archivoCertificado` LONGBLOB NULL,
  `fechaCreacionFir` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `Usuario_identificacion` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idFirmaElectronica`, `Usuario_identificacion`),
  UNIQUE INDEX `idFirmaElectronica_UNIQUE` (`idFirmaElectronica` ASC) VISIBLE,
  INDEX `fk_FirmaElectronica_Usuario1_idx` (`Usuario_identificacion` ASC) VISIBLE,
  CONSTRAINT `fk_FirmaElectronica_Usuario1`
    FOREIGN KEY (`Usuario_identificacion`)
    REFERENCES `clinica_sanjose`.`Usuario` (`identificacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_sanjose`.`Usuario_has_HistoriaClinica`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clinica_sanjose`.`Usuario_has_HistoriaClinica` ;

CREATE TABLE IF NOT EXISTS `clinica_sanjose`.`Usuario_has_HistoriaClinica` (
  `Usuario_identificacion` VARCHAR(10) NOT NULL,
  `HistoriaClinica_idHistoriaClinica` INT NOT NULL,
  PRIMARY KEY (`Usuario_identificacion`, `HistoriaClinica_idHistoriaClinica`),
  INDEX `fk_Usuario_has_HistoriaClinica_HistoriaClinica1_idx` (`HistoriaClinica_idHistoriaClinica` ASC) VISIBLE,
  INDEX `fk_Usuario_has_HistoriaClinica_Usuario1_idx` (`Usuario_identificacion` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_has_HistoriaClinica_Usuario1`
    FOREIGN KEY (`Usuario_identificacion`)
    REFERENCES `clinica_sanjose`.`Usuario` (`identificacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_has_HistoriaClinica_HistoriaClinica1`
    FOREIGN KEY (`HistoriaClinica_idHistoriaClinica`)
    REFERENCES `clinica_sanjose`.`HistoriaClinica` (`idHistoriaClinica`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
