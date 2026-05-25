import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";


import { retirarDineroModel, ingresarDineroModel, consultarSaldoModel, borrarSaldoModel } from "./model.js";

import { mainUI, limpiarUI, consultarSaldoUI } from "./ui.js";

const rl = readline.createInterface({ input, output });
function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}
/**
 * ESTO ES EL CONTROLADOR
 */


export async function controlador() {

    let finalizar = false;
    let montoExtraer = 0;
    let inputUsuario = 0;

    do {// repetir
        
        mainUI()
        
        
        let inputUsuario = parseInt(await rl.question(""));

        switch (inputUsuario) {
            case 1:
                limpiarUI()
                console.log("---------------------");
                let montoExtraer = parseInt(await rl.question(`¿Cuanto dinero desea retirar?, Su saldo actual es de: $${consultarSaldoModel()} `));
                console.log("---------------------");

                retirarDineroModel(montoExtraer,rl)
                break;
            case 2:
                limpiarUI()
                console.log("---------------------");
                let montoIngresar = parseInt(await rl.question("¿Cuanto dinero desea ingresar?"));
                console.log("---------------------");

                ingresarDineroModel(montoIngresar)
                break;

            case 3:
                limpiarUI()
                consultarSaldoUI(consultarSaldoModel())
                break;
            case 4:
                limpiarUI()
                let input = parseInt(await rl.question(`¿Desea eliminar el saldo?: 1.Si 2.No`));
                borrarSaldoModel(input)
                break;
            case 5:
                limpiarUI()
                finalizar = true
                break;

            default:
                console.log("Ingrese una opcion correcta");

        }


    } while (inputUsuario != 5 && consultarSaldoModel() >= 0 && finalizar == false); // hasta que

    process.exit()
}


