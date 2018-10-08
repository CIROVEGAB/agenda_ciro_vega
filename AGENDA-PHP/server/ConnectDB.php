<?php

    class ConnectDB{

        private $host;
        private $user;
        private $password;
        private $connection;

        public function __construct($host, $user, $password){

            $this->host = $host;
            
            $this->user = $user;

            $this->password = $password;

        }

        public function initConnection($name_db){

            $this->connection = new mysqli($this->host, $this->user, $this->password, $name_db);

            if($this->connection->connect_errno){

                return 'Error: '.$this->connection->connect_error;

            } else return 'OK';
            
        }

        public function executeQuery($query){

            return $this->connection->query($query);

        }

        public function closeConnection(){

            $this->connection->close();

        }

        public function insertData($table, $data){

            $sql = "INSERT INTO {$table} (";
            $i = 1;

            foreach($data as $key => $value):
                
                $sql .= $key;

                if($i < count($data)){

                    $sql .= ', ';

                } else $sql .= ')';

                $i++;

            endforeach;

            $sql .= ' VALUES (';
            $i = 1;

            foreach($data as $key => $value):

                $sql .= "'{$value}'";

                if($i < count($data)){

                    $sql .= ', ';

                } else $sql .= ');';

                $i++;

            endforeach;

            return $this->executeQuery($sql);

        }

        public function updateRegister($table, $data, $condition){

            $sql = "UPDATE {$table} SET ";
            $i = 1;

            foreach($data as $key => $value):

                $sql .= "{$key} = '{$value}'";

                if($i < sizeof($data)){

                    $sql .= ', ';

                } else $sql .= " WHERE {$condition};";

                $i++;

            endforeach;

            return $this->executeQuery($sql);

        }

        public function deleteRegister($table, $condition){

            $sql = "DELETE FROM {$table} WHERE {$condition};";

            return $this->executeQuery($sql);

        }

        public function consultation($tables, $camps, $condition = ''){

            $sql = 'SELECT ';
            $last_key = end(array_keys($camps));

            foreach($camps as $key => $value):

                $sql .= $value;

                if($key != $last_key){

                    $sql .= ', ';

                } else $sql .= ' FROM ';

            endforeach;

            $last_key = end(array_keys($tables));

            foreach($tables as $key => $value):

                $sql .= $value;

                if($key != $last_key){

                    $sql .= ', ';

                } else $sql .= ' ';

            endforeach;

            if($condition == ''){

                $sql .= ';';

            } else $sql .= "{$condition};";

            return $this->executeQuery($sql);

        }
    }