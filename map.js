LLBAND = [75, 60, 45, 30, 15, 0];
LL2MC = [
	[	-0.0015702102444
		,111320.7020616939
		,1704480524535203
		,-10338987376042340
		,26112667856603880
		,-35149669176653700
		,26595700718403920
		,-10725012454188240
		,1800819912950474
		,82.5
	], 

	[	0.0008277824516172526
		,111320.7020463578
		,647795574.6671607
		,-4082003173.641316
		,10774905663.51142
		,-15171875531.51559
		,12053065338.62167
		,-5124939663.577472
		,913311935.9512032
		,67.5
	], 
	
	[	0.00337398766765
		,111320.7020202162
		,4481351.045890365
		,-23393751.19931662
		,79682215.47186455
		,-115964993.2797253
		,97236711.15602145
		,-43661946.33752821
		,8477230.501135234
		,52.5
	],
	
	[	0.00220636496208
		,111320.7020209128
		,51751.86112841131
		,3796837.749470245
		,992013.7397791013
		,-1221952.21711287
		,1340652.697009075
		,-620943.6990984312
		,144416.9293806241
		,37.5
	],
	
	[	-0.0003441963504368392
		,111320.7020576856
		,278.2353980772752
		,2485758.690035394
		,6070.750963243378
		,54821.18345352118
		,9540.606633304236
		,-2710.55326746645
		,1405.483844121726
		,22.5
	],
	
	[	-0.0003218135878613132
		,111320.7020701615
		,0.00369383431289
		,823725.6402795718
		,0.46104986909093
		,2351.343141331292
		,1.58060784298199
		,8.77738589078284
		,0.37238884252424
		,7.45
	]
];
function trans(P){
	for (var i = 0; i < LLBAND.length; i++) {
		if (P.lat >= LLBAND[i]) {
			a = LL2MC[i];
			break
		}
	}
	if (!a) {
		for (var i = LLBAND.length - 1; i >= 0; i--) {
			if (P.lat <= -LLBAND[i]) {
				a = LL2MC[i];
				break
			}
		}
	}
	var X = a[0] + a[1] * Math.abs(P.lng);
	var b = Math.abs(P.lat) / a[9];
	var Y = a[2] 
		+ a[3] * b 
		+ a[4] * b * b 
		+ a[5] * b * b * b 
		+ a[6] * b * b * b * b 
		+ a[7] * b * b * b * b * b 
		+ a[8] * b * b * b * b * b * b;
	X *= (P.lng < 0 ? -1 : 1);
	Y *= (P.lat < 0 ? -1 : 1); 

	return {x:fixTo(X), y:fixTo(Y)};
}