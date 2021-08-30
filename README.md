# CRUD básico de creación y gestión de usuarios
---

## IMPORTANTE!
- Sólo funciona correctamente en sistemas Windows, disculpen las molestias

## Información:

- Tecnologías/Librerias usadas:
    - **Javascript**
    - **Node.js**
    - **Inquirer** (Para la creación de la interfaz gráfica)
    - **chalk** (Para darle color a los mensajes)
    - **uuid** (Para crear id's únicas a cada usuario)

## Funcionalidades
---

- La aplicación consiste en un CRUD el cual nos permite registrar usuarios con los siguientes datos: 
    - Nombre
    - Apellidos
    - Nombre de usuario
    - Email
    - Tipo de usuario (Administrador o Usuario)
    - Contraseña

    > Cada uno de los campos mencionados tiene su propia validación

- El usuario creado se guardará en un archivo `.json` que nos creará automaticamente la aplicación con sus datos correspondientes

- Actualmente sólo éxiste ésta funcionalidad

### Ejecutar el programa
---
- Con el proyecto clonado, usaremos `npm install` o `npm i` para instalar las dependencias necesarias para el funcionamiento

- Una vez instaladas, usaremos el script `npm start` para ejecutar la aplicación

## Próximas actualizaciones
---

- ***Menú principal***: para cada usuario cambiando el mismo en función de si es *Administrador* o simplemente *Usuario*

- Los usuarios podrán modificar sus datos desde el menú

- Los *Administradores* podrán modificar la lista de usuarios pudiendo eliminar cualquiera de los mismos

    ## WORK IN PROGRESS