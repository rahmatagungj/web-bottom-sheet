import TouchDragListener from './TouchDragListener.js'


class BottomSheet {
	constructor(id) {
		this.id = id
		this.el = document.getElementById(id)
		this.backdop = this.el.querySelector('.dcd-bottom-sheet__backdop')
		this.handle = this.el.querySelector('.dcd-bottom-sheet__handle > span')
		this.sheet = this.el.querySelector('.dcd-bottom-sheet__sheet')

		this.open = this.open.bind(this)
		this.close = this.close.bind(this)        
        
		this.backdop.addEventListener('click', this.close)
		this.handle.addEventListener('click', this.close)
		
		this.sheetListener = new TouchDragListener({
			el: this.sheet,
            
			onTouchStart: ({ el }) => {
				el.style.setProperty('--translateY', 'translateY(0)')
				el.style.setProperty('transition', 'unset')
			},

			onTouchEnd: ({ el, currentY }) => {
				el.style.setProperty(
					'transition',
					'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)'
				)
				el.style.setProperty(
					'--translateY',
					`translateY(${currentY}px)`
					)
				},
				
				onTouchMove: ({ el, currentY }) => {
					if (currentY >= 145) return this.close()
					
					if (currentY <= -60) {
						currentY = -60
					} else if (currentY <= -40) {
						currentY = -41 + currentY / 10
					}
					
				el.style.setProperty(
					'--translateY',
					`translateY(${currentY}px)`
				)
			}
		})
	}

	open(e) {
		if (e) e.preventDefault()
		this.el.classList.add('active')
	}
    
	close() {
		this.sheet.style.setProperty(
			'transition',
			'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)'
		)

		this.sheet.style.setProperty('--translateY', 'translateY(201px)')
		this.el.classList.remove('active')
	}

	log() {
		console.info(this)
	}
}

export default BottomSheet