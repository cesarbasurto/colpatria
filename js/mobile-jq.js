// Start with the map page

/*document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#mappage')){
        e.preventDefault();
        navigator.app.exitApp();
    }
    else {
        navigator.app.backHistory();
    }
}, false);*/
$(window).load(function () {
		var idcorredor = localStorage.idcorredor;		 	
		var nombre = localStorage.nombre;
		var idinscripcion = localStorage.idinscripcion;	//alert("Nombre: "+nombre+"   Insss: "+idinscripcion);
		//if (nombre != null && nombre != "" && idinscripcion != null && idinscripcion != "") window.location = "main.html";
		db.transaction(AlmacenaUsr);
		db.transaction(CargarAtletas);
		
});

$(document).ready(function() {
    $("#bcerrar_sesion").click(function(){
    	db.transaction(EliminaUsr);
    });
    
	
    $("#searchpage-list").on( "listviewbeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
        $ul.html( "" );
        if ( value && value.length > 2 ) {
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            localStorage.busqueda=$input.val();
	    	db.transaction(CargarAtletas);
            $ul.listview( "refresh" );
            $ul.trigger( "updatelayout");
            $ul.click(function() {
            	console.log("hello");
            	
			  	$("#popupDialog").popup("open", {
					transition : "slideup"
				});
			});
        }
        
    });

});

