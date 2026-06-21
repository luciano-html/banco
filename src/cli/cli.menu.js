import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { mainUI, limpiarUI, consultarSaldoUI } from "./cli.ui.js";
import { getSaldo, retirarDinero, ingresarDinero } from "./cli.api.js";

const rl = readline.createInterface({ input, output });
function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}



export async function menu() {
    let finalizar = false;
    let inputUsuario = 0;


    limpiarUI()

    do {// repetir
        
        mainUI()


        inputUsuario = parseInt(await rl.question(""));

        switch (inputUsuario) {
            case 1:
                limpiarUI()
                console.log("---------------------");
                let montoExtraer = parseInt(await rl.question("¿Cuanto dinero desea retirar? "))
                console.log("---------------------");
                try {
                    const resultado = await retirarDinero(montoExtraer)
                    console.log('Nuevo saldo: $', resultado.saldo);
                } catch (error) {
                    console.log('Error:', error.message);
                }
                break;
            case 2:
                limpiarUI()
                console.log("---------------------");
                let montoIngresar = parseInt(await rl.question("¿Cuanto dinero desea ingresar?"));
                console.log("---------------------");
                try {
                    const resultado = await ingresarDinero(montoIngresar)
                    console.log('Nuevo saldo: $', resultado.saldo);
                } catch (error) {
                    console.log('Error:', error.message);
                }

                break;

            case 3:
                limpiarUI()
                try {
                    const data = await getSaldo()
                    consultarSaldoUI(data.saldo)
                } catch (error) {
                    console.log('Error:', error.message);
                }
                break;

            case 4:
                finalizar = true
                break;

            default:
                limpiarUI()
                console.log("Ingrese una opcion correcta");

        }


    } while (!finalizar);

    process.exit()
}
