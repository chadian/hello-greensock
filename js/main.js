$(function(){
	
	var controller = new ScrollMagic();

	// var swoopIn = {
	// 	curviness: 3,
	// 	autoRotate: true,
	// 	values: [
	// 			{ x: -100,	y: -250, },
	// 			{ x: 100,	y: 300 },
	// 		]
	// }
	
	// var tween = new TimelineMax()
	// 		.add(TweenMax.staggerTo($('.like'), 20, 
	// 			{ 
	// 				css: { bezier: swoopIn, opacity: 1 },
	// 			 	ease: Quad.easeIn
	// 			},
	// 			5
	// 		))
	// 		.add(TweenMax.staggerTo($('.like'), 2,
	// 			{
	// 				css: { x: 200, y: 500, rotation: 0 }
	// 			},
	// 			5
	// 		))
	// 		.add(TweenMax.staggerTo($('.like'), 5, 
	// 			{}, 
	// 			5
	// 		))
	// 		.add(TweenMax.staggerTo($('.like'), 2,
	// 			{
	// 				css: { x: 1000, y: 500, opacity: 0 },
	// 				ease: Linear.easeInOut
	// 			},
	// 			10
	// 		))

/*

	'Hello' scene

*/

	var helloTween = new TimelineMax()
			.add(TweenMax.staggerTo(
				'.letter',
				10,
				{
					css: { top: 0 }
				},
				5
			))
			.add(TweenMax.to('', 25, {}))

	var hello = new ScrollScene({
		duration: 2000,
		triggerElement: $('.trigger.hello'),
		triggerHook: 0
	})
	.setPin('#hello')
	.setTween(helloTween)
	.addTo(controller)
	.addIndicators();

/*

	'Build' scene

*/

	var buildTween = new TimelineMax()
		// Spin gears
		.add([
			TweenMax.to($('.gear:nth-child(2n+1)'), 3000, { rotation: '-=1095', ease: Linear.easeNone, force3D: true } ),
			TweenMax.to($('.gear:nth-child(2n)'), 3000, { rotation: '+=1095', ease: Linear.easeNone, force3D:true } ),
		], 0)
		// Pull in copy part way
		.add([
			TweenMax.to($('.copy.top'), 1000, { left: '30%', ease: Bounce.easeInOut, force3D:true }),
			TweenMax.to($('.copy.bottom'), 1100, { left: '30%', ease: Bounce.easeInOut, force3D:true })
		], 1)
		// Push copy off screen
		.add(TweenMax.to($('.copy.top'), 900, { left: '110%', ease: Circ.easeIn, force3D:true }), 2100)
		.add(TweenMax.to($('.copy.bottom'), 850, { left: '110%', ease: Circ.easeIn, force3D:true }), 2200);


	var build = new ScrollScene({
		duration: 10000,
		triggerElement: $('#build'),
		triggerHook: 0,
	})
	.setPin('#build')
	.setTween(buildTween)
	.addTo(controller)
	.addIndicators();


/*

	'Responsive' scene

*/

	var responsiveTween = new TimelineMax()

		// prepare ipad to the correct transform
		.add(TweenMax.to($('.ipad'), 1, { rotationX: '11deg', rotationY: '35deg', rotationZ: '-7deg', width: '240', height: '320' }), 0)
		// prepare iphone to correct transform
		.add(TweenMax.to($('.iphone'), 1, { rotationX: '11deg', rotationY: '35deg', rotationZ: '-7deg', width: '104', height: '184', left: 0, top: 0 }), 0)

		// start by tweening webpage into position with copy
		.add(TweenMax.fromTo($('.webpage-wrapper'), 600, {x: 150, y: 150, opacity: 0 }, {x: '250', y: '200', opacity: 1 }), 0)
		.add(TweenMax.fromTo($('.copy.intro'), 600, { opacity: 0 }, { opacity: 1 }), 0)

		// tween webpage to imac
		.add(TweenMax.to($('.webpage'), 500, { width: '690', height: '420' }), 800)
		.add(TweenMax.fromTo($('.imac-wrapper'), 500, { x: '250', y: '1200', opacity: 0 }, { x: 250, y: 200, opacity: 1 }), 1500)
		.add(TweenMax.to($('.webpage'), 1, {css:{ className: '+=imac-width' }}), 1800)
		.add(TweenMax.to($('.imac-wrapper'), 500, { x: '250', y: '-500', opacity: 0 }), 3000)
		.call(function(){ $('.webpage').removeClass('imac-width') }, [], null, 3200)

		// tween to ipad
		.add(TweenMax.to($('.webpage'), 500, { rotationX: '11deg', rotationY: '35deg', rotationZ: '-7deg', width: '240', height: '320', left: 0, top: 0 }), 3500)
		.add(TweenMax.fromTo($('.ipad-wrapper'), 500, { x: '250', y: '800', opacity: 0 }, {x: '250', y: '200', opacity: 1}), 4200)
		.add(TweenMax.to($('.webpage'), 1, {css:{ className: '+=ipad-width' }}), 4500)
		.add(TweenMax.to($('.ipad-wrapper'), 500, { x: '250', y: '-500', opacity: 0 }), 5700)
		.call(function(){ $('.webpage').removeClass('ipad-width') }, [], null, 6200)

		// tween to iphone
		.add(TweenMax.to($('.webpage'), 500, { width: '104', height: '184', left: 0, top: 0}), 6000)
		.add(TweenMax.fromTo($('.iphone-wrapper'), 500, { x: '250', y: '800', opacity: 0 }, {x: '250', y: '200', opacity: 1}), 6700)
		.add(TweenMax.to($('.webpage'), 1, {css:{ className: '+=iphone-width' }}), 7000)
		.add(TweenMax.to($('.webpage'), 1, { opacity: 0 }), 8500)
		.add(TweenMax.to($('.iphone-wrapper'), 500, { opacity: 0 }), 8500);


	var responsive = new ScrollScene({
		duration: 8000,
		triggerElement: $('.trigger.responsive'),
		triggerHook: 0
	})
	.setPin('.webpage-wrapper')
	.setTween(responsiveTween)
	.addTo(controller)
	.addIndicators();

});
