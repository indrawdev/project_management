<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MMasterStatus extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function checkStatus($sKode)
	{
		$xSQL = ("
			SELECT fs_kode_status
			FROM tm_status
			WHERE fs_kode_status = '".trim($sKode)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listStatusAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_status
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_nama_status LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listStatus($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_status
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_nama_status LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nama_status ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}