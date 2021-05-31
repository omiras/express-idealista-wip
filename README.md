# Idelista

Vamos a crear un "clon" de Idealista que nos permita

1. Visualizar la Home Page de nuestro portal inmobiliario
2. Ver el listado de pisos de alquiler (texto por pantalla)
3. Queremos un buscador de pisos por precio en nuestro portal
   1. Creando un endpoint que nos devuelva un formulario simple
   2. Modificaremos el endpoint de listado de pisos para que solo muestre aquellos que son menores de dicho precio
4. Añadir un nuevo piso de alquiler
   1. Crear un nuevo endpoint para añadir piso de alquiler. Renderizará un formulario que hará un POST a otro endpoint
   2. El endpoint que gestiona en POST añadirá el nuevo al piso al array de pisos

5. Cuando el usuario haga un GET en '/mostrar-pisos'; vamos a renderizar una lista de pisos, pero esta vez, maquetados, con su título y su precio. Para darle más funcionalidad, vamos a modificar el array de pisos para que también contengan una foto del piso.
6. Vamos a generar un endpoint , tipo '/piso/:idPiso'; que va a mostrar una vista detallada del piso.
   1. La misma info que en la vista de lista de pisos
   2. Además, la ubicación

7. En la lista de pisos, se genere un href dinámico, al idPiso de la vista detallada


