let userData = {};

guardarUserData = () => {
    userData.nombre = document.getElementById("nombreUsuario").value;
    userData.apellido = document.getElementById("apellidoUsuario").value;
    userData.edad = document.getElementById("edad").value;
    userData.email = document.getElementById("eMail").value;
    userData.tel = document.getElementById("tel").value;
    userData.imgSrc = document.getElementById("profile-picture").src;

    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.reload();
}

recuperarUserData = () => {
    let userDataParsed = JSON.parse(localStorage.getItem("userData"));

    document.getElementById("nombreUsuario").value = userDataParsed.nombre
    document.getElementById("apellidoUsuario").value = userDataParsed.apellido;
    document.getElementById("edad").value = userDataParsed.edad;
    document.getElementById("eMail").value = userDataParsed.email;
    document.getElementById("tel").value = userDataParsed.tel;
    document.getElementById("profile-picture").src = userDataParsed.imgSrc;
}

mostrarImagen = () => {
    let profileImg = document.getElementById('profile-picture');
    let file = document.getElementById('subir-imagen').files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
        profileImg.src = reader.result;
    }
    
    if (file) {
        reader.readAsDataURL(file);
    } else {
        profileImg.src = "";
    }
}

$(document).ready(function (e) {
    if (userData != undefined) {
        recuperarUserData();
    };
});

//Función para activar el botón de login con la tecla "Enter"
$(window).keydown(function (e) {
    if (e.code === "Enter") {
        e.preventDefault();
        $("#guardar-cambios").click();
    }
})