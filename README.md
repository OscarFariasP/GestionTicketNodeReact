### GESTION DE TICKETS ADMIN - USER

Clona este repositorio usando:

**git clone https://github.com/OscarFariasP/GestionTicketNodeReact.git**


#### Configurando Back End - NodeJS

1. apunta la consola de comandos a la carpeta api del proyecto usando (en windows):

 ```shell
cd api  
```
2. Instala todas las dependencias:

 ```shell
npm install
```

3. Configurando Sequelize ORM para base de datos MYSQL:

 Configura tu base de datos desde tu gestor de preferencia con las siguientes credenciales:

	**nombre de usuario: testapp
	contraseña: 123456789
	db_name: reactapp**
	
	De igual manera puedes cambiar estas credenciales modificando el archivo config.json dentro de la carpeta config.
	
4. Ejecuta las migraciones y los seeders.

	Ejecuta: 
	
<b>	
sequelize db:migrate

sequelize db:seed :all
</b>


Finalmente ejecutamos:
```shell
npm start
```

#### Configurando ReactJS Front End

Abre una nueva terminal en la raiz de proyecto e instala todas las dependencias:

```shell
npm install 
```
Finalmente ejecuta:
```shell
npm start
```
Tu sitio web se abrirá en localhost:

http://localhost:3000/


Nota: 

El lado del servidor está en http://localhost:9000/
El lado del cliente front end es la web que percibirás en http://localhost:3000/

Creditos:

Oscar Farias

