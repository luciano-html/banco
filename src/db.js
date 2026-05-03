import { readFileSync } from 'fs';


export let bancoDB = await JSON.parse(readFileSync('./src/bancoDb.json', 'utf-8'));








