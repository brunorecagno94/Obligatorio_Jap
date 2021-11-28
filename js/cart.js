let arrayProductos = [];
let arrayInputCantidades = [];
let porcentajeEnvio = 0;
const fieldRetiro = document.getElementById("retiroLocal");
const fieldTarjeta = document.getElementById("pagoTarjeta");
const fieldTrans = document.getElementById("pagoTrans");
const radioTarjeta = document.getElementById("tarjeta");
const radioTrans = document.getElementById("trans");
const numeroTarjeta = document.getElementById("numeroTarjeta");
const codigoSeguridad = document.getElementById("codigoSeguridad");
const vencimiento = document.getElementById("vencimientoTarj");
const numeroCuenta = document.getElementById("numeroCuenta");


mostrarProductos = arrayProductos => {
    let estructuraProducto = "";

    for (let i = 0; i < arrayProductos.length; i++) {
        const producto = arrayProductos[i];

        estructuraProducto += `
        <div id="producto${i}" class="list-group-item">
            <div class="row">
                <div class="col-3 py-2">
                    <img src="${producto.src} " alt="${producto.name} " class="img-thumbnail col-lg-8 col-md-8 col-sm-8 ">
                </div>
                <div class="mt-4">
                    <div class="col py-2 d-flex w-100ol">
                        <h5 class="mb-1">${producto.name}</h5>
                    </div>
                    <div class="col py-2 d-flex w-100">
                        <p class="mb-1">${producto.currency} ${producto.unitCost}</p>
                    </div>
                </div>
                <div class="col d-flex justify-content-end mt-3 mr-3">
                    <div class="col-sm-2 col-md-2 col-lg-3">
                        <input type="number" data-unit-cost="${producto.unitCost}" oninput="calcularTotal()" class="form-control cantidad-articulos" 
                        placeholder="" required="" value="${producto.count}"
                        min="1">
                    </div>
                    <div class="col-sm-2 col-md-2 col-lg-3">
                        <h6><strong>Subtotal</strong></h6>
                        <p>${producto.currency} <span class="subtotal-producto">${producto.count * producto.unitCost}</span></p>
                    </div>
                    <div class="col-sm-2 col-md-2 col-lg-3"> 
                    <input type="button" class="text-right" onclick="borrarArticulo('producto${i}')"></input>   
                    </div>
                </div>
            </div>            
        </div>`
    }
    document.getElementById("interfaz-producto").innerHTML = estructuraProducto;
}

borrarArticulo = idProducto => {
    const producto = document.getElementById(idProducto);
    producto.remove();

    calcularTotal();
}

convertirMoneda = (moneda) => {
    let costoEnvioHTML = Number(document.getElementById("costo-envio").innerHTML);

    for (let producto of arrayProductos) {
        if (producto.currency != moneda) {
            if (producto.currency == "USD") {
                producto.currency = "UYU";
                producto.unitCost *= 40;
                costoEnvioHTML *= 40;
            } else if (producto.currency == "UYU") {
                producto.currency = "USD";
                producto.unitCost /= 40;
                costoEnvioHTML /= 40;
            }
        }
        document.getElementById("subtotal-compra-moneda").innerHTML = moneda;
        document.getElementById("envio-moneda").innerHTML = moneda;
        document.getElementById("total-compra-moneda").innerHTML = moneda;
        mostrarProductos(arrayProductos)
        calcularTotal();
    }
}

calcularSubtotal = () => {
    arrayInputCantidades = document.getElementsByClassName("cantidad-articulos");

    for (let i = 0; i < arrayInputCantidades.length; i++) {
        const input = arrayInputCantidades[i];
        const unitCost = arrayInputCantidades[i].dataset.unitCost;


        actualizarSubtotal = () => {

            if (input.value === null || input.value === "" || input.value == 0) {
                input.value = 1;
            }
            arrayProductos[i].count = input.value;

            let subtotalProducto = `
            ${input.value * unitCost}`

            document.getElementsByClassName("subtotal-producto")[i].innerHTML = Number(subtotalProducto);

            calcularSubtotalCompra();
        };
        actualizarSubtotal();

    }

}

calcularSubtotalCompra = () => {
    const subtotalArticulos = document.getElementsByClassName("subtotal-producto");
    let subtotalCompra = 0;

    for (let subtotal of subtotalArticulos) {
        subtotalCompra += Number(subtotal.innerHTML);
    }

    document.getElementById("subtotal-compra-precio").innerHTML = subtotalCompra.toFixed(2);
}

calcularTotal = () => {
    const subtotal = Number(document.getElementById("subtotal-compra-precio").innerHTML);
    let costoEnvio = subtotal * porcentajeEnvio;
    let total = costoEnvio + subtotal;

    calcularSubtotal();
    document.getElementById("costo-envio").innerHTML = costoEnvio.toFixed(2);
    document.getElementById("total-compra").innerHTML = total.toFixed(2);
}

//Funciones para el modal de forma de pago:
//Deshabilitan y habilitan las distintas opciones
pagoEfectivo = () => {
    fieldRetiro.removeAttribute("disabled");
    fieldTarjeta.setAttribute("disabled", "");
    fieldTrans.setAttribute("disabled", "");
}

pagoTarj = () => {
    fieldTarjeta.removeAttribute("disabled");
    fieldTrans.setAttribute("disabled", "");
}

pagoTransfer = () => {
    fieldTrans.removeAttribute("disabled");
    fieldTarjeta.setAttribute("disabled", "");
}



validacionModal = () => {
    if (radioTarjeta.checked) {
        if (numeroTarjeta.value == "" || codigoSeguridad.value == "" ||
            vencimiento.value == "") {
            alert("Debes completar todos los campos");
        } else {
            alert("Datos guardados!");
        }
    }
    if (radioTrans.checked) {
        if (numeroCuenta.value == "") {
            alert("Debes completar todos los campos");
        } else {
            alert("Datos guardados!");
        }
    }
}

validacionCompra = () => {
    if (document.getElementById("nombreCompleto").value == "" || document.getElementById("direccionEnvio") == "") {
        alert("Debes completar todos los campos");
    } else {
        alert("Has completado tu compra con éxito!");
    }
}

//Funciones para calcular los costos de envío
calcularRetiro = () => {
    porcentajeEnvio = 0;
    calcularTotal();
};

calcularPremium = () => {
    porcentajeEnvio = 0.15;
    calcularTotal();
};

calcularExpress = () => {
    porcentajeEnvio = 0.07;
    calcularTotal();
};

calcularEstandar = () => {
    porcentajeEnvio = 0.05;
    calcularTotal();
};


document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("localradio").checked = true;
    document.getElementById("optionUSD").selected = true;

    getJSONData(CART_INFO2_URL).then(result => {
        if (result.status === "ok") {
            arrayProductos = result.data.articles;

            mostrarProductos(arrayProductos);
            convertirMoneda("USD");
        }
    })


});
