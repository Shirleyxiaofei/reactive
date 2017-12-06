$(function(){
	
	
	
	
	
	var windowWidth=0;
	widthChange();
	$(window).resize(function(){
		location.href=location.href;
		widthChange();
	});
	function widthChange(){
		var windowWidth = $(window).width();
		var smAdWidth = $(".ad-img .sm-ad").width();
		$(".indexBanner").css("height",windowWidth/(1920/689)+"px");
		$("#banner li img").css("width",windowWidth);
		//轮播
		var $li = $("#banner li");
		$("#banner").append($li.eq(0).clone());
		var index=0;
		$(".leftBtn").click(function(){
				if($("#banner").is(":animated")) return;
				index--;
				if(index < 0){
					index = 4;
					$("#banner").css("left",-5 * windowWidth);
				}
				$("#banner").animate({"left" : -windowWidth * index},1000);
				changeCircle();
			});
		$(".rightBtn").click(function(){
			rightBtn();
		});
		var timer = setInterval(rightBtn,1000);
		$(".indexBanner").mouseenter(function(){
			clearInterval(timer);
		});
		$(".indexBanner").mouseleave(function(){
			timer = setInterval(rightBtn,1000);
		});
		function rightBtn(){
			if($("#banner").is(":animated")) return;
			index++;
			$("#banner").animate({"left":-windowWidth*index},1000,function(){
				if (index>4) {
				index=0;
				$("#banner").css("left",0);
			}
			});
			changeCircle();
		}
		$("#circle li").click(function(){
			if($("#banner").is(":animated")) return;
			index = $(this).index();
			$("#banner").animate({"left":-windowWidth*index},1000);
			changeCircle();
		})
		function changeCircle(){
			var n = index>4 ? 0 : index; 
			$("#circle li").eq(n).addClass("circleCurrent").siblings().removeClass("circleCurrent");
		}
	}
	var catNameArr = [];
	var catIdArr = [];
	//调用分类标题
	$.ajax({
		"url":"http://h6.duchengjiu.top/shop/api_cat.php",
		"success":function(response){
			if(response.code===0){
				for (var i=0;i<response.data.length;i++) {
					catNameArr.push(response.data[i].cat_name);
					catIdArr.push(response.data[i].cat_id);
				}
//				console.log(catIdArr);
				getCatId(catIdArr[0],".houseHoldItem");//家居
				$(".houseHoldItem h1").html(catNameArr[0]);//家居
				getCatId(catIdArr[1],".furniture");//家具
				$(".furniture h1").html(catNameArr[1]);//家具
				getCatId(catIdArr[2],".stationery");//文具
				$(".stationery h1").html(catNameArr[2]);//文具
				getCatId(catIdArr[3],".digital");//数码
				$(".digital h1").html(catNameArr[3]);//数码
				getCatId(catIdArr[4],".play");//玩乐
				$(".play h1").html(catNameArr[4]);//玩乐
				getCatId(catIdArr[5],".kitchen");//厨卫
				$(".kitchen h1").html(catNameArr[5]);//厨卫
				getCatId(catIdArr[6],".food");//美食
				$(".food h1").html(catNameArr[6]);//美食
				getCatId(catIdArr[9],".kid");//童装
				$(".kid h1").html(catNameArr[9]);//童装
				
			}
		}
	});
	//通过标题ID调用相应商品
	function getCatId(cat_id,obj){
		$.ajax({
			"url":"http://h6.duchengjiu.top/shop/api_goods.php?cat_id="+cat_id,
			"success":function(response){
				if(response.code===0){
//					console.log(response);	
					var html="";
					var l = response.data.length-7;
					for (var i =0;i<l;i++) {
						html+=`<div class="col-md-4 col-sm-6">
									<div class="contImg">
										<a href="detail.html?goods_id=${response.data[i].goods_id}"><img src="${response.data[i].goods_thumb}"/></a>
										<div class="shopSuccess">成功加入购物车</div>
										<div class="leftCover hidden-xs"></div>
										<div class="rightCover  hidden-xs"></div>
										<div class="shopMessage  hidden-xs">
											<p class="shopName"><a href="detail.html?goods_id=${response.data[i].goods_id}=cat_id=${response.data[i].cat_id}" title="点击查看商品">${response.data[i].goods_name}</a></p>
											<p class="shopItem"><a href="detail.html?goods_id=${response.data[i].goods_id}=cat_id=${response.data[i].cat_id}" title="点击查看商品">${response.data[i].goods_desc}</a></p>
										</div>
									</div>
									<div class="mobileMessage hidden-md hidden-lg">
										<p><a href="detail.html?goods_id=${response.data[i].goods_id}">${response.data[i].goods_name}</a></p>
										<p><a href="detail.html?goods_id=${response.data[i].goods_id}">${response.data[i].goods_desc}</a></p>
									</div>
									<div class="priceAndBtn">
										<span>￥${response.data[i].price}</span>
										<input type="hidden" class="goodsId-1" value="${response.data[i].goods_id}">
										<a class="priceAndBtn-1">加入购物车</a>
					
									</div>
								</div>`;
					}
					$(obj).html($(obj).html()+html);
					
					
				
				}
			}
		});
	}
	$(".contTit").parent().css("overflow","hidden");
//	function token () {
//		//判断是否登录状态
//		if ( !localStorage.getItem("token") ) {
//			alert("请登录后使用购物车功能！")
//			location.href = "login.html#callback=" + location.href;
//				return;
//		}else{
//			location.href = "shop.html";
//		}
//	}
	
	$('body').on('click','.priceAndBtn-1',function(){
		if ( !localStorage.getItem("token") ) {
			alert("请登录后使用购物车功能！")
			location.href = "login.html#callback=" + location.href;
				return;
		}
		var aaa =$(this).siblings("input").val()
		console.log(aaa);
		var sid = localStorage.getItem("cart"+aaa)
		if (sid == NaN || sid == null) {
			sid = 1;
			console.log(sid);
		}else{
			sid = parseInt(sid)+1;
		}
		console.log(sid);
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
			"type": "POST",
			"data": {
				"goods_id": aaa,
				"number": sid
			},
			"dataType": "json",
			"success": function(response){
				console.log(response);
				//数据获取后存储商品数量到本地储存
				localStorage.setItem( "cart"+aaa,sid );
			}
		})
		
//		var lh = $(".contImg").height();
//		console.log(lh);
//		$("<div class='success'>添加成功</div>").css({"position":"absolute","top":"0","left":"0","width":"100%","height":"100%","padding":"0 15px","background-color":"#dff0d8","color":"#3c763d","text-align":"center","line-height":lh+"px","z-index":"999"}).appendTo($(this).parent().siblings(".contImg"));
		$(".shopSuccess").show();
		setTimeout(function(){
			$(".shopSuccess").remove();
		},1000);

//		alert("添加成功");
	})
	
	
})
