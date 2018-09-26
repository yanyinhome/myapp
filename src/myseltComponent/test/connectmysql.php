<?php
    $config=array(
        'host' =>'fopuxa8s.2318.dnstoo.com:5509',
        'port'=>'5509',
        'db_user' =>'danzhu0909_f',
        'db_psw' =>'danzhu123',
        'db_name' =>'danzhu0909'
    );
    $connID=mysql_connect($config['host'],$config['db_user'],$config['db_psw']);
    if(!$connID){
        echo("23");
    }
    echo("123")
?>