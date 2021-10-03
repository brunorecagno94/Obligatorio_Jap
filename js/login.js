//Función para hacer login y guardar datos en sessionStorage
login = () => {
    let nombreUsuario = document.getElementById('nombreUsuario').value;
    let passUsuario = document.getElementById('passUsuario').value;

    if (nombreUsuario != "" && passUsuario != "") {
        window.location.href = 'home.html';
    } else {
        alert('Debes rellenar ambos campos para continuar.');
    }
    sessionStorage.setItem('nombre', nombreUsuario);
    sessionStorage.setItem('pass', passUsuario);
}

//Función para activar el botón de login con la tecla "Enter"
$(window).keydown(function(e) {
    if(e.code === "Enter") {
        e.preventDefault();
        document.getElementById("botonEntrar").click();
    }
})