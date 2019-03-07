function Timer(duration, element) {
	var self = this;
	this.duration = duration;
	this.element = element;
	this.running = false;
	
	this.els = {
		ticker: document.getElementById('ticker'),
		seconds: document.getElementById('seconds'),
	};
	
	document.getElementById('toggle').addEventListener('click', function() {
		var cl = 'countdown--wide';
		if (self.element.classList.contains(cl)) {
			self.element.classList.remove(cl);
		} else {
			self.element.classList.add(cl);
		}
	});

	function ColorChange() {
	var elem = document.getElementById("ticker");
	elem.style.background = "linear-gradient(90deg, rgb(255, 34, 34) 50%, rgb(102, 255, 0) 50%)";
	}
	var hammerHandler = new Hammer(this.element);
	hammerHandler.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
	hammerHandler.on('panup pandown', function(ev) {
		if (!self.running) {
			if (ev.direction === Hammer.DIRECTION_UP && self.duration < 999000) {
				self.setDuration(self.duration + 1000);
			} else if (ev.direction === Hammer.DIRECTION_DOWN && self.duration > 0) {
				self.setDuration(self.duration - 1000);
			}
		}
	});

	hammerHandler.on('tap', function() {
		if (self.running) {
			self.reset();
		} else {
			self.start();
		}
	})
}


Timer.prototype.start = function() {
	var self = this;
	var start = null;
	this.running = true;
	var remainingSeconds = this.els.seconds.textContent = this.duration / 1000;
	
	function draw(now) {
		if (!start) start = now;
		var diff = now - start;
		var newSeconds = Math.ceil((self.duration - diff)/1000);

		if (diff <= self.duration) {
			self.els.ticker.style.height = 100 - (diff/self.duration*100) + '%';
			
			if (newSeconds != remainingSeconds) {
				self.els.seconds.textContent = newSeconds;
                escapedSeconds = newSeconds;
				remainingSeconds = newSeconds;

			}
			
			self.frameReq = window.requestAnimationFrame(draw);
		} else {
			//self.running = false;
			self.els.seconds.textContent = 0;
			self.els.ticker.style.height = '0%';
			self.element.classList.add('countdown--ended');
		}

	};
	
	self.frameReq = window.requestAnimationFrame(draw);
}

Timer.prototype.reset = function() {
	this.running = false;
	window.cancelAnimationFrame(this.frameReq);
	this.els.seconds.textContent = this.duration / 1000;
	this.els.ticker.style.height = null;
	this.element.classList.remove('countdown--ended');
}

Timer.prototype.setDuration = function(duration) {
	this.duration = duration;
	this.els.seconds.textContent = this.duration / 1000;
	return duration

}

    var inputTime = prompt("Hoe Lang in minuten?", 1);
    var time = inputTime * 60 * 1000;
    var hoeveelSwitches = prompt("Hoeveel switches?", 1);


var timer = new Timer(time, document.getElementById('countdown'));
// timer.start();

/* Switch Code */
switched = false;
document.getElementById("switch").innerHTML = Boolean(switched);


function switch1() {
    var elem = document.getElementById("ticker");
    elem.style.background = "linear-gradient(90deg, rgb(255, 34, 34) 50%, rgb(102, 255, 0) 50%)";
    switched=true;
    document.getElementById("switch").innerHTML = Boolean(switched);
}

function switch2() {
    var elem = document.getElementById("ticker");
    elem.style.background = "linear-gradient(90deg, rgb(102, 255, 0) 50%, rgb(255, 34, 34) 50%)";
    switched=false;
    document.getElementById("switch").innerHTML = Boolean(switched);
    // getElementById("ticker").removeAttribute("style");
}



    hoeveelSwitches ++;
    console.log(hoeveelSwitches);
    console.log(time / hoeveelSwitches / 1000);
    switchMoment = time - (time / hoeveelSwitches);
    switchMoment = switchMoment / 1000;


window.setInterval(function(){
 console.log("switch moment is ", switchMoment);
    if (switchMoment == escapedSeconds && switched == false) {
        console.log ("Switch moment arrived")
        switch1();
    }
     else if (time == switchMoment && switched == true) {
         switch2();
     }
    console.log(escapedSeconds);
}, 900);