<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MLog extends CI_Model {

	public function logger($logname, $loguser, $logmessage)
	{
		$data = array(
			'log_time' => date('Y-m-d H:i:s'),
			'log_name' => strtoupper($logname),
			'log_user' => strtoupper($loguser),
			'log_message' => strtoupper($logmessage),
			'ip_address' => $_SERVER['REMOTE_ADDR']
		);
		$this->db->insert('tb_log', $data);
	}

	public function listLogAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tb_log
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (log_name LIKE '%".trim($sCari)."%' 
					OR log_message LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listLog($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tb_log
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (log_name LIKE '%".trim($sCari)."%' 
					OR log_message LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY log_time DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}