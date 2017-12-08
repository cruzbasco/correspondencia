

obtenerInformacion (id) {
    usuario = obtenerUsuarioPorID(id)
    si (usuario != null) {
        devolver obtenerInformacionPorRol(usuario.rol)
    }
    devolver [] <-- arreglo vacio 
}

obtenerInformacionPorRol(rol) {
    respuesta = []
    switch (rol) {
        'secretaria': 
            respuesta = obtenerInformacionParaSecretarias()
        'administrativo':
            respuesta = obtenerInformacionParaAdministrativos()
    }
    devolver <- respuesta
}















import { NodeRSA } from 'node-rsa';


function sign(data, privateKey) {
    let key = new NodeRSA(privateKey);

    return key.encryptPrivate(data);
}

function verify(data, code, publicKey) {
    let key = new NodeRSA(publicKey);

    return key.decryptPublic(data, code);
}

export { sign, verify };



