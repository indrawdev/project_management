-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2018 at 10:12 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projects`
--

-- --------------------------------------------------------

--
-- Table structure for table `captcha`
--

CREATE TABLE `captcha` (
  `captcha_id` bigint(13) UNSIGNED NOT NULL,
  `captcha_time` int(10) UNSIGNED NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `word` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `captcha`
--

INSERT INTO `captcha` (`captcha_id`, `captcha_time`, `ip_address`, `word`) VALUES
(1, 1541752503, '::1', 'EEZ'),
(2, 1541752574, '::1', 'TDU'),
(3, 1541752577, '::1', 'IPI'),
(4, 1541752581, '::1', 'EBX'),
(5, 1541752759, '::1', 'SSH'),
(6, 1541752765, '::1', 'XXY'),
(7, 1541752841, '::1', 'DEX'),
(8, 1541752894, '::1', 'ATS'),
(9, 1541752901, '::1', 'FNZ'),
(10, 1541753493, '::1', 'FWI');

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`id`, `ip_address`, `timestamp`, `data`) VALUES
('854c6nr35qe948v4f3ah3enue02n3uqn', '::1', 1541753802, 0x5f5f63695f6c6173745f726567656e65726174657c693a313534313735333739323b766370747c643a313534313735333439333b6c6f67696e7c623a313b757365726e616d657c733a3137323a2235396431363435353635623863363366326266396339393165313964633339666564663639383736313065663439303531323733306362323933623766396637373831363565353935636666333266653165333730346139666362613161613832313833366263363137613738663137393439323065356666393161663530654c644d4b6154554546632b6e5635776a34444c6463467757504f4d4d4e57664752414c53656449674f6f413d223b70617373776f72647c733a3231363a226136353532613537633535343939656238653134613334313861316161663731646266366437353831353663653932356161393664326638306335366134396330633663613138663962626333356435633864376436663263313562363137666135316163633733363631633932333635393266306130643030343337653831792f665146546d575353657469487146744a49417342796238314f333371462f6262366835455a466275337a6951577935334d70395570506369596a395658486c6d6553794a533078557678623035586167694474673d3d223b6c6576656c757365727c733a3137323a223931343365386631306134353936653335366431363234306664316131633466616132323739636265373766356366343633623162663232316434303437633637613834613630363661623264313739666535643038353766653462346561383465383132373864323634323636396337643933646638623136313933343062344a304563434661423737366e4d4a70626e7641423467784a5a37532b36374a3252477771366f557750383d223b);

-- --------------------------------------------------------

--
-- Table structure for table `tb_log`
--

CREATE TABLE `tb_log` (
  `log_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `log_name` varchar(15) NOT NULL,
  `log_user` varchar(15) NOT NULL,
  `log_message` varchar(200) NOT NULL,
  `ip_address` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_log`
--

INSERT INTO `tb_log` (`log_time`, `log_name`, `log_user`, `log_message`, `ip_address`) VALUES
('2018-11-09 02:51:58', 'LOGIN', 'INDRA', 'MASUK KE SISTEM DENTIST', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `tg_menu`
--

CREATE TABLE `tg_menu` (
  `id_menu` int(6) NOT NULL,
  `fs_group` int(6) NOT NULL DEFAULT '0',
  `fs_kd_comp` varchar(10) NOT NULL,
  `fs_kd_parent` varchar(10) NOT NULL,
  `fs_kd_child` varchar(10) NOT NULL,
  `fs_nm_menu` varchar(50) NOT NULL,
  `fs_nm_form` varchar(50) NOT NULL,
  `fb_root` int(1) NOT NULL,
  `fs_nm_formweb` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tg_menu`
--

INSERT INTO `tg_menu` (`id_menu`, `fs_group`, `fs_kd_comp`, `fs_kd_parent`, `fs_kd_child`, `fs_nm_menu`, `fs_nm_form`, `fb_root`, `fs_nm_formweb`) VALUES
(1, 0, 'PROJECT', '1', '', 'Dashboard', '0', 1, 'dashboard'),
(2, 0, 'PROJECT', '2', '', 'DATA TRANSAKSI', '0', 1, '0'),
(3, 0, 'PROJECT', '2', '201', 'Request Project', '0', 1, 'request'),
(4, 0, 'PROJECT', '2', '202', 'Management Project', '0', 1, 'management'),
(5, 0, 'PROJECT', '3', '', 'DATA MASTER', '0', 1, '0'),
(6, 0, 'PROJECT', '3', '301', 'Master Kategori', '0', 1, 'masterkategori'),
(7, 0, 'PROJECT', '3', '302', 'Master Status', '0', 1, 'masterstatus'),
(8, 0, 'PROJECT', '3', '303', 'Master User', '0', 1, 'masteruser');

-- --------------------------------------------------------

--
-- Table structure for table `tm_kategori`
--

CREATE TABLE `tm_kategori` (
  `fs_kode_kategori` char(3) NOT NULL,
  `fs_nama_kategori` varchar(45) NOT NULL,
  `fd_tanggal_buat` datetime NOT NULL,
  `fs_user_buat` varchar(25) NOT NULL,
  `fd_tanggal_edit` datetime DEFAULT NULL,
  `fs_user_edit` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tm_parlevel`
--

CREATE TABLE `tm_parlevel` (
  `fs_kd_parent` varchar(2) NOT NULL,
  `fs_kd_child` varchar(4) NOT NULL,
  `fs_level` varchar(20) DEFAULT NULL,
  `fs_index` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tm_status`
--

CREATE TABLE `tm_status` (
  `fs_kode_status` char(1) NOT NULL,
  `fs_nama_status` varchar(25) NOT NULL,
  `fd_tanggal_buat` datetime NOT NULL,
  `fs_user_buat` varchar(25) NOT NULL,
  `fd_tanggal_edit` datetime DEFAULT NULL,
  `fs_user_edit` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tm_user`
--

CREATE TABLE `tm_user` (
  `fs_username` varchar(15) NOT NULL,
  `fs_kode_karyawan` char(5) NOT NULL,
  `fs_password` varchar(45) NOT NULL,
  `fs_level_user` varchar(20) NOT NULL,
  `fd_last_login` datetime DEFAULT NULL,
  `fs_ip_address` varchar(15) DEFAULT NULL,
  `fd_tanggal_buat` datetime NOT NULL,
  `fs_user_buat` varchar(15) NOT NULL,
  `fd_tanggal_edit` datetime DEFAULT NULL,
  `fs_user_edit` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_user`
--

INSERT INTO `tm_user` (`fs_username`, `fs_kode_karyawan`, `fs_password`, `fs_level_user`, `fd_last_login`, `fs_ip_address`, `fd_tanggal_buat`, `fs_user_buat`, `fd_tanggal_edit`, `fs_user_edit`) VALUES
('INDRA', '', '59a920b4b99558bcbed3fee8405e1042', 'ADMINISTRATOR', '2018-11-09 09:51:57', '::1', '2018-11-09 15:51:21', 'INDRA', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tx_request`
--

CREATE TABLE `tx_request` (
  `fn_id_project` int(11) NOT NULL,
  `fs_nama_project` varchar(60) NOT NULL,
  `fd_tanggal_deadline` date NOT NULL,
  `fs_kode_kategori` char(3) NOT NULL,
  `fs_remark` text NOT NULL,
  `fd_tanggal_buat` datetime DEFAULT NULL,
  `fs_user_buat` varchar(25) DEFAULT NULL,
  `fd_tanggal_edit` datetime DEFAULT NULL,
  `fs_user_edit` varchar(25) DEFAULT NULL,
  `fs_assign_to` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `captcha`
--
ALTER TABLE `captcha`
  ADD PRIMARY KEY (`captcha_id`),
  ADD KEY `word` (`word`);

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ci_sessions_timestamp` (`timestamp`);

--
-- Indexes for table `tb_log`
--
ALTER TABLE `tb_log`
  ADD PRIMARY KEY (`log_time`);

--
-- Indexes for table `tg_menu`
--
ALTER TABLE `tg_menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `tm_kategori`
--
ALTER TABLE `tm_kategori`
  ADD PRIMARY KEY (`fs_kode_kategori`);

--
-- Indexes for table `tm_user`
--
ALTER TABLE `tm_user`
  ADD PRIMARY KEY (`fs_username`);

--
-- Indexes for table `tx_request`
--
ALTER TABLE `tx_request`
  ADD PRIMARY KEY (`fn_id_project`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `captcha`
--
ALTER TABLE `captcha`
  MODIFY `captcha_id` bigint(13) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tx_request`
--
ALTER TABLE `tx_request`
  MODIFY `fn_id_project` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
