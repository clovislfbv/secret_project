-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 08 déc. 2023 à 16:20
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
-- Structure de la table `example`
--

DROP TABLE IF EXISTS `example`;
CREATE TABLE IF NOT EXISTS `example` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json`)),
  `text` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Déchargement des données de la table `example`
--

INSERT INTO `example` (`id`, `json`, `text`) VALUES
(2, '{\"foo\": \"bar\"}', NULL),
(3, NULL, '{\"foo\": \"bar\"}');

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
  `result_clicked` tinyint(4) DEFAULT NULL,
  `continue_clicked` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=561 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

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
  `disabled` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2296 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `players`
--

DROP TABLE IF EXISTS `players`;
CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(255) NOT NULL,
  `p_password` text NOT NULL,
  `id_secret` int(11) DEFAULT NULL,
  `logged` tinyint(1) NOT NULL,
  `date_last_logged` datetime DEFAULT NULL,
  `ingame` tinyint(11) NOT NULL,
  `first_ingame` tinyint(4) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `submitted` tinyint(4) DEFAULT NULL,
  `time_spent` int(11) DEFAULT NULL,
  `p_played` tinyint(1) DEFAULT NULL,
  `continued` tinyint(4) DEFAULT NULL,
  `id_p_choice` int(11) DEFAULT NULL,
  `id_game_session` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2226 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `truc`
--

DROP TABLE IF EXISTS `truc`;
CREATE TABLE IF NOT EXISTS `truc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `password` (`password`(250)),
  KEY `name` (`name`(250))
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Déchargement des données de la table `truc`
--

INSERT INTO `truc` (`id`, `name`, `password`) VALUES
(1, 'name', 'password'),
(2, 'name', 'password');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
