import readline from 'readline/promises';
import { stdin as input, stdout as output } from "node:process";
import { writeFileSync, readFileSync } from 'fs';
import { extraccionUI, sinSaldoUI, consultarSaldoUI } from './ui.js';

export let bancoDB = JSON.parse(readFileSync('./src/bancoDb.json', 'utf-8'));



export let saldo = bancoDB.saldoDb
export async function retirarDinero(montoExtraer) {

    if (montoExtraer <= saldo) {
        saldo = saldo - montoExtraer;
        bancoDB.saldoDb = saldo
        extraccionUI(montoExtraer)

        writeFileSync('./src/bancoDb.json', JSON.stringify(bancoDB, null, 2));

    } else {
        sinSaldoUI(saldo)
        let salir = parseInt(await rl.question(""));

        if (salir == 1) {
            return true
        }
    }

    return false

}

export async function ingresarDinero(montoIngresar) {
    if (montoIngresar > 0) {
        saldo = saldo + montoIngresar;
        bancoDB.saldoDb = saldo

        writeFileSync('./src/bancoDb.json', JSON.stringify(bancoDB, null, 2));

        ingresarUI(montoIngresar, saldo)
    }
}

export async function consultarSaldo() {

    consultarSaldoUI(saldo)
    
}






