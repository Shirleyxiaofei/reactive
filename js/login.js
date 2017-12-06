if( localStorage.getItem('token')){
	$("body").html(localStorage.getItem('username') +"您已经登录成功，请不要重复登录");
	setTimeout(function(){
		location.href = 'index.html';
	},2000)
}

$(function(){
	var str = location.search.substr(1);
	console.log(str);
	if(str === ""){
		
		$('#inputUsername').focus(function() {
			$(".textwarp").siblings().eq(0).css("visibility", "visible");
		})
		$('#inputUsername').blur(function() {
			$(".textwarp").siblings().eq(0).css("visibility", "hidden");
		})
		$('#inputPassword').focus(function() {
			$(".textwarp").siblings().eq(1).css("visibility", "visible");
		})
		$('#inputPassword').blur(function() {
			$(".textwarp").siblings().eq(1).css("visibility", "hidden");
		})
		$("#login-login").click(function() {
			
			var username = $('#inputUsername').val();
			var password = $('#inputPassword').val();
			//					console.log( username,password);
		
			$.ajax({
				"type": "POST",
				"url": "http://h6.duchengjiu.top/shop/api_user.php",
				"data": {
					"status": "login",
					"username": username,
					"password": password
				},
				"dataType": "json",
				"success": function(obj) {
					console.log(obj);
					//判断返回状态  输出返回状态
					if(obj.code === 1000) {
						$(".textwarp").siblings().eq(0).html("请填写3-20位的英文数字下划线用户名").css({ "visibility": "visible", "color": "red" });
					} else {
						$(".textwarp").siblings().eq(1).html(obj.message).css({ "visibility": "visible", "color": "red" });
					}
					//当登录成功的时候
					if(obj.code === 0) {
		
						$(".textwarp").siblings().eq(1).html("用户名验证成功").css({ "visibility": "visible", "color": "green" });
		
						var data = obj.data;
						
						for(prop in data) {
							if(data.hasOwnProperty(prop)) {
								localStorage.setItem(prop, data[prop])
							}
						}
						
						//判断有callback则跳转到置顶的callbackURL页面，否则跳到首页
						var callbackURL = location.hash.substr(10);
						console.log(callbackURL);
						
						if (callbackURL) {
							location.href = callbackURL;
						}else{
							location.href = "index.html";
						}
		
					}
		
				}
			});
		
		})
	}else{
		var loginCat = str.split("=");
//		console.log(loginCat);
		var catId = loginCat[2];
		var regname = loginCat = loginCat[1].split("&");
		var logininputusername = document.querySelector("#inputUsername");
//		console.log(logininputusername);
		logininputusername.value = catId;
		var str = location.search.substr(1);
		$('#inputUsername').focus(function() {
			$(".textwarp").siblings().eq(0).css("visibility", "visible");
		})
		$('#inputUsername').blur(function() {
			$(".textwarp").siblings().eq(0).css("visibility", "hidden");
		})
		$('#inputPassword').focus(function() {
			$(".textwarp").siblings().eq(1).css("visibility", "visible");
		})
		$('#inputPassword').blur(function() {
			$(".textwarp").siblings().eq(1).css("visibility", "hidden");
		})
		$("#login-login").click(function() {
			
			var username = $('#inputUsername').val();
			var password = $('#inputPassword').val();
			//					console.log( username,password);
		
			$.ajax({
				"type": "POST",
				"url": "http://h6.duchengjiu.top/shop/api_user.php",
				"data": {
					"status": "login",
					"username": username,
					"password": password
				},
				"dataType": "json",
				"success": function(obj) {
					console.log(obj);
					//判断返回状态  输出返回状态
					if(obj.code === 1000) {
						$(".textwarp").siblings().eq(0).html("请填写3-20位的英文数字下划线用户名").css({ "visibility": "visible", "color": "red" });
					} else {
						$(".textwarp").siblings().eq(1).html(obj.message).css({ "visibility": "visible", "color": "red" });
					}
					//当登录成功的时候
					if(obj.code === 0) {
		
						$(".textwarp").siblings().eq(1).html("用户名验证成功").css({ "visibility": "visible", "color": "green" });
		
						var data = obj.data;
						
						for(prop in data) {
							if(data.hasOwnProperty(prop)) {
								localStorage.setItem(prop, data[prop])
							}
						}
						
						//判断有callback则跳转到置顶的callbackURL页面，否则跳到首页
						var callbackURL = location.hash.substr(10);
						console.log(callbackURL);
						
						if (callbackURL) {
							location.href = callbackURL;
						}else{
							location.href = "index.html";
						}
		
					}
		
				}
			});
		})	
	}
			
})


