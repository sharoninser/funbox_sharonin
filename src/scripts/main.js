const data = [
	{
		id: 1,
		title: 'Нямушка',
		taste: 'с фуа-гра',
		subtitle: 'Сказочное заморское яство',
		hoverSubtitle: 'Котэ не одобряет?',
		numberServings: '10',
		gift: {
			num: '',
			text: 'мышь',
		},
		message: '',
		weight: '0,5',
		notifications: {
			default: {
				text: 'Чего сидишь? Порадуй котэ',
				link: 'купи',
			},
			selected: {
				text: 'Печень утки разварная с артишоками.',
			},
			disabled: {
				text: 'Печалька, с фуа-гра закончился.',
			},
		},
		ended: false,
	},
	{
		id: 2,
		title: 'Нямушка',
		taste: 'с рыбой',
		subtitle: 'Сказочное заморское яство',
		hoverSubtitle: 'Котэ не одобряет?',
		numberServings: '40',
		gift: {
			num: '2',
			text: 'мыши',
		},
		message: 'заказчик доволен',
		weight: '2',
		notifications: {
			default: {
				text: 'Чего сидишь? Порадуй котэ',
				link: 'купи',
			},
			selected: {
				text: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
			},
			disabled: {
				text: 'Печалька, с рыбой закончился.',
			},
		},
		ended: false,
	},
	{
		id: 3,
		title: 'Нямушка',
		taste: 'с курой',
		subtitle: 'Сказочное заморское яство',
		hoverSubtitle: 'Котэ не одобряет?',
		numberServings: '100',
		gift: {
			num: '5',
			text: 'мышей',
		},
		message: 'заказчик доволен',
		weight: '5',
		notifications: {
			default: {
				text: 'Чего сидишь? Порадуй котэ',
				link: 'купи',
			},
			selected: {
				text: 'Филе из цыплят с трюфелями в бульоне.',
			},
			disabled: {
				text: 'Печалька, с курой закончился.',
			},
		},
		ended: true,
	},
]

const cards = document.querySelector('.cards')

const getData = packs => {
	packs.forEach(pack => {
		let template = `
			<div class="card ${pack.ended ? 'disabled' : ''}" data-id="${pack.id}">
				<div class="card__main">
					<div class="card__corner"></div>
					<div class="card__text"> 
						<p class="card__text-suptitle hero-text">${pack.subtitle}</p>
						<p class="card__text-suptitle hover-text">${pack.hoverSubtitle}</p>
						<p class="card__text-title">${pack.title} <span>${pack.taste}</span></p>
						<div class="card__text-desc">
							<ul>
								<li class="card__text-portion"><span>${pack.numberServings} </span>порций</li>
								<li class='card__text-gift'>
									${pack.gift.num ? `<span>${pack.gift.num}</span>` : ''}
									${pack.gift.text} в подарок
								</li>
								${pack.message ? `<li class="card__text-other">${pack.message}</li>` : ''}
							</ul>
						</div>
					</div>
					<div class="card__img">
						<div class="card__img-item"><img src="images/cat.png"></div>
					</div>
					<div class="card__weight"><span>${pack.weight}</span><span>кг</span></div>
				</div>
				<div class="card__bottom">
				${
					pack.ended
						? `<span>${pack.notifications.disabled.text}</span>`
						: `<span>${pack.notifications.default.text}, </span><a href="javascript:;" class="card__link">${pack.notifications.default.link}</a>`
				}
				</div>
			</div>
		`
		cards.innerHTML += template
	})
}

getData(data)

document.addEventListener('click', e => {
	if (
		e.target.closest('.card:not(.disabled) .card__main') ||
		e.target.classList.contains('card__link')
	) {
		const cardItemParent = e.target.closest('.card')

		cardItemParent.onmouseleave = e => {
			const cardItemDataId = cardItemParent.getAttribute('data-id')
			const cardItemNotifications = data[cardItemDataId - 1].notifications
			const cardNotificationBlock =
				cardItemParent.querySelector('.card__bottom')

			if (!cardItemParent.classList.contains('selected')) {
				cardItemParent.classList.add('selected')

				cardNotificationBlock.innerHTML = `
					<span>${cardItemNotifications.selected.text}</span>
				`
			} else {
				cardItemParent.classList.remove('selected')

				cardNotificationBlock.innerHTML = `
					<span>${cardItemNotifications.default.text}</span>
					<a href="javascript:;" class="card__link">${cardItemNotifications.default.link}</a>
				`
			}
			cardItemParent.onmouseleave = null
		}
	}
})
