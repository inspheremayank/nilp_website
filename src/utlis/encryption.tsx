import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ENC_KEY = "37ZA3D89B64C115122DF9178C8R99c1x"; // Encryption key
const IV = "213A26DBB4A358C5"; // Initialization vector

//new encryption keys
const algorithm = 'aes-256-gcm';
const ivLength = 12;
const key:any = Buffer.from('e69111bbe4c4ecf85f2db35cb36f6c6beddb34cdf7f141c379ade3e1298e3a51', 'hex');

export const encryptData = (plainText:any) => {
  let encrypted = "";
  if (plainText && plainText !== "") {
    const cipher = createCipheriv("aes-256-cbc", ENC_KEY, IV);
    encrypted = cipher.update(plainText, "utf8", "base64");
    encrypted += cipher.final("base64");
  }
  return encrypted;
};

export const encrypt = (text: string) => {
  const iv:any = randomBytes(ivLength);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  const combinedBuffer = Buffer.concat([iv, authTag, Buffer.from(encrypted, 'hex')]);

  return combinedBuffer.toString('base64');
};

export const decrypt = (base64Data: string): string => {
  const combinedBuffer = Buffer.from(base64Data, 'base64');

  const iv:any = combinedBuffer.subarray(0, ivLength);
  const authTag:any = combinedBuffer.subarray(ivLength, ivLength + 16);
  const encryptedData = combinedBuffer.subarray(ivLength + 16).toString('hex');

  const decipher = createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};