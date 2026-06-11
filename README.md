# 🕹️ Mi Proyecto de Práctica: Jugando con la API de RAWG en JS

¡Buenas! Este es un proyecto que armé en JavaScript para aprender a conectar una API real (la de RAWG, que tiene una base de datos gigante de videojuegos) y hacer que las cosas se muestren en la página web de forma dinámica sin que se rompa todo. El objetivo era meterle mano al código asíncrono y ver cómo filtrar datos de verdad.

## 🚀 Lo que hace la página (Mis módulos)

Metí tres formas diferentes de buscar juegos usando los parámetros de la API:

1. **Buscar por ID o Nombre (`consultarId`)**
   - Le metes el número de ID del juego o su nombre de URL (slug) y te trae todo el detalle.
   - Te muestra el título, cuándo salió y la descripción completa que tiene guardada.

2. **Buscar por Rango de Fechas (`consultarFechaReleased`)**
   - Usé el filtro `dates` de la API. Le pasas una fecha de inicio y una de fin, y te saca la lista de todos los juegos que se estrenaron en ese tiempo.

3. **Filtrar por Rating exacto (`consultarRating`)**
   - Averigue un truco raro pasando el mismo puntaje dos veces (`metacritic=85,85`) para obligar a la API a darme solo los juegos que tengan exactamente esa nota en Metacritic. ¡Y funcionó!

---

## 🛠️ Lo que aprendí picando código (La parte técnica)

Acá están los trucos y buenas prácticas que fui descubriendo mientras armaba el script:

### 1. Manejar el tiempo con `Async / Await`
En vez de liarme con mil promesas metiendo `.then()` por todos lados que se vuelve un laberinto, usé funciones `async` con `await`. El código se lee mucho más limpio, de arriba a abajo, como si fuera síncrono pero esperando las respuestas del servidor.

### 2. Atajar errores antes de que explote la pantalla
Para que la página no se cayera o se quedara congelada si ponía algo mal, metí todo adentro de bloques `try / catch`. También puse mis propias alertas:
- **Que no falte la API Key:** Si intentas buscar sin tu clave, te frena para que no te tire el típico error `401`.
- **Inputs vacíos:** Si le das al botón y no escribiste nada, te salta un aviso.
- **Validar si `respuesta.ok`:** Si pones un ID que no existe (un error 404), el código se da cuenta y te avisa que ese juego no tiene contenido.

### 3. Pintar el HTML desde JS con `.map()`
Para mostrar los juegos en el navegador sin llenar el código de renglones pesados, usé Template Literals (las comillas invertidas ` `` `) junto con `.map()` y `.join("")`. Convierte el JSON que me da la API en cajas de HTML al toque y las mete en el contenedor `#JuegoMostrado`.

### 4. Salvar los datos que vienen vacíos (El truco del `||`)
Me di cuenta de que la API de RAWG es medio mañosa: si buscas por ID te da la descripción del juego, pero si buscas por lista de fechas esa descripción no viene. Para que la página no muestre un `undefined` horrible que arruine el diseño, usé el operador OR (`||`) para meter un texto de auxilio o un mensaje personalizado con carita triste `:(`.

---

## 💻 Las funciones que armé

El script me quedó dividido en estas funciones:

* `consultarId()`: Se encarga de buscar un solo juego a fondo.
* `consultarFechaReleased()`: Controla las búsquedas por años o meses.
* `consultarRating()`: Filtra los juegos por su puntaje en Metacritic.
* `MostrarError(mensaje)`: Borra lo que haya en pantalla y te tira el error en color rojo para que sepas qué pasó.
* `MostrarResultados(datos)`: Una función que estoy armando para limpiar el código, así no repito tres veces la forma de dibujar el HTML y me queda mucho más profesional.
