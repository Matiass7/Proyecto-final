class items{
    constructor(id,marca,modelo,precio,img,stock){

        this.id=id;
        this.marca=marca;
        this.modelo=modelo;
        this.precio=precio;
        this.img=img;
        this.stock=stock;
    }

}

class Carrito{
    constructor(){

        this.carrito=[];
    }

    // agregar producto
    GetCarrito(){
        return this.carrito;
    }

    AddProducto(items){

        this.carrito.push({...items,cantidad:1});
    }

    RemoveProducto(prenda){

        let index;
        switch (prenda) {
            case 1:
                index=this.carrito.indexOf(pantalon);
                break;
            case 2:
                index=this.carrito.indexOf(remera);
                break;
            case 3:
                index=this.carrito.indexOf(items);
                break;
        }
        
        if (index!=-1 && index!=null) {
            listaCompra.splice(index,1);
        }
    }

    RemoverItem(posicion){
        this.carrito.splice(posicion,1);
    }
    // funcionalidad del boton limpiar carrito
    //  preguntar si las funciones dentro del metodo van adentro de la clase
    LimpiarCarrito(){

        this.carrito.splice(0, this.carrito.length);
        
        limpiarModal();
        localStorage.removeItem("carrito");
    }

    // sumador de subtotales
    Subtotal(){
        let aux=this.carrito.reduce((acumulador, x)=>acumulador+(x.precio*x.cantidad),0);
        return aux;
    }

}
// consulta al json y carga productos dinamicamente 
const cargarProductos= async ()=>{

    const response = await fetch("./productos.json");
    let data= await response.json();
    
    data.forEach((element)=>{
        let allcards=document.getElementById("allcards");
        
        allcards.innerHTML+=    `<div class="card col-lg-4 col-12">
                                <h2>${element.marca} ${element.modelo}</h2>         
                                <img class="card-img" src="img/${element.img}" alt="items">
                                <p class="p-size">$${element.precio}</p>
                                <button id="btn-items${element.id}" class="btn">Agregar</button>
                            </div>`;
    
    })

    data.forEach((element)=>{
        document.getElementById(`btn-items${element.id}`)?.addEventListener("click",()=>{

            if (listaCompra.GetCarrito().find(items=>items.id===element.id)) {
        
                let index=listaCompra.GetCarrito().findIndex(items=>items.id===element.id);

                if (listaCompra.GetCarrito()[index].cantidad<element.stock) {
                    listaCompra.GetCarrito()[index].cantidad++;
                }else{
                    Swal.fire({
                        position: 'top',
                        title: 'Sin stock',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else{
                let producto = new items(element.id,element.marca,element.modelo,element.precio,element.img,element.stock)
                listaCompra.AddProducto(producto);
            }
            // CARGO EL STORAGE
            cargarStorage("carrito",JSON.stringify(listaCompra.GetCarrito()));
            contItem();
        })
    })   
}
// cargar al localStore
const cargarStorage=(clave,valor)=>{
    localStorage.setItem(clave,valor);
}

// obtener datos del storage y cargarlos nuevamente
const obtenerStorage=()=>{

    if (localStorage.getItem("carrito")!==null) {
    
        let listAux=JSON.parse(localStorage.getItem("carrito"));
        listAux.forEach((ele)=>{
            listaCompra.GetCarrito().push(ele);
        })
    }
    contItem();

}