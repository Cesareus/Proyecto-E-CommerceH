<?php


	class Conectar{

		protected $dbhost;
		

			protected function Conexion(){
				try{
					$conectar = $this->dbhost = new PDO("mysql:local=localhost;dbname=e_commerce;port=3310;","cesar","cesar");
					return $conectar;
	
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