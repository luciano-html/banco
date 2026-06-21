import {Router} from "express";
import {getSaldos,getId, retirarDinero,ingresarDinero} from "./server.controller.js"

const router = Router()

router.get('/saldo', getSaldos)
router.put('/retirarSaldo', retirarDinero)
router.put('/ingresarSaldo', ingresarDinero)
router.get('/id', getId)
export default router