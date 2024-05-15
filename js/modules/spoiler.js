import $ from "jquery";
//spoiler functional
export function Spoilers() {
   $('.spoiler__title').click(function (event) {
      if ($('.spoiler').hasClass('one')) {
         $('.spoiler__title').not($(this)).removeClass('active');
         $('.spoiler__content').not($(this).next()).slideUp(300);
      }
      $(this).toggleClass('active').next().slideToggle(300);
   })
}

export function Count() {
   $('<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="../img/sleep/Plus.svg" alt=""></div><div class="quantity-button quantity-down"><img src="../img/sleep/Minus.svg" alt=""></div></div>').insertAfter('.quantity input');
   $('.quantity').each(function () {
      var spinner = $(this),
         input = spinner.find('input[type="number"]'),
         btnUp = spinner.find('.quantity-up'),
         btnDown = spinner.find('.quantity-down'),
         min = input.attr('min'),
         max = input.attr('max');

      btnUp.click(function () {
         var oldValue = parseFloat(input.val());
         if (oldValue >= max) {
            var newVal = oldValue;
         } else {
            var newVal = oldValue + 1;
         }
         spinner.find("input").val(newVal);
         spinner.find("input").trigger("change");
      });

      btnDown.click(function () {
         var oldValue = parseFloat(input.val());
         if (oldValue <= min) {
            var newVal = oldValue;
         } else {
            var newVal = oldValue - 1;
         }
         spinner.find("input").val(newVal);
         spinner.find("input").trigger("change");
      });

   });
}

export function Sum() {

   $('.quantity-button').on('click', function(){
      let sum = $('.nights').val() * $('.sum').data('nights') + ($('.guests').val() - 1) * $('.sum').data('guests')
      $('.sum').html('$' + sum)
   });

   let sum = $('.nights').val() * $('.sum').data('nights') + ($('.guests').val() - 1) * $('.sum').data('guests')
   $('.sum').html('$' + sum)
}
