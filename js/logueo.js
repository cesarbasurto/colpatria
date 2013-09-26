/**
 * @author JUAN PABLO GARZON DUEÑAS
 */
$(window).load(function () {
	
		
		var idcorredor = localStorage.idcorredor;		 	
		var nombre = localStorage.nombre;
		var idinscripcion = localStorage.idinscripcion;	//alert("Nombre: "+nombre+"   Insss: "+idinscripcion);
		if (nombre != null && nombre != "" && idinscripcion != null && idinscripcion != "") window.location = "main.html";
		db.transaction(BuscaUsuario);
});
$(document).ready(function(){		
	
	$("#submit").click(function() {

		var usr = $("#login").val();
		var pas = $("#password").val();
		if (usr== ""){
			alert("Digite usuario por favor")
			$("#login").focus();
			return;
		}
		if (pas== ""){
			alert("Digite clave por favor")
			$("#password").focus();
			return;
		}

		$.ajax({
			url:'/cpt/php/logueo.php?usr='+usr+'&pas='+pas,
			dataType: 'json',
			success: function(data){
				if (data[0].encontrado == "true"){
				 	var idinscripcion = data[1].idinscripcion;
				 	var nombre = data[1].nombre;
				 	var idcorredor = data[1].idcorredor;
				 	
				 	localStorage.idinscripcion=idinscripcion;
				 	localStorage.nombre=nombre;
				 	localStorage.idcorredor=idcorredor;
				 	
				 	//alert( "nombre = " + sessionStorage.getItem("nombre"));	//nombre
					$("#nombre").text('Bienvenido '+nombre);
					$("#equivocado").text('Ingreso exitoso,espere por favor..');
					db.transaction(AlmacenaUsr);
					
				}else{
					$("#equivocado").text('Usuario o contraseña no valido!');
				}
						 // $.each(data,function(index){}); 
			}
		})
	});
})