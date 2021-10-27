let userData = {};

guardarUserData = () => {
    userData.nombre = document.getElementById("nombreUsuario").value;
    userData.apellido = document.getElementById("apellidoUsuario").value;
    userData.edad = document.getElementById("edad").value;
    userData.email = document.getElementById("eMail").value;
    userData.tel = document.getElementById("tel").value;

    localStorage.setItem("userData", JSON.stringify(userData));
}

recuperarUserData = () => {
    let userDataParsed = JSON.parse(localStorage.getItem("userData"));
    
    if (userData != undefined) {    
        document.getElementById("nombreUsuario").value = userDataParsed.nombre
        document.getElementById("apellidoUsuario").value = userDataParsed.apellido;
        document.getElementById("edad").value = userDataParsed.edad;
        document.getElementById("eMail").value = userDataParsed.email;
        document.getElementById("tel").value = userDataParsed.tel;
    }
}


$(document).ready(function (e) {
    recuperarUserData();
});