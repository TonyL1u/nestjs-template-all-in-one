import fs from 'fs';
import NodeRsa from 'node-rsa';

export function decryptPassword(encryptPassword: string) {
  const privateKey = fs.readFileSync('private_key.pem', 'utf8');
  const nodeRsa = new NodeRsa(privateKey);
  nodeRsa.setOptions({ encryptionScheme: 'pkcs1' });

  return nodeRsa.decrypt(encryptPassword, 'utf8');
}
