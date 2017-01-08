
function content(result){
	var contentdiv,cloth_src,cloth_price,buy_number,cloth_number,cloth_name,shop_name,cloth_city,cloth_provice;
	for(var i=0;i<result.length;i++){
		contentdiv=document.getElementById('content');
		cloth_src='/images/commodityImages/'+result[i].commodityImages[0];
		cloth_price=result[i].commodityPrice[0];
		buy_number=result[i].salesNum;
		cloth_name=result[i].commodityTitle;
		shop_name=result[i].shopName;
		cloth_city=result[i].address[1];
		cloth_provice=result[i].address[0];
		var partdiv=document.createElement('div');
		partdiv.innerHTML="<img src="+cloth_src+" class='customImg'/><div class='meessage_div'><div class='clothPrice'><div class='priceDiv'><span>¥</span> <span class='price'>"+cloth_price+"</span><span class='freeGet'>包邮</span></div><div class='buyNumDiv'><span>人付款</span><span class='buyNum'>"+buy_number+"</span></div></div><div class='clothLink'><a href='#'>"+cloth_name+"</a></div><div class='clothAdress'><div><span class='shopName fa fa-align-justify'><a href='##' id='shopLink'>"+shop_name+"</a></span></div><div><span class='clothCity'>"+cloth_city+"</span> <span class='clothProvice'>"+cloth_provice+"</span></div></div></div>";
		contentdiv.appendChild(partdiv);
	}
}
