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


onSignIn = googleUser => {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    
    localStorage.setItem('nombre', profile.getName());
    localStorage.setItem('pass', passUsuario);

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    window.location.href = "home.html";
  }

//Función para activar el botón de login con la tecla "Enter"
$(window).keydown(function(e) {
    if(e.code === "Enter") {
        e.preventDefault();
        $("#botonEntrar").click();
    }
})