const usuarios = {
    "emma": "6666",
    "pablo": "5678",
    "fede": "3652",
    "marian": "1345",
    "pipo": "4444",
    "euge": "6969"
};

let intentos = 0;

document.getElementById("login-btn").addEventListener("click", function() {
    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value;

    if (usuarios[username] === password) {
        alert(`Acceso concedido a la hoja de ${username}.`);
        document.getElementById("auth-container").classList.add("hidden");
        document.getElementById("options-container").classList.remove("hidden");
    } else {
        intentos++;
        document.getElementById("error-msg").classList.remove("hidden");
        document.getElementById("attempts").textContent = 3 - intentos;

        if (intentos >= 3) {
            alert("Has superado el número máximo de intentos.");
            document.getElementById("auth-container").classList.add("hidden");
        }
    }
});

// Cargar archivo Excel
document.getElementById("upload-btn").addEventListener("click", function() {
    document.getElementById("file-input").click();
});

document.getElementById("file-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    // Aquí iría la lógica para cargar el archivo a Google Sheets usando la API de Google
    alert(`Archivo ${file.name} seleccionado para cargar.`);
});

// Descargar archivo por rango de fechas
document.getElementById("download-btn").addEventListener("click", function() {
    document.getElementById("date-range").classList.remove("hidden");
});

document.getElementById("download-range-btn").addEventListener("click", function() {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    // Aquí iría la lógica para descargar datos de Google Sheets usando la API de Google
    alert(`Datos descargados desde ${startDate} hasta ${endDate}.`);
});
