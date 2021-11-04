class TouchDragListener {
	constructor({ el, onTouchStart, onTouchEnd, onTouchMove }) {
		this.el = el
		this.onTouchStart = onTouchStart
		this.onTouchEnd = onTouchEnd
		this.onTouchMove = onTouchMove

		this.active = false
		this.currentY = 0
		this.initialY = 0
		this.yOffset = 0

		this.onDragStart = this.onDragStart.bind(this)
		this.onDragEnd = this.onDragEnd.bind(this)
		this.onDrag = this.onDrag.bind(this)
		
		this.el.addEventListener('mousedown', this.onDragStart)
		this.el.addEventListener('mouseleave', this.onDragEnd)
		this.el.addEventListener('mouseup', this.onDragEnd)
		this.el.addEventListener('mousemove', this.onDrag)

		this.el.addEventListener('touchstart', this.onDragStart, { passive: true })
		this.el.addEventListener('touchend', this.onDragEnd, { passive: true })
		this.el.addEventListener('touchmove', this.onDrag, { passive: true })
	}

	onDragStart(e) {
		this.active = true
		this.el.classList.add('active')

		if (e.type === 'touchstart') {
			this.initialY = e.touches[0].clientY - this.yOffset
		} else {
			this.initialY = e.clientY - this.yOffset
		}

		if (!this.onTouchStart) return

		this.onTouchStart({
			el: this.el,
			active: this.active,
			currentY: this.currentY,
			initialY: this.initialY,
			yOffset: this.offSetY
		})
	}

	onDragEnd(_e) {
		this.active = false
		this.el.classList.remove('active')

		this.yOffset = 0

		this.initialY = this.currentY
        
		if (!this.onTouchEnd) return

		this.onTouchEnd({
			el: this.el,
			active: this.active,
			currentY: this.currentY,
			initialY: this.initialY,
			yOffset: this.offSetY
		})
	}

	onDrag(e) {
		if (!this.active) return
		e.preventDefault()

		if (e.type === 'touchmove') {
			this.currentY = e.touches[0].clientY - this.initialY
		} else {
			this.currentY = e.clientY - this.initialY
		}

		this.yOffset = this.currentX

		if (!this.onTouchMove) return

		this.onTouchMove({
			el: this.el,
			active: this.active,
			currentY: this.currentY,
			initialY: this.initialY,
			yOffset: this.offSetY
		})        
	}
}

export default TouchDragListener