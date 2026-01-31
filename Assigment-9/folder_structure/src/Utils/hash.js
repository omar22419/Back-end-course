import crypto from 'crypto';
export const hashingPassword = (password)=>{
    return crypto.createHash("sha256").update(password).digest("hex");
}