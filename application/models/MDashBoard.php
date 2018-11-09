<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MDashBoard extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function getDaily() 
	{
		$xSQL = ("
			SELECT fd_tanggal_bayar, SUM(fn_total_bayar) as fn_total_bayar
			FROM tx_pembayaran
			WHERE MONTH(fd_tanggal_bayar) = MONTH(CURRENT_DATE())
		");

		$xSQL = $xSQL.("
			GROUP BY fd_tanggal_bayar
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getMonthly() 
	{
		$xSQL = ("
			SELECT fd_tanggal_bayar, SUM(fn_total_bayar) as fn_total_bayar
			FROM tx_pembayaran
			WHERE YEAR(fd_tanggal_bayar) = YEAR(CURRENT_DATE())
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tanggal_bayar)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getPercent() 
	{
		$xSQL = ("
			SELECT COUNT(fs_untuk_bayar) as fn_jumlah, CASE fs_untuk_bayar
				WHEN 'd' THEN 'DEPOSIT'
				WHEN 'o' THEN 'OBAT'
				WHEN 'p' THEN 'PERAWATAN' END as fs_untuk_bayar
			FROM tx_pembayaran
		");

		$xSQL = $xSQL.("
			GROUP BY fs_untuk_bayar
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}