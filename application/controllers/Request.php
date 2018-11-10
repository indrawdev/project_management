<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Request extends CI_Controller {

	public function index(){
		$this->load->view('vrequest');
	}

	public function select() {
		$this->db->trans_start();
		$this->load->model('MRequest');
		$sSQL = $this->MRequest->getKategori();
		$this->db->trans_complete();
		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode' => trim($xRow->fs_kode_kategori),
					'fs_nama' => trim($xRow->fs_nama_kategori)
				);
			}
		}
		echo json_encode($xArr);
	}

	public function getcount() {
		$this->load->model('MRequest');
		$counter = $this->MRequest->getCounter('REQUEST');
		return $counter->fn_counter;
	}

	public function setcount($new) {
		$request = $new + 1;
		$set = array(
			'fn_counter' => trim($request)
		);
		$where = "fs_jenis_counter = 'REQUEST'";
		$this->db->where($where);
		$this->db->update('tm_counter', $set);
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MRequest');
		$sSQL = $this->MRequest->listRequestAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MRequest->listRequest($sCari, $nStart, $nLimit);
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
					'sukses' => true,
					'hasil' => 'Apakah Anda ingin membuat baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => true,
				'hasil' => 'Data belum ada, apakah Anda ingin menambah baru?'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$nomor = $this->input->post('fs_nomor');
		$nama = $this->input->post('fs_nama_project');
		$tanggal = $this->input->post('fd_tanggal_deadline');
		$kategori = $this->input->post('fs_kode_kategori');
		$remark = $this->input->post('fs_remark');
		
		$update = false;
		$this->load->model('MRequest');
		$sSQL = $this->MRequest->checkProject($nomor);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_nama_project' => trim($nama),
			'fd_tanggal_deadline' => trim($tanggal),
			'fs_kode_kategori' => trim($kategori),
			'fs_remark' => trim($remark),
			'fs_kode_status' => 'I'
		);

		if ($update == false) {
			$new = $this->getcount();
			
			$dt1 = array(
				'fs_nomor' => trim($new),
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);

			$data = array_merge($dt, $dt1);
			$this->db->insert('tx_request', $data);

			// START LOGGING
			$this->load->model('MLog');
			$this->MLog->logger('REQUEST', $user, 'TAMBAH PROJECT ' . trim($new), '');
			// END LOGGING

			// UPDATE COUNTER
			$this->setcount($new);

			$hasil = array(
				'sukses' => true,
				'nomor' => trim($new),
				'hasil' => 'Simpan Data Project Baru, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);

			$data = array_merge($dt, $dt2);
			$where = "fs_nomor = '".trim($nomor)."'";
			$this->db->where($where);
			$this->db->update('tx_request', $data);

			// START LOGGING
			$this->load->model('MLog');
			$this->MLog->logger('REQUEST', $user, 'EDIT PROJECT ' . trim($nomor), '');
			// END LOGGING

			$hasil = array(
				'sukses' => true,
				'nomor' => trim($nomor),
				'hasil' => 'Update Data Project '.trim($nomor).', Sukses!!'
			);
			echo json_encode($hasil);
		}

	}
}
