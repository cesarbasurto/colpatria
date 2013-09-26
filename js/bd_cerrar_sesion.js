/**
 * @author Juan Pablo Garzón
 **/
var db = window.openDatabase("bdmmb", "1.0", "Proyecto media maraton de bogota", 200000);

function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
}
function successCB() {
    //alert("Ok!");
}

function TBLusuario(tx) {//Si no existe crea la talba USUARIOS	//tx.executeSql('DELETE TABLE IF EXISTS "usuario"');
	//tx.executeSql('DROP TABLE IF EXISTS usuario');
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuario ("id" CHAR NOT NULL,"idinscripcion" CHAR NOT NULL,"nombre" CHAR NOT NULL,"usuario" CHAR NOT NULL,"contrasegna" CHAR NOT NULL,"activo" CHAR NOT NULL)');
}


/* CERRAR SESION */
function EliminaUsr(tx) {	//
	db.transaction(TBLusuario); //Crea la tabla
	db.transaction(EliminaUsrConsulta,errorCB);			//Consulta Usuario en la bse de datos
}
/* CERRAR SESION */
function EliminaUsrConsulta(tx) {
	tx.executeSql('DELETE from usuario');
	localStorage.clear();
	window.location = "index.html";
}
