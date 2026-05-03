
export function mainDisplay() {

    console.log("---------------------");
    console.log("1. Retirar dinero");
    console.log("2. Ingresar dinero");
    console.log("3. Consultar saldo");
    console.log("4. Salir");
    console.log("---------------------");


}

export function extraccionDisplay(monto, saldo) {
    console.clear()
    console.log("---------------------");
    console.log("Usted extrajo: $", monto);
    console.log("Su nuevo saldo es de: $", saldo);
}


export function sinSaldoDisplay(saldo) {
    console.clear()
    console.log("---------------------");
    console.log("Saldo insuficiente, no puede extraer mas de: $", saldo);
    console.log("¿Desea salir? 1.Si 2.No");
}

export function ingresarDisplay(ingresar,saldo){
    console.clear()
    console.log("---------------------");
    console.log("Usted ingreso: $", ingresar);
    console.log("Su nuevo saldo es de: $", saldo);
}

export function consultarSaldoDisplay(saldo){
    console.clear()
    console.log("---------------------");
    console.log("Su saldo actual es de: $", saldo);
}


export function programaTerminadoMensaje(){
    console.clear()
    console.log("---------------------");
    console.log("Programa terminado");
    console.log("---------------------");
}

export function limpiarDisplay(){
    console.clear()
}