$(function(){
	
	$(".myShopCart a").click(function (event) {
		event.preventDefault();
		 token ();
	});
	
	$(".language a").click(function (event) {
		event.preventDefault();
		token ();
	})
	
	var isPc = function() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}

	
	function token () {
		//判断是否登录状态
		if ( !localStorage.getItem("token") ) {
			alert("请登录后使用购物车功能！")
			location.href = "login.html#callback=" + location.href;
				return;
		}else{
			location.href = "shop.html";
		}
	}

		
	
	var str = location.search.substr(1);
	var goodsId = str.split("="); //用分割方法得到 = 号两边内容
//	console.log(goodsId[1]); //用下标找到id的值
	
	//登录判断
	if (localStorage.getItem("token")) {
		$(" .center-block li").eq(0).html("");
		$(" .center-block li").eq(1).html("");
		$(" .center-block li").eq(2).html('<a href="msg.html">'+localStorage.getItem("username")+'</a>'+
		'<em class="user"><i class="SignOut">退出</i><a href="msg.html">个人信息</a></em> ');
	}
	if (!isPc()) {
		var idx = 1
		$(".regSelect").on('touchstart',function(event){
			event.preventDefault();
			event.stopPropagation();
			if (idx === 1) {
				$(".user").css("display","block");
			}else if(idx === 0){
				$(".user").css("display","none");
				
			}
		});
		$(".regSelect").on('touchend',function(event){
			event.preventDefault();
//			event.stopPropagation();
			idx = idx===0 ? 1 : 0; 
			
		});
	}	
	//退出登录
	$(".SignOut").click(function () {
		window.localStorage.clear();//清除所有k y
		location.reload();//重新刷新
	})
	$(".SignOut").on('touchstart',function (event) {
		event.preventDefault();
		event.stopPropagation();
		window.localStorage.clear();//清除所有k y
		location.reload();//重新刷新
	})
	$(".regSelect em a").on('touchstart',function(){
		console.log(1);
		location.href= "msg.html";
	})
	
//	首页导航获取数据
	$.ajax({
		"url":"http://h6.duchengjiu.top/shop/api_cat.php",
		"success": function(response){
			var html='';
			for (var i = 0; i < response.data.length; i++) {
				var obj=response.data[i];
				html+=`
						<li><a href="list.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>
						`;
			}
			$(".shopListAll").html(html);
		}
	});
//	页面改变时,动态改变一些值
	widthChange();
	$(window).resize(widthChange);
	function widthChange(){
		var w = $(window).width();
		if(w<768){
			$(".footer-company").removeClass("center-block");
			$(".myAccount").removeClass("center-block");
		}
	}
//	首页搜索框跳转
	$("#header-search span").click(function(){
		var searchVal = $("#header-search input").val();
		if( searchVal==""){
			alert("请输入相关内容！");
			return false;
		};
		
		//搜索获取分类id
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_goods.php",
			"type": "GET",
			"data": {
				"goods_id":searchVal 
			},
			"dataType": "json",
			"success": function (obj) {
				if (obj.code===0) {
				console.log(obj);
				var catId = obj.data[0].cat_id;
				location.href="detail.html?goods_id="+searchVal+"=cat_id="+catId;
				}
			}
		})

	
	})
	
	
//返回顶部
	$(window).scroll(function(){
		if($(window).scrollTop()>200){
			$(".returnTop").stop(true).show(1000);
		}else{
			$(".returnTop").stop(true).hide(1000);
		}
	})
	$(".returnTop").click(function(){
		$("body").animate({"scrollTop":0},1000);
	})
	
//购物车数量
	$.ajax({
		"type": "get",
		"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
		"dataType": "json",
		"success": function(response){
//			console.log(response);
			$(".myShopCart b").text("("+response.data.length+")");
			var html = '';
			if (response.code === 0) {
				for (var i = 0 ;i<response.data.length;i++) {
					var data = response.data[i]
					html+=`<li><div class="shopCarImg">
									<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}"><img src="${data.goods_thumb}"></a>
								</div>
								<div class="shopCarInfo">
									<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}">${data.goods_name}</a>
								</div>
								<div class="shopCarPric">
								￥<span>	${data.goods_price}</span>
								</div>
								<div class="shopCartNum">
									&Chi;${data.goods_number}
								</div>
								<div class="shopCarCon" data-goodsId="${data.goods_id}">
									删除
								</div>
							</li>`
				}
				html+='<li><a class="shopCarBtn" href="shop.html">查看我的购物车</a></li>'
			}else{
				html = `
						<li><a class="shopCartNull" href="index.html">您的购物车为空</a></li>
						`
			}
			$(".shopCartList").html(html);
			//删除事件
//			$(".shopCarCon").on('click',function(){
//				var goodsId = $(this).attr("data-goodsId");
//				$.ajax({
//					"type": "POST",
//					"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
//					"dataType": "json",
//					"data": {
//						"goods_id": goodsId,
//						"number": 0
//					},
//					"success": function(response){
//						
//						$.ajax({
//							"type": "get",
//							"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
//							"dataType": "json",
//							"success": function(response) {
//								localStorage.setItem("cart" + goodsId, 0);
//								var html = '';
//								if (response.code === 0) {
//									for (var i = 0 ;i<response.data.length;i++) {
//										var data = response.data[i]
//										html+=`<li><div class="shopCarImg">
//														<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}"><img src="${data.goods_thumb}"></a>
//													</div>
//													<div class="shopCarInfo">
//														<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}">${data.goods_name}</a>
//													</div>
//													<div class="shopCarPric">
//													￥<span>	${data.goods_price}</span>
//													</div>
//													<div class="shopCartNum">
//														&Chi;${data.goods_number}
//													</div>
//													<div class="shopCarCon" data-goodsId="${data.goods_id}">
//														删除
//													</div>
//												</li>`
//									}
//									html+='<li><a class="shopCarBtn" href="shop.html">查看我的购物车</a></li>'
//								}else{
//									html = `
//											<li><a class="shopCartNull" href="index.html">您的购物车为空</a></li>
//											`
//								}
//								
//							}
//						})
//					}
//				});
//				location.reload()
//			})
		}
	});
	$("body").on('click',".shopCarCon",function(){
		var goodsId = $(this).attr("data-goodsId");
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
			"type": "POST",
			"data": {
				"goods_id": goodsId,
				"number": 0
			},
			"dataType": "json",
			"success": function(response){
				localStorage.setItem("cart" + goodsId, 0);
				console.log("cart" + goodsId);
				$.ajax({
					"type": "get",
					"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
					"dataType": "json",
					"success": function(response) {
						
						var html = '';
						if (response.code === 0) {
							for (var i = 0 ;i<response.data.length;i++) {
								var data = response.data[i]
								html+=`<li><div class="shopCarImg">
												<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}"><img src="${data.goods_thumb}"></a>
											</div>
											<div class="shopCarInfo">
												<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}">${data.goods_name}</a>
											</div>
											<div class="shopCarPric">
											￥<span>	${data.goods_price}</span>
											</div>
											<div class="shopCartNum">
												&Chi;${data.goods_number}
											</div>
											<div class="shopCarCon" data-goodsId="${data.goods_id}">
												删除
											</div>
										</li>`
							}
							html+='<li><a class="shopCarBtn" href="shop.html">查看我的购物车</a></li>'
						}else{
							html = `
									<li><a class="shopCartNull" href="index.html">您的购物车为空</a></li>
									`
						}
						
					}
				})
			}
		});
//		location.reload()
	})
})

