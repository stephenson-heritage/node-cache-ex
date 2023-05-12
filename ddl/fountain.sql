CREATE TABLE `fountain` (
  `fountain_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `long` decimal(13,10) NOT NULL,
  `lat` decimal(13,10) NOT NULL,
  `bn` text DEFAULT NULL,
  `g` point NOT NULL,
  `feature_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fountain_id`),
  UNIQUE KEY `fountain_un` (`feature_id`),
  SPATIAL KEY `g` (`g`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4;