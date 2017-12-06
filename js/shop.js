$.ajax({
	"type": "get",
	"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
	"dataType": "json",
	"success": function(response) {
//		console.log(response);
//		console.log(response.data);
		if(response.code === 0) {
			var html = '';
			if(response.data.length >= 1) {
				for(var i = 0; i < response.data.length; i++) {
					var data = response.data[i];
					html += `<div class="row shop-list">
								<div class="col-xs-12 shopCent">
									<div class="shop-select">
										<input type="checkbox" name="selectList" class="selectList" value="list" />
										<input type="hidden" class="goodsId" value=${data.goods_id}>
										<a href="detail.html?goods_id=${data.goods_id}=cat_id=${data.cat_id}"><img src="${data.goods_thumb}"/></a>
									</div>
									<div class="shop-info">
										<a href="detail.html?goods_id=${data.goods_id}=cat_id=${data.cat_id}" class="top50">${data.goods_name}</a>
									</div>
									<div class="shop-price">
										${data.goods_price}元
									</div>
									<div class="shop-num">
										<button class="shop-reduce">-</button><input type="text" name="number" class="shop-number-txt" value="${data.goods_number}" /><button class="shop-add">+</button>
									</div>
									<div class="shop-tota">
										${data.goods_number*data.goods_price}元
									</div>
									<div class="shop-control">
										删除
									</div>
								</div>
							</div>`;
				}
			} else {
				html = "当前尚未添加商品，请前往添加";
			}

			$(".shop-list-wrap").html(html);

			

		} else {
			$(".shop-list-wrap").html("当前尚未添加商品，请前往添加");
		}
	}
});
$("#selectAll").click(function() {

	$(this).prop("checked") ? $(".selectList").prop("checked", true) : $(".selectList").prop("checked", false);
	changeTxt()

})

function changeTxt() {
	var shop_newNum = 0;
	var shop_newTota = 0;
	$(".selectList").each(function(i) {

		if($(this).is(":checked")) {
			shop_newNum += parseInt($(".shop-num .shop-number-txt").eq(i).val());
			shop_newTota += parseInt($(this).parent().siblings(".shop-tota").text());
			
		}else{
			shop_newNum += 0;
			shop_newTota += 0;
		}
//		console.log(shop_newNum);
//			console.log(shop_newTota);
	})
	
	$(".shop-bottom-nav .shop-allNum em").eq(0).html(shop_newNum);
	$(".shop-bottom-nav .shop-allNum em").eq(1).html(shop_newTota)

}
$(".shop-selectDel").click(function() {

	$(".selectList").each(function(i) {

		if($(this).is(":checked")) {
			var goodsId = $(this).siblings(".goodsId").val();
			console.log(goodsId);
			$.ajax({
				"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
				"type": "POST",
				"data": {
					"goods_id": goodsId,
					"number": 0
				},
				"dataType": "json",
				"success": function(response) {
					localStorage.setItem("cart" + goodsId, 0);
					$.ajax({
						"type": "get",
						"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
						"dataType": "json",
						"success": function(response) {
//							localStorage.setItem("cart" + goodsId, 0);
							var html = '';
							if(response.data.length >= 1) {
								for(var i = 0; i < response.data.length; i++) {
									var data = response.data[i];
									html += `<div class="row shop-list">
								<div class="col-xs-12">
									<div class="shop-select">
										<input type="checkbox" name="selectList" class="selectList" value="list" />
										<input type="hidden" class="goodsId" value=${data.goods_id}>
										<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}"><img src="${data.goods_thumb}"/></a>
									</div>
									<div class="shop-info">
										<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}">${data.goods_name}</a>
									</div>
									<div class="shop-price">
										${data.goods_price}元
									</div>
									<div class="shop-num">
										<button class="shop-reduce">-</button><input type="text" name="number" class="shop-number-txt" value="${data.goods_number}" /><button class="shop-add">+</button>
									</div>
									<div class="shop-tota">
										${data.goods_number*data.goods_price}元
									</div>
									<div class="shop-control">
										删除
									</div>
								</div>
							</div>`;
								}
							} else {
								html = "当前尚未添加商品，请前往添加";
							}

							$(".shop-list-wrap").html(html);

						}
					});

//					location.reload();
				}
			});
		}

	})
	$(".shop-bottom-nav .shop-allNum em").eq(0).html(0);
	$(".shop-bottom-nav .shop-allNum em").eq(1).html(0);
	$("#selectAll").prop("checked", false);

});
$(".shop-close span").click(function() {
	if(parseInt($(".shop-bottom-nav .shop-allNum em").eq(1).html()) === 0){
		alert("请选择要结算的商品！");
		return;
	}
	location.href = "address.html?sum=" + $(".shop-bottom-nav .shop-allNum em").eq(1).html();

})

$("body").on('click', '.shop-control', function() {
	var r=confirm("确定删除?")
	  if (!r)return;
	var goodsId = $(this).siblings(".shop-select").children(".goodsId").val();
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
		"type": "POST",
		"data": {
			"goods_id": goodsId,
			"number": 0
		},
		"dataType": "json",
		"success": function(response) {
			localStorage.setItem("cart" + goodsId, 0);
			$.ajax({
				"type": "get",
				"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
				"dataType": "json",
				"success": function(response) {
//					localStorage.setItem("cart" + goodsId, 0);
					var html = '';
					if(response.data.length >= 1) {
						for(var i = 0; i < response.data.length; i++) {
							var data = response.data[i];
							html += `<div class="row shop-list">
								<div class="col-xs-12">
									<div class="shop-select">
										<input type="checkbox" name="selectList" class="selectList" value="list" />
										<input type="hidden" class="goodsId" value=${data.goods_id}>
										<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}"><img src="${data.goods_thumb}"/></a>
									</div>
									<div class="shop-info">
										<a href="detail.html?goods_id=${data.goods_id}&cat_id=${data.cat_id}">${data.goods_name}</a>
									</div>
									<div class="shop-price">
										${data.goods_price}元
									</div>
									<div class="shop-num">
										<button class="shop-reduce">-</button><input type="text" name="number" class="shop-number-txt" value="${data.goods_number}" /><button class="shop-add">+</button>
									</div>
									<div class="shop-tota">
										${data.goods_number*data.goods_price}元
									</div>
									<div class="shop-control">
										删除
									</div>
								</div>
							</div>`;
						}
					} else {
						html = "当前尚未添加商品，请前往添加";
					}

					$(".shop-list-wrap").html(html);
					changeTxt();
				}
			});
//			location.reload();
		}
	});
	$("#selectAll").prop("checked",false);
})
$('body').on('click', '.shop-reduce', function() {
	if($(this).siblings(".shop-number-txt").val() > 0) {
		$(this).siblings(".shop-number-txt").val(parseInt($(this).siblings(".shop-number-txt").val()) - 1);
		$(this).parent().siblings(".shop-tota").html($(this).siblings(".shop-number-txt").val() * parseInt($(this).parent().siblings(".shop-price").html()) + "元");
		changeTxt()
		console.log($(this).siblings(".shop-number-txt"));
	}
	return;
});

$('body').on('click', '.shop-add', function() {
	if($(this).siblings(".shop-number-txt").val() < 10) {
		$(this).siblings(".shop-number-txt").val(parseInt($(this).siblings(".shop-number-txt").val()) + 1);
		$(this).parent().siblings(".shop-tota").html($(this).siblings(".shop-number-txt").val() * parseInt($(this).parent().siblings(".shop-price").html()) + "元");
		changeTxt()
	}
	return;
})
$('body').on('click', '.selectList', function() {
	console.log($(this).is(":checked"));
	changeTxt();
})
