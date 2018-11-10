<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MRequest extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function getKategori()
	{
		$xSQL = ("
			SELECT fs_kode_kategori, fs_nama_kategori
			FROM tm_kategori
		");

		$xSQL = $xSQL.("
			ORDER BY fs_nama_kategori ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getStatus()
	{
		$xSQL = ("
			SELECT fs_kode_status, fs_nama_status
			FROM tm_status
		");

		$xSQL = $xSQL.("
			ORDER BY fs_nama_status ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getCounter($sJenis)
	{
		$xSQL = ("
			SELECT fn_counter
			FROM tm_counter
			WHERE fs_jenis_counter = '".trim($sJenis)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	public function checkProject($sNomor)
	{
		$xSQL = ("
			SELECT fs_nomor
			FROM tx_request
			WHERE fs_nomor = '".trim($sNomor)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
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
					OR b.fs_nama_kategori LIKE '%".trim($sCari)."%')
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
					OR b.fs_nama_kategori LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fs_nomor DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}