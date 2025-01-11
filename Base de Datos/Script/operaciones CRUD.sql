-- Operaciones CRUD para todas las tablas en la base de datos clinica_sanjose
-- Tabla Usuario
-- Create
INSERT INTO Usuario (identificacion, nombres, apellidos, fechaNacimiento, direccionDomicilio, telefono, sexo, correo, estadoCivil, especialidad, fotografia, consultorio, estado, rol, usuario, contraseña) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- Read
SELECT * FROM Usuario WHERE idUsuario = ?;
SELECT * FROM Usuario;
-- Update
UPDATE Usuario 
SET identificacion = ?, nombres = ?, apellidos = ?, fechaNacimiento = ?, direccionDomicilio = ?, telefono = ?, sexo = ?, correo = ?, estadoCivil = ?, especialidad = ?, fotografia = ?, consultorio = ?, estado = ?, rol = ?, usuario = ?, contraseña = ?
WHERE idUsuario = ?;
-- Delete
DELETE FROM Usuario WHERE idUsuario = ?;


-- Tabla Paciente
-- Create
INSERT INTO Paciente (identificacion, apellidoParteno, apellidoMaterno, primerNombre, segundoNombre, direccionResidenciaHab, barrio, parroquia, canton, provincia, zona, telefonoPaciente, fechaNacimiento, lugarNacimiento, nacionalidad, grupoCultural, sexo, estadoCivil, instruccionUltimoAnioAprov, direccionPaciente, correo, ocupacion, empresaTrabajo, tipoSeguroSalud, alergias, grupoSanguineo, observaciones, HistoriaClinica_idHistoriaClinica) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- Read
SELECT * FROM Paciente WHERE idPaciente = ?;
SELECT * FROM Paciente;
-- Update
UPDATE Paciente 
SET identificacion = ?, apellidoParteno = ?, apellidoMaterno = ?, primerNombre = ?, segundoNombre = ?, direccionResidenciaHab = ?, barrio = ?, parroquia = ?, canton = ?, provincia = ?, zona = ?, telefonoPaciente = ?, fechaNacimiento = ?, lugarNacimiento = ?, nacionalidad = ?, grupoCultural = ?, sexo = ?, estadoCivil = ?, instruccionUltimoAnioAprov = ?, direccionPaciente = ?, correo = ?, ocupacion = ?, empresaTrabajo = ?, tipoSeguroSalud = ?, alergias = ?, grupoSanguineo = ?, observaciones = ?, HistoriaClinica_idHistoriaClinica = ?
WHERE idPaciente = ?;
-- Delete
DELETE FROM Paciente WHERE idPaciente = ?;


-- Tabla HistoriaClinica
-- Create
INSERT INTO HistoriaClinica (fechaCreacionHC, nroHistoriaClinica) 
VALUES (?, ?);
-- Read
SELECT * FROM HistoriaClinica WHERE idHistoriaClinica = ?;
SELECT * FROM HistoriaClinica;
-- Update
UPDATE HistoriaClinica 
SET fechaCreacionHC = ?, nroHistoriaClinica = ?
WHERE idHistoriaClinica = ?;
-- Delete
DELETE FROM HistoriaClinica WHERE idHistoriaClinica = ?;


-- Tabla Plantilla_Formulario
-- Create
INSERT INTO Plantilla_Formulario (nroTipoFormulario, nombreTipoFormulario, Estructura) 
VALUES (?, ?, ?);
-- Read
SELECT * FROM Plantilla_Formulario WHERE idPlantilla_Formulario = ?;
SELECT * FROM Plantilla_Formulario;
-- Update
UPDATE Plantilla_Formulario 
SET nroTipoFormulario = ?, nombreTipoFormulario = ?, Estructura = ?
WHERE idPlantilla_Formulario = ?;
-- Delete
DELETE FROM Plantilla_Formulario WHERE idPlantilla_Formulario = ?;


-- Tabla Establecimiento
-- Create
INSERT INTO Establecimiento (idEstablecimiento, nombreEstablecimiento, codigoEstablecimiento, institucionSistema, codigoParroquiaUO, codigoCantonUO, codigoProvinciaUO) 
VALUES (?, ?, ?, ?, ?, ?, ?);
-- Read
SELECT * FROM Establecimiento WHERE idEstablecimiento = ?;
SELECT * FROM Establecimiento;
-- Update
UPDATE Establecimiento 
SET nombreEstablecimiento = ?, codigoEstablecimiento = ?, institucionSistema = ?, codigoParroquiaUO = ?, codigoCantonUO = ?, codigoProvinciaUO = ?
WHERE idEstablecimiento = ?;
-- Delete
DELETE FROM Establecimiento WHERE idEstablecimiento = ?;


-- Tabla Formulario
-- Create
INSERT INTO Formulario (nroHistoriaClinica, fechaCreacionF, fechaUltimaModificacionF, contenido, estadoFormulario, notas, observaciones, HistoriaClinica_idHistoriaClinica, Plantilla_Formulario_idPlantilla_Formulario, Establecimiento_idEstablecimiento) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- Read
SELECT * FROM Formulario WHERE idFormulario = ?;
SELECT * FROM Formulario;
-- Update
UPDATE Formulario 
SET nroHistoriaClinica = ?, fechaCreacionF = ?, fechaUltimaModificacionF = ?, contenido = ?, estadoFormulario = ?, notas = ?, observaciones = ?, HistoriaClinica_idHistoriaClinica = ?, Plantilla_Formulario_idPlantilla_Formulario = ?, Establecimiento_idEstablecimiento = ?
WHERE idFormulario = ?;
-- Delete
DELETE FROM Formulario WHERE idFormulario = ?;


-- Tabla Titulo
-- Create
INSERT INTO Titulo (nombreTitulo, institucionEducacionSuperior, tipoTitulo, reconocidoPor, numeroRegistro, fechaRegistro, areaConocimiento, Usuario_idUsuario) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?);
-- Read
SELECT * FROM Titulo WHERE idTitulo = ?;
SELECT * FROM Titulo;
-- Update
UPDATE Titulo 
SET nombreTitulo = ?, institucionEducacionSuperior = ?, tipoTitulo = ?, reconocidoPor = ?, numeroRegistro = ?, fechaRegistro = ?, areaConocimiento = ?, Usuario_idUsuario = ?
WHERE idTitulo = ?;
-- Delete
DELETE FROM Titulo WHERE idTitulo = ?;


-- Tabla Jornada
-- Create
INSERT INTO Jornada (supervisor, fechaContratacion, fechaFinContratacion, inicioJornada, finJornada, Usuario_idUsuario) 
VALUES (?, ?, ?, ?, ?, ?);
-- Read
SELECT * FROM Jornada WHERE idJornada = ?;
SELECT * FROM Jornada;
-- Update
UPDATE Jornada 
SET supervisor = ?, fechaContratacion = ?, fechaFinContratacion = ?, inicioJornada = ?, finJornada = ?, Usuario_idUsuario = ?
WHERE idJornada = ?;
-- Delete
DELETE FROM Jornada WHERE idJornada = ?;


-- Tabla RegistroModificaciones
-- Create
INSERT INTO RegistroModificaciones (fechaCambio, accion, camposModificados, notas, Usuario_idUsuario, Formulario_idFormulario) 
VALUES (?, ?, ?, ?, ?, ?);
-- Read
SELECT * FROM RegistroModificaciones WHERE idRegistroModificaciones = ?;
SELECT * FROM RegistroModificaciones;
-- Update
UPDATE RegistroModificaciones 
SET fechaCambio = ?, accion = ?, camposModificados = ?, notas = ?, Usuario_idUsuario = ?, Formulario_idFormulario = ?
WHERE idRegistroModificaciones = ?;
-- Delete
DELETE FROM RegistroModificaciones WHERE idRegistroModificaciones = ?;


-- Tabla Referido
-- Create
INSERT INTO Referido (nombreReferido, parentescoReferido, direccionReferido, telefonoReferido, Paciente_idPaciente) 
VALUES (?, ?, ?, ?, ?);
-- Read
SELECT * FROM Referido WHERE idReferido = ?;
SELECT * FROM Referido;
-- Update
UPDATE Referido 
SET nombreReferido = ?, parentescoReferido = ?, direccionReferido = ?, telefonoReferido = ?, Paciente_idPaciente = ?
WHERE idReferido = ?;
-- Delete
DELETE FROM Referido WHERE idReferido = ?;


-- Tabla FirmaElectronica
-- Create
INSERT INTO FirmaElectronica (nombreCertificado, serialNumber, validoDesde, validoHasta, clavePublica, archivoCertificado, Usuario_idUsuario) 
VALUES (?, ?, ?, ?, ?, ?, ?);
-- Read
SELECT * FROM FirmaElectronica WHERE idFirmaElectronica = ?;
SELECT * FROM FirmaElectronica;
-- Update
UPDATE FirmaElectronica 
SET nombreCertificado = ?, serialNumber = ?, validoDesde = ?, validoHasta = ?, clavePublica = ?, archivoCertificado = ?, Usuario_idUsuario = ?
WHERE idFirmaElectronica = ?;
-- Delete
DELETE FROM FirmaElectronica WHERE idFirmaElectronica = ?;


-- Tabla Usuario_has_HistoriaClinica
-- Create
INSERT INTO Usuario_has_HistoriaClinica (Usuario_idUsuario, HistoriaClinica_idHistoriaClinica) 
VALUES (?, ?);
-- Read
SELECT * FROM Usuario_has_HistoriaClinica WHERE Usuario_idUsuario = ? AND HistoriaClinica_idHistoriaClinica = ?;
SELECT * FROM Usuario_has_HistoriaClinica;
-- Update
-- No aplica, generalmente es una tabla de relaciones.
-- Delete
DELETE FROM Usuario_has_HistoriaClinica WHERE Usuario_idUsuario = ? AND HistoriaClinica_idHistoriaClinica = ?;
