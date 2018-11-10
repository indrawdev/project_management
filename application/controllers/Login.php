<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	public function __construct() {
		parent::__construct();
	}

	public function index() {
		$this->load->view('vlogin');
	}

	public function buat_captcha() {
		$this->load->helper('captcha');
		$this->load->database();
		
		$vals = array(
			'expiration' => 3600,
			'word_length' => 3,
			'img_height' => 70,
			'font_size' => 20,
			'font_path' => FCPATH . '/assets/css/font/comic.ttf',
			'img_path' => './temp/captcha/',
			'img_url' => './temp/captcha/',
			'img_width' => 270,
			'expiration' => 7200,
			'pool' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		);

		$cap = create_captcha($vals);
		
		if ($cap) {
			$data = array(
				'captcha_time' => round($cap['time']),
				'ip_address' => $this->input->ip_address(),
				'word' => $cap['word']
			);
			
			$this->db->insert('captcha', $data);
			$this->session->set_userdata('vcpt', round(trim($cap['time'])));
			$pathfile = base_url('/temp/captcha/'.trim($cap['time']).'.jpg');

			$hasil = array(
				'src' => $pathfile
			);
			echo json_encode($hasil);
		}
	}

	public function ceklogin() {
		$this->load->library('form_validation');
		$this->form_validation->set_rules('txtUserName', 'Username', 'trim|required');
		$this->form_validation->set_rules('txtUserPass', 'Password', 'trim|required');
		$this->form_validation->set_rules('txtCaptcha', 'CAPTCHA', 'trim|required');
		
		if ($this->form_validation->run() == FALSE) {
			echo "Username atau Password Salah!....";
		} else {
			$this->load->database();
			$word = trim($this->input->post('txtCaptcha'));
			
			$exp = time() - 3600;
			$where = "captcha_time < '".trim($exp)."'";
			$this->db->where($where);
			$this->db->delete('captcha');
			
			$this->load->model('MLogin');
			$sSQL = $this->MLogin->checkCaptcha($word);
			$sSQL = $sSQL->row();
			$jml = $sSQL->fn_jml;

			if ($jml > 0) {
				$xusername = str_replace("'",'"',trim($this->input->post('txtUserName')));
				$xuserpass = str_replace("'",'"',trim($this->input->post('txtUserPass')));
				
				$username = strtoupper($xusername);
				$userpass = strtoupper($xuserpass);

				// ENCYRPT MD5
				$xpass = md5($userpass.$username);
				// CHECK USER & PASSWORD
				$this->load->model('MLogin');
				$sSQL = $this->MLogin->validUserPass($username, $xpass);

				if (!empty($sSQL)) {
					// SET SESSION
					$session = array(
						'login'	=> TRUE,
						'username' => $this->encryption->encrypt($sSQL->fs_username),
						'password' => $this->encryption->encrypt($sSQL->fs_password),
						'leveluser' => $this->encryption->encrypt($sSQL->fs_level_user)
					);
					$this->session->set_userdata($session);

					// UPDATE LAST LOGIN
					$data = array(
						'fd_last_login' => date('Y-m-d H:i:s'),
						'fs_ip_address' => $this->input->ip_address()
					);
					$where = "fs_username = '".trim($username)."'";
					$this->db->where($where);
					$this->db->update('tm_user', $data);

					// START LOGGING
					$this->load->model('MLog');
					$this->MLog->logger('LOGIN', $username, 'MASUK KE SISTEM PROJECTS');
					// END LOGGING

					$json = array('success' => true);
					echo json_encode($json);
				} else {
					echo "User Name or Password Incorrect...";
				}
			} else {
				echo "Captcha Incorrect....";
			}
		}
	}

	public function logout() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		
		// START LOGGING
		$this->load->model('MLog');
		$this->MLog->logger('LOGOUT', $user, 'KELUAR DARI SISTEM PROJECTS');
		// END LOGGING

		$this->session->sess_destroy();

		$json = array('success' => true);
		echo json_encode($json);
	}

}
