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