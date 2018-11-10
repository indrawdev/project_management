<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MManagement extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function listRequestAll($sCari)
	{
		$xSQL = ("
			SELECT a.*, b.fs_nama_kategori, c.fs_nama_status
			FROM tx_request a
			LEFT JOIN tm_kategori b ON b.fs_kode_kategori = a.fs_kode_kategori
			LEFT JOIN tm_status c ON c.fs_kode_status = a.fs_kode_status
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (a.fs_nama_project LIKE '%".trim($sCari)."%'
					OR b.fs_nama_kategori LIKE '%".trim($sCari)."%'
					OR c.fs_nama_status LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listRequest($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.*, b.fs_nama_kategori, c.fs_nama_status
			FROM tx_request a
			LEFT JOIN tm_kategori b ON b.fs_kode_kategori = a.fs_kode_kategori
			LEFT JOIN tm_status c ON c.fs_kode_status = a.fs_kode_status
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (a.fs_nama_project LIKE '%".trim($sCari)."%'
					OR b.fs_nama_kategori LIKE '%".trim($sCari)."%'
					OR c.fs_nama_status LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fs_nomor DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}