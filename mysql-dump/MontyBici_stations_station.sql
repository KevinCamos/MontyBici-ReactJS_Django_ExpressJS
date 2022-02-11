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
-- Table structure for table `stations_station`
--

DROP TABLE IF EXISTS `stations_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations_station` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(30) NOT NULL,
  `direction` varchar(100) NOT NULL,
  `location` varchar(30) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations_station`
--

LOCK TABLES `stations_station` WRITE;
/*!40000 ALTER TABLE `stations_station` DISABLE KEYS */;
INSERT INTO `stations_station` VALUES (1,'developer-web-4p7iyv','Developer WEB','Av. Albaida, 42','Ontinyent','stations/img/station1.jpg'),(2,'luke-skywalker-9jes7a','Luke Skywalker','C/ De l\'Estació, S/N','Ontinyent','stations/img/station2.jpg'),(3,'spock-es-poc-jfbdpx','Spock es Poc','Plaça de la concepció, 5','Ontinyent','stations/img/station4_cRzBYAe.jpg'),(4,'yomogan-5l3vvq','Yomogan','C/ De la compilació, 101','Ontinyent','stations/img/station4.jpg'),(7,'kevin-camos-8o2zbn','Kevin Camós','C/ Rock e\' Forte','Ontinyent','stations/img/station7_wEmCEZp.jpg'),(9,'lorena-js-czvds9','Lorena JS','C/ del IES l\'estació','Ontinyent','stations/img/station4_9gwNAIN.jpg'),(12,'yomogan-yodalan-to5f7w','Yomogan Yodalan','Plaça Major, 1','Ontinyent',''),(37,'pepe-e4yfzm','Pepe','Calle José Iranzo, 21','Onteniente','stations/img/station7_tKyaf9D.jpg');
/*!40000 ALTER TABLE `stations_station` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 19:37:01
