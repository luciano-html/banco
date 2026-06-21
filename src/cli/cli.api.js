export async function getSaldo() {
    const res = await fetch('http://localhost:3000/saldo')
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message)
    }
    return res.json()
}

export async function retirarDinero(monto) {
    const res = await fetch('http://localhost:3000/id')
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message)
    }
    const { id } = await res.json()

    const req = await fetch('http://localhost:3000/retirarSaldo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, monto })
    })
    if (!req.ok) {
        const err = await req.json()
        throw new Error(err.message)
    }
    return req.json()
}

export async function ingresarDinero(monto) {
    const res = await fetch('http://localhost:3000/id')
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message)
    }
    const { id } = await res.json()

    const req = await fetch('http://localhost:3000/ingresarSaldo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, monto })
    })
    if (!req.ok) {
        const err = await req.json()
        throw new Error(err.message)
    }
    return req.json()
}


