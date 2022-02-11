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
-- Table structure for table `stations_point`
--

DROP TABLE IF EXISTS `stations_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations_point` (
  `id` int NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `station_id` int NOT NULL,
  `bike_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bike_id` (`bike_id`),
  KEY `stations_point_station_id_7682ae04_fk_stations_station_id` (`station_id`),
  CONSTRAINT `stations_point_bike_id_d776e405_fk_bikes_bike_id` FOREIGN KEY (`bike_id`) REFERENCES `bikes_bike` (`id`),
  CONSTRAINT `stations_point_station_id_7682ae04_fk_stations_station_id` FOREIGN KEY (`station_id`) REFERENCES `stations_station` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations_point`
--

LOCK TABLES `stations_point` WRITE;
/*!40000 ALTER TABLE `stations_point` DISABLE KEYS */;
INSERT INTO `stations_point` VALUES (1,1,1,NULL),(2,1,1,NULL),(3,1,1,2),(4,1,1,3),(5,1,2,5),(6,1,2,NULL),(7,1,2,26),(8,0,2,NULL),(9,1,3,NULL),(10,1,3,NULL),(11,1,3,7),(12,1,3,6),(13,1,4,NULL),(14,1,4,4),(15,1,4,8),(16,1,4,1),(17,1,7,9),(18,1,7,10),(19,1,7,14),(24,1,9,NULL),(25,1,9,15),(26,1,9,NULL),(27,1,9,NULL),(36,1,12,20),(37,1,12,NULL),(38,1,12,NULL),(39,1,12,21),(40,1,12,NULL),(51,1,37,NULL),(52,1,37,27),(53,1,37,28),(54,1,37,29),(55,1,37,NULL),(56,1,37,NULL),(57,1,37,NULL);
/*!40000 ALTER TABLE `stations_point` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 19:36:57
