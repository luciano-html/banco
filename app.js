import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFileSync, writeFileSync } from 'fs';
import { saldoLeer } from "./src/db.js";
const rl = readline.createInterface({ input, output });


function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}




async function main() {
    
    console.clear()
    console.log(leerDb);
    let saldo = saldoLeer;
    let finalizar = false;
    let montoExtraer = 0;
    let inputUsuario = 0;
    

    do {// repetir


        console.log("---------------------");
        console.log("1. Retirar dinero");
        console.log("2. Ingresar dinero");
        console.log("3. Consultar saldo");
        console.log("4. Salir");
        console.log("---------------------");

        let inputUsuario = parseInt(await rl.question(""));

        switch (inputUsuario) {
            case 1:
                console.log("---------------------");
                console.clear()
                let monto = parseInt(await rl.question(`¿Cuanto dinero desea retirar?, Su saldo actual es de: $${saldo} `));

                if (monto <= saldo) {
                    saldo = saldo - monto;
                    bancoDB.saldoDb = saldo


                    writeFileSync('./bancoDb.json', JSON.stringify(bancoDB, null, 2));
                    console.clear()
                    console.log("---------------------");
                    console.log("Usted extrajo: $", monto);
                    console.log("Su nuevo saldo es de: $", saldo);

                } else {
                    console.clear()
                    console.log("---------------------");
                    console.log("Saldo insuficiente, no puede extraer mas de: $", saldo);
                    console.log("¿Desea salir? 1.Si 2.No");

                    let salir = parseInt(await rl.question(""));

                    if (salir == 1) {
                        finalizar = true
                    }

                }

                break;
            case 2:
                console.clear()
                let ingresar = parseInt(await rl.question("¿Cuanto dinero desea ingresar?"));
                if (ingresar > 0) {
                    saldo = saldo + ingresar;
                    bancoDB.saldoDb = saldo
                    writeFileSync('./bancoDb.json', JSON.stringify(bancoDB, null, 2));


                    console.log("Usted ingreso: $", ingresar);
                    console.log("Su nuevo saldo es de: $", saldo);
                };

                break;
            case 3:
                console.clear()
                console.log("Su saldo actual es de: $", saldo);


                break;
            case 4:
                finalizar = true
                break;


        }


    } while (inputUsuario == 4 || saldo < 0 || finalizar == false); // hasta que
    console.log("---------------------");
    console.log("Programa terminado");
    console.log("---------------------");
    
    process.exit()
}

main()


