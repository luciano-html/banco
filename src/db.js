import { readFileSync } from 'fs';


export let bancoDB = JSON.parse(readFileSync('./src/bancoDb.json', 'utf-8'));








