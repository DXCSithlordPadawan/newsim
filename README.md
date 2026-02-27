<p align="center">
  <img src="public/assets/images/gripen.svg" alt="Gripen Flight Simulator Logo" width="120"/>
</p>

# ✈️ Gripen Flight Simulator

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://threejs.org/) [![CesiumJS](https://img.shields.io/badge/CesiumJS-00AAEE?style=for-the-badge&logo=cesium)](https://cesium.com/) [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A high-performance, web-based flight simulator featuring the **Saab JAS 39 Gripen** — Sweden's iconic canard-delta multirole fighter. Built on the same hybrid rendering architecture as the Web Flight Simulator, combining **Three.js** high-fidelity 3D modeling with **CesiumJS** global-scale geospatial data.

## 🚀 Key Features

### 🌍 Global Real-World Terrain
- **Digital Twin Earth**: Powered by CesiumJS, fly over high-resolution 3D topography and satellite imagery anywhere on the planet.
- **Dynamic Level-of-Detail**: Seamlessly transition from high-altitude stratospheric flight to low-level canyon runs.

### 🦅 JAS 39 Gripen — Unique Flight Characteristics
- **Canard-Delta Configuration**: Close-coupled canards generate vortex lift for exceptional high-AoA performance.
- **Relaxed Static Stability**: Aerodynamically unstable by design — constant FBW intervention enables extreme maneuverability.
- **Digital Fly-By-Wire (FBW)**: Triplex redundant digital flight control system (G-command in combat, Alpha-command for landing).
- **Volvo RM12 Engine**: High-efficiency turbofan with afterburner delivering 80.5 kN thrust and excellent power-to-weight ratio.
- **STOL Capability**: 400m takeoff / 500m landing distance for road-base operations.

### 🔫 Gripen Weapon System
- **Mauser BK-27**: 27mm internal autocannon (120 rounds) — the Gripen's precision close-range weapon.
- **IRIS-T**: Infrared-homing short-range AAM with off-boresight capability, mounted on wingtip rails.
- **BOZ-101**: Chaff and flare countermeasure dispenser pod (40 rounds).

### 🖥️ Tactical HUD & Avionics
- Pitch Ladder and Heading Tape.
- Real-time Altitude (ASL) and Airspeed (IAS) indicators.
- Weapon Status and Ammo tracking.
- Interactive Minimap with satellite navigation.
- Missile lock status (LOCKING / LOCKED).

## 📊 Aircraft Specifications (JAS 39C)

| Parameter | Value |
|-----------|-------|
| Empty Weight | 6,800 kg |
| Max Takeoff Weight | 14,000 kg |
| Engine | Volvo RM12 turbofan |
| Max Thrust (dry) | 54.0 kN |
| Max Thrust (afterburner) | 80.5 kN |
| Max Speed (sea level) | Mach 1.2 |
| Max Speed (altitude) | Mach 2.0 |
| Service Ceiling | 15,240 m (50,000 ft) |
| Rate of Climb | 254 m/s |
| Combat Radius | 800 km |
| G Limits | +9G / -3G |
| Hardpoints | 8 |
| Internal Gun | Mauser BK-27 (27mm, 120 rounds) |
| Radar | Ericsson PS-05/A Pulse-Doppler |

*Full specifications available in [`gripen_config.json`](gripen_config.json)*

## ⌨️ Controls & Handling

| Category | Action | Key |
| :--- | :--- | :--- |
| **Flight** | Pitch Up / Down | `Arrow Down` / `Arrow Up` |
| | Roll Left / Right | `Arrow Left` / `Arrow Right` |
| | Yaw (Rudder) | `A` / `D` |
| | Increase / Decrease Throttle | `W` / `S` |
| | Afterburner (Boost) | `Space` |
| **Combat** | Fire Active Weapon | `Enter` or `F` |
| | Deploy Countermeasures (BOZ-101) | `V` |
| | Select Weapon | `1` / `2` |
| | Cycle Weapon | `Q` |
| **View** | Look Around | `Mouse Left Drag` |
| **System** | Pause | `P` / `Esc` |
| | Skip Dialogue | `Z` |

## ⚙️ Configuration & Options

- **Graphics Quality**: Adjustable settings for performance tuning.
- **Antialiasing**: Enable/disable FXAA smoothing.
- **Fog Effects**: Toggle atmospheric fog.
- **Mouse Sensitivity**: Fine-tune tactical camera sensitivity.
- **Sound Toggle**: Global master switch for all game audio.
- **Persistent Settings**: All choices saved to `localStorage`.

## 🛠️ Technical Overview

The project uses a **Hybrid Rendering Architecture**:
- **CesiumJS** handles planetary scales, WGS84 coordinates, and terrain streaming.
- **Three.js** manages the local coordinate system for the aircraft model, particle effects, and lighting.
- **Vite** provides an ultra-fast HMR development environment.
- **gripen_config.json** drives all aircraft physics parameters (JAS 39C and JAS 39E variants).

### Physics Model
The flight physics are derived from the Gripen specification in `gripen_config.json`:
- Higher pitch rate (1.4 rad/s) vs. conventional fighters — reflects FBW agility
- Higher roll rate (3.0 rad/s) — canard-delta configuration
- Faster acceleration response — lighter airframe (6,800 kg empty)
- Extended afterburner duration — efficient RM12 engine

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DXCSithlordPadawan/newsim.git
   cd newsim
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add the Gripen 3D model:**
   Place a `gripen.glb` 3D model file in `public/assets/models/`.

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
newsim/
├── index.html                    # Main HTML with Gripen HUD elements
├── package.json                  # Project dependencies
├── vite.config.js                # Vite build configuration
├── gripen_config.json            # Aircraft configuration (JAS 39C/E specs)
├── public/
│   └── assets/
│       ├── images/
│       │   └── gripen.svg        # Aircraft icon for HUD
│       ├── models/
│       │   └── gripen.glb        # 3D model (supply separately)
│       ├── sounds/               # Audio files (supply separately)
│       └── fonts/                # Fonts (supply separately)
└── src/
    ├── main.js                   # Main application entry point
    ├── style.css                 # UI styling
    ├── plane/
    │   ├── planePhysics.js       # Gripen flight physics (JAS 39C stats)
    │   ├── planeController.js    # Input handling
    │   └── jetFlame.js           # Engine flame effects
    ├── systems/
    │   ├── weaponSystem.js       # Gripen weapons (Mauser BK-27, IRIS-T)
    │   ├── npcSystem.js          # AI aircraft system
    │   └── dialogueSystem.js     # Mission briefing system
    ├── ui/
    │   └── hud.js                # Heads-Up Display
    ├── world/
    │   ├── cesiumWorld.js        # CesiumJS integration
    │   └── regions.js            # Geographic region detection
    ├── utils/
    │   ├── math.js               # Position calculation utilities
    │   ├── soundManager.js       # Audio management
    │   └── particles.js          # Explosion/smoke particle effects
    └── weapon/
        ├── bullet.js             # BK-27 cannon rounds
        ├── missile.js            # IRIS-T missile guidance
        └── flare.js              # BOZ-101 countermeasure flares
```

## 📜 License

This project is based on the Web Flight Simulator by Dimar Tarmizi, which is licensed under a **Dual-Licensing** model:
- **Non-Commercial:** Free to use for personal, educational, and non-profit projects.
- **Commercial:** Requires a separate commercial license for any for-profit use.

## 🏷️ Credits

- **Original Simulator**: Dimar Tarmizi ([Web Flight Simulator](https://github.com/dimartarmizi/web-flight-simulator))
- **Gripen Specifications**: [GripenSim Project](https://github.com/DXCSithlordPadawan/gripensim)
- **Engine**: [Three.js](https://threejs.org/) & [CesiumJS](https://cesium.com/)
- **Aircraft Data Sources**: Saab public specifications, Jane's All the World's Aircraft