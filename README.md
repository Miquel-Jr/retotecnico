# Proyecto
Reto Tecnico Indra

# Configuración Inicial

# Instalación en VS Code usando el Quick Open (Ctrl + P), pegue el siguiente comando y presione Entrar.

ext install asciidoctor.asciidoctor-vscode
ext install EditorConfig.EditorConfig
ext install esbenp.prettier-vscode
ext install mhutchie.git-graph

# Clonado del proyecto
Generar un clon del repositorio, siempre se prefiere iniciar con la rama dev/develop
[source,shell script]
git clone https://github.com/Miquel-Jr/retotecnico.git

# Instalación de dependencias
Debemos ubicarnos en la carpeta raiz, donde se encuentra el archivo package.json del proyecto y ejecutar el siguiente comando
yarn
#Respuesta
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 10.00s.

# Configuración de cuenta AWS

Para este punto se debera tener un usuario de aws (**Programmatic access**)
Ejecutar el comando:
AWS configure

El comando preguntara por los siguientes valores

* AWS Access Key ID: Usuario programatico de aws, ejm: EDIAXVWRRT5YIDPLED42, no es el correo.
* AWS Secret Access Key: Clave del usuario
* Default region name: us-east-1
* Default output format: json

Esto guardara las crendenciales del usuario como default, cada que vez que se ejecute un comando con el cli de aws se utilizara este usuario,
en el caso de tener mas de un usuario agregar el argumento profile y el alias que quiere darle al nuevo usuario.

AWS configure --profile user2

# Comandos para ejecutar el proyecto

* Pruebas unitarias

yarn test

* Ejecucion OffLine / Local

serverless offline start

* Levantamiento del servidor a la nube (AWS) por default

serverless deploy

* Levantamiento del servidor a la nube (AWS) con stage

serverless deploy --stage dev

* Levantamiento del servidor a la nube (AWS) con profile

serverless deploy --aws-profile user2