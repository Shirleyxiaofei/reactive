$(function(){
	var str = location.search.substr(1);
	var catId = str.split("=");
	var page = 1;
	swichPage(page);
	function swichPage(page){
		$.ajax({
			"url":"http://h6.duchengjiu.top/shop/api_goods.php",
			"data": {	 
				cat_id : catId[1],
				page: page,
				pagesize: 12
				},
			"success": function(response){
//				console.log(response.page);
				if(!response.page.page_count){
					alert("没有那么多页啊！");
					return;
				} 
				$("#inputPage").attr("placeholder","当前为第"+page+"页");
				var html="";
				if(response.code===0){
					for (var i =0;i<response.data.length;i++) {
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
					$(".shopList .container .row").html(html);
				}
			}
		});
	}
	$(".prevPage").click(function(){
		page--;
		if(page<1){
			page=1;
			alert("现在是第一页！");
			return;
		}
		swichPage(page);
		$("#inputPage").val("");
	});
	$(".nextPage").click(function(){
		page++;
		swichPage(page);
		$("#inputPage").val("");
	});
	$(".inputGo").click(function(){
		if($("#inputPage").val()===""){
			alert("请输入跳转页数");
			return;
		}else if(!$.isNumeric($("#inputPage").val())){
			alert("请输入数字！");
			return;
		}else if(page===$("#inputPage").val()){
			alert("当前就是第"+page+"页");
			return;
		}
		 page = $("#inputPage").val();
		swichPage(page);
		$("#inputPage").val("");
	})
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
//		$("<div class='success'>添加成功</div>").css({"position":"absolute","top":"0","left":"0","width":"100%","height":"100%","padding":"0 15px","background-color":"#dff0d8","color":"#3c763d","text-align":"center","line-height":lh+"px","z-index":"999"}).appendTo($(this).parent().siblings(".contImg"));
		$(".shopSuccess").show();
		setTimeout(function(){
			$(".shopSuccess").remove();
		},1000);

//		alert("添加成功");
	})
})
