<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Management extends CI_Controller {

	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmanagement');
	}

	public function select() {
		$this->db->trans_start();
		$this->load->model('MRequest');
		$sSQL = $this->MRequest->getStatus();
		$this->db->trans_complete();
		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode' => trim($xRow->fs_kode_status),
					'fs_nama' => trim($xRow->fs_nama_status)
				);
			}
		}
		echo json_encode($xArr);
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MManagement');
		$sSQL = $this->MManagement->listRequestAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MManagement->listRequest($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_nomor' => trim($xRow->fs_nomor),
					'fs_nama_project' => trim($xRow->fs_nama_project),
					'fd_tanggal_deadline' => trim($xRow->fd_tanggal_deadline),
					'fs_kode_kategori' => trim($xRow->fs_kode_kategori),
					'fs_nama_kategori' => trim($xRow->fs_nama_kategori),
					'fs_remark' => trim($xRow->fs_remark),
					'fs_assign_to' => trim($xRow->fs_assign_to),
					'fs_kode_status' => trim($xRow->fs_kode_status),
					'fs_nama_status' => trim($xRow->fs_nama_status)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksave() {
		$nomor = $this->input->post('fs_nomor');

		if (!empty($nomor)) {
			$this->load->model('MRequest');
			$sSQL = $this->MRequest->checkProject($nomor);

			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => false,
					'hasil' => 'Nomor tidak ada dalam daftar'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Data, Gagal'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$nomor = $this->input->post('fs_nomor');
		$status = $this->input->post('fs_kode_status');
		$remark = $this->input->post('fs_remark');
		$assign = $this->input->post('fs_assign_to');

		$this->load->model('MRequest');
		$sSQL = $this->MRequest->checkProject($nomor);

		if ($sSQL->num_rows() > 0) {
			$data = array(
				'fs_kode_status' => trim($status),
				'fs_remark' => trim($remark),
				'fs_assign_to' => trim($assign),
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$where = "fs_nomor = '".trim($nomor)."'";
			$this->db->where($where);
			$this->db->update('tx_request', $data);

			$hasil = array(
				'sukses' => true,
				'nomor' => trim($nomor),
				'hasil' => 'Update Data Project '.trim($nomor).', Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan Data!!'
			);
			echo json_encode($hasil);
		}
	}
}
