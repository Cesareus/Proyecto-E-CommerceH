<?php


	class Conectar{

		protected $dbhost;
		protected $connect;
		

			protected function Connection(){
				try{
					$conectar = $this->dbhost = new PDO("mysql:local=localhost;dbname=e_commerce;port=3310;","cesar","cesar");
					return $conectar;
	
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