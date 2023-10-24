-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 24 oct. 2023 à 15:22
-- Version du serveur : 10.10.2-MariaDB
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `game_session`
--

DROP TABLE IF EXISTS `game_session`;
CREATE TABLE IF NOT EXISTS `game_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datecreation` datetime NOT NULL DEFAULT current_timestamp(),
  `isalive` tinyint(4) NOT NULL,
  `hasgamebegun` tinyint(4) DEFAULT NULL,
  `nbrplayers` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mysecret`
--

DROP TABLE IF EXISTS `mysecret`;
CREATE TABLE IF NOT EXISTS `mysecret` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `p_secret` text NOT NULL,
  `id_player` int(11) NOT NULL,
  `discovered` tinyint(1) NOT NULL,
  `random_choice` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `players`
--

DROP TABLE IF EXISTS `players`;
CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(255) NOT NULL,
  `id_secret` int(11) DEFAULT NULL,
  `logged` tinyint(1) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `p_played` tinyint(1) DEFAULT NULL,
  `continued` tinyint(4) DEFAULT NULL,
  `id_p_choice` int(11) DEFAULT NULL,
  `id_game_session` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
