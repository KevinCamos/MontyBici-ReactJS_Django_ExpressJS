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
-- Table structure for table `authentication_user`
--

DROP TABLE IF EXISTS `authentication_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authentication_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authentication_user`
--

LOCK TABLES `authentication_user` WRITE;
/*!40000 ALTER TABLE `authentication_user` DISABLE KEYS */;
INSERT INTO `authentication_user` VALUES (1,'pbkdf2_sha256$216000$aOaOwmhrHZVI$ZLgQpet71t19uYZLAvX06V1WwrJLYwauKx/BYk3ephs=','2022-02-02 00:34:12.129144',1,'2022-01-24 00:26:23.837002','2022-01-24 00:26:24.237572','kevin','kevin@gmail.com',1,1),(2,'pbkdf2_sha256$216000$MevmcSPnwBC0$LBZqtxanBHQABWDEV6nmY8RwffoGe9Ub7M1GfQF4tsY=',NULL,0,'2022-01-24 18:51:57.690216','2022-01-24 18:51:57.690258','yomogan','yomogan@gmail.com',1,0),(3,'pbkdf2_sha256$216000$myAdN9QuPt6L$CxSMgVYoR3+/7hIo+rmM6berUC0/ozyNabjhYHWz46s=',NULL,0,'2022-01-24 19:24:22.718691','2022-01-24 19:24:22.718727','yomogana2','yomogan2@gmail.com',1,0),(4,'pbkdf2_sha256$216000$prY65HrLNIjr$fTbwESncP3MJZUD24FovftC8f1F7NMc0s/nSahz9n20=',NULL,0,'2022-01-25 17:53:03.412233','2022-01-25 17:53:03.412272','Lorena','lorena@gmail.com',1,0),(5,'pbkdf2_sha256$216000$hq5jl47uYQEn$GK/IXe12KA0Pb3JSooL9L8IjSYRQyowcmKqVzyJWYa4=',NULL,0,'2022-01-25 18:14:41.718964','2022-01-25 18:14:41.719008','Username','username@gmail.com',1,0),(6,'pbkdf2_sha256$216000$Peg2nj2VAjrE$A6i7rTE73WW5vWpdKc2iawZtW0URvv1TTmr7lRmUQg0=',NULL,0,'2022-01-25 18:18:02.093858','2022-01-25 18:18:02.093927','Alfonso','alfonso@gmail.com',1,0),(7,'pbkdf2_sha256$216000$P5n1XUi6YP5f$cNrpTMR/tm+B172wCIYpR2U+m7KNkZQgh95kviuEW1E=',NULL,0,'2022-02-06 22:07:26.733579','2022-02-06 22:07:26.733712','AlbaSanz','albasanz@gmail.com',1,0),(8,'pbkdf2_sha256$216000$dQyPmJMwT92V$7m1iCV2DbwfF2ZmXu9K+0/DvsdDeWjxR169tpbGVZVA=',NULL,0,'2022-02-07 02:48:38.306663','2022-02-07 02:48:38.306928','darthvader','darthvader@gmail.com',1,0);
/*!40000 ALTER TABLE `authentication_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 19:36:45
