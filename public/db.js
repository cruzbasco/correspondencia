Paperworks.insert(

{
    _id, // id asignado por mongo por defecto
    origin, // origen de la correspondencia, remitente
    destinatary : {department, person}, // destinatario con formato (departamento, persona)
    subject, // titulo del asunto a tratar
    bookmark: {type,code}, // tipo de correspondecia (tipo, codigo)
    state, // estado de la correspondencia
    encrypted_data, // mensaje encriptados 
    createdAt, // fecha de creacion
    routes: [ // lista de rutas por donde la correspondencia recorrera
        {department, person, createdAt} // departamento, persona, fecha de creacion
        ],
}

);


PaperworkTypes.insert(
{
    _id, // id asignado por mongo por defecto
    type, // tipo de correspondencia
    code, // autoincrementable para mantener registro de los tipos de correspondencia
}
); 

Departments.insert(
{
    _id, // id asignado por mongo por defecto
    name, // nombre del departamento
    people: {userId,}, // personas que conforman ese departamento
}
);

Users.insert(
{
    _id, // id asignado por mongo por defecto
    createdAt, // fecha de creacion
    username, // nombre de usuario
    personalInfo: {name,}, // informacion personal del usuario 
    roles: [{role}] , // roles dentro del sistema
    keys: {public, private} // llaves para firma digital
    // ... otros campos creados por meteor
}
);

{"guía telefónica":
[{nombre: "Carlos Velarde", dirección: "Av. América #03", teléfono: 40323423},
{nombre: "Martin Ayala", dirección: "c/ Laureano #A-2", teléfono: 41255653},
{nombre: "Raúl Fuentes", dirección: "Av. Florida #64", teléfono: 48765535}]}
