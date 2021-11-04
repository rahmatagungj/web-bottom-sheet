import './style.scss'
import BottomSheet from './src/BottomSheet'

const buttons = document.querySelectorAll('#reviewer-popup-button')

function initBottomSheet () {
	if (window.innerWidth > 768) return

	buttons.forEach(button => {
		const dataTarget = button.getAttribute('data-target')

		button.addEventListener('click', () => {
			const reviewerBottomSheet = new BottomSheet(dataTarget)

			reviewerBottomSheet.open()

			window.addEventListener('resize', function removeBottomSheet () {
				reviewerBottomSheet.close()
				window.removeEventListener('resize', removeBottomSheet)
			})
		})
	})
}

initBottomSheet()
