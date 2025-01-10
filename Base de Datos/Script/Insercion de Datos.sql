-- Inserción de datos en todas las tablas

-- Tabla Usuario
INSERT INTO Usuario (identificacion, nombres, apellidos, fechaNacimiento, direccionDomicilio, telefono, sexo, correo, estadoCivil, especialidad, fotografia, consultorio, estado, rol, usuario, contraseña) 
VALUES 
('0101010101', 'Juan', 'Pérez', '1980-01-01', 'Av. Siempre Viva 123', '0987654321', 'M', 'juan.perez@clinica.com', 'Cas', 'Cardiología', NULL, 'A101', 'Act', 'Doctor', 'juanp', 'password123'),
('0202020202', 'Ana', 'García', '1985-02-02', 'Calle Luna 456', '0987654322', 'F', 'ana.garcia@clinica.com', 'Cas', 'Pediatría', NULL, 'A102', 'Act', 'Doctor', 'anag', 'password123'),
('0303030303', 'Luis', 'Martínez', '1990-03-03', 'Av. Sol 789', '0987654323', 'M', 'luis.martinez@clinica.com', 'Sol', 'Neurología', NULL, 'A103', 'Act', 'Doctor', 'luism', 'password123'),
('0404040404', 'María', 'López', '1988-04-04', 'Calle Estrella 101', '0987654324', 'F', 'maria.lopez@clinica.com', 'Cas', 'Dermatología', NULL, 'A104', 'Act', 'Doctor', 'marial', 'password123'),
('0505050505', 'Carlos', 'González', '1975-05-05', 'Av. Libertad 202', '0987654325', 'M', 'carlos.gonzalez@clinica.com', 'Cas', 'Traumatología', NULL, 'A105', 'Act', 'Doctor', 'carlosg', 'password123'),
('0606060606', 'Admin', 'Admin', '1970-06-06', 'Oficina Central', '0987654326', 'M', 'admin@clinica.com', 'Cas', '', NULL, 'Oficina', 'Act', 'Admin', 'admin', 'admin123'),
('0707070707', 'Laura', 'Torres', '1992-07-07', 'Calle Salud 303', '0987654327', 'F', 'laura.torres@clinica.com', 'Sol', '', NULL, 'B201', 'Act', 'Enfermera', 'laurat', 'password123'),
('0808080808', 'Elena', 'Ramírez', '1995-08-08', 'Av. Vida 404', '0987654328', 'F', 'elena.ramirez@clinica.com', 'Cas', '', NULL, 'B202', 'Act', 'Enfermera', 'elenar', 'password123');

-- Tabla Titulo
INSERT INTO Titulo (nombreTitulo, institucionEducacionSuperior, tipoTitulo, reconocidoPor, numeroRegistro, fechaRegistro, areaConocimiento, Usuario_idUsuario) 
VALUES 
('Médico General', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT123', '2005-01-01', 'Medicina General', 1),
('Especialista en Cardiología', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT124', '2008-01-01', 'Cardiología', 1),
('Médico General', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT125', '2005-01-01', 'Medicina General', 2),
('Especialista en Pediatría', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT126', '2008-01-01', 'Pediatría', 2),
('Médico General', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT127', '2005-01-01', 'Medicina General', 3),
('Especialista en Neurología', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT128', '2008-01-01', 'Neurología', 3),
('Médico General', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT129', '2005-01-01', 'Medicina General', 4),
('Especialista en Dermatología', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT130', '2008-01-01', 'Dermatología', 4),
('Médico General', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT131', '2005-01-01', 'Medicina General', 5),
('Especialista en Traumatología', 'Universidad Nacional', 'Nacional', 'Senescyt', 'TIT132', '2008-01-01', 'Traumatología', 5);

-- Tabla FirmaElectronica
INSERT INTO FirmaElectronica (nombreCertificado, serialNumber, validoDesde, validoHasta, clavePublica, archivoCertificado, Usuario_idUsuario) 
VALUES 
('Certificado Dr. Juan Pérez', 'SN12345', '2024-01-01', '2026-01-01', 'ClavePública1', NULL, 1),
('Certificado Dra. Ana García', 'SN12346', '2024-01-01', '2026-01-01', 'ClavePública2', NULL, 2),
('Certificado Dr. Luis Martínez', 'SN12347', '2024-01-01', '2026-01-01', 'ClavePública3', NULL, 3),
('Certificado Dra. María López', 'SN12348', '2024-01-01', '2026-01-01', 'ClavePública4', NULL, 4),
('Certificado Dr. Carlos González', 'SN12349', '2024-01-01', '2026-01-01', 'ClavePública5', NULL, 5);

-- Tabla Jornada
INSERT INTO Jornada (supervisor, fechaContratacion, fechaFinContratacion, inicioJornada, finJornada, Usuario_idUsuario) 
VALUES 
('Supervisor A', '2023-01-01', '2025-01-01', '08:00:00', '16:00:00', 1),
('Supervisor B', '2023-01-01', '2025-01-01', '08:00:00', '16:00:00', 2),
('Supervisor C', '2023-01-01', '2025-01-01', '08:00:00', '16:00:00', 3),
('Supervisor D', '2023-01-01', '2025-01-01', '08:00:00', '16:00:00', 4),
('Supervisor E', '2023-01-01', '2025-01-01', '08:00:00', '16:00:00', 5);

-- Tabla Paciente
INSERT INTO Paciente (identificacion, apellidoParteno, apellidoMaterno, primerNombre, segundoNombre, direccionResidenciaHab, barrio, parroquia, canton, provincia, zona, telefonoPaciente, fechaNacimiento, lugarNacimiento, nacionalidad, grupoCultural, sexo, estadoCivil, instruccionUltimoAnioAprov, direccionPaciente, correo, ocupacion, empresaTrabajo, tipoSeguroSalud, alergias, grupoSanguineo, observaciones) 
VALUES 
('1101010101', 'Vásquez', 'Pérez', 'Carlos', 'Andrés', 101, 'San Juan', 'Centro', 'Quito', 'Pichincha', 'U', '0999999991', '1990-01-01', 'Quito', 'Ecuatoriana', 'Ninguno', 'M', 'Sol', 'Secundaria', 'Av. Amazonas 123', 'carlos@dominio.com', 'Ingeniero', 'Empresa 1', 'IESS', 'Ninguna', 'O+', 'Ninguna'),
('1102020202', 'López', 'González', 'María', 'José', 102, 'San Pedro', 'Sur', 'Quito', 'Pichincha', 'U', '0999999992', '1992-02-02', 'Quito', 'Ecuatoriana', 'Montubio', 'F', 'Cas', 'Superior', 'Calle 10 de Agosto', 'maria@dominio.com', 'Doctora', 'Empresa 2', 'Privado', 'Penicilina', 'A+', 'Ninguna'),
('1103030303', 'Martínez', 'Paredes', 'Luis', 'Fernando', 103, 'San José', 'Norte', 'Quito', 'Pichincha', 'U', '0999999993', '1993-03-03', 'Quito', 'Ecuatoriana', 'Afroecuatoriano', 'M', 'Sol', 'Superior', 'Av. Naciones Unidas', 'luis@dominio.com', 'Ingeniero', 'Empresa 3', 'Privado', 'Polvo', 'B+', 'Ninguna'),
('1104040404', 'Salazar', 'Quispe', 'Andrea', 'Gabriela', 104, 'San Blas', 'Este', 'Quito', 'Pichincha', 'U', '0999999994', '1994-04-04', 'Quito', 'Ecuatoriana', 'Indígena', 'F', 'Uni', 'Secundaria', 'Calle Versalles', 'andrea@dominio.com', 'Arquitecta', 'Empresa 4', 'IESS', 'Polen', 'AB+', 'Ninguna'),
('1105050505', 'Hidalgo', 'Torres', 'Santiago', 'Ramiro', 105, 'San Francisco', 'Oeste', 'Quito', 'Pichincha', 'U', '0999999995', '1995-05-05', 'Quito', 'Ecuatoriana', 'Montubio', 'M', 'Cas', 'Primaria', 'Av. 6 de Diciembre', 'santiago@dominio.com', 'Técnico', 'Empresa 5', 'IESS', 'Látex', 'O-', 'Ninguna');


-- Tabla HistoriaClinica
INSERT INTO HistoriaClinica (Paciente_idPaciente) 
VALUES 
(1),
(1),
(2),
(2),
(3),
(3),
(4),
(4),
(5),
(5);

-- Tabla Referido
INSERT INTO Referido (nombreReferido, parentescoReferido, direccionReferido, telefonoReferido, Paciente_idPaciente) 
VALUES 
('Luis Pérez', 'Hermano', 'Av. Siempre Viva 456', '0998888881', 1),
('Ana López', 'Madre', 'Calle Luna 789', '0998888882', 2),
('Carlos Ramírez', 'Padre', 'Av. Sol 101', '0998888883', 3),
('María González', 'Hermana', 'Calle Estrella 202', '0998888884', 4),
('Sofía Torres', 'Esposa', 'Av. Libertad 303', '0998888885', 5);

-- Tabla Plantilla_Formulario
INSERT INTO Plantilla_Formulario (nroTipoFormulario, nombreTipoFormulario, Estructura) 
VALUES 
(1, 'Formulario General', '{"seccion1": "campo1", "seccion2": "campo2"}'),
(2, 'Formulario Diagnóstico', '{"diagnostico": "campo3", "tratamiento": "campo4"}'),
(3, 'Formulario Procedimientos', '{"procedimiento": "campo5", "resultado": "campo6"}');

-- Tabla Establecimiento
INSERT INTO Establecimiento (idEstablecimiento, nombreEstablecimiento, codigoEstablecimiento, institucionSistema, codigoParroquiaUO, codigoCantonUO, codigoProvinciaUO) 
VALUES 
(1, 'Clínica San José', '0001', 'Ministerio de Salud', 101, 1, 11),
(2, 'Hospital Central', '0002', 'Ministerio de Salud', 102, 2, 22),
(3, 'Centro de Salud Norte', '0003', 'IESS', 103, 3, 33);

-- Tabla Formulario
INSERT INTO Formulario (nroHistoriaClinica, fechaCreacionF, contenido, estadoFormulario, notas, observaciones, HistoriaClinica_idHistoriaClinica, Plantilla_Formulario_idPlantilla_Formulario, Establecimiento_idEstablecimiento) 
VALUES 
(101, '2025-01-01', '{"campo1": "valor1"}', 'Abierto', 'Nota 1', 'Observación 1', 1, 1, 1),
(102, '2025-01-02', '{"campo2": "valor2"}', 'Cerrado', 'Nota 2', 'Observación 2', 1, 2, 2),
(103, '2025-01-03', '{"campo3": "valor3"}', 'Cancelado', 'Nota 3', 'Observación 3', 1, 3, 3),
(104, '2025-01-01', '{"campo1": "valor1"}', 'Abierto', 'Nota 4', 'Observación 4', 2, 1, 1),
(105, '2025-01-02', '{"campo2": "valor2"}', 'Cerrado', 'Nota 5', 'Observación 5', 2, 2, 2),
(106, '2025-01-03', '{"campo3": "valor3"}', 'Cancelado', 'Nota 6', 'Observación 6', 2, 3, 3),
(107, '2025-01-01', '{"campo1": "valor1"}', 'Abierto', 'Nota 7', 'Observación 7', 3, 1, 1),
(108, '2025-01-02', '{"campo2": "valor2"}', 'Cerrado', 'Nota 8', 'Observación 8', 3, 2, 2),
(109, '2025-01-03', '{"campo3": "valor3"}', 'Cancelado', 'Nota 9', 'Observación 9', 3, 3, 3),
(110, '2025-01-01', '{"campo1": "valor1"}', 'Abierto', 'Nota 10', 'Observación 10', 4, 1, 1),
(111, '2025-01-02', '{"campo2": "valor2"}', 'Cerrado', 'Nota 11', 'Observación 11', 4, 2, 2),
(112, '2025-01-03', '{"campo3": "valor3"}', 'Cancelado', 'Nota 12', 'Observación 12', 4, 3, 3),
(113, '2025-01-01', '{"campo1": "valor1"}', 'Abierto', 'Nota 13', 'Observación 13', 5, 1, 1),
(114, '2025-01-02', '{"campo2": "valor2"}', 'Cerrado', 'Nota 14', 'Observación 14', 5, 2, 2),
(115, '2025-01-03', '{"campo3": "valor3"}', 'Cancelado', 'Nota 15', 'Observación 15', 5, 3, 3);

-- Tabla Usuario_has_HistoriaClinica
INSERT INTO Usuario_has_HistoriaClinica (Usuario_idUsuario, HistoriaClinica_idHistoriaClinica) 
VALUES 
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10);

-- Tabla RegistroModificaciones
INSERT INTO RegistroModificaciones (fechaCambio, accion, camposModificados, notas, Usuario_idUsuario, Formulario_idFormulario) 
VALUES 
('2025-01-01', 'Creacion', '{"campo1": "valor1"}', 'Primera modificación', 1, 1),
('2025-01-02', 'Modificacion', '{"campo2": "valor2"}', 'Segunda modificación', 1, 2),
('2025-01-03', 'Modificacion', '{"campo3": "valor3"}', 'Tercera modificación', 1, 3),
('2025-01-01', 'Creacion', '{"campo1": "valor1"}', 'Cuarta modificación', 2, 4),
('2025-01-02', 'Modificacion', '{"campo2": "valor2"}', 'Quinta modificación', 2, 5),
('2025-01-03', 'Modificacion', '{"campo3": "valor3"}', 'Sexta modificación', 2, 6),
('2025-01-01', 'Creacion', '{"campo1": "valor1"}', 'Séptima modificación', 3, 7),
('2025-01-02', 'Modificacion', '{"campo2": "valor2"}', 'Octava modificación', 3, 8),
('2025-01-03', 'Modificacion', '{"campo3": "valor3"}', 'Novena modificación', 3, 9),
('2025-01-01', 'Creacion', '{"campo1": "valor1"}', 'Décima modificación', 4, 10),
('2025-01-02', 'Modificacion', '{"campo2": "valor2"}', 'Undécima modificación', 4, 11),
('2025-01-03', 'Modificacion', '{"campo3": "valor3"}', 'Duodécima modificación', 4, 12),
('2025-01-01', 'Creacion', '{"campo1": "valor1"}', 'Decimotercera modificación', 5, 13),
('2025-01-02', 'Modificacion', '{"campo2": "valor2"}', 'Decimocuarta modificación', 5, 14),
('2025-01-03', 'Modificacion', '{"campo3": "valor3"}', 'Decimoquinta modificación', 5, 15);
