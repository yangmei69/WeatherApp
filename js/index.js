/*
* @Author: 杨旭东
* @Date:   2018-01-19 11:17:29
* @Last Modified by:   杨旭东
* @Last Modified time: 2018-01-20 16:02:05
*/
// 声明变量
var weather;
var city;
// 请求太原的天气信息
$.ajax({
	// 获取数据的地址
	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	// 数据类型
	dataType:"jsonp",
	//获取方式 
	type:"get ",
	success:function(obj){
		weather=obj.data.weather;
		console.log(weather);
	}
})

// 请求省、市信息
$.ajax({
	// 获取城市
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	// 数据类型
	dataType:"jsonp",
	//获取方式 
	type:"get ",
	success:function(obj){
		city=obj.data;
		// console.log(obj);
	}
})
 
// 渲染页面数据
function updata() {

	//获取城市名显示到hearder 
	var cityName=document.getElementsByClassName("header")[0];
	cityName.innerHTML=weather.city_name;
	// 获取城市温度显示的wendu
    var cityWendu=document.getElementsByClassName("wendu")[0];
    cityWendu.innerHTML=weather.current_temperature+"°";
    // 获取城市情况
    var cityQingkuang=document.getElementsByClassName("qingkuang")[0];
    cityQingkuang.innerHTML=weather.dat_condition;
   

    // 获取今天最高温度
    var dat_high_temperature=document.getElementById("dat_high_temperature");
    dat_high_temperature.innerHTML=weather.dat_high_temperature;
    // 获取今天的最低温度
    var dat_low_temperature=document.getElementById("dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature;

    // 获取今天的天气情况
    var day_condition=document.getElementById("day_condition");
    day_condition.innerHTML=weather.day_condition;
    // 获取今天天气图片
    var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;


    // 获取明天的最高温
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    // 获取明天的最低温
    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
    // 获取明天的天气情况
    var tomorrow_condition=document.getElementById("tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;
    // 获取明天的天气图片
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;




    // 各时间的天气情况
    for(var i in weather.hourly_forecast){
    	// 创建父元素div
    	var now=document.createElement("div");
    	// 给父元素div加样式
    	now.className="now";
    	// 获取now的父元素
    	var nowp=document.getElementById("now");
    	// 把now插入到父元素中
    	nowp.appendChild(now);

        
    	var now_time=document.createElement("h2");
    	now_time.className="now_time";
    	now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
    	now.appendChild(now_time);


    	var now_icon=document.createElement("div");
    	now_icon.className="now_icon";
    	now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
    	now.appendChild(now_icon);



    	var now_temperature=document.createElement("h3");
    	now_temperature.className="now_temperature";
    	now_temperature.innerHTML=weather.hourly_forecast[i].temperature;
    	now.appendChild(now_temperature);
    }


    // 最近几的天气状况
    for (var j in weather.forecast_list) {
    	// 创建父元素div
    	var recent=document.createElement("div");
    	recent.className="recent";
    	var recentp=document.getElementById("recent");
    	recentp.appendChild(recent);



    	var recent_time=document.createElement("div");
    	recent_time.className="recent_time";
    	recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
    	recent.appendChild(recent_time);



    	var recent_wea=document.createElement("h2");
    	recent_wea.className="recent_wea";
    	recent_wea.innerHTML=weather.forecast_list[j].condition;
    	recent.appendChild(recent_wea);



    	var recent_pic=document.createElement("div");
    	recent_pic.className="recent_pic";
    	recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
    	recent.appendChild(recent_pic);


    	var recent_hight=document.createElement("h3");
    	recent_hight.className="recent_hight";
    	recent_hight.innerHTML=weather.forecast_list[j].high_temperature+"°";
    	recent.appendChild(recent_hight);


    	var recent_low=document.createElement("h4");
    	recent_low.className="recent_low";
    	recent_low.innerHTML=weather.forecast_list[j].low_temperature+"°";
    	recent.appendChild(recent_low);


    	var recent_wind=document.createElement("h5");
    	recent_wind.className="recent_wind";
    	recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
    	recent.appendChild(recent_wind);



    	var recent_level=document.createElement("h6");
    	recent_level.className="recent_level";
    	// 获取的内容
    	recent_level.innerHTML=weather.forecast_list[j].wind_level+"级";
    	// 插入到父元素
    	recent.appendChild(recent_level);
    }

    // 获取header和city_box
    var header=document.getElementsByClassName("header")[0];
	var city_box=document.getElementsByClassName("city_box")[0];
	// console.log(header,city_box);
	header.onclick=function(){
		$(".text").val("");
		$(".button").html("取消");
		// 设置点击事件
		city_box.style="display:block";
	}


    for(var k in city){
    	var cityp=document.getElementById("city")

    	var title=document.createElement("h1");
    	title.className="title";
    	title.innerHTML=k;
    	cityp.appendChild(title);


    	var con=document.createElement("div");
    	con.className="con";
    	for(var y in city[k]){

    		// console.log(y);
    		var erji=document.createElement("div");
    		erji.className="son";
    		erji.innerHTML=y;
    		con.appendChild(erji);


    	}
    	cityp.appendChild(con);

    }

}

//查找个城市天气信息
function AJAX(str){
	$.ajax({
	// 获取城市天气信息数据地址
	url: `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	// 数据类型
	dataType:"jsonp",
	//获取方式 
	type:"get ",
	success:function(obj){
		weather=obj.data.weather;
		// console.log(weather);
		// 调用渲染页面数据
		updata();
		// 点击城市隐藏当前页面
		$(".city_box").css({"display":"none"});

	}
})

}
// 当页面加载完成执行的代码
window.onload=function(){
	// 调用updata
	updata();

    // 点击城市并显示城市天气信息在主页面上
	$(".son").on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);
	})



	// 当input获取焦点，button变确认
	// focus获取焦点 html设置或改变元素的内容
	$(".text").on("focus",function(){
		$(".button").html("确认");
	})
	// 操作按钮
	var button=document.getElementsByClassName("button")[0];
	console.log(button);

	button.onclick=function(){
		
		// 获取button中的内容
		var btn=this.innerHTML;
		if(btn=="取消"){
			var city_box1=document.getElementsByClassName("city_box")[0];
			city_box1.style="display:none";
		}
		// 获取文本框中的内容，点击确认跳转
		else{
			var str1=document.getElementsByClassName("text")[0].value;
		    console.log(str1);
		    // 对城市进行一级循环
			for(var i in city){
				for(var j in city[i]){
					if (str1==j) {
						AJAX(str1);
						return;
					}
				}
				// if(str==i){ 
				// 	AJAX(str);
				// 	return;
				// }
				// // 二级循环
				// else{
				// 	for(var j in city[i]){
				// 		if(str==j){
				// 			AJAX(str);
				// 	        return;
				// 		}
				// 	}
				// }					
			}
         alert("没有该城市的天气信息");
		}
	}

}
