import * as THREE from 'three'
import Experience from './Experience.js'

export default class WeBareBears {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setModel()
    }

    setModel() {
        this.model = this.resources.items.weBareBearsModel
        
        // Set up materials and lighting for each mesh
        this.model.scene.traverse((child) => {
            if (child.isMesh) {
                // Enable shadows
                child.castShadow = true
                child.receiveShadow = true

                // Make sure materials are using standard material with proper lighting
                if (child.material) {
                    const standardMaterial = new THREE.MeshStandardMaterial({
                        map: child.material.map,
                        normalMap: child.material.normalMap,
                        roughnessMap: child.material.roughnessMap,
                        metalnessMap: child.material.metalnessMap,
                        alphaMap: child.material.alphaMap,
                        aoMap: child.material.aoMap,
                        metalness: 0.1,  // Low metalness for cartoon-like appearance
                        roughness: 0.8,  // High roughness for soft, furry look
                        color: child.material.color || new THREE.Color(0xffffff)
                    })

                    // If the original material has emissive properties, preserve them
                    if (child.material.emissive) {
                        standardMaterial.emissive = child.material.emissive
                        standardMaterial.emissiveMap = child.material.emissiveMap
                        standardMaterial.emissiveIntensity = child.material.emissiveIntensity || 1
                    }

                    child.material = standardMaterial
                }
            }
        })

        // Add ambient light specific to the bears
        const bearsAmbientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.model.scene.add(bearsAmbientLight)

        // Add directional light for better shadows and definition
        const bearsDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        bearsDirectionalLight.position.set(2, 3, 1)
        bearsDirectionalLight.castShadow = true
        this.model.scene.add(bearsDirectionalLight)

        // Add soft point light for highlights
        const bearsPointLight = new THREE.PointLight(0xffffff, 0.5, 5)
        bearsPointLight.position.set(0, 2, 2)
        this.model.scene.add(bearsPointLight)
        
        this.model.scene.scale.set(0.09, 0.09, 0.09)
        this.model.scene.position.set(4.4, 2.65, -4.5)
        this.model.scene.rotation.set(0, Math.PI * 2, 0)
        this.scene.add(this.model.scene)
    }
}
