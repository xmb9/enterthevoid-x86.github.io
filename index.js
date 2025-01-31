var windows;
function openWindow(winvar, wintitle, wincontent, canResize) {
	windows[winvar] = new $Window({title: wintitle, resizable: canResize, outerWidth: 800, outerHeight: 600 });
	windows[winvar].$content.append(wincontent);
}
