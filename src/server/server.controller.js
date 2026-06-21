import Saldo from "./server.model.js";

export async function getSaldos(req, res) {
    try {
        const saldo = await Saldo.findOne()
        res.status(200).json({ saldo: saldo.saldo })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener el saldo' })
    }
}

export async function getId(req, res) {
    try {
        const saldo = await Saldo.findOne()
        res.status(200).json({ id: saldo.id })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener el saldo' })
    }
}


export async function retirarDinero(req, res) {
    const { id, monto } = req.body
    try {
        const usuario = await Saldo.findById(id)
        if (!usuario) throw new Error('Usuario no encontrado')
        if (monto > usuario.saldo) throw new Error('Saldo insuficiente')
        const actualizado = await Saldo.findByIdAndUpdate(
            id,
            { $set: { saldo: usuario.saldo - monto } },
            { new: true }
        )
        res.json({ saldo: actualizado.saldo })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}


export async function ingresarDinero(req, res) {
    const { id, monto } = req.body
    try {
        const usuario = await Saldo.findById(id)
        if (!usuario) throw new Error('Usuario no encontrado')
        const actualizado = await Saldo.findByIdAndUpdate(
            id,
            { $set: { saldo: usuario.saldo + monto } },
            { new: true }
        )
        res.json({ saldo: actualizado.saldo })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}