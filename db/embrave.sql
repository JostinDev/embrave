-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: localhost    Database: Embrave
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Embrave`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Embrave` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Embrave`;

--
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `type` int NOT NULL,
  `category` int NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `type_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_idx` (`type`),
  KEY `challenge_challenge_category_id_fk` (`category`),
  CONSTRAINT `challenge_challenge_category_id_fk` FOREIGN KEY (`category`) REFERENCES `challenge_category` (`id`),
  CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `challenge_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;
/*!40000 ALTER TABLE `challenge` DISABLE KEYS */;
INSERT INTO `challenge` VALUES (2,'Cold shower','Take a cold shower everyday','picture',2,1,NULL,NULL),(3,'Climb the everest','Are you ready to start the biggest challenge of your life ?','picture everest',2,1,NULL,NULL);
/*!40000 ALTER TABLE `challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_category`
--

DROP TABLE IF EXISTS `challenge_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_category`
--

LOCK TABLES `challenge_category` WRITE;
/*!40000 ALTER TABLE `challenge_category` DISABLE KEYS */;
INSERT INTO `challenge_category` VALUES (1,'Sport'),(2,'Social');
/*!40000 ALTER TABLE `challenge_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_category_seq`
--

DROP TABLE IF EXISTS `challenge_category_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_category_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_category_seq`
--

LOCK TABLES `challenge_category_seq` WRITE;
/*!40000 ALTER TABLE `challenge_category_seq` DISABLE KEYS */;
INSERT INTO `challenge_category_seq` VALUES (1);
/*!40000 ALTER TABLE `challenge_category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_seq`
--

DROP TABLE IF EXISTS `challenge_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_seq`
--

LOCK TABLES `challenge_seq` WRITE;
/*!40000 ALTER TABLE `challenge_seq` DISABLE KEYS */;
INSERT INTO `challenge_seq` VALUES (1);
/*!40000 ALTER TABLE `challenge_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_type`
--

DROP TABLE IF EXISTS `challenge_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_type`
--

LOCK TABLES `challenge_type` WRITE;
/*!40000 ALTER TABLE `challenge_type` DISABLE KEYS */;
INSERT INTO `challenge_type` VALUES (1,'habit'),(2,'goal');
/*!40000 ALTER TABLE `challenge_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_type_seq`
--

DROP TABLE IF EXISTS `challenge_type_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_type_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_type_seq`
--

LOCK TABLES `challenge_type_seq` WRITE;
/*!40000 ALTER TABLE `challenge_type_seq` DISABLE KEYS */;
INSERT INTO `challenge_type_seq` VALUES (1);
/*!40000 ALTER TABLE `challenge_type_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestone`
--

DROP TABLE IF EXISTS `milestone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestone` (
  `id` int NOT NULL,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ticked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `milestone_room` (`room_id`),
  KEY `milestone_user_id_fk` (`user_id`),
  CONSTRAINT `milestone_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `milestone_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
INSERT INTO `milestone` VALUES (1002,602,1,'2023-11-27 00:00:00.000000','',1),(1158,803,2,'2023-12-16 16:20:03.728000','le milestone',NULL),(1159,803,2,'2023-12-16 16:23:05.308000','descritpion',NULL);
/*!40000 ALTER TABLE `milestone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestone_media`
--

DROP TABLE IF EXISTS `milestone_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestone_media` (
  `id` bigint NOT NULL,
  `milestone_id` int DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `milestone_media_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `milestone_media_milestone_id_fk` (`milestone_id`),
  CONSTRAINT `milestone_media_milestone_id_fk` FOREIGN KEY (`milestone_id`) REFERENCES `milestone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone_media`
--

LOCK TABLES `milestone_media` WRITE;
/*!40000 ALTER TABLE `milestone_media` DISABLE KEYS */;
INSERT INTO `milestone_media` VALUES (357,1158,'c9098935d7ef7c3aea49cf96a549ebbf.png',NULL),(358,1159,'c0d2964f9a0b13cda2cd7f39923a3e05.png',NULL),(359,1159,'ba87de59c071176058eff5bb7149ac63.png',NULL),(360,1159,'5ca2ad34592fe38e1c8a564f5740c9f5.png',NULL),(361,1159,'ce2d252b44cde92107caf52378faaff5.png',NULL);
/*!40000 ALTER TABLE `milestone_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestone_media_seq`
--

DROP TABLE IF EXISTS `milestone_media_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestone_media_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone_media_seq`
--

LOCK TABLES `milestone_media_seq` WRITE;
/*!40000 ALTER TABLE `milestone_media_seq` DISABLE KEYS */;
INSERT INTO `milestone_media_seq` VALUES (451);
/*!40000 ALTER TABLE `milestone_media_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestone_seq`
--

DROP TABLE IF EXISTS `milestone_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestone_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone_seq`
--

LOCK TABLES `milestone_seq` WRITE;
/*!40000 ALTER TABLE `milestone_seq` DISABLE KEYS */;
INSERT INTO `milestone_seq` VALUES (1251);
/*!40000 ALTER TABLE `milestone_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `challenge_id` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `created` date DEFAULT NULL,
  `code_created_timestamp` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_challenge` (`challenge_id`),
  CONSTRAINT `room_challenge` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (602,3,NULL,'9OCJTp5cy10GPbIwJyUJWqRDQzbwEv','2023-10-28','2023-10-28 14:19:46.060000'),(652,3,NULL,'V1ivSGdOmuBypB4tafrTvGo6XPyZlM','2023-11-01','2023-11-01 17:11:11.059000'),(803,3,NULL,'PwzTsZSh7a1NbSX1qBmRbi6yw3CXrm','2023-11-23','2023-11-23 17:22:11.180000'),(804,3,NULL,'LsRtmeYLM3y63DfkJhBkrTEQrBENjr','2023-11-23','2023-11-23 17:23:38.682000'),(852,3,NULL,'YbWOzJcKyUUDXqlVRUdzhbUiKJVNFB','2023-11-23','2023-11-23 17:25:16.049000'),(902,3,NULL,'prTgqjka9SanMvuPF98HHXoO9wsNAi','2023-11-30','2023-11-30 15:29:41.317000'),(1002,2,NULL,'s4B0vCisVOCLHjlF9bPREma2ZnMOmv','2023-12-04','2023-12-04 19:33:08.674000');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_seq`
--

DROP TABLE IF EXISTS `room_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_seq`
--

LOCK TABLES `room_seq` WRITE;
/*!40000 ALTER TABLE `room_seq` DISABLE KEYS */;
INSERT INTO `room_seq` VALUES (1101);
/*!40000 ALTER TABLE `room_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `point` bigint NOT NULL DEFAULT '0',
  `auth0id` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `joined` date DEFAULT NULL,
  `points` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_auth0_user` (`auth0id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_room`
--

DROP TABLE IF EXISTS `user_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_room` (
  `id` bigint NOT NULL,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `joined` date DEFAULT NULL,
  `is_admin` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_room_unique_link` (`user_id`,`room_id`),
  KEY `room_idx` (`room_id`),
  CONSTRAINT `user_room_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_room_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_room`
--

LOCK TABLES `user_room` WRITE;
/*!40000 ALTER TABLE `user_room` DISABLE KEYS */;
INSERT INTO `user_room` VALUES (1203,803,2,'2023-11-23',_binary ''),(1204,804,2,'2023-11-23',_binary ''),(1252,852,2,'2023-11-23',_binary ''),(1403,652,1,'2023-12-04',_binary '\0'),(1453,1002,2,'2023-12-04',_binary '');
/*!40000 ALTER TABLE `user_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_room_seq`
--

DROP TABLE IF EXISTS `user_room_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_room_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_room_seq`
--

LOCK TABLES `user_room_seq` WRITE;
/*!40000 ALTER TABLE `user_room_seq` DISABLE KEYS */;
INSERT INTO `user_room_seq` VALUES (1551);
/*!40000 ALTER TABLE `user_room_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (51);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-28 16:37:11
