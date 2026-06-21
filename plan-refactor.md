# Plan de refactorización: Banco CLI → Cliente-Servidor HTTP con Mongoose

## Visión general

Vamos a transformar la app de un **monolito CLI** a una **arquitectura cliente-servidor**:

```
┌──────────────────────────────────────────────────┐
│                Cliente CLI                        │
│  (controlador.js + ui.js + readline)              │
│  └─ hace fetch() a → http://localhost:3000        │
└──────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│              Servidor HTTP (Express)              │
│  (server.js + routes.js + model.js)               │
│  └─ usa Mongoose → MongoDB                        │
└──────────────────────────────────────────────────┘
```

### ¿Por qué separar?

- **`model.js`** se convierte en una capa de datos pura: solo recibe parámetros, hace operaciones, retorna valores. Sin `console.log`, sin `readline`, sin imports de `ui.js`.
- **`controlador.js`** (o `client.js`) sigue siendo la interfaz CLI: usa `readline` para el menú y `ui.js` para mostrar resultados. La diferencia es que ya no importa `model.js` directamente, sino que hace peticiones HTTP al servidor.
- **`ui.js`** se queda igual: solo funciones que reciben datos y los muestran con `console.log`. No toca lógica de negocio ni HTTP.

---

## Fase 1: Backend (API REST con Mongoose)

### Paso 1 — Instalar dependencias
```bash
npm install express mongoose
```

### Paso 2 — Conexión a MongoDB (`src/db.js`)
Crear un archivo que se conecte a MongoDB usando Mongoose.

- Usar `mongodb://localhost:27017/banco`
- Exportar la función de conexión para usarla desde `server.js`

### Paso 3 — Modelo de datos (`src/models/User.js`)
Crear un schema de Mongoose para los usuarios:

```js
const userSchema = new mongoose.Schema({
  nombre:  { type: String, required: true },
  saldo:   { type: Number, default: 0 }
})
```

Por ahora un solo usuario (seed inicial con el saldo actual). Después agregamos más.

Esto **reemplaza a `bancoDb.json`** y a la lógica de `readFileSync`/`writeFileSync` de `model.js`.

### Paso 4 — Refactorizar `model.js`
Limpiar `model.js`:
- **Sacar**: `readline`, `rl`, `question()`, `writeFileSync`, `readFileSync`, import de `ui.js`
- **Dejar**: funciones puras que reciben datos, operan con Mongoose y retornan valores

La nueva `model.js` se vuelve un servicio que usa el modelo `User` de Mongoose.

### Paso 5 — Crear `server.js`
Punto de entrada del servidor Express:
1. Conectar a MongoDB
2. Crear instancia de Express
3. Middleware `express.json()` para parsear el body
4. Registrar rutas
5. Escuchar en puerto 3000

### Paso 6 — Crear rutas (`src/routes.js`)
Endpoints REST que exponen las operaciones del banco. Reciben peticiones, llaman al modelo, devuelven JSON.

| Método | Ruta | Body | Respuesta éxito | Respuesta error |
|---|---|---|---|---|
| `GET` | `/saldo/:userId` | — | `{ saldo: number }` | `{ error: string }` |
| `POST` | `/retirar/:userId` | `{ monto: number }` | `{ saldo: number }` | `{ error: string }` |
| `POST` | `/ingresar/:userId` | `{ monto: number }` | `{ saldo: number }` | `{ error: string }` |

El `:userId` es el ID de MongoDB del usuario. Por ahora usamos uno fijo, después permitimos elegir usuario.

### Paso 7 — Probar servidor
```bash
node server.js
```

Probar con `curl`:
```bash
curl http://localhost:3000/saldo/ID_DEL_USUARIO
curl -X POST http://localhost:3000/retirar/ID_DEL_USUARIO -H "Content-Type: application/json" -d '{"monto": 1000}'
```

---

## Fase 2: Cliente CLI (consume la API)

### Paso 8 — Crear `client.js`
Nuevo entry point del cliente. Su única responsabilidad es iniciar el controlador, pero ya no importa `model.js`.

Ventaja: podemos tener un `client.js` (prod) y un `dev.js` (dev con nodemon).

### Paso 9 — Adaptar `controlador.js`
Convertir cada operación del switch para que haga `fetch` en vez de llamar directo a `model.js`:

- Sacar imports de `model.js` (`retirarDinero`, `ingresarDinero`, `consultarSaldo`, `saldo`)
- En cada `case`, hacer un `fetch` al endpoint correspondiente
- Parsear la respuesta y pasarla a `ui.js`

Ejemplo de `case 1` (retirar):
```js
case 1:
  limpiarUI()
  let montoExtraer = parseInt(await rl.question("¿Cuánto desea retirar?"))
  const res = await fetch(`http://localhost:3000/retirar/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ monto: montoExtraer })
  })
  const data = await res.json()
  if (data.error) {
    console.log("Error:", data.error)
  } else {
    extraccionUI(montoExtraer, data.saldo)
  }
  break
```

El saldo ya no se almacena en una variable local, se consulta siempre del servidor.

### Paso 10 — `ui.js`
No se toca. Sigue siendo la capa de presentación, recibe datos y los muestra con `console.log`.

---

## Fase 3: Scripts y puesta en marcha

### Paso 11 — Scripts en `package.json`
```json
"scripts": {
  "server": "node server.js",
  "client": "node client.js",
  "dev:server": "nodemon server.js",
  "dev:client": "nodemon client.js"
}
```

### Paso 12 — Ejecutar
Terminal 1 (servidor):
```bash
npm run server
```

Terminal 2 (cliente):
```bash
npm run client
```

---

## ¿Dónde queda cada cosa al final?

| Archivo | Rol |
|---|---|
| `server.js` | Entry point del servidor Express |
| `src/db.js` | Conexión a MongoDB |
| `src/models/User.js` | Schema de Mongoose |
| `src/routes.js` | Endpoints REST |
| `src/model.js` | Servicio / lógica de negocio pura |
| `client.js` | Entry point del cliente CLI |
| `src/controlador.js` | Menú, readline, fetch al servidor |
| `src/ui.js` | Funciones de presentación (console.log) |

---

## Para más adelante: múltiples usuarios

Una vez que esta base funcione, agregar usuarios es trivial:

- Endpoints como `/usuarios` (GET listar, POST crear)
- El schema de User ya soporta múltiples documentos
- El menú CLI permite elegir usuario al iniciar sesión
- Cada operación usa `userId` para identificar la cuenta
