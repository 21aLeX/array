<?php
$servername = "127.0.0.1";
$username = "postgres";
$password = "1";
$dbname ="test";

$dbconn = pg_connect("host=$servername port=5432 dbname=$dbname user=$username password=$password")
    or die('Не удалось соединиться: ' . pg_last_error());
initDB($dbconn);

if(isset($_POST['arr'])){
    $arr = explode(",", $_POST['arr']);
    $res = pg_query($dbconn, "INSERT INTO public.sorts DEFAULT VALUES RETURNING id");
    $row = pg_fetch_row($res);
    $new_id = $row[0];
    foreach ($arr as $value){
        $res = pg_query($dbconn, "INSERT INTO values (id_sort,value) VALUES ($new_id, $value)");
    }
    echo $new_id;
}


if(isset($_POST['id'])){
    $id =  $_POST['id'];  
    $res = pg_query($dbconn, "select value from values where id_sort=$id");
    $row = pg_fetch_all_columns($res);
    if(!$row){
        echo 'Такой сортировки нет';
    }
    else{
        $arr = '';
        foreach($row as $value){
            if($value != end($row)) $arr .=$value.',';
            else  $arr .=$value;
        }
        echo "Идентификатор: $id Массив: $arr";
    }
}

function initDB($dbconn){   
pg_query($dbconn, "CREATE TABLE IF NOT EXISTS sorts (
    id SERIAL NOT NULL PRIMARY KEY
);"); 

pg_query($dbconn, "CREATE TABLE IF NOT EXISTS values (
    id_sort INTEGER,
    value INTEGER,
	CONSTRAINT fk_id_sort FOREIGN KEY (id_sort) REFERENCES sorts (id));");
}
?>