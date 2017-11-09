import { NodeRSA } from 'node-rsa';


function sign(data, privateKey) {
    let key = new NodeRSA(privateKey);

    return key.encryptPrivate(data);
}

function verify(data, code, publicKey) {
    let key = new NodeRSA(publicKey);

    return key.decryptPublic(data);
}

export { sign, verify };
