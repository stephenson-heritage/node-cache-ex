CREATE TABLE `cache` (
  `cache_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `data` longtext DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cache_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;