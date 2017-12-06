


$(function(){
//	console.log(localStorage.username);
	$("#msg-username").html(localStorage.username)
	
	//生日
	var nowdate = new Date(); // 获取当前时间的年份
	var nowYear = nowdate.getFullYear();// 当前年份
	var nowMonth = nowdate.getMonth() + 1;// 当前月份
	// 清空年份、月份的下拉框 进行重新添加选项
	$("#birthdayYear").empty();
	$("#birthdayMonth").empty();
	var originalBirthdayYear;
	// 首先为年份字段 添加选项
	$("<option value='0' disabled='' selected='selected'>请选择：</option>").appendTo(
			"#birthdayYear");
	for (var startYear = nowYear; startYear >= 1920; startYear--) {
		var year;
		if ((startYear + 11) % 10 == 0) { // 模糊年份
			year = (startYear - 9 + "").substring(2);
			$("<option value='" + year + "后'>" + year + "后</option>").appendTo(
					"#birthdayYear");
		}
		$("<option value='" + startYear + "'>" + startYear + "</option>").appendTo(
				"#birthdayYear");
	}
	$("<option value='0' disabled='' selected='selected'>请选择：</option>").appendTo(
			"#birthdayMonth");
	for (var startMonth = 1; startMonth <= 12; startMonth++) {
		$("<option value='" + startMonth + "'>" + startMonth + "</option>")
				.appendTo("#birthdayMonth");
	}
	$("<option value='0' disabled='' selected='selected'>请选择：</option>").appendTo(
			"#birthdayDay");
	if (originalBirthdayYear == null || originalBirthdayYear == ""
			|| originalBirthdayYear == "1") {
		$("#birthdayYear").val(0);
		$("#birthdayMonth").val(0);
		$("#birthdayDay").val(0);
	} else {
		$("#birthdayYear").val(originalBirthdayYear);
		$("#birthdayMonth").val(originalBirthdayMonth);
		changeSelectBrithdayDay();
		
	}
	
	// 选择生日年份后触发
	$("#birthdayYear").change(function() {
		changeSelectBrithdayDay();
	});
	
	// 选择生日月份后触发
	$("#birthdayMonth").change(function() {
		changeSelectBrithdayDay();
	});
	// 根据所选择的年份、月份计算月最大天数,并重新填充生日下拉框中的日期项
	function changeSelectBrithdayDay(){
	
		var maxNum;
		var month = $("#birthdayMonth").val();
		var year = $("#birthdayYear").val();
		if (year == 0){ // 如果年份没有选择，则按照闰年计算日期(借用2004年为闰年)
			year = 2004;
		}
		if (month == 0){
			maxNum = 31;
		}else if (month == 2){
			if (year.toString().substring(2) == "后") { // 判断年份是否为模糊年份
														// 如果是模糊年份则天数设为29
				maxNum = 29;
			} else {
				if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) { // 判断闰年
					maxNum = 29;
				} else {
					maxNum = 28;
				}
			}
		} else if (month == 4 || month == 6 || month == 9 || month == 11) {
			maxNum = 30;
		} else {
			maxNum = 31;
		}
	
		// 清空日期的下拉框 进行重新添加选项
		var originalBirthdayDay;
		$("#birthdayDay").empty();
		if (month == 0) {
			$("<option value='0' disabled='' selected='selected'>请选择：</option>")
					.appendTo("#birthdayDay");
		} else {
//			console.log(maxNum)
			for (var startDay = 1; startDay <= maxNum; startDay++) {
				
				$("<option value='" + startDay + "'>" + startDay + "</option>")
						.appendTo("#birthdayDay");
			}
			if (maxNum >= originalBirthdayDay) {
				setTimeout(function() {
					$("#birthdayDay").val(originalBirthdayDay);
				}, 1);
			} else {
				setTimeout(function() {
					$("#birthdayDay").val(1);
				}, 1);
				
			}
		}
	}
	
	
	//兴趣爱好
	var count = [];
	$msglis = $(".msg-hobul li");
	for (var j = 0; j<$msglis.length;j++) {
		count[j] = 0;
	}
	console.log(count);
		
	$msglis.each(function(i){
		
		$(this).click(function () {
			count[$(this).index()] = count[$(this).index()] === 0 ? 1 : 0;
			if (count[$(this).index()] === 1) {
				$(this).addClass("msg-selected");
			}else{
				$(this).removeClass("msg-selected");
			}
		})
		
	})
	
	
	//提交
	$("#submit").click(function(){
		$(".msg-success").show();
		location.href = "index.html";
	})
	$(".msg-btn-5").click(function(){
		$(".msg-success").show();
		location.href = "index.html";
	})
	
	//身份证号
	$(".msg-itxt").focus(function(){
		$("#cidInputDIv span").html("请输入正确的身份证号码！居民身份证号码为15或18位！").css("color","#666");
	})
	$(".msg-itxt").blur(function(){
		var re = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
		var msgitxt = $(".msg-itxt").val();
		console.log(msgitxt);
		if(!re.test(msgitxt)){
			$("#cidInputDIv span").html("请输入正确的身份证号码！居民身份证号码为15或18位！").css("color","red");
		}else{
			$("#cidInputDIv span").html("");
		}
	})
	
	
	//保存
	$("#submit").click(function(){
		$(".msg-success").show();
		location.href = "index.html";
	})
	
	$("#msg-origin-msg").click(function(){
		console.log(1)
		$("#msg-origin-msg").addClass("msg-curr");
		$("#msg-more-msg").removeClass( "msg-curr");
		$("#msg-main").show();
		$("#msg-main-1").hide();
		
	})
	$("#msg-more-msg").click(function(){
		console.log(1)
		$("#msg-origin-msg").removeClass("msg-curr");
		$("#msg-more-msg").addClass( "msg-curr");
		$("#msg-main").hide();
		$("#msg-main-1").show();
		
	})
	
})
