$(function(){
	
	var controller = new ScrollMagic();

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

	// variable setup


	var on_device = $('#responsive .on-device.copy');
	var intro = $('.copy.intro');

	var webpage_wrapper = $('#responsive .webpage-wrapper');
	var webpage = $('#responsive .webpage');

	var imac_wrapper = $('#responsive .imac-wrapper');
	var imac = $('#responsive .imac');

	var ipad_wrapper = $('#responsive .ipad-wrapper');
	var ipad = $('#responsive .ipad');

	var iphone_wrapper = $('#responsive .iphone-wrapper');
	var iphone = $('#responsive .iphone');

	var responsiveTween = new TimelineMax()

		// prepare ipad to the correct transform
		.add(TweenMax.to(ipad, 1, { rotationX: '11deg', rotationY: '35deg', rotationZ: '-7deg', width: '240', height: '320' }), 0)
		// prepare iphone to correct transform
		.add(TweenMax.to(iphone, 1, { rotationX: '11deg', rotationY: '35deg', rotationZ: '-7deg', width: '104', height: '184', left: 0, top: 0 }), 0)

		// start by tweening webpage into position with copy
		.add(TweenMax.fromTo(webpage_wrapper, 600, {x: 150, y: 150, opacity: 0 }, {x: '150', y: '100', opacity: 1 }), 0)
		.add(TweenMax.fromTo(intro, 600, { opacity: 0 }, { opacity: 1 }), 0)

		// tween webpage to imac
		.add(TweenMax.to(webpage, 500, { width: '690', height: '420' }), 800)
		.add(TweenMax.fromTo(imac_wrapper, 500, { x: '150', y: '1200', opacity: 0 }, { x: 150, y: 100, opacity: 1 }), 1500)
		.add(TweenMax.fromTo(on_device, 500, { left: 875, top: 300, opacity: 0 }, { opacity: 1 }), 1400)
		.add(TweenMax.to(webpage, 1, {css:{ className: '+=imac-width' }}), 1800)
		.add(TweenMax.to(imac_wrapper, 500, { x: '150', y: '-500', opacity: 0 }), 3000)
		.call(function(){ (responsiveTween.time() > 3200) ? webpage.removeClass('imac-width') : webpage.addClass('imac-width') }, [], null, 3200)

		// tween to ipad
		.add(TweenMax.to(webpage, 500, { rotationX: '11deg', rotationY: '35deg', rotationZ: '-7deg', width: '240', height: '320', left: 0, top: 0 }), 3500)
		.add(TweenMax.fromTo(ipad_wrapper, 500, { x: '150', y: '800', opacity: 0 }, {x: '150', y: '100', opacity: 1}), 4200)
		.add(TweenMax.to(on_device, 500, { left: 450, top: 150,}), 4200)
		.add(TweenMax.to(on_device, 250, { text: 'on tablets', ease: Linear.easeNone }), 4200)
		.add(TweenMax.to(webpage, 50, {css:{ className: '+=ipad-width' }}), 4500)
		.add(TweenMax.to(ipad_wrapper, 500, { x: '150', y: '-500', opacity: 0 }), 5700)
		.call(function(){ webpage.removeClass('ipad-width') }, [], null, 6200)

		// tween to iphone
		.add(TweenMax.to(webpage, 500, { width: '104', height: '184', left: 0, top: 0}), 6000)
		.add(TweenMax.fromTo(iphone_wrapper, 500, { x: '150', y: '800', opacity: 0 }, {x: '150', y: '100', opacity: 1}), 6700)
		.add(TweenMax.to(on_device, 500, { left: 325, top: 130}), 6700)
		.add(TweenMax.to(on_device, 250, { text: 'on mobile', ease: Linear.easeNone }), 6600)
		.add(TweenMax.to(webpage, 1, {css:{ className: '+=iphone-width' }}), 7000)

		// fade out everything except on_device text
		.add(TweenMax.to($('').add([webpage, iphone_wrapper, intro]), 500, { opacity: 0 }), 8000)

		// tween final text
		.add(TweenMax.to(on_device, 500, {x: 250, y: 0}), 8500)
		.add(TweenMax.to(on_device, 10, {text: 'and everything inbetween.'}), 8500)
		.add(TweenMax.to(on_device, 500, {opacity: 0}), 10000);


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
