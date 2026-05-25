
export function mainUI() {
    console.log("---------------------");
    console.log("1. Retirar dinero");
    console.log("2. Ingresar dinero");
    console.log("3. Consultar saldo");
    console.log("4. Borrar Saldo");
    console.log("5. Salir");
    console.log("---------------------");
}

export function retirarDineroUI(montoExtraer, saldo) {
    
    console.log("---------------------");
    console.log("Usted extrajo: $", montoExtraer);
    console.log("Su nuevo saldo es de: $", saldo);
}

export function ingresarDineroUI(montoIngresar, saldo) {
    
    console.log("---------------------");
    console.log("Usted ingreso: $", montoIngresar);
    console.log("Su nuevo saldo es de: $", saldo);
}

export function consultarSaldoUI(saldo) {
    
    console.log("---------------------");
    console.log("Su saldo actual es de: $", saldo);
}

export function sinSaldoUI(saldo) {
    
    console.log("---------------------");
    console.log("Saldo insuficiente, no puede extraer mas de: $", saldo);

}

export function programaTerminadoMensajeUI() {
    
    console.log("---------------------");
    console.log("Programa terminado");
    console.log("---------------------");
}


export function limpiarUI() {
    console.clear()
}