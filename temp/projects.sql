-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2018 at 10:40 AM
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
(14, 1541841661, '::1', 'OFW'),
(15, 1541841950, '::1', 'JSR'),
(16, 1541842028, '::1', 'TBM'),
(17, 1541842393, '::1', 'JPJ'),
(18, 1541842539, '::1', 'HNL');

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
('0n5kvgrusodn5iels8t61aqhpnjjcs97', '::1', 1541842810, 0x5f5f63695f6c6173745f726567656e65726174657c693a313534313834323533373b766370747c643a313534313834323533393b6c6f67696e7c623a313b757365726e616d657c733a3137323a226565656363353831313438383433616336666162653231656231663063313836616335323032353465393764616362633366616365663963386332653733396634373139616364383365306231366665323265336536333936616334303333666438366638376536653063346639393932663965346236323232663234336664386f6f384230483846666f4f736e304d4c766c4c6b443873476c6b4f483249427768636437546765452b633d223b70617373776f72647c733a3231363a223631616562663237393238623936353436623433396663633762303163643737353666633034323033666633386139393732393164633935613939313463616161653963626231353461343138333166373936636632663364333662373565663864336663653337633430393239373138383432306439303238616266333364743131664e644b64567450694a5062393639557676774c572b7251727954632b7771554f42314c624261376c693935654a6e326763734d48796a347442765a36796871524e34335062352f34546865786f53706c49673d3d223b6c6576656c757365727c733a3137323a223266616238303132373838323131353835333936643564366263386365616431626136343962363137616264643339366464326363323530393531653762333736323637643062346164623565303963666438656137343839363266643163613830396234623534373535393264616534396636323965363664363062346430537075464439487773534162386c5a4f744d62587143342f68477a6b5850394f706e6d785739316d3034493d223b);

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
('2018-11-09 02:51:58', 'LOGIN', 'INDRA', 'MASUK KE SISTEM PROJECTS', '::1'),
('2018-11-09 03:42:49', 'LOGIN', 'INDRA', 'MASUK KE SISTEM PROJECTS', '::1'),
('2018-11-09 21:04:10', 'LOGIN', 'INDRA', 'MASUK KE SISTEM PROJECTS', '::1'),
('2018-11-10 00:03:18', 'REQUEST', 'INDRA', 'TAMBAH PROJECT 1000010', '::1'),
('2018-11-10 00:06:54', 'REQUEST', 'INDRA', 'TAMBAH PROJECT 1000011', '::1'),
('2018-11-10 00:12:06', 'REQUEST', 'INDRA', 'EDIT PROJECT 1000010', '::1'),
('2018-11-10 01:20:49', 'LOGIN', 'INDRA', 'MASUK KE SISTEM PROJECTS', '::1'),
('2018-11-10 03:21:00', 'LOGOUT', 'INDRA', 'KELUAR DARI SISTEM PROJECTS', '::1'),
('2018-11-10 03:21:32', 'LOGIN', 'USER3', 'MASUK KE SISTEM PROJECTS', '::1'),
('2018-11-10 03:22:14', 'REQUEST', 'USER3', 'TAMBAH PROJECT 1000012', '::1'),
('2018-11-10 03:24:02', 'REQUEST', 'USER3', 'TAMBAH PROJECT 1000013', '::1'),
('2018-11-10 03:25:41', 'REQUEST', 'USER3', 'TAMBAH PROJECT 1000014', '::1'),
('2018-11-10 03:25:48', 'LOGOUT', 'USER3', 'KELUAR DARI SISTEM PROJECTS', '::1'),
('2018-11-10 03:26:02', 'LOGIN', 'USER2', 'MASUK KE SISTEM PROJECTS', '::1'),
('2018-11-10 03:26:45', 'REQUEST', 'USER2', 'TAMBAH PROJECT 1000015', '::1'),
('2018-11-10 03:27:06', 'LOGOUT', 'USER2', 'KELUAR DARI SISTEM PROJECTS', '::1'),
('2018-11-10 03:27:21', 'LOGIN', 'ADMIN', 'MASUK KE SISTEM PROJECTS', '::1'),
('2018-11-10 03:33:11', 'LOGOUT', 'ADMIN', 'KELUAR DARI SISTEM PROJECTS', '::1'),
('2018-11-10 03:33:24', 'LOGIN', 'USER1', 'MASUK KE SISTEM PROJECTS', '::1'),
('2018-11-10 03:34:05', 'REQUEST', 'USER1', 'TAMBAH PROJECT 1000016', '::1'),
('2018-11-10 03:34:47', 'REQUEST', 'USER1', 'TAMBAH PROJECT 1000017', '::1'),
('2018-11-10 03:35:29', 'REQUEST', 'USER1', 'TAMBAH PROJECT 1000018', '::1'),
('2018-11-10 03:35:37', 'LOGOUT', 'USER1', 'KELUAR DARI SISTEM PROJECTS', '::1'),
('2018-11-10 03:35:59', 'LOGIN', 'ADMIN', 'MASUK KE SISTEM PROJECTS', '::1');

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
-- Table structure for table `tm_counter`
--

CREATE TABLE `tm_counter` (
  `fs_jenis_counter` varchar(15) NOT NULL,
  `fn_counter` char(8) NOT NULL,
  `fs_user_buat` varchar(15) NOT NULL,
  `fd_tanggal_buat` datetime NOT NULL,
  `fs_user_edit` varchar(15) DEFAULT NULL,
  `fd_tanggal_edit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_counter`
--

INSERT INTO `tm_counter` (`fs_jenis_counter`, `fn_counter`, `fs_user_buat`, `fd_tanggal_buat`, `fs_user_edit`, `fd_tanggal_edit`) VALUES
('REQUEST', '1000019', 'INDRA', '2018-04-06 15:04:27', 'INDRA', '2018-07-19 15:29:19');

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

--
-- Dumping data for table `tm_kategori`
--

INSERT INTO `tm_kategori` (`fs_kode_kategori`, `fs_nama_kategori`, `fd_tanggal_buat`, `fs_user_buat`, `fd_tanggal_edit`, `fs_user_edit`) VALUES
('DEV', 'DEVELOPMENT FEATURE', '2018-11-10 06:06:37', 'INDRA', NULL, NULL),
('DSN', 'DESIGN', '2018-11-10 06:06:10', 'INDRA', NULL, NULL),
('PKS', 'SURAT PERJANJIAN KERJASAMA', '2018-11-10 06:06:54', 'INDRA', NULL, NULL),
('POL', 'POLICY CHECKER', '2018-11-10 06:06:24', 'INDRA', NULL, NULL),
('PRO', 'PROPOSAL', '2018-11-10 06:05:52', 'INDRA', NULL, NULL);

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

--
-- Dumping data for table `tm_parlevel`
--

INSERT INTO `tm_parlevel` (`fs_kd_parent`, `fs_kd_child`, `fs_level`, `fs_index`) VALUES
('1', '', 'USER', '1'),
('2', '', 'USER', '1'),
('2', '201', 'USER', '1'),
('1', '', 'ADMINISTRATOR', '1'),
('2', '', 'ADMINISTRATOR', '1'),
('2', '202', 'ADMINISTRATOR', '1'),
('3', '', 'ADMINISTRATOR', '1'),
('3', '301', 'ADMINISTRATOR', '1'),
('3', '302', 'ADMINISTRATOR', '1'),
('3', '303', 'ADMINISTRATOR', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tm_referensi`
--

CREATE TABLE `tm_referensi` (
  `fs_kode_referensi` varchar(20) NOT NULL,
  `fs_nilai_referensi` varchar(2) NOT NULL,
  `fs_nama_referensi` varchar(45) NOT NULL,
  `fs_user_buat` varchar(15) NOT NULL,
  `fd_tanggal_buat` datetime NOT NULL,
  `fs_user_edit` varchar(15) NOT NULL,
  `fd_tanggal_edit` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tm_referensi`
--

INSERT INTO `tm_referensi` (`fs_kode_referensi`, `fs_nilai_referensi`, `fs_nama_referensi`, `fs_user_buat`, `fd_tanggal_buat`, `fs_user_edit`, `fd_tanggal_edit`) VALUES
('agama', 'b', 'BUDHA', 'INDRA', '2018-04-02 14:30:25', '', '0000-00-00 00:00:00'),
('agama', 'h', 'HINDU', 'INDRA', '2018-04-02 14:31:09', '', '0000-00-00 00:00:00'),
('agama', 'i', 'ISLAM', 'INDRA', '2018-04-02 14:30:15', '', '0000-00-00 00:00:00'),
('agama', 'k', 'KHATOLIK', 'INDRA', '2018-04-02 14:30:59', '', '0000-00-00 00:00:00'),
('agama', 'p', 'PROTESTAN', 'INDRA', '2018-04-02 14:30:47', 'INDRA', '2018-04-02 14:31:28'),
('bank', 'bc', 'BCA', 'INDRA', '2018-07-30 16:20:41', '', '0000-00-00 00:00:00'),
('bank', 'md', 'MANDIRI', 'INDRA', '2018-07-30 16:21:00', '', '0000-00-00 00:00:00'),
('bank', 'ri', 'BRI', 'INDRA', '2018-07-30 16:21:11', '', '0000-00-00 00:00:00'),
('cara_pembayaran', 'c', 'TUNAI', 'INDRA', '2018-04-06 11:04:27', '', '0000-00-00 00:00:00'),
('cara_pembayaran', 'd', 'KARTU DEBIT', 'INDRA', '2018-04-06 11:04:53', '', '0000-00-00 00:00:00'),
('cara_pembayaran', 'k', 'KARTU KREDIT', 'INDRA', '2018-04-06 11:06:24', '', '0000-00-00 00:00:00'),
('cara_pembayaran', 't', 'TRANSFER', 'INDRA', '2018-04-06 11:04:37', '', '0000-00-00 00:00:00'),
('golongan_darah', 'a', 'A', 'INDRA', '2018-04-02 14:29:11', '', '0000-00-00 00:00:00'),
('golongan_darah', 'ab', 'AB', 'INDRA', '2018-04-02 14:29:45', '', '0000-00-00 00:00:00'),
('golongan_darah', 'b', 'B', 'INDRA', '2018-04-02 14:29:23', '', '0000-00-00 00:00:00'),
('golongan_darah', 'o', 'O', 'INDRA', '2018-04-02 14:29:33', '', '0000-00-00 00:00:00'),
('golongan_obat', 'b', 'BAHAN BAKU', 'INDRA', '2018-04-02 14:45:16', '', '0000-00-00 00:00:00'),
('golongan_obat', 'j', 'BAHAN JADI', 'INDRA', '2018-04-02 14:45:01', '', '0000-00-00 00:00:00'),
('jabatan', 'a', 'APOTEKER', 'INDRA', '2018-04-15 15:28:29', '', '0000-00-00 00:00:00'),
('jabatan', 'd', 'DOKTER', 'INDRA', '2018-04-05 11:17:56', '', '0000-00-00 00:00:00'),
('jabatan', 'k', 'KASIR', 'INDRA', '2018-04-15 15:28:18', '', '0000-00-00 00:00:00'),
('jabatan', 'm', 'MANAJEMEN', 'INDRA', '2018-07-19 15:37:20', '', '0000-00-00 00:00:00'),
('jabatan', 'p', 'PERAWAT', 'INDRA', '2018-04-05 11:18:32', '', '0000-00-00 00:00:00'),
('jabatan', 'r', 'RESEPSIONIS', 'INDRA', '2018-07-19 17:47:52', '', '0000-00-00 00:00:00'),
('jabatan', 's', 'ADMINISTRATOR', 'INDRA', '2018-07-19 15:37:10', '', '0000-00-00 00:00:00'),
('jenis_identitas', 'a', 'SIM A', 'INDRA', '2018-04-02 14:36:25', '', '0000-00-00 00:00:00'),
('jenis_identitas', 'b', 'SIM B', 'INDRA', '2018-04-09 14:02:42', '', '0000-00-00 00:00:00'),
('jenis_identitas', 'c', 'SIM C', 'INDRA', '2018-04-02 14:36:34', 'INDRA', '2018-04-02 14:36:42'),
('jenis_identitas', 'k', 'KTP', 'INDRA', '2018-04-02 14:36:05', '', '0000-00-00 00:00:00'),
('jenis_kelamin', 'p', 'PRIA', 'INDRA', '2018-04-05 14:31:15', '', '0000-00-00 00:00:00'),
('jenis_kelamin', 'w', 'WANITA', 'INDRA', '2018-04-05 14:31:26', '', '0000-00-00 00:00:00'),
('jenis_obat', 'a', 'APOTEK', 'INDRA', '2018-04-02 14:43:20', '', '0000-00-00 00:00:00'),
('jenis_obat', 'k', 'KABIN', 'INDRA', '2018-04-02 14:43:32', '', '0000-00-00 00:00:00'),
('jenis_perawatan', 'j', 'JASA', 'INDRA', '2018-04-06 11:14:00', '', '0000-00-00 00:00:00'),
('jenis_perawatan', 'p', 'PAKET', 'INDRA', '2018-04-06 11:14:19', '', '0000-00-00 00:00:00'),
('jenis_perawatan', 't', 'TINDAKAN', 'INDRA', '2018-04-06 11:13:43', '', '0000-00-00 00:00:00'),
('jenis_tindakan', 'j', 'JASA', 'INDRA', '2018-04-02 14:40:33', '', '0000-00-00 00:00:00'),
('jenis_tindakan', 'p', 'PAKET', 'INDRA', '2018-04-02 14:41:20', '', '0000-00-00 00:00:00'),
('jenis_tindakan', 't', 'TINDAKAN', 'INDRA', '2018-04-02 14:40:43', '', '0000-00-00 00:00:00'),
('kategori_perawatan', '1', 'Konservasi Gigi', 'INDRA', '2018-04-09 15:45:43', '', '0000-00-00 00:00:00'),
('kategori_perawatan', '2', 'Kawat/Behel Gigi', 'INDRA', '2018-04-09 15:45:56', '', '0000-00-00 00:00:00'),
('kategori_perawatan', '3', 'Gigi Palsu (Prosthodontia)', 'INDRA', '2018-04-09 15:46:07', '', '0000-00-00 00:00:00'),
('kategori_perawatan', '4', 'Pembersihan Karang Gigi (Periodonsia)', 'INDRA', '2018-04-09 15:46:19', '', '0000-00-00 00:00:00'),
('kategori_perawatan', '5', 'Pencabutan Gigi (Bedah Mulut)', 'INDRA', '2018-04-09 15:46:42', '', '0000-00-00 00:00:00'),
('member_pasien', 'p', 'PAKET', 'INDRA', '2018-04-02 14:39:30', '', '0000-00-00 00:00:00'),
('member_pasien', 'r', 'REGULER', 'INDRA', '2018-04-02 14:39:20', '', '0000-00-00 00:00:00'),
('pekerjaan', 'm', 'MAHASISWA', 'INDRA', '2018-04-05 16:22:25', '', '0000-00-00 00:00:00'),
('pekerjaan', 'n', 'PEGAWAI NEGERI', 'INDRA', '2018-04-05 16:20:36', '', '0000-00-00 00:00:00'),
('pekerjaan', 'p', 'PELAJAR', 'INDRA', '2018-04-05 16:22:13', '', '0000-00-00 00:00:00'),
('pekerjaan', 's', 'PEGAWAI SWASTA', 'INDRA', '2018-04-05 16:21:06', '', '0000-00-00 00:00:00'),
('pekerjaan', 't', 'TIDAK BEKERJA', 'INDRA', '2018-04-05 16:21:52', '', '0000-00-00 00:00:00'),
('pekerjaan', 'w', 'WIRASWASTA', 'INDRA', '2018-04-05 16:21:31', '', '0000-00-00 00:00:00'),
('pendidikan', '1', 'SD', 'INDRA', '2018-04-02 14:31:53', '', '0000-00-00 00:00:00'),
('pendidikan', '2', 'SLTP', 'INDRA', '2018-04-02 14:32:15', '', '0000-00-00 00:00:00'),
('pendidikan', '3', 'SMK', 'INDRA', '2018-04-02 14:32:43', '', '0000-00-00 00:00:00'),
('pendidikan', '4', 'SMU', 'INDRA', '2018-04-02 14:32:33', '', '0000-00-00 00:00:00'),
('pendidikan', '5', 'D1', 'INDRA', '2018-04-02 14:32:51', '', '0000-00-00 00:00:00'),
('pendidikan', '6', 'D3', 'INDRA', '2018-04-02 14:33:00', '', '0000-00-00 00:00:00'),
('pendidikan', '7', 'S1', 'INDRA', '2018-04-02 14:33:09', '', '0000-00-00 00:00:00'),
('pendidikan', '8', 'S2', 'INDRA', '2018-04-02 14:33:22', '', '0000-00-00 00:00:00'),
('satuan_produk', 'a', 'AMPUL', 'INDRA', '2018-04-10 21:20:27', '', '0000-00-00 00:00:00'),
('satuan_produk', 'b', 'BOTOL', 'INDRA', '2018-04-10 21:26:50', '', '0000-00-00 00:00:00'),
('satuan_produk', 'd', 'DUS', 'INDRA', '2018-04-10 21:21:36', '', '0000-00-00 00:00:00'),
('satuan_produk', 'k', 'KAPSUL', 'INDRA', '2018-04-10 21:21:22', '', '0000-00-00 00:00:00'),
('satuan_produk', 'm', 'MILLIGRAM', 'INDRA', '2018-04-10 21:22:16', '', '0000-00-00 00:00:00'),
('status_perkawinan', 'c', 'CERAI', 'INDRA', '2018-04-02 14:38:39', '', '0000-00-00 00:00:00'),
('status_perkawinan', 'k', 'MENIKAH', 'INDRA', '2018-04-02 14:38:27', '', '0000-00-00 00:00:00'),
('status_perkawinan', 's', 'LAJANG', 'INDRA', '2018-04-02 14:38:09', '', '0000-00-00 00:00:00'),
('tekanan_darah', 'e', 'HIPERTENSI', 'INDRA', '2018-04-05 16:28:38', '', '0000-00-00 00:00:00'),
('tekanan_darah', 'n', 'NORMAL', 'INDRA', '2018-04-05 16:28:19', '', '0000-00-00 00:00:00'),
('tekanan_darah', 'o', 'HIPOTENSI', 'INDRA', '2018-04-05 16:27:30', '', '0000-00-00 00:00:00'),
('untuk_bayar', 'd', 'DEPOSIT', 'INDRA', '2018-07-30 16:18:29', '', '0000-00-00 00:00:00'),
('untuk_bayar', 'm', 'PENDAFTARAN MEMBER', 'INDRA', '2018-07-30 16:18:05', '', '0000-00-00 00:00:00'),
('warga_negara', 'a', 'WNA', 'INDRA', '2018-04-02 14:34:13', '', '0000-00-00 00:00:00'),
('warga_negara', 'i', 'WNI', 'INDRA', '2018-04-02 14:34:00', '', '0000-00-00 00:00:00');

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

--
-- Dumping data for table `tm_status`
--

INSERT INTO `tm_status` (`fs_kode_status`, `fs_nama_status`, `fd_tanggal_buat`, `fs_user_buat`, `fd_tanggal_edit`, `fs_user_edit`) VALUES
('D', 'DONE', '2018-11-10 05:56:17', 'INDRA', NULL, NULL),
('F', 'FAILED', '2018-11-10 05:56:36', 'INDRA', NULL, NULL),
('I', 'WAITING', '2018-11-10 07:17:27', 'INDRA', NULL, NULL),
('P', 'PROGRESS', '2018-11-10 05:54:52', 'INDRA', '2018-11-10 05:57:42', 'INDRA'),
('W', 'PROBLEM', '2018-11-10 05:56:27', 'INDRA', NULL, NULL);

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
('ADMIN', '', '2e6f2d8c8f495a30ba5a9d6861f9db16', 'ADMINISTRATOR', '2018-11-10 10:35:58', '::1', '2018-11-10 05:34:36', 'INDRA', NULL, NULL),
('INDRA', '', '59a920b4b99558bcbed3fee8405e1042', 'ADMINISTRATOR', '2018-11-10 08:20:49', '::1', '2018-11-09 15:51:21', 'INDRA', '2018-11-10 05:34:50', 'INDRA'),
('USER1', '', '2180072192676147273385c2150ec8b1', 'USER', '2018-11-10 10:33:24', '::1', '2018-11-10 05:35:12', 'INDRA', NULL, NULL),
('USER2', '', '1c540af3aa963ed6526ea31d3e810589', 'USER', '2018-11-10 10:26:02', '::1', '2018-11-10 05:36:14', 'INDRA', NULL, NULL),
('USER3', '', '43e5f8f0ddf0e6cd537878a62bf0557b', 'USER', '2018-11-10 10:21:32', '::1', '2018-11-10 09:02:10', 'INDRA', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tx_request`
--

CREATE TABLE `tx_request` (
  `fs_nomor` varchar(8) NOT NULL,
  `fs_nama_project` varchar(60) NOT NULL,
  `fd_tanggal_deadline` date NOT NULL,
  `fs_kode_kategori` char(3) NOT NULL,
  `fs_remark` text NOT NULL,
  `fs_assign_to` varchar(25) DEFAULT NULL,
  `fs_kode_status` char(1) NOT NULL,
  `fd_tanggal_buat` datetime DEFAULT NULL,
  `fs_user_buat` varchar(25) DEFAULT NULL,
  `fd_tanggal_edit` datetime DEFAULT NULL,
  `fs_user_edit` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tx_request`
--

INSERT INTO `tx_request` (`fs_nomor`, `fs_nama_project`, `fd_tanggal_deadline`, `fs_kode_kategori`, `fs_remark`, `fs_assign_to`, `fs_kode_status`, `fd_tanggal_buat`, `fs_user_buat`, `fd_tanggal_edit`, `fs_user_edit`) VALUES
('1000012', 'BANNER TOPUP WEBSITE', '2018-11-17', 'DSN', 'WEBSITE.COM', 'INDRA', 'D', '2018-11-10 10:22:13', 'USER3', '2018-11-10 10:28:25', 'ADMIN'),
('1000013', 'ADMIN MODULE', '2018-12-01', 'DEV', 'GET USERS', 'INDRA', 'D', '2018-11-10 10:24:02', 'USER3', '2018-11-10 10:28:14', 'ADMIN'),
('1000014', 'CETAKAN KONTRAK', '2018-12-11', 'PKS', 'KONTRAK KERJASAMA PT. ASURANSI INDONESIA', 'INDRA', 'D', '2018-11-10 10:25:41', 'USER3', '2018-11-10 10:28:00', 'ADMIN'),
('1000015', 'POLICY 1', '2018-12-28', 'POL', 'CHECKER FUNCTION', 'INDRA', 'P', '2018-11-10 10:26:44', 'USER2', '2018-11-10 10:27:44', 'ADMIN'),
('1000016', 'PROPOSAL MANDIRI', '2018-11-14', 'PRO', 'PROPOSAL UNTUK BANK MANDIRI', 'ANDRI', 'W', '2018-11-10 10:34:05', 'USER1', '2018-11-10 10:36:16', 'ADMIN'),
('1000017', 'PROPOSAL BCA', '2018-11-21', 'PRO', 'PROPOSAL UNTUK BANK CENTRAL ASIA #BATAL', 'ANDRI', 'F', '2018-11-10 10:34:47', 'USER1', '2018-11-10 10:36:42', 'ADMIN'),
('1000018', 'PROPOSAL ASURANSI EQUITY', '2018-12-27', 'PRO', 'PROPOSAL ASURANSI EQUITY', 'ANDRI', 'P', '2018-11-10 10:35:29', 'USER1', '2018-11-10 10:37:04', 'ADMIN');

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
-- Indexes for table `tm_counter`
--
ALTER TABLE `tm_counter`
  ADD PRIMARY KEY (`fs_jenis_counter`);

--
-- Indexes for table `tm_kategori`
--
ALTER TABLE `tm_kategori`
  ADD PRIMARY KEY (`fs_kode_kategori`);

--
-- Indexes for table `tm_referensi`
--
ALTER TABLE `tm_referensi`
  ADD PRIMARY KEY (`fs_kode_referensi`,`fs_nilai_referensi`);

--
-- Indexes for table `tm_status`
--
ALTER TABLE `tm_status`
  ADD PRIMARY KEY (`fs_kode_status`);

--
-- Indexes for table `tm_user`
--
ALTER TABLE `tm_user`
  ADD PRIMARY KEY (`fs_username`);

--
-- Indexes for table `tx_request`
--
ALTER TABLE `tx_request`
  ADD PRIMARY KEY (`fs_nomor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `captcha`
--
ALTER TABLE `captcha`
  MODIFY `captcha_id` bigint(13) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
