import { soundManager } from '../utils/soundManager';

export class DialogueSystem {
	constructor() {
		this.container = document.getElementById('dialogue-container');
		this.textElem = document.getElementById('dialogue-text');
		// Updated dialogue for Gripen simulator
		this.dialogues = [
			"Welcome, Pilot. You are now cleared for flight operations in the JAS 39 Gripen.",
			"The Gripen is a lightweight, multi-role fighter featuring a canard-delta wing configuration.",
			"Check your HUD. The left box shows your SPEED, and the right box shows your ALTITUDE.",
			"The compass at the top shows your heading. The crosshair helps you level your flight path.",
			"Your weapons are armed. The Mauser BK-27 27mm cannon is your primary close-range weapon.",
			"IRIS-T missiles are loaded for air-to-air engagements. Select with '2' and acquire a lock before firing.",
			"Use 'W' and 'S' to control your throttle. The Volvo RM12 engine delivers excellent power-to-weight ratio.",
			"Control your pitch and roll with the ARROW keys. Use 'A' and 'D' for yaw control.",
			"Engage the afterburner with SPACE. The Gripen's FBW system will maintain stability throughout.",
			"The BOZ-101 dispenser pod provides chaff and flares. Press 'V' to deploy countermeasures.",
			"The Gripen's relaxed static stability and FBW give you exceptional agility. Use it wisely.",
			"Good hunting, Pilot. Flight Control, out."
		];
		this.currentIndex = 0;
		this.isActive = false;
		this.isPaused = false;
		this.currentCharIndex = 0;
		this.isWaitingForNext = false;
		this.lastSoundIndex = -1;
		this.glitchSounds = [
			'glitch-1',
			'glitch-2',
			'glitch-3',
			'glitch-4'
		];
	}

	start() {
		if (localStorage.getItem('tutorialCompleted')) return;

		this.stop();

		this.currentIndex = 0;
		this.currentCharIndex = 0;
		this.isActive = true;
		this.isPaused = false;
		this.isWaitingForNext = false;

		this.startTimeout = setTimeout(() => {
			if (!this.isActive || this.isPaused) return;
			this.container.classList.remove('hidden');
			this.showNext();
		}, 7000);
	}

	pause() {
		if (!this.isActive) return;
		this.isPaused = true;
		this.container.classList.add('hidden');
		if (this.startTimeout) clearTimeout(this.startTimeout);
		if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
		if (this.nextTimeout) clearTimeout(this.nextTimeout);
	}

	resume() {
		if (!this.isActive || !this.isPaused) return;
		this.isPaused = false;
		this.container.classList.remove('hidden');

		if (this.isWaitingForNext) {
			this.nextTimeout = setTimeout(() => {
				this.currentIndex++;
				this.currentCharIndex = 0;
				this.showNext();
			}, 2000);
		} else {
			this.typeWriter();
		}
	}

	stop() {
		this.isActive = false;
		this.isPaused = false;
		this.container.classList.add('hidden');
		if (this.startTimeout) clearTimeout(this.startTimeout);
		if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
		if (this.nextTimeout) clearTimeout(this.nextTimeout);
	}

	showNext() {
		if (!this.isActive || this.isPaused) return;

		if (this.currentIndex >= this.dialogues.length) {
			this.finish();
			return;
		}

		this.textElem.textContent = '';
		this.currentCharIndex = 0;
		this.isWaitingForNext = false;

		this.playRandomGlitch();
		this.typeWriter();
	}

	typeWriter() {
		if (!this.isActive || this.isPaused) return;

		const text = this.dialogues[this.currentIndex];
		if (this.currentCharIndex < text.length) {
			this.textElem.textContent = text.substring(0, this.currentCharIndex + 1);
			this.currentCharIndex++;
			this.typewriterTimeout = setTimeout(() => this.typeWriter(), 30);
		} else {
			this.isWaitingForNext = true;
			this.nextTimeout = setTimeout(() => {
				this.currentIndex++;
				this.currentCharIndex = 0;
				this.showNext();
			}, 4000);
		}
	}

	playRandomGlitch() {
		let index;
		do {
			index = Math.floor(Math.random() * this.glitchSounds.length);
		} while (index === this.lastSoundIndex);

		this.lastSoundIndex = index;
		soundManager.play(this.glitchSounds[index]);
	}

	skip() {
		if (!this.isActive || this.isPaused) return;

		const text = this.dialogues[this.currentIndex];
		if (!text) return;

		if (!this.isWaitingForNext) {
			if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
			this.textElem.textContent = text;
			this.currentCharIndex = text.length;
			this.isWaitingForNext = true;

			if (this.nextTimeout) clearTimeout(this.nextTimeout);
			this.nextTimeout = setTimeout(() => {
				this.currentIndex++;
				this.currentCharIndex = 0;
				this.showNext();
			}, 4000);
		} else {
			if (this.nextTimeout) clearTimeout(this.nextTimeout);
			this.currentIndex++;
			this.currentCharIndex = 0;
			this.showNext();
		}
	}

	finish() {
		this.isActive = false;
		this.container.classList.add('hidden');
		localStorage.setItem('tutorialCompleted', 'true');
	}
}
