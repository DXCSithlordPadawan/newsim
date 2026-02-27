import * as THREE from 'three';

// JAS 39 Gripen physics constants derived from gripen_config.json (JAS-39C variant)
// Source: https://github.com/DXCSithlordPadawan/gripensim/blob/main/gripen_config.json
export class PlanePhysics {
	constructor() {
		// Speed parameters (game units ≈ m/s)
		// Gripen JAS 39C: max_speed_altitude_mach 2.0 (~680 m/s), max_speed_sea_level_mach 1.2 (~408 m/s)
		this.speed = 120;
		this.maxSpeed = 600;   // Mach 2.0 equivalent for gameplay
		this.minSpeed = 80;    // Lower stall speed than F-15 (Gripen canard-delta design)
		this.throttle = 0.5;

		// Engine parameters
		// Gripen JAS 39C: Volvo RM12, max_thrust_afterburner_kn 80.5
		// Better thrust-to-weight ratio than F-15 at low weight
		this.enginePower = 1.3;
		this.drag = 0.0045;     // Lower base drag due to clean delta wing
		this.liftFactor = 0.002;
		this.gravity = 9.8;

		// Attitude
		this.pitch = 0;
		this.roll = 0;
		this.heading = 0;

		// Flight control rates
		// Gripen: relaxed static stability with FBW → more agile than F-15
		// pid_pitch_kp 2.5, pid_roll_kp 3.0 (higher than typical F-15 values)
		this.pitchRate = 1.4;  // More agile than F-15 (1.2)
		this.rollRate = 3.0;   // Canard-delta: higher roll rate
		this.yawRate = 0.6;    // Slightly more responsive

		// Afterburner parameters
		// Gripen RM12: spool_up_time_s 4.0, efficient turbofan
		this.isBoosting = false;
		this.boostTimeRemaining = 0;
		this.boostDuration = 3.0;   // Slightly longer boost window
		this.boostMultiplier = 1.6; // Higher afterburner efficiency
		this.boostRotations = 2;
		this.boostPressed = false;

		// G-limits from gripen_config.json: max_g_positive 9.0, max_g_negative -3.0
		this.maxG = 9.0;

		this.quaternion = new THREE.Quaternion();
	}

	boost() {
		if (this.boostTimeRemaining <= 0) {
			this.isBoosting = true;
			this.boostTimeRemaining = this.boostDuration;
		}
	}

	reset(lon, lat, alt, heading, pitch, roll) {
		this.heading = heading || 0;
		this.pitch = pitch || 0;
		this.roll = roll || 0;

		const euler = new THREE.Euler(
			THREE.MathUtils.degToRad(this.pitch),
			THREE.MathUtils.degToRad(this.heading),
			THREE.MathUtils.degToRad(this.roll),
			'YXZ'
		);
		this.quaternion.setFromEuler(euler);
	}

	update(input, dt) {
		if (this.boostTimeRemaining > 0) {
			this.boostTimeRemaining -= dt;
			if (this.boostTimeRemaining <= 0) {
				this.isBoosting = false;
				this.boostTimeRemaining = 0;
			}
		}

		if (input.boost) {
			if (!this.boostPressed && !this.isBoosting) {
				this.boost();
			}
			this.boostPressed = true;
		} else {
			this.boostPressed = false;
		}

		this.throttle = input.throttle;
		let targetSpeed = this.minSpeed + (this.throttle * (this.maxSpeed - this.minSpeed));

		if (this.isBoosting) {
			targetSpeed = this.maxSpeed * this.boostMultiplier;
		}

		// Gripen has faster acceleration response due to lighter airframe (empty_weight_kg 6800)
		this.speed += (targetSpeed - this.speed) * dt * (this.isBoosting ? 4.5 : 2.2);

		const controlEffectiveness = this.speed > this.minSpeed ? 1 : (this.speed / this.minSpeed);

		const localPitch = input.pitch * this.pitchRate * dt * controlEffectiveness;
		const localRoll = input.roll * this.rollRate * dt * controlEffectiveness;
		const localYaw = input.yaw * this.yawRate * dt * controlEffectiveness;

		const qPitch = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), localPitch);
		const qRoll = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), localRoll);
		const qYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), localYaw);

		this.quaternion.multiply(qYaw);
		this.quaternion.multiply(qPitch);
		this.quaternion.multiply(qRoll);

		this.quaternion.normalize();

		const euler = new THREE.Euler().setFromQuaternion(this.quaternion, 'YXZ');

		this.heading = THREE.MathUtils.radToDeg(euler.y);
		this.pitch = THREE.MathUtils.radToDeg(euler.x);
		this.roll = THREE.MathUtils.radToDeg(euler.z);

		return {
			speed: this.speed,
			pitch: this.pitch,
			roll: this.roll,
			heading: this.heading,
			isBoosting: this.isBoosting,
			boostTimeRemaining: this.boostTimeRemaining,
			boostDuration: this.boostDuration,
			boostRotations: this.boostRotations
		};
	}
}
