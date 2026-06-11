const API_URL = "https://api.rawg.io/api/games";

function ObtenerApi(){
    const apiKey = document.getElementById("apiKey").value;
    if(!apiKey){
        return MostrarError("Por favor ingresa tu API Key");
    }
}

async function consultarId(){
    const apiKey = document.getElementById("apiKey").value;
    const juegoId = document.getElementById("IdInput").value;
    if(!juegoId){
        return MostrarError("Por favor ingresa el nombre o ID del juego");
    }
    const url = `${API_URL}/${juegoId}?key=${apiKey}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if (!respuesta.ok || !datos.name) {
            return MostrarError("El ID no tiene contenido. Por favor, intenta con uno diferente.");
        }
        const Resultado = document.getElementById("JuegoMostrado");
        if (!datos) {
        Resultado.innerHTML = "<p>No se encontraron juegos</p>";
        return;
        }
        const listaJuegos = [datos];
        
        if(listaJuegos.length === 0){
            Resultado.innerHTML = "<p>No se encontraron juegos</p>";
            return;
        }
        
        Resultado.innerHTML = listaJuegos.map(juego =>`
            <div class="Juego">
                <h2>Nombre: ${juego.name || 'No disponible'}</h2>
                <p><strong>Fecha de lanzamiento:</strong> ${juego.released || 'No disponible'}</p>
                <p><strong>Descripcion:</strong> ${juego.description_raw || juego.description || 'No disponible para la seccion "Buscar Por Rango De Fechas" Lo sentimos :('}</p>
            </div>
        `).join("");
        } catch (error) {
            console.error(error);
        }
}

async function consultarFechaReleased(){
    const apiKey = document.getElementById("apiKey").value;
    const fechaInicio = document.getElementById("fechaInput").value;
    const fechaFin = document.getElementById("fechaFin").value;

    if(!fechaInicio || !fechaFin){
        return MostrarError("Por favor ingresa la fecha del juego");
    }
    if(!apiKey){
        return MostrarError("Por favor ingresa tu API Key");
    }
    const url = `${API_URL}?key=${apiKey}&dates=${fechaInicio},${fechaFin}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if (!respuesta.ok || !datos.results || datos.results.length === 0) {
            return MostrarError("No se encontraron juegos para esta fecha.");
        }
        console.log(datos);
        const Resultado = document.getElementById("JuegoMostrado");
        
        Resultado.innerHTML = datos.results.map(juego =>`
            <div class="Juego">
                <h2>Nombre: ${juego.name || 'No disponible'}</h2>
                <p><strong>Fecha de lanzamiento:</strong> ${juego.released || 'No disponible'}</p>
                <br>
            </div>
        `).join("");
    } catch (error) {
        console.error(error);
    }
}

async function consultarRating(){
    const apiKey = document.getElementById("apiKey").value;
    const rating = document.getElementById("ratingInput").value;
    if(!rating){
        return MostrarError("Por favor ingresa el rating del juego");
    }
    if(!apiKey){
        return MostrarError("Por favor ingresa tu API Key");
    }
    const url = `${API_URL}?key=${apiKey}&metacritic=${rating},${rating}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if (!respuesta.ok || !datos.results || datos.results.length === 0) {
            return MostrarError("No se encontraron juegos para este rating. Usa el formato 0-100 (ej: 85).");
            }
            console.log(datos);
            const Resultado = document.getElementById("JuegoMostrado");
            
            Resultado.innerHTML = datos.results.map(juego =>`
                <div class="Juego">
                    <h2>Nombre: ${juego.name || 'No disponible'}</h2>
                    <p><strong>Fecha de lanzamiento:</strong> ${juego.released || 'No disponible'}</p>
                    <p><strong>Rating:</strong> ${juego.metacritic || 'No disponible'}</p>
                    <br>
                </div>
            `).join("");
        }catch (error) {
            console.error(error);
        }
}


function MostrarResultados(datos){
    const Resultado = document.getElementById("JuegoMostrado");
    
    if (!datos) {
        Resultado.innerHTML = "<p>No se encontraron juegos</p>";
        return;
    }
    const listaJuegos = [datos];
    
    if(listaJuegos.length === 0){
        Resultado.innerHTML = "<p>No se encontraron juegos</p>";
        return;
    }
    
    Resultado.innerHTML = listaJuegos.map(juego =>`
        <div class="Juego">
            <h2>Nombre: ${juego.name || 'No disponible'}</h2>
            <p><strong>Fecha de lanzamiento:</strong> ${juego.released || 'No disponible'}</p>
            <p><strong>Descripcion:</strong> ${juego.description_raw || juego.description || 'No disponible para la seccion "Buscar Por Rango De Fechas" Lo sentimos :('}</p>
        </div>
    `).join("");
}

function MostrarError(mensaje){
    const resultado = document.getElementById("JuegoMostrado");
    resultado.innerHTML = `<p class="error">${mensaje}</p>`
}