## Descripción del proyecto
Este proyecto fue creado para la entrega final del curso React para la academia Coder House.
Se utilizo ademas de React para el desarrollo frontend, firebase para almacenar y consultar datos.
Se desarrollo un carrito de compras con las siguientes funcionalidades:

### `Lista de Productos segmentada por categorias`

    Se podra ver una lista de todos los items, estos pueden filtrarse por categoria
    El item tiene un detalle en donde muestra una descripción del mismo y se podra seleccionar cantidad a comprar, verificando un minimo seteado para cada producto,  y un máximo condicionado por su stock.

### `Agregar productos al cart`

    El cart estará siempre disponible para que el usuario pueda ver su compra acutal.
    La mismo podrá tener distintos tipos de items y cantidades.


### `Generacón de orden`

    El usuario al terminar de seleccionar los items, podrá generar una orden.
    Se realiza chequeo de stock al momento de generarla


## Inicializar el proyecto

En la carpeta del proyecto, correr el script:

### `npm start`

La aplicación quedara corriendo en:<br />
 [http://localhost:3000](http://localhost:3000) para visualizarla en el browser.

## Librerias extras utilizadas en el proyecto :
 
 ### `Materialize`

    Utilizada para poder facilitar el desarrollo de componentes, y lograr una user interface amigable.

 ### `react-loader-spinner`

     Utilizada en los momentos en que la aplicacion queda suspendida a la espera de una respuesta del server (data fetching), mejorando así la usabilidad del usuario.
 
## Funcionalidades Extras agregadas :

### `Categorias dinamicas`
### `Almacenamiento de imagenes de ariculos en modo estático`
### `Validación de stock al momento de intentar generar la order`
### `Búsqueda de Orden por ID`


