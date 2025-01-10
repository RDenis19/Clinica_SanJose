-- TABLA USUARIO
-- crear
INSERT INTO `clinica_sanjose`.`Usuario` (`identificacion`, `nombres`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `sexo`, `correo`, `estadoCivil`, `usuario`, `contraseña`, `especialidad`, `consultorio`, `estado`, `rol`, `InternaClinica_idInternaClinica`, `FirmaElectronica_idFirmaElec`, `InternaClinica_idInternaClinica1`)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Usuario` WHERE `idUsuario` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Usuario` 
SET `identificacion` = ?, `nombres` = ?, `apellidos` = ?, `fechaNacimiento` = ?, `direccion` = ?, `telefono` = ?, `sexo` = ?, `correo` = ?, `estadoCivil` = ?, `usuario` = ?, `contraseña` = ?, `especialidad` = ?, `consultorio` = ?, `estado` = ?, `rol` = ?, `InternaClinica_idInternaClinica` = ?, `FirmaElectronica_idFirmaElec` = ?, `InternaClinica_idInternaClinica1` = ? 
WHERE `idUsuario` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Usuario` WHERE `idUsuario` = ?;


-- TABLA PACIENTE 
-- crear
INSERT INTO `clinica_sanjose`.`Paciente` (`identificacion`, `apellidoParteno`, `apellidoMaterno`, `primerNombre`, `segundoNombre`, `direccionResidenciaHab`, `barrio`, `parroquia`, `canton`, `provincia`, `zona`, `telefonoPaciente`, `fechaNacimiento`, `lugarNacimiento`, `nacionalidad`, `grupoCultural`, `sexo`, `estadoCivil`, `instruccionUltimoAnioAprov`, `direccionPaciente`, `correo`, `ocupacion`, `empresaTrabajo`, `tipoSeguroSalud`, `alergias`, `grupoSanguineo`, `observaciones`)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Paciente` WHERE `idPaciente` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Paciente` 
SET `identificacion` = ?, `apellidoParteno` = ?, `apellidoMaterno` = ?, `primerNombre` = ?, `segundoNombre` = ?, `direccionResidenciaHab` = ?, `barrio` = ?, `parroquia` = ?, `canton` = ?, `provincia` = ?, `zona` = ?, `telefonoPaciente` = ?, `fechaNacimiento` = ?, `lugarNacimiento` = ?, `nacionalidad` = ?, `grupoCultural` = ?, `sexo` = ?, `estadoCivil` = ?, `instruccionUltimoAnioAprov` = ?, `direccionPaciente` = ?, `correo` = ?, `ocupacion` = ?, `empresaTrabajo` = ?, `tipoSeguroSalud` = ?, `alergias` = ?, `grupoSanguineo` = ?, `observaciones` = ?
WHERE `idPaciente` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Paciente` WHERE `idPaciente` = ?;


-- TABLA HISTORIA CLINICA
-- crear
INSERT INTO `clinica_sanjose`.`HistoriaClinica` (`fechaCreacionHC`, `Paciente_idPaciente`)
VALUES (?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`HistoriaClinica` WHERE `idHistoriaClinica` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`HistoriaClinica` 
SET `fechaCreacionHC` = ?, `Paciente_idPaciente` = ? 
WHERE `idHistoriaClinica` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`HistoriaClinica` WHERE `idHistoriaClinica` = ?;


-- TABLA FORMULARIO
-- crear
INSERT INTO `clinica_sanjose`.`Formulario` (`institucionSistema`, `unicodigo`, `establecimeintoSalud`, `nroHistoriaClinica`, `tipoFormulario`, `fechaCreacionF`, `contenido`, `estadoFormulario`, `notas`, `observaciones`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`, `Formulario_Tipo_idFormulario_Tipo`)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Formulario` WHERE `idFormulario` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Formulario` 
SET `institucionSistema` = ?, `unicodigo` = ?, `establecimeintoSalud` = ?, `nroHistoriaClinica` = ?, `tipoFormulario` = ?, `fechaCreacionF` = ?, `contenido` = ?, `estadoFormulario` = ?, `notas` = ?, `observaciones` = ?, `HistoriaClinica_idHistoriaClinica` = ?, `HistoriaClinica_Paciente_idPaciente` = ?, `Formulario_Tipo_idFormulario_Tipo` = ?
WHERE `idFormulario` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Formulario` WHERE `idFormulario` = ?;


-- TABLA FORMULARIO LOG
-- crear
INSERT INTO `clinica_sanjose`.`Formulario_Log` (`fecha_Hora`, `accion`, `camposModificados`, `notas`, `Usuario_idUsuario`, `Formulario_idFormulario`)
VALUES (?, ?, ?, ?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Formulario_Log` WHERE `idFormulario_Log` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Formulario_Log` 
SET `fecha_Hora` = ?, `accion` = ?, `camposModificados` = ?, `notas` = ?, `Usuario_idUsuario` = ?, `Formulario_idFormulario` = ?
WHERE `idFormulario_Log` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Formulario_Log` WHERE `idFormulario_Log` = ?;


-- TABLA USUARIO HAS HISTORIACLINICA
-- crear
INSERT INTO `clinica_sanjose`.`Usuario_has_HistoriaClinica` (`Usuario_idUsuario`, `Usuario_InternaClinica_idInternaClinica`, `Usuario_FirmaElectronica_idFirmaElec`, `Usuario_InternaClinica_idInternaClinica1`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`)
VALUES (?, ?, ?, ?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Usuario_has_HistoriaClinica` WHERE `Usuario_idUsuario` = ? AND `HistoriaClinica_idHistoriaClinica` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Usuario_has_HistoriaClinica` 
SET `Usuario_InternaClinica_idInternaClinica` = ?, `Usuario_FirmaElectronica_idFirmaElec` = ?, `Usuario_InternaClinica_idInternaClinica1` = ?, `HistoriaClinica_Paciente_idPaciente` = ?
WHERE `Usuario_idUsuario` = ? AND `HistoriaClinica_idHistoriaClinica` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Usuario_has_HistoriaClinica` WHERE `Usuario_idUsuario` = ? AND `HistoriaClinica_idHistoriaClinica` = ?;


-- TABLA FIRMA ELECTRONICA
-- crear
INSERT INTO `clinica_sanjose`.`FirmaElectronica` (`firma`, `fechaEmision`, `fechaExpiracion`)
VALUES (?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`FirmaElectronica` WHERE `idFirmaElec` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`FirmaElectronica` 
SET `firma` = ?, `fechaEmision` = ?, `fechaExpiracion` = ? 
WHERE `idFirmaElec` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`FirmaElectronica` WHERE `idFirmaElec` = ?;


-- TABLA InternaClinica
-- crear
INSERT INTO `clinica_sanjose`.`InternaClinica` (`supervisor`, `fechaContratacion`, `horarios`)
VALUES (?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`InternaClinica` WHERE `idInternaClinica` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`InternaClinica` 
SET `supervisor` = ?, `fechaContratacion` = ?, `horarios` = ? 
WHERE `idInternaClinica` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`InternaClinica` WHERE `idInternaClinica` = ?;


-- TABLA Formulario_Tipo
-- crear
INSERT INTO `clinica_sanjose`.`Formulario_Tipo` (`nroTipoFormulario`, `nombreTipoFormulario`, `Estructura`)
VALUES (?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Formulario_Tipo` WHERE `idFormulario_Tipo` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Formulario_Tipo` 
SET `nroTipoFormulario` = ?, `nombreTipoFormulario` = ?, `Estructura` = ? 
WHERE `idFormulario_Tipo` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Formulario_Tipo` WHERE `idFormulario_Tipo` = ?;


-- TABLA Titulo
-- crear
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Titulo` WHERE `idTitulo` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Titulo` 
SET `nombreTitulo` = ?, `institucionEducacionSuperior` = ?, `tipoTitulo` = ?, `reconocidoPor` = ?, `numeroRegistro` = ?, `fechaRegistro` = ?, `areaConocimiento` = ?, `observacion` = ?, `Usuario_idUsuario` = ?
WHERE `idTitulo` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Titulo` WHERE `idTitulo` = ?;


-- TABLA Certificaciones
-- crear
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES (?, ?, ?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Certificaciones` WHERE `idCertificaciones` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Certificaciones` 
SET `nombreCertificacion` = ?, `fechaEmisionC` = ?, `fechaExpiracionC` = ?, `idUsuario` = ?, `Usuario_idUsuario` = ?
WHERE `idCertificaciones` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Certificaciones` WHERE `idCertificaciones` = ?;


-- TABLA Referido
-- crear
INSERT INTO `clinica_sanjose`.`Referido` (`nombreReferido`, `parentescoReferido`, `direccionReferido`, `telefonoReferido`, `Paciente_idPaciente`)
VALUES (?, ?, ?, ?, ?);
-- leer
SELECT * FROM `clinica_sanjose`.`Referido` WHERE `idReferido` = ? AND `Paciente_idPaciente` = ?;
-- actualizar
UPDATE `clinica_sanjose`.`Referido` 
SET `nombreReferido` = ?, `parentescoReferido` = ?, `direccionReferido` = ?, `telefonoReferido` = ?, `Paciente_idPaciente` = ?
WHERE `idReferido` = ? AND `Paciente_idPaciente` = ?;
-- eliminar
DELETE FROM `clinica_sanjose`.`Referido` WHERE `idReferido` = ? AND `Paciente_idPaciente` = ?;
