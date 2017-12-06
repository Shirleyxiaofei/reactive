$(function() {
	//首页传递id获取商品详情功能
	var str = location.search.substr(1); //通过location.search获取get传参的数据 截取？后面的内容
	console.log(str);
	var goodsId = str.split("="); //用分割方法得到 = 号两边内容
	console.log(goodsId); //用下标找到id的值
	
	//商品详情
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"goods_id": goodsId[1]
		},

		"dataType": "json",
		"success": function(data) {
			var obj = data;
			$(".details-img img").attr('src',obj.data[0].goods_thumb);
//			$(".details-img").html( '<img src="'+obj.data[0].goods_thumb+'" xq_big="true"  setting="{"pwidth":400,"pheight":400,"margin_top":0,"margin_left":0}"  />' )
			$(".details-tlt").html(obj.data[0].goods_name);
			$(".details-Price").html("￥" + obj.data[0].price);
			$(".details-desc").html(obj.data[0].goods_desc);
		}

	})
	
	//猜你喜欢
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"cat_id": goodsId[3]
		},
		"dataType": "json",
		"success": function(data) {
			var obj = data;
			objNum1 = parseInt(Math.random()*9);
			objNum2 = parseInt(Math.random()*9);
			objNum3 = parseInt(Math.random()*9);
			objNum4 = parseInt(Math.random()*9);
			console.log(objNum1);
			console.log(objNum2);
//			console.log(obj);
			app(objNum1,goodsId[3]);
			
			if (objNum1 == objNum2) {
				objNum2++;
				app(objNum2,goodsId[3]);
			}else{
				app(objNum2,goodsId[3]);
			}
			//小屏增加
			if(document.documentElement.clientWidth < 768){
				app(objNum3,goodsId[3]);
				if (objNum3 == objNum4 && objNum3 ==  objNum2 ) {
					objNum4++;
					app(objNum4,goodsId[3]);
				}else{
					app(objNum4,goodsId[3]);
				}
			}
				
			//添加封装
			function app (addnum,catId) {
				$(".youLike").append('<a href=detail.html?goods_id='
				+obj.data[addnum].goods_id +
				'=cat_id='
				+ catId + 
				'><img src="'
				+obj.data[addnum].goods_thumb +
				'" /><p>'
				+obj.data[addnum].goods_name+
				'</p><span>'
				+"￥"+obj.data[addnum].price+
				'</span></a>' )
			}
		}
	});
	
	//商品添加数量加减
	var $detailsVal = 1;
	$(".jian").click(function() {
		$detailsVal--;
		$("#detailsVal").val($detailsVal);
		if($detailsVal = 1) $detailsVal = 1;
	})	
	$(".jia").click(function() {
		$detailsVal++;
		$("#detailsVal").val($detailsVal);
	})

	//点击添加商品到购物车
	$(".appshop").click(function () {
		RefreshShop ();
		
	})
	$(".buyALL").click(function () {
		RefreshShop ();
		
	})
	
	function RefreshShop () {
			//判断是否登录状态
		if ( !localStorage.getItem("token") ) {
			alert("请登录后使用购物车功能！")
			location.href = "login.html#callback=" + location.href;
				return;
		}
		
		//获取本地存储中的商品数量信息
		var goods_number = localStorage.getItem("cart" + goodsId[1] );
		//如果有则是买过！  让之前的数量+1   如果没有就是第一次购买  那数量就是1
		goods_number = goods_number ? parseInt(goods_number)+$detailsVal : $detailsVal
		
		//更新购物车信息
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
			"type": "POST",
			"data": {
				"goods_id": goodsId[1],
				"number": goods_number
			},
			"dataType": "json",
			"success": function(response){
				console.log(response);
				//数据获取后存储商品数量到本地储存
				localStorage.setItem( "cart"+goodsId[1],goods_number )
			}
		})
		
		alert("添加成功");
		location.href = "shop.html"
		}
	

})