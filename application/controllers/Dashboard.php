<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vdashboard');
	}

	public function done() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->getDone();
		$xTotal = $sSQL->num_rows();
		$xArr = array();

		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'name' => trim(substr($xRow->bulan, 0, 3)),
					'value' => trim($xRow->jumlah)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function progress() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->getProgress();
		$xTotal = $sSQL->num_rows();
		$xArr = array();

		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'name' => trim(substr($xRow->bulan, 0, 3)),
					'value' => trim($xRow->jumlah)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function problem() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->getProblem();
		$xTotal = $sSQL->num_rows();
		$xArr = array();

		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'name' => trim(substr($xRow->bulan, 0, 3)),
					'value' => trim($xRow->jumlah)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function failed() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->getFailed();
		$xTotal = $sSQL->num_rows();
		$xArr = array();

		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'name' => trim(substr($xRow->bulan, 0, 3)),
					'value' => trim($xRow->jumlah)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
}
