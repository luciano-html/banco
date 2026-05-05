import { bancoDB } from "./db.js";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFileSync, writeFileSync } from 'fs';
import { mainUI, extraccionUI, sinSaldoUI, ingresarUI, consultarSaldoUI, programaTerminadoMensaje, limpiarUI } from "./ui.js";


const rl = readline.createInterface({ input, output });
function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

export default async function main() {

    let saldo = bancoDB.saldoDb
    let finalizar = false;
    let montoExtraer = 0;
    let inputUsuario = 0;
    limpiarUI()

    do {// repetir
        mainUI()

        let inputUsuario = parseInt(await rl.question(""));

        switch (inputUsuario) {
            case 1:
                limpiarUI()
                console.log("---------------------");
                let monto = parseInt(await rl.question(`¿Cuanto dinero desea retirar?, Su saldo actual es de: $${saldo} `));
                console.log("---------------------");

                if (monto <= saldo) {
                    saldo = saldo - monto;
                    bancoDB.saldoDb = saldo

                    extraccionUI(monto, saldo)

                    writeFileSync('./src/bancoDb.json', JSON.stringify(bancoDB, null, 2));

                } else {
                    sinSaldoUI(saldo)
                    let salir = parseInt(await rl.question(""));

                    if (salir == 1) {
                        finalizar = true
                    }
                }
                break;
            case 2:
                limpiarUI()
                console.log("---------------------");
                let ingresar = parseInt(await rl.question("¿Cuanto dinero desea ingresar?"));
                console.log("---------------------");
                if (ingresar > 0) {
                    saldo = saldo + ingresar;
                    bancoDB.saldoDb = saldo

                    writeFileSync('./src/bancoDb.json', JSON.stringify(bancoDB, null, 2));

                    ingresarUI(ingresar, saldo)
                }
                break;

            case 3:

                consultarSaldoUI(saldo)

                break;
            case 4:
                finalizar = true
                break;

            default:
                limpiarUI()
                console.log("Ingrese una opcion correcta");



        }


    } while (inputUsuario == 4 || saldo < 0 || finalizar == false); // hasta que

    programaTerminadoMensaje()

    process.exit()
}