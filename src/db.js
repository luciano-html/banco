import { readFileSync } from 'fs';


async function leerSaldo() {
    let bancoDB = await JSON.parse(readFileSync('./bancoDb.json', 'utf-8'));
    export let saldoLeer = bancoDB.saldoDb
}








