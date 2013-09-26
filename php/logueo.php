<?php
//header('Content-Type: text/html; charset=UTF-8');
//ini_set('default_charset','UTF-8');
//define('CHARSET', 'ISO-8859-1');
//INCLUIMOS LAS LIBRERIAS 
require_once('conexion.php');
$usuario = $_GET['usr'];
$clave = $_GET['pas'];


$query_sql = "SELECT i.idinscripcion,nombres nombre,c.idcorredor FROM corredor c inner join inscripcion i on i.corredor_idcorredor = c.idcorredor WHERE activo != 0 and identificacion = '".$usuario."' and numero = '".$clave."'";
 //echo "$query_sql<br>";

$resultado = mysql_query($query_sql, $cx) or die("Error en: $query_sql: " . mysql_error()); /*$row_resultado = mysql_fetch_assoc($resultado); $totalRows_resultado = mysql_num_rows($resultado);*/
$total_filas = mysql_num_rows($resultado);
//echo "total filas: ".$total_filas;
//INICIALIZAMOS LA MATRIZ DE RESPUESTA
$geters = array();
//DEVUELVE la entrada
$object = new stdClass();
if ($total_filas == 0){
	$object->encontrado = "false";
}else{
	$object->encontrado = "true";
}
$geters[0] = $object;


while($fila = mysql_fetch_array($resultado, MYSQL_ASSOC))
{
	$object = new stdClass();
	$fila = array_map("utf8_encode", $fila); //echo print_r($fila)."<br><br><br><br>";
	$fila = array_map("utf8", $fila);//echo print_r($fila)."<br><br><br><br>"; 
	$object = (object)$fila;
	$geters[]= $object;
}

//$encodedArray = array_map("utf8_encode", $geters); 
//echo print_r($geters)."<br><br><br><br>";
 
echo json_encode($geters);

function utf8($a) {
return htmlentities($a,ENT_QUOTES,'UTF-8');  
}
?>
