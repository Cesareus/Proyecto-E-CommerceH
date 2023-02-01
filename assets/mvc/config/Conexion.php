<?php


	class Conectar{

		protected $dbhost;
		protected $connect;
		

			protected function Connection(){
				try{
					$connect = $this->dbhost = new PDO("mysql:local=localhost;dbname=e_commerce;port=3306;","cesar","cesar");
					return $connect;
	
				}catch(Exception $e){
					print "¡Error BD!: " . $e->getMessage() . "<br/>";
					die();
				}finally{
					$this->connect = null;
				}		
			}

		
		public function set_names(){
			return $this->dbhost->query("SET NAMES 'utf8'");
			#Ésta clase es para no tener problemas con las mayúsculas y con las ñ
		}
	}
?>