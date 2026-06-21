import mongoose from 'mongoose'

export async function connectDB() {
  try {
    await mongoose.connect(process.env.URI_LOCAL)

    console.log('Conectado a la DataBase')

  } catch (error) {

    console.error('Error conectando a MongoDB:', error.message)

    process.exit(1)

  }
}
