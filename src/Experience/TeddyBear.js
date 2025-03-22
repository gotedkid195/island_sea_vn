import * as THREE from 'three'
import Experience from './Experience.js'

export default class TeddyBear {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setModel()
    }

    setModel() {
        this.model = this.resources.items.teddyBearModel
        this.model.scene.scale.set(0.005, 0.005, 0.005) // Increased scale by 7 times (0.5 * 7 = 3.5)
        // this.model.scene.position.set(4, 5, 2) // Position of gun_3b
        this.model.scene.position.set(3, -0.1, 3.8) // x, z, y Position of teddy bear
        this.model.scene.rotation.set(0, Math.PI * 0.8, 0)
        this.scene.add(this.model.scene)
    }
}
