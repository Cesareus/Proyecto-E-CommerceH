<?php


	class Conectar{

		protected $dbhost;
		

			protected function Connection(){
				try{
					$cnn = $this->dbhost = new PDO("mysql:local=localhost;dbname=e_commerce","cesar","cesar");
					return $cnn;
	
				}catch(Exception $e){
					print "¡Error BD!: " . $e->getMessage() . "<br/>";
					die();
				}finally{
					$this->conexion = null;
				}		
			}

		
		public function set_names(){
			return $this->dbhost->query("SET NAMES 'utf8'");
			#Ésta clase es para no tener problemas con las mayúsculas y con las ñ
		}
	}
?>