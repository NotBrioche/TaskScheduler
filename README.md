# Architecture

```
TaskScheduler
├── src/
|   ├── controllers/
|   ├── routes/
|   ├── services/
|   ├── utils/
|   |
|   ├── app.ts
|   └── index.ts
|
├── public/
|   ├── css/
|   |   └── style.css
|   ├── favicon.ico
|   └── index.html
|
├── tests/
|   └── taskScheduler.test.ts
|
├── .gitignore
├── README.md
|
├── package.json
├── package-lock.json
└── tsconfig.json
```

<details>
<summary>Explication détaillée de la structure</summary>

## Root

Dans le dossier root ou racine : `/`, il y a 5 fichiers présents :

- .gitignore
- README.md
- package.json
- package-lock.json
- tsconfig.json

### .gitignore

Ce fichier est utilisé par git (une application de gestions des versions) et permet de définir les fichiers / dossiers a ignorer à l'ajout d'une nouvelle version.

### README.md

Fichier écrit en Markdown (écriture simpifiée pour mettre du format rapidement) et qui permet de faire une documentation du projet ou expliquer le fonctionnement.
C'est ce fichier que vous êtes entrain de lire `:)`

### package.json

Fichier qui contient la version de Node.js ainsi que toutes les dépendances du projet et du développement

### package-lock.json

Ce fichier fait une liste de dépendance avec les versions exactes, pour permettre aux développeurs d'être certain d'avoir les bonnes dépendances.

### tsconfig.json

Fichier de configuration pour TypeScript

## Src

Ce dossier contient tout les `sources` du projet, c'est a dire le code en lui même (controllers, routes, services, etc...)

Il contient les fichiers et dossiers suivants :

- Controllers/
- Routes/
- Services/
- Utils/
- app.ts
- index.ts

### Controllers

Ce dossier contient tous les controllers de l'application, ce sont les premiers fichier qui vont faire le traitement de la requête et ils ont les tâches suivante à remplir :

- Valider les données reçues
- Appeler le bon service selon la requête
- Répondre à l'utilisateur avec un succès ou une erreur

⚠️ Les fichiers controller ne contiennent pas de logique `métier`, ils valident uniquement les données.

### Routes

Le dossier Routes contient toutes les `routes` de l'application. Une route contient le lien de la requête, il va le rediriger vers le bon controller.

Un fichier route est chargé des tâches suivantes :

- Recevoir les requêtes de l'utilisateur
- Rediriger la requête vers le bon controller

### Services

Le dossier service va contenir tous les fichiers qui ont faire la logique `métier` de l'application. C'est eux qui contiennent la logique de transformation des données.

### Utils

Il contient les `services` mais qui ne concernent pas directement la donnée `métier`, un fichier utils peut contenir la logique d'une connexion d'un utilisateur par exemple.

### app.ts

C'est ce fichier qui crée le serveur web. Il va contenir les routes définies dans le dossier

### index.ts

Point d'entrée du server (appel avec Node.js), il va uniquement appeler le fichier `app.ts`.

## Public

Ce dossier contient tout ce qui est dosponible pour l'utilisateur et qui ne requiert pas de protection : les fichiers html, css, javascript, favicon.ico, etc...

## Tests

Contient des fichiers qui vont opérer des tests unitaires et rapporter le résultat au développeur. (Extension `Jest` sur VsCode)

</details>
