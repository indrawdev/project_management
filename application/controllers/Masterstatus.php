<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masterstatus extends CI_Controller {

	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmasterstatus');
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterStatus');
		$sSQL = $this->MMasterStatus->listStatusAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterStatus->listStatus($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_status' => trim($xRow->fs_kode_status),
					'fs_nama_status' => trim($xRow->fs_nama_status)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksave() {
		$kode = $this->input->post('fs_kode_status');

		if (!empty($kode)) {
			$this->load->model('MMasterStatus');
			$sSQL = $this->MMasterStatus->checkStatus($kode);

			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Data Status sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Data Status belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => true,
				'hasil' => 'Data Status belum ada, apakah Anda ingin menambah baru?'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$kode = $this->input->post('fs_kode_status');
		$nama = $this->input->post('fs_nama_status');

		$update = false;
		$this->load->model('MMasterStatus');
		$sSQL = $this->MMasterStatus->checkStatus($kode);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_status' => trim($kode),
			'fs_nama_status' => trim($nama)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);

			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_status', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Status Baru, Sukses!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);

			$data = array_merge($dt, $dt2);
			$where = "fs_kode_status = '".trim($kode)."'";
			$this->db->where($where);
			$this->db->update('tm_status', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Data Status, Sukses!'
			);
			echo json_encode($hasil);
		}
	}
}
