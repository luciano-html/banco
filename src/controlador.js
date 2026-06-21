import { retirarDinero, ingresarDinero, consultarSaldo,saldo } from "./model.js";

import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFileSync } from 'fs';

import { mainUI, limpiarUI } from "./ui.js";
import main from "./main.js";
import { log } from "node:console";


const rl = readline.createInterface({ input, output });
function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

export async function controlador() {

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
                let montoExtraer = parseInt(await rl.question(`¿Cuanto dinero desea retirar?, Su saldo actual es de: $${saldo} `));
                console.log("---------------------");

                if (await retirarDinero(montoExtraer)) finalizar = true
                break;
            case 2:
                limpiarUI() 
                console.log("---------------------");
                let montoIngresar = parseInt(await rl.question("¿Cuanto dinero desea ingresar?"));
                console.log("---------------------");

                ingresarDinero(montoIngresar)
                break;

            case 3:
                consultarSaldo()
                break;
            case 4:
                finalizar = true
                break;

            default:
                limpiarUI()
                console.log("Ingrese una opcion correcta");

        }


    } while (inputUsuario == 4 || saldo < 0 || finalizar == false); // hasta que

    process.exit()
}


