import { bancoDB } from "./model.js";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFileSync, writeFileSync } from 'fs';
import { mainUI, extraccionUI, sinSaldoUI, ingresarUI, consultarSaldoUI, programaTerminadoMensajeUI, limpiarUI } from "./ui.js";
import { controlador } from "./controlador.js";


const rl = readline.createInterface({ input, output });
function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

export default async function main() {

    controlador()
    

    
}