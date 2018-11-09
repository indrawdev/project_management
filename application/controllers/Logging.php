<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Logging extends CI_Controller {

	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vlogging');
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MLog');
		$sSQL = $this->MLog->listLogAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MLog->listLog($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'log_time' => trim($xRow->log_time),
					'log_name' => trim($xRow->log_name),
					'log_user' => trim($xRow->log_user),
					'log_message' => trim($xRow->log_message),
					'ip_address' => trim($xRow->ip_address)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

}