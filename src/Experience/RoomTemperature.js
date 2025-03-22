import * as THREE from 'three'
import Experience from './Experience.js'
import eraWidget from '@eohjsc/era-widget'

export default class RoomTemperature {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.configTemperature = null
        this.valueTemperature = null

        this.setGeometry()
        this.setMaterial()
        this.setText()
        this.setupEraWidget()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(2, 0.6)  
    }

    setMaterial() {
        const canvas = document.createElement('canvas')
        canvas.width = 2048  
        canvas.height = 512  

        this.context = canvas.getContext('2d')
        this.texture = new THREE.CanvasTexture(canvas)

        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
            transparent: true,
            side: THREE.DoubleSide
        })
    }

    setText() {
        // Position for the temperature display
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(1, 5, -4) 
        this.mesh.rotation.y = Math.PI * 2  // Xoay 90 độ để song song với mặt tường bên trái
        this.scene.add(this.mesh)

        this.updateTemperature()
    }

    setupEraWidget() {
        eraWidget.init({
            onConfiguration: (configuration) => {
                this.configTemperature = configuration.realtime_configs[0]
            },
            onValues: (values) => {
                this.valueTemperature = values[this.configTemperature?.id]?.value || null
                this.updateTemperature()
            },
        })
    }

    updateTemperature() {
        // Clear the canvas
        this.context.clearRect(0, 0, 2048, 512)

        // Set text properties
        this.context.fillStyle = '#ffffff'
        this.context.strokeStyle = '#000000'  
        this.context.lineWidth = 55  
        this.context.font = 'bold 400px Arial'  
        this.context.textAlign = 'center'
        this.context.textBaseline = 'middle'

        // Use real temperature from Era Widget or fallback to default
        const temperature = this.valueTemperature ? this.valueTemperature.toFixed(1) : '22.0'
        const text = `${temperature}°C`
        
        // Draw text with outline
        this.context.strokeText(text, 1024, 256)  
        this.context.fillStyle = '#ffffff'        
        this.context.fillText(text, 1024, 256)    

        // Update texture
        this.texture.needsUpdate = true
    }

    update() {
        // Remove the automatic update since we now use Era Widget events
        // The temperature will update whenever we receive new values from the widget
    }
}
