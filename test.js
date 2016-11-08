//define a function constructor;
function divWindow(title, h, w, msg){
	this.createWindow(title, h, w, msg);
}
//defeine prototype method for the function;
divWindow.prototype = {
	createWindow : function(title, h, w, msg){
		this.title = title;
		this.h = h;
		this.w = w;
		this.msg =msg;
		this.moveable = false;
		this.iWidth = document.documentElement.clientWidth;
		this.iHeight = document.documentElement.clientHeight;
		var bgBox = document.createElement("div");
		bgBox.style.cssText = "position:absolute; left:0; top:0; width:"+this.iWidth+"px; height:"+this.iHeight+"px;background-color:grey; z-index:101;";
		document.body.appendChild(bgBox);
		this.bgBox = bgBox;
		var divBox = document.createElement("div");
		divBox.style.cssText = "position:absolute; left:"+(this.iWidth-this.w)/2+ "px; top:"+(this.iHeight-this.h)/2+"px; width:"+this.w+"px; height:"+this.h+"px;background-color:white; z-index:102; border: 1px solid black";
		document.body.appendChild(divBox);
		var divTable = document.createElement("table");
		divTable.style.cssText = "background-color:white; margin:0;padding:0; border: 0";
		divTable.cellSpacing = 0;
		divBox.appendChild(divTable);
		this.divBox = divBox;
		var tr = divTable.insertRow(-1);
		tr.style.cssText = "background-color:#666699";
		var td = tr.insertCell(-1);
		td.style.cssText = "width:100%; color:white; margin: 0; padding:3px; cursor:move;";
		td.innerHTML = this.title;
		this.td = td;
		var btn = tr.insertCell(-1);
		btn.style.cssText = "color:white; margin: 0;padding:2px; cursor:pointer; font-size: 12pt";
		btn.innerHTML = "X";
		divTable.insertRow(-1).insertCell(-1).innerHTML = this.msg;
		this.btn = btn;
		this.eventHandler();
	},
		eventHandler : function(){
			var td = this.td;
			var divBox = this.divBox;
			var bgBox = this.bgBox;
			var moveable = this.moveable;
			var iWidth = this.iWidth;
			var iHeight = this.iHeight;
			var w = this.w;
			var h = this.h;
			var btn = this.btn;

			td.onmousedown = function(e){
				moveable = true;
				var moveX = e.clientX;
				var moveY = e.clientY;
				var moveTop = parseInt(divBox.style.top);
				var moveLeft = parseInt(divBox.style.left);

				document.onmousemove = function(e){
					var x = moveLeft + e.clientX - moveX;
					var y = moveTop + e.clientY - moveY;
					if(moveable == true &&  x > 0 && (x + w < iWidth) && y > 0 && (y + h< iHeight)){
						divBox.style.left = x + "px";
						divBox.style.top = y + "px";
					}
				}
			};
			document.onmouseup = function(e){
				if(moveable)
					moveable = false;

			}
			btn.onclick = function(e){
				document.body.removeChild(bgBox);
				document.body.removeChild(divBox);

			}
}
}
var btn = document.getElementById("popupwin");
btn.addEventListener("click", function(){
	var newwin = new divWindow("hello world", 300,200,'123');
})

