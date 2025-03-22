import * as THREE from 'three'
import Experience from './Experience.js'

export class RunningText {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.text = 'Máu đỏ da vàng tôi là người Việt Nam\nDù đi năm châu cho dù về nơi đâu'
        this.textGroup = new THREE.Group()
        this.speed = 1 // Tốc độ chạy
        
        this.createText()
    }

    createText() {
        // Tạo canvas để vẽ text
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        // Đặt kích thước canvas lớn hơn để chứa text nhiều dòng
        canvas.width = 2024
        canvas.height = 512 // Tăng chiều cao canvas
        
        // Thiết lập style cho text
        context.font = 'bold 100px Arial'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        
        // Tạo gradient màu cho text
        const gradient = context.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, '#ff0000')  // Màu đỏ
        gradient.addColorStop(0.5, '#ffff00') // Màu vàng
        gradient.addColorStop(1, '#ff0000')   // Màu đỏ
        
        context.fillStyle = gradient
        
        // Tính toán vị trí để text nằm giữa canvas
        const lines = this.text.split('\n')
        const lineHeight = 150 // Khoảng cách giữa các dòng
        const totalHeight = lines.length * lineHeight
        
        // Vẽ từng dòng text
        lines.forEach((line, index) => {
            const y = (canvas.height / 2) - (totalHeight / 2) + (index * lineHeight)
            context.fillText(line, canvas.width / 2, y)
        })
        
        // Tạo texture từ canvas
        const texture = new THREE.CanvasTexture(canvas)
        
        // Tạo material với texture
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        })
        
        // Tạo plane geometry để hiển thị text
        const planeGeometry = new THREE.PlaneGeometry(4, 2) // Tăng chiều cao plane
        const textMesh = new THREE.Mesh(planeGeometry, material)
        
        // Thêm ánh sáng ambient để text dễ nhìn hơn
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.textGroup.add(ambientLight)
        
        // Thêm ánh sáng directional để tạo bóng
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
        directionalLight.position.set(0, 5, 5)
        this.textGroup.add(directionalLight)
        
        // Thêm text vào group
        this.textGroup.add(textMesh)
        
        // Đặt vị trí và xoay text để song song với bức tường bên phải
        this.textGroup.position.set(4, 4.5, 2) // Di chuyển sang phải và lên cao một chút
        this.textGroup.rotation.y = Math.PI / -2 // Xoay 90 độ ngược lại

        this.scene.add(this.textGroup)
    }

    update() {
        if (this.textGroup) {
            // Chỉ giữ lại animation xoay nhẹ nhàng
            this.textGroup.rotation.y = Math.PI / -2 + Math.sin(this.time.elapsed * 0.001) * 0.2
        }
    }

    destroy() {
        if (this.textGroup) {
            this.scene.remove(this.textGroup)
            this.textGroup.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (child.material.map) {
                        child.material.map.dispose()
                    }
                    child.geometry.dispose()
                    child.material.dispose()
                }
            })
        }
    }
}
