import { dirname } from 'path';
import { fileURLToPath } from 'url'

export const configDir = () => dirname(fileURLToPath(import.meta.url));
