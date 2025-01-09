-- Ingreso de datos en la tabla InternaClinica

INSERT INTO `clinica_sanjose`.`InternaClinica` (`supervisor`, `fechaContratacion`, `horarios`)
VALUES ('Dr. Admin', '2025-01-01 08:00:00', 'Lunes-Viernes 08:00-16:00');
INSERT INTO `clinica_sanjose`.`InternaClinica` (`supervisor`, `fechaContratacion`, `horarios`)
VALUES ('Dr. Smith', '2025-02-01 08:00:00', 'Lunes-Viernes 08:00-16:00');
INSERT INTO `clinica_sanjose`.`InternaClinica` (`supervisor`, `fechaContratacion`, `horarios`)
VALUES ('Dr. Johnson', '2025-03-01 08:00:00', 'Lunes-Viernes 08:00-16:00');
INSERT INTO `clinica_sanjose`.`InternaClinica` (`supervisor`, `fechaContratacion`, `horarios`)
VALUES ('Nurse Supervisor', '2025-04-01 08:00:00', 'Lunes-Viernes 08:00-16:00');
INSERT INTO `clinica_sanjose`.`InternaClinica` (`supervisor`, `fechaContratacion`, `horarios`)
VALUES ('Nurse Lead', '2025-05-01 08:00:00', 'Lunes-Viernes 08:00-16:00');

-- Ingreso de datos en la tabla FirmaElectronica

INSERT INTO `clinica_sanjose`.`FirmaElectronica` (`firma`, `fechaEmision`, `fechaExpiracion`)
VALUES (NULL, '2025-01-01 00:00:00', '2026-01-01 00:00:00');
INSERT INTO `clinica_sanjose`.`FirmaElectronica` (`firma`, `fechaEmision`, `fechaExpiracion`)
VALUES (NULL, '2025-02-01 00:00:00', '2026-02-01 00:00:00');
INSERT INTO `clinica_sanjose`.`FirmaElectronica` (`firma`, `fechaEmision`, `fechaExpiracion`)
VALUES (NULL, '2025-03-01 00:00:00', '2026-03-01 00:00:00');
INSERT INTO `clinica_sanjose`.`FirmaElectronica` (`firma`, `fechaEmision`, `fechaExpiracion`)
VALUES (NULL, '2025-04-01 00:00:00', '2026-04-01 00:00:00');
INSERT INTO `clinica_sanjose`.`FirmaElectronica` (`firma`, `fechaEmision`, `fechaExpiracion`)
VALUES (NULL, '2025-05-01 00:00:00', '2026-05-01 00:00:00');

-- Ingreso de datos en la tabla Usuario

-- Insertar un usuario Admin
INSERT INTO `clinica_sanjose`.`Usuario` (`identificacion`, `nombres`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `sexo`, `correo`, `estadoCivil`, `usuario`, `contraseña`, `especialidad`, `consultorio`, `estado`, `rol`, `InternaClinica_idInternaClinica`, `FirmaElectronica_idFirmaElec`, `InternaClinica_idInternaClinica1`)
VALUES ('adminID', 'Admin', 'User', '1980-01-01', '123 Admin St', '555-0001', 'M', 'admin@example.com', 'S', 'admin_user', 'passwordAdmin', 'Administración', '101', 'Activo', 'Admin', 1, 1, 1);
-- Insertar dos usuarios Doctores
INSERT INTO `clinica_sanjose`.`Usuario` (`identificacion`, `nombres`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `sexo`, `correo`, `estadoCivil`, `usuario`, `contraseña`, `especialidad`, `consultorio`, `estado`, `rol`, `InternaClinica_idInternaClinica`, `FirmaElectronica_idFirmaElec`, `InternaClinica_idInternaClinica1`)
VALUES ('doctor1ID', 'Doctor', 'One', '1985-01-01', '456 Doctor St', '555-0002', 'M', 'doctor1@example.com', 'C', 'doctor1_user', 'passwordDoctor1', 'Cardiología', '202', 'Activo', 'Doctor', 2, 2, 2);
INSERT INTO `clinica_sanjose`.`Usuario` (`identificacion`, `nombres`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `sexo`, `correo`, `estadoCivil`, `usuario`, `contraseña`, `especialidad`, `consultorio`, `estado`, `rol`, `InternaClinica_idInternaClinica`, `FirmaElectronica_idFirmaElec`, `InternaClinica_idInternaClinica1`)
VALUES ('doctor2ID', 'Doctor', 'Two', '1987-02-02', '789 Doctor St', '555-0003', 'F', 'doctor2@example.com', 'U', 'doctor2_user', 'passwordDoctor2', 'Neurología', '203', 'Activo', 'Doctor', 3, 3, 3);
-- Insertar dos usuarios Enfermeras
INSERT INTO `clinica_sanjose`.`Usuario` (`identificacion`, `nombres`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `sexo`, `correo`, `estadoCivil`, `usuario`, `contraseña`, `especialidad`, `consultorio`, `estado`, `rol`, `InternaClinica_idInternaClinica`, `FirmaElectronica_idFirmaElec`, `InternaClinica_idInternaClinica1`)
VALUES ('nurse1ID', 'Nurse', 'One', '1990-03-03', '101 Nurse St', '555-0004', 'F', 'nurse1@example.com', 'D', 'nurse1_user', 'passwordNurse1', 'Enfermería', '302', 'Activo', 'Enfermera', 4, 4, 4);
INSERT INTO `clinica_sanjose`.`Usuario` (`identificacion`, `nombres`, `apellidos`, `fechaNacimiento`, `direccion`, `telefono`, `sexo`, `correo`, `estadoCivil`, `usuario`, `contraseña`, `especialidad`, `consultorio`, `estado`, `rol`, `InternaClinica_idInternaClinica`, `FirmaElectronica_idFirmaElec`, `InternaClinica_idInternaClinica1`)
VALUES ('nurse2ID', 'Nurse', 'Two', '1992-04-04', '202 Nurse St', '555-0005', 'F', 'nurse2@example.com', 'V', 'nurse2_user', 'passwordNurse2', 'Enfermería', '303', 'Activo', 'Enfermera', 5, 5, 5);

-- Ingreso de datos en la tabla TITULO

-- Títulos para el usuario Admin
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Nacional Admin', 'Universidad Nacional', 'Nacional', 'Ministerio de Educación', 'RN001', '2010-05-01', 'Administración', 'N/A', 1);
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Extranjero Admin', 'Universidad Internacional', 'Extranjero', 'Organización Internacional', 'RE001', '2012-05-01', 'Administración', 'N/A', 1);
-- Títulos para Doctor One
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Nacional Doctor One', 'Universidad Nacional', 'Nacional', 'Ministerio de Salud', 'RN002', '2011-06-01', 'Cardiología', 'N/A', 2);
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Extranjero Doctor One', 'Universidad Internacional', 'Extranjero', 'Organización Internacional', 'RE002', '2013-06-01', 'Cardiología', 'N/A', 2);
-- Títulos para Doctor Two
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Nacional Doctor Two', 'Universidad Nacional', 'Nacional', 'Ministerio de Salud', 'RN003', '2012-07-01', 'Neurología', 'N/A', 3);
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Extranjero Doctor Two', 'Universidad Internacional', 'Extranjero', 'Organización Internacional', 'RE003', '2014-07-01', 'Neurología', 'N/A', 3);
-- Títulos para Nurse One
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Nacional Nurse One', 'Universidad Nacional', 'Nacional', 'Ministerio de Salud', 'RN004', '2013-08-01', 'Enfermería', 'N/A', 4);
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Extranjero Nurse One', 'Universidad Internacional', 'Extranjero', 'Organización Internacional', 'RE004', '2015-08-01', 'Enfermería', 'N/A', 4);
-- Títulos para Nurse Two
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Nacional Nurse Two', 'Universidad Nacional', 'Nacional', 'Ministerio de Salud', 'RN005', '2014-09-01', 'Enfermería', 'N/A', 5);
INSERT INTO `clinica_sanjose`.`Titulo` (`nombreTitulo`, `institucionEducacionSuperior`, `tipoTitulo`, `reconocidoPor`, `numeroRegistro`, `fechaRegistro`, `areaConocimiento`, `observacion`, `Usuario_idUsuario`)
VALUES ('Título Extranjero Nurse Two', 'Universidad Internacional', 'Extranjero', 'Organización Internacional', 'RE005', '2016-09-01', 'Enfermería', 'N/A', 5);


-- Ingreso de datos en la tabla certificaciones

-- Certificaciones para el usuario Admin
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Nacional Admin', '2025-01-01 00:00:00', '2026-01-01 00:00:00', 'admin_user', 1);
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Internacional Admin', '2025-01-15 00:00:00', '2026-01-15 00:00:00', 'admin_user', 1);
-- Certificaciones para Doctor One
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Nacional Doctor One', '2025-02-01 00:00:00', '2026-02-01 00:00:00', 'doctor1_user', 2);
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Internacional Doctor One', '2025-02-15 00:00:00', '2026-02-15 00:00:00', 'doctor1_user', 2);
-- Certificaciones para Doctor Two
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Nacional Doctor Two', '2025-03-01 00:00:00', '2026-03-01 00:00:00', 'doctor2_user', 3);
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Internacional Doctor Two', '2025-03-15 00:00:00', '2026-03-15 00:00:00', 'doctor2_user', 3);
-- Certificaciones para Nurse One
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Nacional Nurse One', '2025-04-01 00:00:00', '2026-04-01 00:00:00', 'nurse1_user', 4);
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Internacional Nurse One', '2025-04-15 00:00:00', '2026-04-15 00:00:00', 'nurse1_user', 4);
-- Certificaciones para Nurse Two
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Nacional Nurse Two', '2025-05-01 00:00:00', '2026-05-01 00:00:00', 'nurse2_user', 5);
INSERT INTO `clinica_sanjose`.`Certificaciones` (`nombreCertificacion`, `fechaEmisionC`, `fechaExpiracionC`, `idUsuario`, `Usuario_idUsuario`)
VALUES ('Certificación Internacional Nurse Two', '2025-05-15 00:00:00', '2026-05-15 00:00:00', 'nurse2_user', 5);

-- Ingreso de datos en la tabla Paciente

INSERT INTO `clinica_sanjose`.`Paciente` (`identificacion`, `apellidoParteno`, `apellidoMaterno`, `primerNombre`, `segundoNombre`, `direccionResidenciaHab`, `barrio`, `parroquia`, `canton`, `provincia`, `zona`, `telefonoPaciente`, `fechaNacimiento`, `lugarNacimiento`, `nacionalidad`, `grupoCultural`, `sexo`, `estadoCivil`, `instruccionUltimoAnioAprov`, `direccionPaciente`, `correo`, `ocupacion`, `empresaTrabajo`, `tipoSeguroSalud`, `alergias`, `grupoSanguineo`, `observaciones`)
VALUES 
('0000000001', 'Perez', 'Gomez', 'Juan', 'Carlos', 101, 'Centro', 'San Jose', 'Loja', 'Loja', 'U', '555-1001', '2000-01-01', 'Loja', 'Ecuatoriana', 'Mestizo', 'M', 'Sol', 'Secundaria', 'Calle Falsa 123', 'juan.perez@example.com', 'Estudiante', 'N/A', 'IESS', 'Polen', 'O+', 'Ninguna'),
('0000000002', 'Garcia', 'Lopez', 'Maria', 'Isabel', 102, 'Sur', 'San Pedro', 'Loja', 'Loja', 'U', '555-1002', '1990-02-01', 'Quito', 'Ecuatoriana', 'Mestizo', 'F', 'Cas', 'Universitaria', 'Av. Siempre Viva 456', 'maria.garcia@example.com', 'Ingeniera', 'Empresa X', 'Privado', 'Lactosa', 'A+', 'Ninguna'),
('0000000003', 'Ramos', 'Torres', 'Pedro', 'Luis', 103, 'Este', 'San Pablo', 'Loja', 'Loja', 'R', '555-1003', '1985-03-01', 'Cuenca', 'Ecuatoriana', 'Indigena', 'M', 'U-L', 'Primaria', 'Calle Real 789', 'pedro.ramos@example.com', 'Agricultor', 'N/A', 'IESS', 'Ninguna', 'B−', 'Ninguna');
INSERT INTO `clinica_sanjose`.`Paciente` (`identificacion`, `apellidoParteno`, `apellidoMaterno`, `primerNombre`, `segundoNombre`, `direccionResidenciaHab`, `barrio`, `parroquia`, `canton`, `provincia`, `zona`, `telefonoPaciente`, `fechaNacimiento`, `lugarNacimiento`, `nacionalidad`, `grupoCultural`, `sexo`, `estadoCivil`, `instruccionUltimoAnioAprov`, `direccionPaciente`, `correo`, `ocupacion`, `empresaTrabajo`, `tipoSeguroSalud`, `alergias`, `grupoSanguineo`, `observaciones`)
VALUES 
('0000000004', 'Morales', 'Diaz', 'Ana', 'Lucia', 104, 'Norte', 'San Marcos', 'Loja', 'Loja', 'U', '555-1004', '1995-04-01', 'Guayaquil', 'Ecuatoriana', 'Afro', 'F', 'Div', 'Bachillerato', 'Av. de la Paz 111', 'ana.morales@example.com', 'Docente', 'Colegio Z', 'Privado', 'Penicilina', 'AB+', 'Ninguna'),
('0000000005', 'Jimenez', 'Castro', 'Luis', 'Miguel', 105, 'Centro', 'San Juan', 'Loja', 'Loja', 'U', '555-1005', '1980-05-01', 'Loja', 'Ecuatoriana', 'Mestizo', 'M', 'Viu', 'Secundaria', 'Calle de la Vida 222', 'luis.jimenez@example.com', 'Comerciante', 'N/A', 'IESS', 'Nueces', 'B+', 'Ninguna');

-- Ingreso de datos en la tabla Referido

INSERT INTO `clinica_sanjose`.`Referido` (`nombreReferido`, `parentescoReferido`, `direccionReferido`, `telefonoReferido`, `Paciente_idPaciente`)
VALUES 
('Referido Juan Perez', 'Padre', 'Calle Falsa 123', '555-1101', 1),
('Referido Maria Garcia', 'Madre', 'Av. Siempre Viva 456', '555-1102', 2),
('Referido Pedro Ramos', 'Hermano', 'Calle Real 789', '555-1103', 3),
('Referido Ana Morales', 'Tía', 'Av. de la Paz 111', '555-1104', 4),
('Referido Luis Jimenez', 'Hermano', 'Calle de la Vida 222', '555-1105', 5);

-- Ingreso de datos en la tabla Formulario Tipo

-- Insertar tipos de formularios
INSERT INTO `clinica_sanjose`.`Formulario_Tipo` (`nroTipoFormulario`, `nombreTipoFormulario`, `Estructura`)
VALUES 
(1, 'ADMISIÓN ALTA - EGRESO', JSON_OBJECT('seccion1', 'Contenido1')),
(2, 'ANAMNESIS Y EXAMEN FÍSICO', JSON_OBJECT('seccion1', 'Contenido2')),
(3, 'EVOLUCIÓN Y PRESCRIPCIONES', JSON_OBJECT('seccion1', 'Contenido3')),
(4, 'EPICRISIS', JSON_OBJECT('seccion1', 'Contenido4')),
(5, 'INTERCONSULTA – SOLICITUD', JSON_OBJECT('seccion1', 'Contenido5'));

-- Ingreso de datos en la tabla Historia Clinica

-- Historia Clinica para cada paciente
INSERT INTO `clinica_sanjose`.`HistoriaClinica` (`fechaCreacionHC`, `Paciente_idPaciente`)
VALUES 
('2025-01-08 19:00:00', 1),
('2025-01-08 19:05:00', 2),
('2025-01-08 19:10:00', 3),
('2025-01-08 19:15:00', 4),
('2025-01-08 19:20:00', 5);

-- Ingreso de datos en la tabla Formulario

-- Formularios para Historia Clinica del paciente 1
INSERT INTO `clinica_sanjose`.`Formulario` (`institucionSistema`, `unicodigo`, `establecimeintoSalud`, `nroHistoriaClinica`, `tipoFormulario`, `fechaCreacionF`, `contenido`, `estadoFormulario`, `notas`, `observaciones`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`, `Formulario_Tipo_idFormulario_Tipo`)
VALUES 
('Clinica San Jose', 'U001', 'Clinica Central', 'HC001', 'ADMISIÓN ALTA - EGRESO', '2025-01-08 19:30:00', JSON_OBJECT('campo1', 'valor1'), 'Abierto', 'Nota1', 'Obs1', 1, 1, 1),
('Clinica San Jose', 'U001', 'Clinica Central', 'HC001', 'ANAMNESIS Y EXAMEN FÍSICO', '2025-01-08 19:35:00', JSON_OBJECT('campo2', 'valor2'), 'Cerrado', 'Nota2', 'Obs2', 1, 1, 2);
-- Formularios para Historia Clinica del paciente 2
INSERT INTO `clinica_sanjose`.`Formulario` (`institucionSistema`, `unicodigo`, `establecimeintoSalud`, `nroHistoriaClinica`, `tipoFormulario`, `fechaCreacionF`, `contenido`, `estadoFormulario`, `notas`, `observaciones`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`, `Formulario_Tipo_idFormulario_Tipo`)
VALUES 
('Clinica San Jose', 'U002', 'Clinica Central', 'HC002', 'EVOLUCIÓN Y PRESCRIPCIONES', '2025-01-08 19:40:00', JSON_OBJECT('campo3', 'valor3'), 'Abierto', 'Nota3', 'Obs3', 2, 2, 3),
('Clinica San Jose', 'U002', 'Clinica Central', 'HC002', 'EPICRISIS', '2025-01-08 19:45:00', JSON_OBJECT('campo4', 'valor4'), 'Cerrado', 'Nota4', 'Obs4', 2, 2, 4);
-- Formularios para Historia Clinica del paciente 3
INSERT INTO `clinica_sanjose`.`Formulario` (`institucionSistema`, `unicodigo`, `establecimeintoSalud`, `nroHistoriaClinica`, `tipoFormulario`, `fechaCreacionF`, `contenido`, `estadoFormulario`, `notas`, `observaciones`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`, `Formulario_Tipo_idFormulario_Tipo`)
VALUES 
('Clinica San Jose', 'U003', 'Clinica Central', 'HC003', 'INTERCONSULTA – SOLICITUD', '2025-01-08 19:50:00', JSON_OBJECT('campo5', 'valor5'), 'Abierto', 'Nota5', 'Obs5', 3, 3, 5),
('Clinica San Jose', 'U003', 'Clinica Central', 'HC003', 'ADMISIÓN ALTA - EGRESO', '2025-01-08 19:55:00', JSON_OBJECT('campo1', 'valor6'), 'Cerrado', 'Nota6', 'Obs6', 3, 3, 1);
-- Formularios para Historia Clinica del paciente 4
INSERT INTO `clinica_sanjose`.`Formulario` (`institucionSistema`, `unicodigo`, `establecimeintoSalud`, `nroHistoriaClinica`, `tipoFormulario`, `fechaCreacionF`, `contenido`, `estadoFormulario`, `notas`, `observaciones`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`, `Formulario_Tipo_idFormulario_Tipo`)
VALUES 
('Clinica San Jose', 'U004', 'Clinica Central', 'HC004', 'ANAMNESIS Y EXAMEN FÍSICO', '2025-01-08 20:00:00', JSON_OBJECT('campo2', 'valor7'), 'Abierto', 'Nota7', 'Obs7', 4, 4, 2),
('Clinica San Jose', 'U004', 'Clinica Central', 'HC004', 'EVOLUCIÓN Y PRESCRIPCIONES', '2025-01-08 20:05:00', JSON_OBJECT('campo3', 'valor8'), 'Cerrado', 'Nota8', 'Obs8', 4, 4, 3);
-- Formularios para Historia Clinica del paciente 5
INSERT INTO `clinica_sanjose`.`Formulario` (`institucionSistema`, `unicodigo`, `establecimeintoSalud`, `nroHistoriaClinica`, `tipoFormulario`, `fechaCreacionF`, `contenido`, `estadoFormulario`, `notas`, `observaciones`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`, `Formulario_Tipo_idFormulario_Tipo`)
VALUES 
('Clinica San Jose', 'U005', 'Clinica Central', 'HC005', 'EPICRISIS', '2025-01-08 20:10:00', JSON_OBJECT('campo4', 'valor9'), 'Abierto', 'Nota9', 'Obs9', 5, 5, 4),
('Clinica San Jose', 'U005', 'Clinica Central', 'HC005', 'INTERCONSULTA – SOLICITUD', '2025-01-08 20:15:00', JSON_OBJECT('campo5', 'valor10'), 'Cerrado', 'Nota10', 'Obs10', 5, 5, 5);

-- Ingreso de datos en la tabla Formulario Log

-- Insertar logs para Formularios del usuario Doctor One
INSERT INTO `clinica_sanjose`.`Formulario_Log` (`fecha_Hora`, `accion`, `camposModificados`, `notas`, `Usuario_idUsuario`, `Formulario_idFormulario`)
VALUES 
('2025-01-08 20:30:00', 'Creacion', JSON_OBJECT('campo', 'valor inicial'), 'Creación del formulario', 2, 1),
('2025-01-08 20:35:00', 'Modificacion', JSON_OBJECT('campo', 'valor modificado'), 'Modificación del formulario', 2, 2);
-- Insertar logs para Formularios del usuario Doctor Two
INSERT INTO `clinica_sanjose`.`Formulario_Log` (`fecha_Hora`, `accion`, `camposModificados`, `notas`, `Usuario_idUsuario`, `Formulario_idFormulario`)
VALUES 
('2025-01-08 20:40:00', 'Creacion', JSON_OBJECT('campo', 'valor inicial'), 'Creación del formulario', 3, 3),
('2025-01-08 20:45:00', 'Modificacion', JSON_OBJECT('campo', 'valor modificado'), 'Modificación del formulario', 3, 4);
-- Insertar logs para Formularios del usuario Nurse One
INSERT INTO `clinica_sanjose`.`Formulario_Log` (`fecha_Hora`, `accion`, `camposModificados`, `notas`, `Usuario_idUsuario`, `Formulario_idFormulario`)
VALUES 
('2025-01-08 20:50:00', 'Creacion', JSON_OBJECT('campo', 'valor inicial'), 'Creación del formulario', 4, 5),
('2025-01-08 20:55:00', 'Modificacion', JSON_OBJECT('campo', 'valor modificado'), 'Modificación del formulario', 4, 6);
-- Insertar logs para Formularios del usuario Nurse Two
INSERT INTO `clinica_sanjose`.`Formulario_Log` (`fecha_Hora`, `accion`, `camposModificados`, `notas`, `Usuario_idUsuario`, `Formulario_idFormulario`)
VALUES 
('2025-01-08 21:00:00', 'Creacion', JSON_OBJECT('campo', 'valor inicial'), 'Creación del formulario', 5, 7),
('2025-01-08 21:05:00', 'Modificacion', JSON_OBJECT('campo', 'valor modificado'), 'Modificación del formulario', 5, 8);

-- Ingreso de datos en la tabla Usuario_has_HistoriaClinica

-- Relacionar Doctor One con historias clínicas
INSERT INTO `clinica_sanjose`.`Usuario_has_HistoriaClinica` (`Usuario_idUsuario`, `Usuario_InternaClinica_idInternaClinica`, `Usuario_FirmaElectronica_idFirmaElec`, `Usuario_InternaClinica_idInternaClinica1`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`)
VALUES 
(2, 2, 2, 2, 1, 1),  -- Relacionar Doctor One con la historia clínica del paciente 1
(2, 2, 2, 2, 2, 2);  -- Relacionar Doctor One con la historia clínica del paciente 2
-- Relacionar Doctor Two con historias clínicas
INSERT INTO `clinica_sanjose`.`Usuario_has_HistoriaClinica` (`Usuario_idUsuario`, `Usuario_InternaClinica_idInternaClinica`, `Usuario_FirmaElectronica_idFirmaElec`, `Usuario_InternaClinica_idInternaClinica1`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`)
VALUES 
(3, 3, 3, 3, 3, 3),  -- Relacionar Doctor Two con la historia clínica del paciente 3
(3, 3, 3, 3, 4, 4);  -- Relacionar Doctor Two con la historia clínica del paciente 4
-- Relacionar Nurse One con historias clínicas
INSERT INTO `clinica_sanjose`.`Usuario_has_HistoriaClinica` (`Usuario_idUsuario`, `Usuario_InternaClinica_idInternaClinica`, `Usuario_FirmaElectronica_idFirmaElec`, `Usuario_InternaClinica_idInternaClinica1`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`)
VALUES 
(4, 4, 4, 4, 5, 5);  -- Relacionar Nurse One con la historia clínica del paciente 5
-- Relacionar Nurse Two con historias clínicas (usando las historias clínicas de pacientes previamente relacionados con Nurse One)
INSERT INTO `clinica_sanjose`.`Usuario_has_HistoriaClinica` (`Usuario_idUsuario`, `Usuario_InternaClinica_idInternaClinica`, `Usuario_FirmaElectronica_idFirmaElec`, `Usuario_InternaClinica_idInternaClinica1`, `HistoriaClinica_idHistoriaClinica`, `HistoriaClinica_Paciente_idPaciente`)
VALUES 
(5, 5, 5, 5, 1, 1),  -- Relacionar Nurse Two con la historia clínica del paciente 1
(5, 5, 5, 5, 2, 2);  -- Relacionar Nurse Two con la historia clínica del paciente 2
