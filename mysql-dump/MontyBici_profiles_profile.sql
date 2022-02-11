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
-- Table structure for table `profiles_profile`
--

DROP TABLE IF EXISTS `profiles_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles_profile` (
  `id` char(32) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `image` varchar(200) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `profiles_profile_user_id_a3e81f91_fk` FOREIGN KEY (`user_id`) REFERENCES `authentication_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_profile`
--

LOCK TABLES `profiles_profile` WRITE;
/*!40000 ALTER TABLE `profiles_profile` DISABLE KEYS */;
INSERT INTO `profiles_profile` VALUES ('54854dc393e6443d9c104c21a21ab618','2022-01-25 18:18:02.289697','2022-01-25 18:18:02.289796','',6),('8bcd4a1c80004974959124b3e7b0e12d','2022-01-24 18:51:58.040816','2022-01-24 18:51:58.040879','',2),('8fe8f8345ff14b92b770a7db1f238057','2022-01-24 00:26:24.049179','2022-01-24 00:26:24.049225','',1),('9532f20c4bda48fb99ae61808f3e927d','2022-01-25 17:53:03.624693','2022-01-25 17:53:03.624735','',4),('97496693f2a24006860faa94c56bbdf4','2022-01-25 18:14:41.898877','2022-01-25 18:14:41.898917','',5),('c438043ad4e3484ca27ef118c31a2410','2022-02-07 02:48:38.393963','2022-02-07 02:48:38.394037','https://avatars.dicebear.com/api/avataaars/ZCFY9415J.svg',8),('eba673906e434067aff566e7ef44fad4','2022-01-24 19:24:22.950979','2022-01-24 19:24:22.951020','',3),('ec6cde1c36534e98998f48709fa1c081','2022-02-06 22:07:26.744636','2022-02-06 22:07:26.744682','https://avatars.dicebear.com/api/avataaars/EACM6081I.svg',7);
/*!40000 ALTER TABLE `profiles_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 19:37:03
