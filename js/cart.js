let arrayProductos = [];
let arrayInputCantidades = [];

mostrarProductos = arrayProductos => {
    let estructuraProducto = "";

    for (let producto of arrayProductos) {
        estructuraProducto += `
        <div class="list-group-item">
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
                        <input type="number" data-unit-cost="${producto.unitCost}" oninput="calcularSubtotal()" class="form-control cantidad-articulos" 
                        placeholder="" required="" value="${producto.count}"
                        min="1">
                    </div>
                    <div class="col-sm-2 col-md-2 col-lg-3">
                        <h6><strong>Subtotal</strong></h6>
                        <p>${producto.currency} <span class="subtotal-producto">${producto.count * producto.unitCost}</span></p>
                    </div>
                </div>
            </div>            
        </div>`
    }
    document.getElementById("interfaz-producto").innerHTML = estructuraProducto;
}

convertirMoneda = (moneda) => {
    for (let producto of arrayProductos) {
        if (producto.currency != moneda) {
            if (producto.currency == "USD") {
                producto.currency = "UYU";
                producto.unitCost *= 40;
            } else if (producto.currency == "UYU") {
                producto.currency = "USD";
                producto.unitCost /= 40;
            }
        }
    }    
    document.getElementById("subtotal-compra").innerHTML = moneda;
    mostrarProductos(arrayProductos)
    calcularSubtotalCompra();
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
    let subtotalArticulos = document.getElementsByClassName("subtotal-producto");
    let subtotalCompra = 0;

    for (let subtotal of subtotalArticulos) {
        subtotalCompra += Number(subtotal.innerHTML);

        document.getElementById("subtotal-compra-precio").innerHTML = subtotalCompra;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO2_URL).then(result => {
        if (result.status === "ok") {
            arrayProductos = result.data.articles;
            
            mostrarProductos(arrayProductos);
            convertirMoneda("USD");
            calcularSubtotal();
            calcularSubtotalCompra();   
        }
    })
    

});
