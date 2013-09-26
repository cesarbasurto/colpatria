/**
 * @author Juan Pablo Garzón
 **/
var db = window.openDatabase("bd", "1.0", "Proyecto colpatria", 200000);

function atleta(id,cedula,nombre,categoria,sexo,serie,hora,asistencia,tiempo){
this.id=id;
this.cedula=cedula;
this.nombre=nombre;
this.categoria=categoria;
this.sexo=sexo;
this.serie=serie;
this.hora=hora;
this.asistencia=asistencia;
this.tiempo=tiempo;
}


var atletas = new Array();

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
	tx.executeSql('DROP TABLE IF EXISTS usuario');
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuario ("id" CHAR NOT NULL,"cedula" CHAR NOT NULL,"nombre" CHAR NOT NULL,"categoria" CHAR NOT NULL,"sexo" CHAR NOT NULL,"serie" CHAR NOT NULL,"hora" CHAR NOT NULL,"asistencia" CHAR NOT NULL,"tiempo" CHAR NOT NULL)');
}


/* LOGUEADO EXITOSAMENTE*/
function AlmacenaUsr(tx) {	//
	db.transaction(TBLusuario); //Crea la tabla
	db.transaction(AlmacenaUsrConsulta);			//Consulta Usuario en la bse de datos
}
/* LOGUEADO EXITOSAMENTE*/
function AlmacenaUsrConsulta(tx) {
	
	var url="http://localhost:8077/cpt/php/bd_consultar.php";
	$.getJSON(url,function(json){
		// loop through the members here
		var i=0;
		$.each(json.members,function(i,dat){
			atletas[i]=new atleta(dat.id,dat.cedula,dat.nombre,dat.categoria,dat.sexo,dat.serie,dat.hora,dat.asistencia,dat.tiempo);
			i++;
			
		});
		db.transaction(InsertBD);
	});
	
	
}
function InsertBD(tx) {
	console.log("hello");
	console.log(atletas.length);
	for (var i=0;i<atletas.length;i++){	
		tx.executeSql('INSERT INTO usuario (id,cedula,nombre,categoria,sexo,serie,hora,asistencia,tiempo) values'+ 
		'("'+atletas[i].id+'","'+atletas[i].cedula+'","'+atletas[i].nombre+'","'+atletas[i].categoria+'","'+atletas[i].sexo+
		'","'+atletas[i].serie+'","'+atletas[i].hora+'","'+atletas[i].asistencia+'","'+atletas[i].tiempo+'")');
	}
	delete atletas;
}



/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function BuscaUsuario(tx) {
	//db.transaction(TBLusuario, errorCB); //Crea la tabla
	//db.transaction(BuscaUsuarioConsulta);			//Consulta Usuario en la bse de datos
}

/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function CargarAtletas(tx) {
	var busqueda=localStorage.busqueda;
	if(busqueda!=null){
	    tx.executeSql("SELECT * FROM usuario where cedula like '%"+busqueda+"%' or id like '%"+busqueda+"%' or nombre like '%"+busqueda+"%'", [], MuestraItems);
   }
}
/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function MuestraItems(tx, results) {
    var li = "";
	 	li += '<li data-role="searchpage-list">Resultados <span class="ui-li-count">2</span></li>';
			
    for (var i=0;i<results.rows.length;i++)
	{

	 	var id = results.rows.item(i).id;
	 	var nombre = results.rows.item(i).nombre;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	var cedula = results.rows.item(i).cedula;
	 	var hora = results.rows.item(i).hora;
	 	
//	 	var asistio = results.rows.item(i).asistio;
	    li += "<li>"+
			"<a href='#'>"+
			    	"<div class='ui-block'>"+
				        "<h2>"+nombre+"</h2>"+
				        "<p><strong>CC: "+cedula+"</strong></p>"+
				        "<p>"+hora+"</p>"+
				        "<h2>"+id+"</h2>"
					"</div>"+
			  "</a>"+
		"</li>";
    }
    	
	$("ul#searchpage-list").empty().append(li).listview("refresh");

}
