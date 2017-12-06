//调用数据
window.onload = function(){
$.ajax({
	"url": "http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token,
	"type": "GET",
	"dataType": "json",
	"success": function(response){
		console.log(response);
		var html = '';
		var sum = [];
		for (var i = 0;i<response.data.length;i++){
			var data = response.data[i];
			html +='<div class="row order-id">'
			html +=			'<div class="hidden-xs col-sm-3 order-time">下单时间：'+ getLocalTime(data.created_at) +'</div>'
			html +=			'<div class="col-xs-5 oreder-ddbh">订单编号:'+ data.order_id +'</div>'
			
			html +=         '<div class="col-xs-5 col-xs-offset-2 col-sm-offset-0 col-sm-4 oredr-total">总计:</div>'
			
			html +=		'</div>';
			var total = 0;
			for (var j = 0; j < data.goods_list.length;j++) {
				var obj = data.goods_list[j];
				total+= obj.goods_price*obj.goods_number;
				html +=	'<div class="row order-content">';
				html +=		'<div class="col-xs-3 order-img"><img src="'+ obj.goods_thumb +'"></div>';
				html +=		'<div class="col-xs-5 order-info">'+ obj.goods_name +'</div>';
				html +=		'<div class="col-xs-4 order-price">共'+ obj.goods_price*obj.goods_number +'元</div>';
				html +=	'</div>';
				
					
			}
			sum.push(total);
				html +=	'<div class="row order-userInfo">'
				html +=		'<div class="col-xs-12 order-address">'+ data.user_id +'收，手机号：'+ data.mobile+'，地址：'+ data.city+'市'+data.district+'区'+data.address +'街道</div>'
				html +=	'</div>'
			
			
			
		}
		$(".order-wrap").html(html);
		for (var k=0;k<sum.length;k++) {
			$(".oredr-total").eq(k).html("总计："+sum[k]+"元");
		}
		
		
		$("img").on('load',function(){
			var height = $(".order-img").height()/2;
			$(".order-info").css({"margin-top":height,"transform":"translateY(-50%)","-webkit-transform":"translateY(-50%)"});
			$(".order-price").css({"margin-top":height,"transform":"translateY(-50%)","-webkit-transform":"translateY(-50%)"});
			window.addEventListener('resize',function(){
				var height = $(".order-img").height()/2;
				$(".order-info").css({"margin-top":height,"transform":"translateY(-50%)","-webkit-transform":"translateY(-50%)"});
				$(".order-price").css({"margin-top":height,"transform":"translateY(-50%)","-webkit-transform":"translateY(-50%)"});
			})
		})
			
		
	}
});
function getLocalTime(nS) { 
   return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,9); 
} 
}