
$(document).ready(function() {
  $.ajax({
		url: './assets/mvc/controller/Users.php?op=checkAdminSession',
		success: function(data) {
			console.log(data);
		  if (data === false || data ==="false") {
			console.log("hola");
			window.location=("http://localhost/hunteando6/Proyecto-E-CommerceH")
		  }
		}
	  })
});