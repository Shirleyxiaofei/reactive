$(function() {
	var userName = '';
	addressAjax()
	//初始更新
	var address_ID = 0;
	var ahtml = $(".userContent").html(); //初始值
	function addressAjax() {
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token,
			"type": "GET",
			"success": function(data) {
				console.log(data);
				var addressHtml = "";

				for(var i = 0; i < data.data.length; i++) {
					var obj = data.data[i]
					addressHtml += `<tr class="address">
						<th>${obj.address_name}</th>
						<th>${obj.mobile}</th>
						<th>${obj.province}${obj.city}${obj.district}</th>
						<th>${obj.address}</th>
						<th>
							<a class="addressRemove" id="addressRemove">删除</a>
							<input type="hidden"  value="${obj.address_id}" />
						</th>
					</tr>`;

				}
				$(".userContent").html(ahtml + addressHtml);
				//删除	
				$(".addressRemove").click(function() {
					var addressId = $(this).siblings().val()
					console.log(addressId);
					var ts = $(this)
					$.ajax({
						"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?status=delete&token=" + localStorage.token,
						"type": "get",
						"dataType": "json",
						"data": {
							"address_id": addressId
						},
						"success": function(data) {
							console.log(data);
							if(data.code === 0) {
								ts.parent().parent().remove();
							}
						}
					})
				})

				

				//点击选中收货地址
				$(".address").click(function(event) {
					$(this).addClass("addActive").siblings().removeClass("addActive");

					address_ID = $(this).children().eq(4).children("input").val();
					$(".default").remove();
					$(this).children().eq(4).append('<i class="default">默认</i>')
					userName = $(this).children().eq(0).text();
					
				})

			}
		});

	}
	
	
	var AddaddressHtight =  document.documentElement.clientHeight;
//	$(".Addaddress").css("top",AddaddressHtight/4);
	
	

	$(".AddaddressBtn").click(function() {
		$(".Addaddress").show(500);
	})
	$(".addressNo").click(function() {
		$(".Addaddress").hide(500);
	})
	//确定添加地址
	$(".addressYes").click(function() {
		var data = $("form").serialize();
		console.log(data);
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token + "&status=add",
			"type": "POST",
			"dataType": "json",
			"data": data,
			"success": function(data) {
				if(data.code === 0) {
					console.log(data);
					addressAjax();
					$(".Addaddress").hide(500);
				}
			}
		});

	})
	
	
	
	//获取总金额
	//通过location.search获取get传参的数据 截取？后面的内容
	var str = location.search.substr(1);
	//用分割方法得到 = 号两边内容
	var sum = str.split("=");
	//用下标找到id的值
	console.log(sum[1]);
	//显示在#元素内

	if (sum[1] === undefined ) {
		$(".Money span").html("当前的商品金额为￥" + "<i>" + 0 + "</i>")
	}else{
		$(".Money span").html("当前的商品金额为￥" + "<i>" + sum[1] + "</i>")
	}
	
	
	//下单
	$("#yesDown").click(function () {
		
		if (sum[1] === undefined) {
			alert("请先选择商品在下单！")
			location.href="Shopping.html";
			return;
		}
		
		if (address_ID === 0) {
			alert("请选择收货地址后在下订单！");
				return;
		}
		
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token+"&status=add",
			"type": "POST",
			"dataType": "json",
			"data" :{
				"address_id": address_ID,
				"total_prices": sum[1]
			},
			"success": function (data) {
				console.log(data);
				if (data.code === 0) {
					alert("订单提交成功！");
					location.href = "order.html?userName="+userName;
				}
				if(data.code === 2002){
					alert("购物车中还没有商品,无法提交订单");
					location.href = "index.html"
				}
			}

		});
	})
	
	
	

})