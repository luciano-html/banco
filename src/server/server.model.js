import mongoose from "mongoose";

const SaldoSchema = new mongoose.Schema(
    {
        saldo:{type: Number, required: true}, 
    }
)

export default mongoose.model('Saldo', SaldoSchema)