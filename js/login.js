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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
});