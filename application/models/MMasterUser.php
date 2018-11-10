<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MMasterUser extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function checkUser($sUser)
	{
		$xSQL = ("
			SELECT fs_username
			FROM tm_user
			WHERE fs_username = '".trim($sUser)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function checkAkses($sLevel)
	{
		$xSQL = ("
			SELECT fs_level 
			FROM tm_parlevel 
			WHERE fs_level = '".trim($sLevel)."'
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listUserAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_user
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_username LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listUser($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_user
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_username LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_username ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listLevelAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_parlevel
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listLevel($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_parlevel
		");
		
		$xSQL = $xSQL.("
			GROUP BY fs_level
			ORDER BY fs_level ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listActivityAll($sCari)
	{
		$xSQL = ("
			SELECT log_time, log_name, log_user, 
				log_message, ip_address
			FROM tb_log
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (log_user LIKE '%".trim($sCari)."%' 
					OR log_name LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listActivity($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT log_time, log_name, log_user, 
				log_message, ip_address
			FROM tb_log
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (log_user LIKE '%".trim($sCari)."%' 
					OR log_name LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY log_time DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}