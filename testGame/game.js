
(function(){
	
	Pac.Repository
		.addResources({
			'scOffice':'officeBg.png',
			'laptop':'laptop.png',
			'paper':'paper.png',
		});
	
	var laptop = new Pac.Obj('my laptop', 'laptop', {
			x: 100,
			y: 100,
			width: 50, //optional : will take the resource size
			height: 50
	});
	
	var paperW = new Pac.Obj('some paper work', 'paper', {
			x: 50,
			y: 50,
			width: 20,
			height: 30
	});

	var scOffice = new Pac.Scene('One day at work', 'scOffice')
								.addObj(laptop)
								.addObj(paperW);
								
	Pac.init('canvas').addScene(scOffice);
		
	Pac.Repository.on('complete', function(){
		Pac.start();
	}).load();	
		
});



