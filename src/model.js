import { writeFileSync, readFileSync } from 'fs';
import { retirarDineroUI, sinSaldoUI, consultarSaldoUI, ingresarDineroUI, limpiarUI } from './ui.js';

export let bancoDB = JSON.parse(readFileSync('./src/bancoDb.json', 'utf-8'));

export let saldo = bancoDB.saldoDb
/**
 * 
 */
export async function retirarDineroModel(montoExtraer, rl) {

    if (montoExtraer <= saldo) {
        saldo = saldo - montoExtraer;
        bancoDB.saldoDb = saldo
        retirarDineroUI(montoExtraer, saldo)

        writeFileSync('./src/bancoDb.json', JSON.stringify(bancoDB, null, 2));

    } else {
        sinSaldoUI(saldo)
    }

}

export async function ingresarDineroModel(montoIngresar) {
    limpiarUI()
    if (montoIngresar > 0) {
        saldo = saldo + montoIngresar;
        bancoDB.saldoDb = saldo

        writeFileSync('./src/bancoDb.json', JSON.stringify(bancoDB, null, 2));

        ingresarDineroUI(montoIngresar, saldo)
    }
}

export function consultarSaldoModel() {
    return saldo

}


export async function borrarSaldoModel(input) {

    if (input == 1) {
        saldo = 0
        bancoDB.saldoDb = 0
        writeFileSync('./src/bancoDb.json', JSON.stringify(bancoDB, null, 2));
    }

    
}






