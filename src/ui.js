
export function mainUI() {

    console.log("---------------------");
    console.log("1. Retirar dinero");
    console.log("2. Ingresar dinero");
    console.log("3. Consultar saldo");
    console.log("4. Salir");
    console.log("---------------------");


}

export function extraccionUI(monto, saldo) {
    console.clear()
    console.log("---------------------");
    console.log("Usted extrajo: $", monto);
    console.log("Su nuevo saldo es de: $", saldo);
}


export function sinSaldoUI(saldo) {
    console.clear()
    console.log("---------------------");
    console.log("Saldo insuficiente, no puede extraer mas de: $", saldo);
    
}

export function ingresarUI(ingresar,saldo){
    console.clear()
    console.log("---------------------");
    console.log("Usted ingreso: $", ingresar);
    console.log("Su nuevo saldo es de: $", saldo);
}

export function consultarSaldoUI(saldo){
    console.clear()
    console.log("---------------------");
    console.log("Su saldo actual es de: $", saldo);
}


export function programaTerminadoMensajeUI(){
    console.clear()
    console.log("---------------------");
    console.log("Programa terminado");
    console.log("---------------------");
}

export function limpiarUI(){
    console.clear()
}