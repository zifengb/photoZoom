// JavaScript Document

/*
	1、鼠标移动到小图时，鼠标样式改变，右边大图出现，小图浮动层出现。同时记录小图、大图、小div的大小参数
	2、鼠标移开小图时，样式逆向改变
	3、鼠标在小图移动时，获取鼠标位置，并转换浮动层的left和top
	4、右边大图的left和top随浮动层改变而改变
*/

function gbc(tparent,tclass)
{
	var allclass=tparent.getElementsByTagName('*');
	var result=[];
	for(var i=0;i<allclass.length;i++)
	{
		if(allclass[i].className==tclass)
		{
			result.push(allclass[i]);
		}
	}
	return result;
};

window.onload=function()
{
	var sbp=document.getElementById('show_bigger_pic');		//最外层div
	var c=gbc(sbp,'cover')[0];								//cover层
	var fs=gbc(sbp,'float_span')[0];						//浮动层
	var spd=gbc(sbp,'s_pic')[0];							//小图div
	var sp=spd.getElementsByTagName('img')[0];				
	var bpd=gbc(sbp,'b_pic')[0];
	var bp=bpd.getElementsByTagName('img')[0];				//大图div
	var spw;		
	var sph;
	var bpw;
	var bph;
	var btn=true;											//开关，因为参数只获取一次
	
	c.onmouseover=function()
	{
		fs.style.display='block';
		bpd.style.display='block';
		c.style.cursor='move';
		
		if(btn)												//获取大小照片的参数以便浮动层大小的计算，仅获取一次
		{
			spw=sp.offsetWidth;
			sph=sp.offsetHeight;
			bpw=bp.offsetWidth;
			bph=bp.offsetHeight;
			spdw=spd.offsetWidth;
			spdh=spd.offsetHeight;
			
			//比例计算
			var fsw=Math.ceil(spw/bpw*spdw);				
			var fsh=Math.ceil(sph/bph*spdh);
			
			//浮动层大小设置，获取完关闭开关
			fs.style.width=fsw+'px';
			fs.style.height=fsh+'px';
			btn=false;
		}
	};
	
	c.onmouseout=function()
	{
		fs.style.display='none';
		bpd.style.display='none';
	};
	
	c.onmousemove=function(ev)					//鼠标移动
	{
		var pos=ev||event;
		//计算left和top的值
		var left=pos.clientX-sbp.offsetLeft-fs.offsetWidth/2;	
		var top=pos.clientY-sbp.offsetTop-fs.offsetHeight/2;
		//alert(top);
		
		if(top<0)
		{
			top=0;
		}
		else if(top>c.offsetHeight-fs.offsetHeight)
		{
			top=c.offsetHeight-fs.offsetHeight;
		}
		
		if(left<0)
		{
			left=0;
		}
		else if(left>c.offsetWidth-fs.offsetWidth)
		{
			left=c.offsetWidth-fs.offsetWidth;
		}
		
		fs.style.left=left+'px';
		fs.style.top=top+'px';
		
		//比例计算
		var percentX=left/c.offsetWidth;
		var percentY=top/c.offsetHeight;
		
		//右边大图的位置改变
		bp.style.left=-percentX*(bp.offsetWidth)+'px';
		bp.style.top=-percentY*(bp.offsetHeight)+'px';
	};
};