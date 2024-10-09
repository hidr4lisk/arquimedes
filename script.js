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
        initializeGoogleSheetsAPI();  // Inicializa la API de Google Sheets después de iniciar sesión
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

// Inicializa la API de Google Sheets
function initializeGoogleSheetsAPI() {
    gapi.load("client:auth2", function() {
        gapi.auth2.init({
            client_id: "113241174294985045324.apps.googleusercontent.com", // Reemplaza con tu Client ID
            scope: "https://www.googleapis.com/auth/spreadsheets"
        }).then(function () {
            // Aquí puedes realizar cualquier acción después de la inicialización
        });
    });
}

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

// Función para cargar datos en Google Sheets
function uploadDataToGoogleSheet(data) {
    const spreadsheetId = "1rZQjkpv94q1hmRl0OiGlWpZ325B_newG5H0DmUUv264";  // ID de tu Google Sheet
    const range = "Sheet1!A1";  // Cambia a la hoja y rango donde deseas agregar datos
    const valueInputOption = "RAW";

    const requestBody = {
        values: data
    };

    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: valueInputOption,
        resource: requestBody
    }).then((response) => {
        const result = response.result;
        console.log(`${result.updates.updatedCells} celdas actualizadas.`);
        alert(`Datos subidos correctamente.`);
    }, (error) => {
        console.error(`Error al subir datos: ${error}`);
    });
}

// Para llamar a esta función al cargar el archivo, puedes hacer algo como esto:
// const data = [["Valor1", "Valor2", "Valor3"]];  // Reemplaza con los datos a cargar
// uploadDataToGoogleSheet(data);
// Descargar datos por rango de fechas
document.getElementById("download-range-btn").addEventListener("click", function() {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    downloadDataFromGoogleSheet(startDate, endDate);
});

// Función para descargar datos desde Google Sheets
function downloadDataFromGoogleSheet(startDate, endDate) {
    const spreadsheetId = "1rZQjkpv94q1hmRl0OiGlWpZ325B_newG5H0DmUUv264"; // ID de tu Google Sheet
    const range = "Sheet1!A1:H"; // Cambia a la hoja y rango donde deseas leer datos

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    }).then((response) => {
        const rows = response.result.values;

        if (rows.length) {
            const filteredData = rows.filter(row => {
                const date = new Date(row[4]); // Cambia el índice 4 al que corresponda la fecha en tu hoja
                return date >= new Date(startDate) && date <= new Date(endDate);
            });

            // Aquí puedes procesar los datos filtrados (ejemplo: mostrarlos en consola)
            console.log("Datos filtrados:", filteredData);
            alert(`Se encontraron ${filteredData.length} registros entre ${startDate} y ${endDate}.`);
        } else {
            alert('No se encontraron datos.');
        }
    }, (error) => {
        console.error(`Error al obtener datos: ${error}`);
    });
}
