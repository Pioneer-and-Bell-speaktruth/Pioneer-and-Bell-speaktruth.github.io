//This function can be called from any controls onclick event that will reload the page (button click, link click, etc)
var isFramed = top.frames.length > 0;
var url = window.location.pathname;  
var myPageName = url.substring(url.lastIndexOf('/') + 1);      
var n=myPageName.search("asp");
var PageName=myPageName.substring(0,n-1);

function FindTheTop()
{
	var scrollAmount = document.body.scrollTop; // this is the current scroll position
	if (scrollAmount==0)
		{
			var scrollAmount = document.documentElement.scrollTop;
		}
	document.cookie="scrollAmount" + PageName + "=" + scrollAmount; // save it in cookie
	window.dontkillcookie = true; // just a flag used in onunload
	//alert(PageName);
	//alert(scrollAmount);
}
//Call this function when using code to reload a page.  Like an auto refresh on a list page
function FindTheTopReload()
{
	FindTheTop();
	window.location.reload()
}

//Call this function to clear the top setting so pages go to the top.
function RemoveTheTop()
{
	document.cookie="scrollAmount" + PageName + "=0";
}

window.onload = function()
{
	//alert('Window Load');
	var cook = document.cookie; // parse the cookie
	var pos = cook.indexOf("scrollAmount" + PageName + "=");
	var scrollAmount = 0;
	//alert(pos);
	if (pos >= 0)
	{
		scrollAmount = parseInt(cook.substr(pos + 13 + PageName.length));
		//alert(scrollAmount);
	}
	if (scrollAmount) // and reset the scrolling.
	{
		//alert(scrollAmount);
		document.documentElement.scrollTop = scrollAmount;
		document.body.scrollTop = scrollAmount;
	}
	//alert('3: ' + scrollAmount);
}

window.onunload = function()
{
	// reset the cookie to zero, this way the window won't
	// scroll the next time the user accesses it
	if (!window.dontkillcookie)
	{
		document.cookie="scrollAmount" + PageName + "=0";
	}
}

