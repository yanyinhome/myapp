<?php
    $config=array(
        'host' =>'bdm277018558.my3w.com',
        'port'=>'5509',
        'db_user' =>'bdm277018558',
        'db_psw' =>'ybybwbs518',
        'db_name' =>'danzhu0909'
    );
    $connID=mysql_connect($config['host'],$config['db_user'],$config['db_psw']);
    if(!$connID){
        echo("23");
    }
    echo("123")
?>