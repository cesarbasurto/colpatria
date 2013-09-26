<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname = "www.sofytek.com";
$database = "sofytekc_run";
$username = "sofytekc_gis";
$password = "g304zul";
$cx = mysql_connect($hostname, $username, $password) or trigger_error(mysql_error(),E_USER_ERROR);
mysql_select_db($database, $cx); 
?>