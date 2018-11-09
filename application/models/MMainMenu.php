<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MMainMenu extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	public function loadMenu()
	{
		$xSQL = ("
			SELECT fs_kd_child, fs_kd_parent, 
				fs_nm_menu, fs_nm_form, fs_nm_formweb
			FROM tg_menu
			ORDER BY id_menu, fs_kd_child, fs_kd_parent ASC
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function loadMenu1($sLevel)
	{
		$xSQL = ("
			SELECT a.fs_kd_parent, a.fs_kd_child, 
				a.fs_nm_menu, a.fs_nm_form, a.fs_nm_formweb,
			CASE IFNULL((SELECT h.fs_kd_parent FROM	tm_parlevel h WHERE h.fs_kd_parent = a.fs_kd_parent
			AND	h.fs_kd_child = a.fs_kd_child AND h.fs_index = '1' AND	h.fs_level = '".trim($sLevel)."'), '') WHEN '' THEN 'false' ELSE 'true' END fb_tambah FROM tg_menu a
			ORDER BY a.fs_kd_parent, a.fs_kd_child
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
	
	public function LoadMenu2($sLevel)
	{
		$xSQL = ("
			SELECT DISTINCT a.fs_kd_child, b.fs_kd_parent, 
				b.fs_nm_menu, b.fs_nm_formweb
			FROM tm_parlevel a
			INNER JOIN tg_menu b 
			ON a.fs_kd_child = b.fs_kd_child AND a.fs_kd_parent = b.fs_kd_parent 
			WHERE a.fs_level = '".trim($sLevel)."'
			ORDER BY b.id_menu, b.fs_kd_child, b.fs_kd_parent ASC
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}