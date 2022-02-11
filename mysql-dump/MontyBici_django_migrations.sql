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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-01-19 20:54:23.525476'),(2,'auth','0001_initial','2022-01-19 20:54:32.004947'),(3,'admin','0001_initial','2022-01-19 22:18:15.052885'),(4,'admin','0002_logentry_remove_auto_add','2022-01-19 22:18:28.384024'),(5,'admin','0003_logentry_add_action_flag_choices','2022-01-19 22:18:28.896499'),(6,'contenttypes','0002_remove_content_type_name','2022-01-19 22:18:41.169762'),(7,'auth','0002_alter_permission_name_max_length','2022-01-19 22:18:48.070852'),(8,'auth','0003_alter_user_email_max_length','2022-01-19 22:18:49.050148'),(9,'auth','0004_alter_user_username_opts','2022-01-19 22:18:49.528234'),(10,'auth','0005_alter_user_last_login_null','2022-01-19 22:18:54.274053'),(11,'auth','0006_require_contenttypes_0002','2022-01-19 22:18:54.648479'),(12,'auth','0007_alter_validators_add_error_messages','2022-01-19 22:18:55.112404'),(13,'auth','0008_alter_user_username_max_length','2022-01-19 22:19:01.071671'),(14,'auth','0009_alter_user_last_name_max_length','2022-01-19 22:19:06.589435'),(15,'auth','0010_alter_group_name_max_length','2022-01-19 22:19:07.586571'),(16,'auth','0011_update_proxy_permissions','2022-01-19 22:19:07.980737'),(17,'auth','0012_alter_user_first_name_max_length','2022-01-19 22:19:13.108619'),(18,'bikes','0001_initial','2022-01-19 22:19:16.673889'),(19,'bikes','0002_auto_20220114_2325','2022-01-19 22:19:20.983474'),(20,'bikes','0003_auto_20220114_2327','2022-01-19 22:19:22.762874'),(21,'bikes','0004_auto_20220119_1506','2022-01-19 22:19:23.312939'),(22,'sessions','0001_initial','2022-01-19 22:19:26.320371'),(23,'stations','0001_initial','2022-01-19 22:19:30.939574'),(24,'stations','0002_points','2022-01-19 23:22:46.304052'),(25,'bikes','0005_remove_bike_location','2022-01-20 00:22:51.804717'),(26,'stations','0003_auto_20220120_0022','2022-01-20 00:22:54.716892'),(27,'stations','0004_auto_20220120_1500','2022-01-20 15:00:32.626153'),(28,'bikes','0006_auto_20220120_1503','2022-01-20 15:03:12.278604'),(29,'bikes','0007_auto_20220120_1518','2022-01-20 15:18:29.188535'),(30,'stations','0005_auto_20220120_1518','2022-01-20 15:18:39.750871'),(31,'stations','0006_auto_20220121_0001','2022-01-21 00:11:48.256152'),(32,'stations','0007_auto_20220121_0012','2022-01-21 00:12:48.198046'),(33,'stations','0008_auto_20220122_0339','2022-01-22 03:58:25.375163'),(34,'bikes','0008_auto_20220122_0424','2022-01-22 04:37:53.626994'),(35,'stations','0008_auto_20220122_0424','2022-01-22 04:37:53.860317'),(36,'authentication','0001_initial','2022-01-22 04:48:27.205026'),(37,'profiles','0001_initial','2022-01-22 04:48:45.902106'),(38,'stations','0009_auto_20220123_1901','2022-01-23 19:01:13.976156'),(39,'bikes','0009_register_bike','2022-01-23 19:07:49.892096'),(40,'authentication','0002_auto_20220123_2328','2022-01-23 23:28:59.756124'),(41,'authentication','0003_auto_20220123_2334','2022-01-23 23:35:23.000429'),(42,'authentication','0004_auto_20220123_2337','2022-01-23 23:38:14.299181'),(43,'profiles','0002_auto_20220123_2355','2022-01-23 23:55:28.598261'),(44,'authentication','0005_auto_20220124_0022','2022-01-24 00:23:31.344989'),(45,'stations','0010_auto_20220124_1635','2022-01-24 16:35:48.878863'),(46,'stations','0011_auto_20220126_1350','2022-01-26 13:50:28.192276'),(47,'stations','0012_remove_point_bike','2022-01-26 14:32:13.775226'),(48,'bikes','0010_bike_station','2022-01-26 14:32:17.937012'),(49,'bikes','0011_remove_bike_station','2022-01-26 14:37:55.453115'),(50,'stations','0013_point_bike','2022-01-26 14:38:00.038837'),(51,'stations','0014_auto_20220126_1509','2022-01-26 15:10:03.789955'),(52,'stations','0015_auto_20220126_1514','2022-01-26 15:15:02.942210'),(53,'bikes','0012_auto_20220130_1838','2022-01-30 18:39:03.837833'),(54,'bikes','0013_auto_20220204_1531','2022-02-04 15:32:03.306503'),(55,'profiles','0003_auto_20220204_1531','2022-02-04 15:32:03.344610'),(56,'profiles','0004_auto_20220208_2224','2022-02-08 22:24:55.817173'),(57,'stations','0016_auto_20220208_2224','2022-02-08 22:24:56.179710'),(58,'profiles','0005_auto_20220208_2311','2022-02-08 23:11:46.984047');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 19:36:48
