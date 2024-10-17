import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

// import { JWT_SECRET } from './config'
import { PRIVATE_KEY_SECRET } from './config'

const PRIVATE_KEY = fs.readFileSync('./utils/jwt/private.pem', 'utf8');
const PUBLIC_KEY = fs.readFileSync('./utils/jwt/public.pem', 'utf8');


export const tokenSign = async (user: any) => {
    const sign = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        //JWT_SECRET,
        { key: PRIVATE_KEY, passphrase: PRIVATE_KEY_SECRET },
        {
            algorithm: "RS256",  // Para clave privada y pública
            expiresIn: "2h",
        }
    )
    return sign
}

export const verifyToken = async (tokenJwt: any) => {
    try {
        return jwt.verify(tokenJwt, PUBLIC_KEY, { algorithms: ["RS256"] });  // Usamos la clave pública para verificar
        // return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null
    }

}
