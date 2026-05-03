var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/db.js
var import_fs = require("fs");
var bancoDB = JSON.parse((0, import_fs.readFileSync)("./src/bancoDb.json", "utf-8"));

// src/main.js
var import_promises = __toESM(require("node:readline/promises"), 1);
var import_node_process = require("node:process");
var import_fs2 = require("fs");

// src/ui.js
function mainDisplay() {
  console.log("---------------------");
  console.log("1. Retirar dinero");
  console.log("2. Ingresar dinero");
  console.log("3. Consultar saldo");
  console.log("4. Salir");
  console.log("---------------------");
}
function extraccionDisplay(monto, saldo) {
  console.clear();
  console.log("---------------------");
  console.log("Usted extrajo: $", monto);
  console.log("Su nuevo saldo es de: $", saldo);
}
function sinSaldoDisplay(saldo) {
  console.clear();
  console.log("---------------------");
  console.log("Saldo insuficiente, no puede extraer mas de: $", saldo);
  console.log("\xBFDesea salir? 1.Si 2.No");
}
function ingresarDisplay(ingresar, saldo) {
  console.clear();
  console.log("---------------------");
  console.log("Usted ingreso: $", ingresar);
  console.log("Su nuevo saldo es de: $", saldo);
}
function consultarSaldoDisplay(saldo) {
  console.clear();
  console.log("---------------------");
  console.log("Su saldo actual es de: $", saldo);
}
function programaTerminadoMensaje() {
  console.clear();
  console.log("---------------------");
  console.log("Programa terminado");
  console.log("---------------------");
}
function limpiarDisplay() {
  console.clear();
}

// src/main.js
var rl = import_promises.default.createInterface({ input: import_node_process.stdin, output: import_node_process.stdout });
async function main() {
  let saldo = bancoDB.saldoDb;
  let finalizar = false;
  let montoExtraer = 0;
  let inputUsuario = 0;
  limpiarDisplay();
  do {
    mainDisplay();
    let inputUsuario2 = parseInt(await rl.question(""));
    switch (inputUsuario2) {
      case 1:
        limpiarDisplay();
        console.log("---------------------");
        let monto = parseInt(await rl.question(`\xBFCuanto dinero desea retirar?, Su saldo actual es de: $${saldo} `));
        console.log("---------------------");
        if (monto <= saldo) {
          saldo = saldo - monto;
          bancoDB.saldoDb = saldo;
          extraccionDisplay(monto, saldo);
          (0, import_fs2.writeFileSync)("./src/bancoDb.json", JSON.stringify(bancoDB, null, 2));
        } else {
          sinSaldoDisplay(saldo);
          let salir = parseInt(await rl.question(""));
          if (salir == 1) {
            finalizar = true;
          }
        }
        break;
      case 2:
        limpiarDisplay();
        console.log("---------------------");
        let ingresar = parseInt(await rl.question("\xBFCuanto dinero desea ingresar?"));
        console.log("---------------------");
        if (ingresar > 0) {
          saldo = saldo + ingresar;
          bancoDB.saldoDb = saldo;
          (0, import_fs2.writeFileSync)("./src/bancoDb.json", JSON.stringify(bancoDB, null, 2));
          ingresarDisplay(ingresar, saldo);
        }
        break;
      case 3:
        consultarSaldoDisplay(saldo);
        break;
      case 4:
        finalizar = true;
        break;
      default:
        limpiarDisplay();
        console.log("Ingrese una opcion correcta");
    }
  } while (inputUsuario == 4 || saldo < 0 || finalizar == false);
  programaTerminadoMensaje();
  process.exit();
}

// app.js
main();
