import {AES} from 'crypto-js'


export class EncryptionServices {

  static encryptString(stringToEncrypt:string, key='3'){
    return AES.encrypt(stringToEncrypt, key).toString();
  }
  static decryptString(stringToDecrypt:string, key='3'){
    return AES.decrypt(stringToDecrypt, key).toString();
  }
}

export const decrypt = EncryptionServices.decryptString
export const encrypt = EncryptionServices.encryptString