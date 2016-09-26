  var gauge = new Gauge({
		renderTo    : 'gauge',
		width       : 320, //document.body.offsetWidth,
		height      : 240, //document.body.offsetHeight,
		glow        : true,
		units       : 'Seconds',
		title       : "Calendar42",
		minValue    : 0,
		maxValue    : 60,
		majorTicks  : ['0','10','20','30','40','50','60'],
		minorTicks  : 2,
		strokeTicks : false,
		highlights  : [
			{ from : 0,   to : 50, color : 'rgba(0,   255, 0, .15)' },
			{ from : 50, to : 100, color : 'rgba(255, 255, 0, .15)' },
			{ from : 100, to : 150, color : 'rgba(255, 30,  0, .25)' },
			{ from : 150, to : 200, color : 'rgba(255, 0,  225, .25)' },
			{ from : 200, to : 220, color : 'rgba(0, 0,  255, .25)' }
		],
		colors      : {
			plate      : '#222',
			majorTicks : '#f5f5f5',
			minorTicks : '#ddd',
			title      : '#fff',
			units      : '#ccc',
			numbers    : '#eee',
			needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
		}
	});

	gauge.draw();

// window.onresize= function() {
// 	gauge.updateConfig({
// 		width  : document.body.offsetWidth,
// 		height : document.body.offsetHeight
// 	});
// };
