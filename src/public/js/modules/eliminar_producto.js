import axios from "axios";
import Swal from "sweetalert2";

// Obtener el nombre del botón desde el DOM
const botonesEliminar = document.querySelectorAll(
    "button[name='eliminar_producto']"
);
botonesEliminar.forEach((botonEliminar) => {
    // Agregar un evento al click del botón
    botonEliminar.addEventListener("click", (e) => {
        const idProduct = e.target.dataset.productoId;
        Swal.fire({
            title: 'Estas seguro que deseas eliminar',
            text: "Sí, elimina este producto no sera posible recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007717',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const url = `${location.origin}/links/delete/product/${idProduct}`;
                axios.get(url,{
                    params:{
                        idProduct
                    }
                }).then(function (response) {
                    Swal.fire("¡Eliminado!", response.data, "success");
                    setTimeout(() => {
                        window.location.href = "/links";
                    }, 2000);
                }).catch(() => {
                    Swal.fire("ERROR", "!No se pudo eliminar el producto!", "error");
                })

            }
        })
    });
});

