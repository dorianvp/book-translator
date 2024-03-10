import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';
export const encrypt = (str: string) => {
	const ciphertext = AES.encrypt(str, 'example');
	return encodeURIComponent(ciphertext.toString());
}

export const decrypt = (str: string) => {
	const decodedStr = decodeURIComponent(str);
	return AES.decrypt(decodedStr, 'example').toString(enc.Utf8);
}