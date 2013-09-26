<? 
//header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 5000);
	require_once('conexion.php'); 

//$idusr = $_GET['idinscripcion'];


	mysql_select_db($database, $cx);
//echo "INSERT INTO `rutas` (`idusuario`,  `latitud`,  `longitud`, `tiempo`) VALUES ($idusr ,$lat ,$lon, '$tiempo')";


	$resultado = mysql_query(/*"
		select id,cedula,nombre,categoria,sexo,serie,hora,asistencia,tiempo
		from colpatria"*/
		"select *
		from colpatria
		union all
		select *
		from colpatria
		union all
		select *
		from colpatria
		union all
		select *
		from colpatria
		union all
		select *
		from colpatria"
	);
	
	while($obj = mysql_fetch_object($resultado)) {
	$arr[] = $obj;
	}
	echo '{"members":'.json_encode($arr).'}';
?>
