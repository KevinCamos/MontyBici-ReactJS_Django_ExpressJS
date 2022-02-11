-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: MontyBici
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk` FOREIGN KEY (`user_id`) REFERENCES `authentication_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (31,'2022-01-26 15:22:51.807133','2','2-Developer WEB',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(32,'2022-01-26 15:22:55.464484','1','1-Developer WEB',2,'[]',10,1),(33,'2022-01-26 15:23:01.417893','4','4-Developer WEB',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(34,'2022-01-26 18:09:10.743962','3','3-False',2,'[{\"changed\": {\"fields\": [\"Active\"]}}]',7,1),(35,'2022-01-26 20:09:39.152953','4','4-True',1,'[{\"added\": {}}]',7,1),(36,'2022-01-26 20:09:41.866418','5','5-True',1,'[{\"added\": {}}]',7,1),(37,'2022-01-26 20:09:44.031036','6','6-True',1,'[{\"added\": {}}]',7,1),(38,'2022-01-26 20:09:45.679076','7','7-True',1,'[{\"added\": {}}]',7,1),(39,'2022-01-26 20:09:48.501122','8','8-True',1,'[{\"added\": {}}]',7,1),(40,'2022-01-26 20:09:58.490998','5','5-False',2,'[{\"changed\": {\"fields\": [\"Active\"]}}]',7,1),(41,'2022-01-26 20:10:05.514877','7','7-False',2,'[{\"changed\": {\"fields\": [\"Active\"]}}]',7,1),(42,'2022-01-26 20:10:28.402455','3','3-Developer WEB',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(43,'2022-01-26 20:10:39.721055','5','5-Luke Skywalker',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(44,'2022-01-26 20:10:47.762717','8','8-Luke Skywalker',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(45,'2022-01-26 20:10:56.689223','11','11-Spock es Poc',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(46,'2022-01-26 20:11:06.438125','10','10-Spock es Poc',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(47,'2022-02-03 02:34:18.411553','8','8-Luke Skywalker',2,'[{\"changed\": {\"fields\": [\"Active\"]}}]',10,1),(48,'2022-02-04 18:33:32.201935','2','2-Developer WEB',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(49,'2022-02-04 18:33:36.513291','2','2-Developer WEB',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(50,'2022-02-04 18:33:45.500699','3','3-Developer WEB',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1),(51,'2022-02-04 18:34:14.088076','6','6-Luke Skywalker',2,'[{\"changed\": {\"fields\": [\"Bike\"]}}]',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 19:36:43
