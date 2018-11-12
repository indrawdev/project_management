<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MDashboard extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function getDone() 
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tanggal_deadline) as bulan, 
			COUNT(fs_nomor) as jumlah
			FROM tx_request
			WHERE YEAR(fd_tanggal_deadline) = YEAR(CURRENT_DATE())
			AND fs_kode_status = 'D'
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tanggal_deadline)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getProgress() 
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tanggal_deadline) as bulan, 
			COUNT(fs_nomor) as jumlah
			FROM tx_request
			WHERE YEAR(fd_tanggal_deadline) = YEAR(CURRENT_DATE())
			AND fs_kode_status = 'P'
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tanggal_deadline)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getProblem() 
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tanggal_deadline) as bulan, 
			COUNT(fs_nomor) as jumlah
			FROM tx_request
			WHERE YEAR(fd_tanggal_deadline) = YEAR(CURRENT_DATE())
			AND fs_kode_status = 'W'
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tanggal_deadline)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getFailed() 
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tanggal_deadline) as bulan, 
			COUNT(fs_nomor) as jumlah
			FROM tx_request
			WHERE YEAR(fd_tanggal_deadline) = YEAR(CURRENT_DATE())
			AND fs_kode_status = 'F'
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tanggal_deadline)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}