
$(document).ready(function() {
  $.ajax({
		url: 'https://talyx.com.ar/assets/mvc/controller/Users.php?op=checkAdminSession',
		success: function(data) {
			console.log(data);
		  if (data === false || data ==="false") {
			console.log("hola");
			window.location=("https://talyx.com.ar")
		  }
		}
	  })
});