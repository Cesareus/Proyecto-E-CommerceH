<?php


	class Conectar{

		protected $dbhost;
		protected $conectar;
		

			protected function Connection(){
				try{
					$conectar = $this->dbhost = new PDO("mysql:local=localhost;dbname=e_commerce;port=3306;","cesar","cesar"); //root ""
					return $conectar;
	
				}catch(Exception $e){
					print "¡Error BD!: " . $e->getMessage() . "<br/>";
					die();
				}finally{
					$this->conectar = null;
				}		
			}

		
		public function set_names(){
			return $this->dbhost->query("SET NAMES 'utf8'");
			#Ésta clase es para no tener problemas con las mayúsculas y con las ñ
		}
	}
?>