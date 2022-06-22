"use strict";

var data = [{
  id: 1,
  title: 'Нямушка',
  taste: 'с фуа-гра',
  subtitle: 'Сказочное заморское яство',
  hoverSubtitle: 'Котэ не одобряет?',
  numberServings: '10',
  gift: {
    num: '',
    text: 'мышь'
  },
  message: '',
  weight: '0,5',
  notifications: {
    "default": {
      text: 'Чего сидишь? Порадуй котэ',
      link: 'купи'
    },
    selected: {
      text: 'Печень утки разварная с артишоками.'
    },
    disabled: {
      text: 'Печалька, с фуа-гра закончился.'
    }
  },
  ended: false
}, {
  id: 2,
  title: 'Нямушка',
  taste: 'с рыбой',
  subtitle: 'Сказочное заморское яство',
  hoverSubtitle: 'Котэ не одобряет?',
  numberServings: '40',
  gift: {
    num: '2',
    text: 'мыши'
  },
  message: 'заказчик доволен',
  weight: '2',
  notifications: {
    "default": {
      text: 'Чего сидишь? Порадуй котэ',
      link: 'купи'
    },
    selected: {
      text: 'Головы щучьи с чесноком да свежайшая сёмгушка.'
    },
    disabled: {
      text: 'Печалька, с рыбой закончился.'
    }
  },
  ended: false
}, {
  id: 3,
  title: 'Нямушка',
  taste: 'с курой',
  subtitle: 'Сказочное заморское яство',
  hoverSubtitle: 'Котэ не одобряет?',
  numberServings: '100',
  gift: {
    num: '5',
    text: 'мышей'
  },
  message: 'заказчик доволен',
  weight: '5',
  notifications: {
    "default": {
      text: 'Чего сидишь? Порадуй котэ',
      link: 'купи'
    },
    selected: {
      text: 'Филе из цыплят с трюфелями в бульоне.'
    },
    disabled: {
      text: 'Печалька, с курой закончился.'
    }
  },
  ended: true
}];
var cards = document.querySelector('.cards');

var getData = function getData(packs) {
  packs.forEach(function (pack) {
    var template = "\n\t\t\t<div class=\"card ".concat(pack.ended ? 'disabled' : '', "\" data-id=\"").concat(pack.id, "\">\n\t\t\t\t<div class=\"card__main\">\n\t\t\t\t\t<div class=\"card__corner\"></div>\n\t\t\t\t\t<div class=\"card__text\"> \n\t\t\t\t\t\t<p class=\"card__text-suptitle hero-text\">").concat(pack.subtitle, "</p>\n\t\t\t\t\t\t<p class=\"card__text-suptitle hover-text\">").concat(pack.hoverSubtitle, "</p>\n\t\t\t\t\t\t<p class=\"card__text-title\">").concat(pack.title, " <span>").concat(pack.taste, "</span></p>\n\t\t\t\t\t\t<div class=\"card__text-desc\">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li class=\"card__text-portion\"><span>").concat(pack.numberServings, " </span>\u043F\u043E\u0440\u0446\u0438\u0439</li>\n\t\t\t\t\t\t\t\t<li class='card__text-gift'>\n\t\t\t\t\t\t\t\t\t").concat(pack.gift.num ? "<span>".concat(pack.gift.num, "</span>") : '', "\n\t\t\t\t\t\t\t\t\t").concat(pack.gift.text, " \u0432 \u043F\u043E\u0434\u0430\u0440\u043E\u043A\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t").concat(pack.message ? "<li class=\"card__text-other\">".concat(pack.message, "</li>") : '', "\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card__img\">\n\t\t\t\t\t\t<div class=\"card__img-item\"><img src=\"images/cat.png\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"card__weight\"><span>").concat(pack.weight, "</span><span>\u043A\u0433</span></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card__bottom\">\n\t\t\t\t").concat(pack.ended ? "<span>".concat(pack.notifications.disabled.text, "</span>") : "<span>".concat(pack.notifications["default"].text, ", </span><a href=\"javascript:;\" class=\"card__link\">").concat(pack.notifications["default"].link, "</a>"), "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
    cards.innerHTML += template;
  });
};

getData(data);
document.addEventListener('click', function (e) {
  if (e.target.closest('.card:not(.disabled) .card__main') || e.target.classList.contains('card__link')) {
    var cardItemParent = e.target.closest('.card');

    cardItemParent.onmouseleave = function (e) {
      var cardItemDataId = cardItemParent.getAttribute('data-id');
      var cardItemNotifications = data[cardItemDataId - 1].notifications;
      var cardNotificationBlock = cardItemParent.querySelector('.card__bottom');

      if (!cardItemParent.classList.contains('selected')) {
        cardItemParent.classList.add('selected');
        cardNotificationBlock.innerHTML = "\n\t\t\t\t\t<span>".concat(cardItemNotifications.selected.text, "</span>\n\t\t\t\t");
      } else {
        cardItemParent.classList.remove('selected');
        cardNotificationBlock.innerHTML = "\n\t\t\t\t\t<span>".concat(cardItemNotifications["default"].text, "</span>\n\t\t\t\t\t<a href=\"javascript:;\" class=\"card__link\">").concat(cardItemNotifications["default"].link, "</a>\n\t\t\t\t");
      }

      cardItemParent.onmouseleave = null;
    };
  }
});