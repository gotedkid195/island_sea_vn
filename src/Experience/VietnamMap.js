import * as THREE from 'three'
import Experience from './Experience.js'

export default class VietnamMap {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setMap()
    }

    setMap() {
        // Create a plane geometry for the map (doubled size)
        const geometry = new THREE.PlaneGeometry(4, 2.35) // 2 -> 4 and 1.5 -> 3
        
        // Get the texture
        const texture = this.resources.items.vietnamMapTexture
        // Ensure correct color space
        texture.encoding = THREE.sRGBEncoding
        // Prevent texture from being too blurry
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        
        // Create material with enhanced settings
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            metalness: 0,
            roughness: 1,
            // Ensure colors are not affected by scene lighting
            emissive: new THREE.Color(0xffffff),
            emissiveMap: texture,
            emissiveIntensity: 1
        })

        // Create mesh
        this.map = new THREE.Mesh(geometry, material)
        
        // Position the map
        this.map.position.set(4.2, 2.7, 1.84)
        this.map.rotation.set(0, Math.PI * 1.5, 0)
        
        // Add lighting specific to the map
        const mapLight = new THREE.PointLight(0xffffff, 1, 5)
        mapLight.position.set(4.2, 3, 2)
        this.scene.add(mapLight)
        
        // Add to scene
        this.scene.add(this.map)
    }
}
