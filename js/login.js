//Función para hacer login y guardar datos en localStorage
login = () => {
    let nombreUsuario = $('#nombreUsuario').val();
    let passUsuario = $('#passUsuario').val();

    if (nombreUsuario != "" && passUsuario != "") {
        window.location.href = 'home.html';
    } else {
        alert('Debes rellenar ambos campos para continuar.');
    }
    localStorage.setItem('nombre', nombreUsuario);
    localStorage.setItem('pass', passUsuario);
}


//Función para activar el botón de login con la tecla "Enter"
$(window).keydown(function(e) {
    if(e.code === "Enter") {
        e.preventDefault();
        $("#botonEntrar").click();
    }
})