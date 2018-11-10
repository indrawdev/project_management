<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MMasterKategori extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function checkKategori($sKode)
	{
		$xSQL = ("
			SELECT fs_kode_kategori
			FROM tm_kategori
			WHERE fs_kode_kategori = '".trim($sKode)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKategoriAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_kategori
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_nama_kategori LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKategori($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_kategori
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_nama_kategori LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nama_kategori ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}