# Explication du fonctionnement du jeu
Le schéma ci-dessus résume le fonctionnement de chaque fichiers pour le jeu.

![schéma qui résume le fonctionnement des fichiers](../images/schema_summary_front.png)



### description un peu plus détaillé sur les fichiers affichés à l'utilisateur

- [index.php](../php/index.php) : c'est la toute première page laissant à l'utilisateur le choix soit de se connecter ou de s'enregistrer

- [create_player.php](../php/create_player.php) : insère le joueur qui vient de s'enregistrer en base de données

- [addSecretOrPlay.php](../php/addSecretOrPlay.php) : ce fichier permet de donner le choix au joueur d'ajouter un nouveau secret sur son compte + voir la liste des secrets qu'il a déjà enregistré + la possibilité de s'insèrer dans une partie

- [insert_player.php](../php/insert_player.php) : créer une session de jeu si aucune session n'a été créé + insère un joueur dans une session de jeu

- [get_player.php](../php/get_player.php) : affiche tous les joueurs connectés dans la partie + permet à chaque joueur de jouer en glissant et en déposant le joueur dont il pense être l'auteur du secret affiché à tous

- [result.php](../php/result.php) : affiche le classement de chaque joueur à chaque fin de tour et le résultat du choix du joueur. S'il n'y a plus de secrets à découvrir pour les joueurs, cette écran affiche d'abord un podium des 3 premiers de toute la partie. Puis, cela affiche le classement de tous les joueurs.

### description des fichiers utilisés dans l'ensemble des fichiers 
- [helper.php](../php/helper.php) : ce fichier stocke toutes mes fonctions php lorsque j'ai besoin de faire des requêtes à la base de données.

- [helper.js](../js/helper.js) : stocke toutes les fonctions js et requêtes ajax dont j'ai besoin

- [script_game.js](../js/script_game.js) : stocke tous les event listeners que j'utilise dans le projet.

- [conn.php](../php/conn.php) : stocke les connexions à la base de données

- [lottie-player/](../lottie-player/) : dossier stockant toutes les animations que j'ai rajouté depuis internet et que j'utilise dans le jeu

- [lottie-player/player/](../lottie-player/player/) : dossier permettant de loader le player dans le jeu pour pouvoir jouer les animations du dossier [lottie-player/](../lottie-player/)

# Explication du système de coeur utilisé pour chaque joueur dans le jeu
La déconnexion d'un joueur fût un de mes plus gros problèmes lorsque j'ai réalisé ce projet car je voulais que lorsqu'il quitte mon jeu, cela lui déconnecte du jeu totalement.

Pour cela, j'ai fait un système de coeur humain pour chacun de mes joueurs. En effet, lorsque le joueur se situe dans l'une des pages du jeu, le joueur va automatiquement envoyer des requêtes chaque seconde à la base de données pour dire qu'il est bien connecté au jeu et qu'il est bien dans une partie ou non. Ce système me permet ainsi qu'à chaque tentative de fermer la page ou de changer de page, le joueur va être déconnecter automatiquement. Ainsi, si le joueur reviens sur l'une des pages du jeu, il sera reconnecté automatiquement grâce à ce système de coeur et déconnecté automatiquement s'il quitte le jeu.

# Explication du système de choix de secret aléatoire pour l'affichage au joueur
Lors du développement de cette fonctionnalité, j'ai eu un bug où le secret affiché aux joueurs, censé être le même pour tout le monde, n'était pas le même pour tout le monde. C'est pourquoi, pour afficher un nouveau message pour tous, j'utilise une colonne appelé `random_choice` dans ma base de données qui me permets de choisir par un booléen celui qui est actuellement affiché à tous les joueurs. Une fois que le tour est terminé, le secret qui était affiché est changé en tant que `discovered` dans la base de données grâce à la colonne du même nom et on relance ensuite la recherche d'un nouveau secret à découvrir parmi ceux qui n'ont pas été `discovered`