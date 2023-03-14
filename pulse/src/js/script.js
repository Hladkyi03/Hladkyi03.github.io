// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/* // получаем массив данных
const data = [
    { title: "Карточка 1", text: "Это содержимое карточки 1", imageUrl: "../img/photo_1.png" },
    { title: "Карточка 2", text: "Это содержимое карточки 2", imageUrl: "../img/photo_2.png" },
    { title: "Карточка 3", text: "Это содержимое карточки 3", imageUrl: "../img/photo_3.png" }
  ];
  
  // получаем элемент, в который будем добавлять карточки
  const container = document.querySelector("#cards-container");
  
  // создаем кнопку и добавляем ее на страницу
  const addButton = document.createElement("button");
  addButton.textContent = "Добавить карточки";
  document.body.appendChild(addButton);
  
  // добавляем обработчик события на кнопку
  addButton.addEventListener("click", () => {
    data.forEach(item => {
      // создаем элементы для карточки
      const card = document.createElement("div");
      const title = document.createElement("h2");
      const text = document.createElement("p");
      const image = document.createElement("img");
  
      // добавляем содержимое в элементы
      title.textContent = item.title;
      text.textContent = item.text;
      image.src = item.imageUrl;
      image.alt = item.title;
  
      // добавляем стили и классы для элементов
      card.classList.add("card");
      title.classList.add("card-title");
      text.classList.add("card-text");
  
      // добавляем элементы в карточку
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(text);
  
      // добавляем карточку в контейнер на странице
      container.appendChild(card);
    });
  }); */

  const slider = tns({
    container: '.my-slider',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    autoplayTimeout: 8000,
    controls: false,
    autoplayButtonOutput: false,
    navPosition: "bottom",
    responsive: {
      320: {
        nav: true
      }},
    responsive: {
      993: {
        nav: false
      }
  }
   });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  })

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });


(function($) {
function toggleSlide(item){
    $(item).each(function(i) {
      $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

   
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function() {
    $(this)
      .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
      

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__link-back');

  //modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $('.button_item').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__subtitle').text($('.catalog-item__subheader').eq(i).text());
      $('.overlay, #order').fadeIn("slow");
    })
  });
})(jQuery);



window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.tel'), function(input) {
  let keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+38 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
  });
  return false;
});

});