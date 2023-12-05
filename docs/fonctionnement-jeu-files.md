# Explication de l'utilité des fichiers pour le front

![schéma qui résume le fonctionnement des fichiers pour le front](../images/schema_summary_front.png)

Le schéma ci-dessus résume le fonctionnement de chaque fichiers pour le jeu.

#### les fichiers affichés à l'utilisateur
Pour expliquer plus en détails,
- index.php : c'est la toute première page laissant à l'utilisateur le choix soit de se connecter ou de s'enregistrer

- create_player.php : insère le joueur qui vient de s'enregistrer en base de données

- addSecretOrPlay.php : ce fichier permet de donner le choix au joueur d'ajouter un nouveau secret sur son compte + voir la liste des secrets qu'il a déjà enregistré + la possibilité de s'insèrer dans une partie

- insert_player.php : créer une session de jeu si aucune session n'a été créer + insère un joueur dans une session de jeu

- get_player.php : affiche tous les joueurs connectés dans la partie + permet à chaque joueur de jouer en glissant et en déposant le joueur dont il pense être l'auteur du secret affiché à tous

- result.php : affiche le classement de chaque joueur à chaque fin de tour et le résultat du choix du joueur. S'il n'y a plus de secrets à découvrir pour les joueurs, cette écran affiche d'abord un podium des 3 premiers de toute la partie. Puis, cela affiche le classement de tous les joueurs.

#### les fichiers utilisés dans l'ensemble des fichiers 
- helper.php : ce fichier stocke toutes mes fonctions php lorsque j'ai besoin de faire des requêtes à la base de données.

- helper.js : stocke toutes les fonctions js et requêtes ajax dont j'ai besoin

- script_game.js : stocke tous les event listeners que j'utilise dans le projet.

- conn.php : stocke les connexions à la base de données

# Explication du système de coeur utilisé pour chaque joueur dans le jeu
La déconnexion d'un joueur fût un de mes plus gros problèmes lorsque j'ai réalisé ce projet car je voulais que lorsqu'il quitte mon jeu, cela lui déconnecte du jeu.

Pour cela, j'ai fait un système de coeur humain pour chacun de mes joueurs. En effet, lorsque le joueur se situe dans l'une des pages du jeu, le joueur va automatiquement envoyé des requêtes à la base de données pour dire qu'il est bien connecté au jeu et qu'il est bien dans une partie ou non. Ce système me permets ainsi qu'à chaque tentative de fermer la page ou changer de page, le joueur va être déconnecter automatiquement. Ainsi, si le joueur reviens sur l'une des pages du jeu, il sera reconnecté automatiquement grâce à ce système de coeur et déconnecté automatiquement s'il quitte le jeu.

# Explication du système de choix 
