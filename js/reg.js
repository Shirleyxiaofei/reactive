$(function(){
	
	$('#inputUsername').focus(function() {
		$(".textwarp").siblings().eq(0).css("visibility", "visible");
		$(".login-name-error").hide();
		$(".login-name-success").hide();
		$(".login-name-had").hide();
	})
	$('#inputUsername').blur(function() {
		$(".textwarp").siblings().eq(0).css("visibility", "hidden");
	})
	$('#inputPassword').focus(function() {
		$(".textwarp").siblings().eq(4).css("visibility", "visible");
		$(".login-pass-error").hide();
		$(".login-pass-success").hide();
	})
	$('#inputPassword').blur(function() {
		$(".textwarp").siblings().eq(4).css("visibility", "hidden");
	})
	$('#inputRePassword').focus(function() {
		$(".textwarp").siblings().eq(7).css("visibility", "visible");
		$(".login-repass-error").hide();
		$(".login-repass-success").hide();
	})
	$('#inputRePassword').blur(function() {
		$(".textwarp").siblings().eq(7).css("visibility", "hidden");
	})
	
	$("#inputUsername").change(function(){
//		console.log(1);
		
		var username = $("#inputUsername").val();
		$.ajax({
			"type": "POST",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "check",
				"username": username
			},
			"dataType": "json",
			"success": function(response){
//				console.log(username)
				var re = /^[a-zA-Z0-9_-]{4,20}$/;
				if(response.message === "用户名已存在"){
					$(".login-name-had").show();
					$(".login-name-success").hide();
					$(".login-name-error").hide();
				}else if(username === ""){
					$(".login-name-success").hide();
					$(".login-name-error").hide();
					$(".login-name-had").hide();
				}else if(!re.test(username)){
					$(".login-name-success").hide();
					$(".login-name-had").hide();
					$(".login-name-error").show();
				}else if(re.test(username)&&response.message != "用户名已存在"){
					$(".login-name-success").show();
					$(".login-name-error").hide();
					$(".login-name-had").hide();
				}
			}
		})
		
		
	})
	$("#inputPassword").change(function(){
//		console.log(1);
		
		var password = $("#inputPassword").val();
		$.ajax({
			"type": "POST",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "check",
				"password": password
			},
			"dataType": "json",
			"success": function(response){
//				console.log(password)
				var re = /^[a-zA-Z0-9]\w{5,20}$/;
				if(password === ""){
					$(".login-pass-success").hide();
					$(".login-pass-error").hide();
				}else if(!re.test(password)){
					$(".login-pass-success").hide();
					$(".login-pass-error").show();
				}else{
					$(".login-pass-success").show();
					$(".login-pass-error").hide();
				}
			}
		})
		
		
	})
	$("#inputRePassword").change(function(){
//		console.log(1);
		
		var repassword = $("#inputRePassword").val();
		var password = $("#inputPassword").val();
//		console.log(repassword)
		$.ajax({
			"type": "POST",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "check",
				"password": password,
				"repassword": repassword
			},
			"dataType": "json",
			"success": function(response){
//				console.log(password)
				
				if(repassword === ""){
					$(".login-repass-success").hide();
					$(".login-repass-error").hide();
				}else if(repassword === password){
					$(".login-repass-success").show();
					$(".login-repass-error").hide();
				}else{
					$(".login-repass-success").hide();
					$(".login-repass-error").show();
				}
			}
		})
		
		
	})
	$("#register").click(function(){
		var username = $("#inputUsername").val();
		var password = $("#inputPassword").val();
		var repassword = $("#inputRePassword").val();
//		console.log(username,password,repassword)
		if(username==""){
			alert("请输入用户名");
			return;
		}else if(password==""){
			alert("请输入密码");
			return;
		}else if(repassword==""){
			alert("请输入重复密码");
			return;
		}else if(password!==repassword){
			alert("重复密码必须和密码一样!");
			return;
		}else if(password.length < 6 || password.length > 20){
			alert("密码长度应该是6-20位");
			return;
		}
		
		
		$.ajax({
			"type": "POST",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "register",
				"username": username,
				"password": password
			},
			"dataType": "json",
			"success": function(response){
//				
				$(".login-success").html(response.message);
				var callbackURL = location.hash.substr(10);
				
				
				if(callbackURL){
					location.href = callbackURL;
				}else{
//					console.log(username)
					var timer = setInterval(function(){
							location.href = 'login.html?password='+password+'&username='+username;
					},2000)
					
				}
				
			}
		});
		
	})
})
