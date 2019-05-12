$(document).ready(function(){
  $('.cpf').cpfMask();
  $('.cnpj').cnpjMask();
  $('.cpfOrCnpj').cpfOrCnpjMask();
  $('.date').dateMask();
  $('.phone').phoneMask();
  $('.money').moneyMask();
  $('.percent').percentMask();
  $('.just_number').justNumberMask();
  $('.email').emailMask();
});


/*****************************
  VALIDA O CNPJ
*****************************/

$.fn.cnpjMask = function(){
  var valid_cnpj = {
    onComplete: function(cnpj){
      if (isCNPJ(cnpj)){
        console.log('%c CNPJ válido.', 'color: blue');
      }else {
        console.log('%c CNPJ inválido.', 'color: red');
      }
    },
    clearIfNotMatch: true
  };

  this.mask('00.000.000/0000-00', valid_cnpj);

  function isCNPJ(strCNPJ) {
    cnpj = strCNPJ.replace(/[^\d]+/g, '');

    if (cnpj == '00000000000000' ||
        cnpj == '11111111111111' ||
        cnpj == '22222222222222' ||
        cnpj == '33333333333333' ||
        cnpj == '44444444444444' ||
        cnpj == '55555555555555' ||
        cnpj == '66666666666666' ||
        cnpj == '77777777777777' ||
        cnpj == '88888888888888' ||
        cnpj == '99999999999999')
        return false;

    size = cnpj.length - 2
    numbers = cnpj.substring(0, size);
    digits = cnpj.substring(size);
    sum = 0;
    pos = size - 7;

    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0))
        return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1))
        return false;

    return true;
  }
};


/*****************************
  VALIDA O CPF
*****************************/

$.fn.cpfMask = function(){
  var valid_cpf = {
    onComplete: function(cpf){
      if (isCPF(cpf)){
        console.log('%c CPF válido.', 'color: blue');
        switch (parseInt(cpf[10])) {
          case 1:
            console.log('Tocantins, Mato Grosso do Sul, Goiás e Distrito Federal');
            break;
          case 2:
            console.log('Roraima, Amapá, Amazonas, Acre, Rondônia e Pará');
            break;
          case 3:
            console.log('Piauí, Maranhão e Ceará');
            break;
          case 4:
            console.log('Rio Grande do Norte, Pernambuco, Alagoas e Paraíba');
            break;
          case 5:
            console.log('Bahia e Sergipe');
            break;
          case 6:
            console.log('Minas Gerais');
            break;
          case 7:
            console.log('Rio de Janeiro e Espírito Santo');
            break;
          case 8:
            console.log('%c São Paulo!', 'background: #222; color: #bada55');
            break;
          case 9:
            console.log('Paraná e Santa Catarina');
            break;
          case 0:
            console.log('Rio Grande do Sul');
            break;
          default:
            console.log('Nenhum estado encontrado.');
        }
      }else {
        console.log('%c CPF inválido.', 'color: red');
      }
    },
    reverse: true,
    clearIfNotMatch: true
  };

  this.mask('000.000.000-00', valid_cpf);

  function isCPF(strCPF) {
    var sum;
    var rest;
    var cpf = strCPF.replace(/[^0-9]/g, '').toString();
    sum = 0;

  	if (cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999')
        return false;

  	for (i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
  	rest = (sum * 10) % 11;

      if ((rest == 10) || (rest == 11))  rest = 0;
      if (rest != parseInt(cpf.substring(9, 10)) ) return false;

  	sum = 0;
      for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
      rest = (sum * 10) % 11;

      if ((rest == 10) || (rest == 11))  rest = 0;
      if (rest != parseInt(cpf.substring(10, 11) ) ) return false;
      return true;
  }
};


/*****************************
  VALIDA O CPF OU CNPJ
*****************************/

$.fn.cpfOrCnpjMask = function(){
  var options = {
    onKeyPress: function (cpf, ev, el, op) {
      var masks = ['000.000.000-000', '00.000.000/0000-00'],
          mask = (cpf.length > 14) ? masks[1] : masks[0];
      el.mask(mask, op);
    }
  }

  this.mask('000.000.000-000', options).blur(function(){
    strCPForCNPJ = $(this).val();

    if (strCPForCNPJ.length < 14 || (strCPForCNPJ.length > 14 && strCPForCNPJ.length < 18)){
      $(this).val('');
    }else {
      if (strCPForCNPJ.length > 14){
        if (isCNPJ(strCPForCNPJ)){
          console.log('%c CNPJ válido.', 'color: blue');
        }else {
          console.log('%c CNPJ inválido.', 'color: red');
        }
      }else{
        if (isCPF(strCPForCNPJ)){
          console.log('%c CPF válido.', 'color: blue');
        }else {
          console.log('%c CPF inválido.', 'color: red');
        }
      }
    }
  });

  function isCPF(strCPF) {
    var sum;
    var rest;
    var cpf = strCPF.replace(/[^0-9]/g, '').toString();
    sum = 0;

    if (cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999')
        return false;

    for (i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;

      if ((rest == 10) || (rest == 11))  rest = 0;
      if (rest != parseInt(cpf.substring(9, 10)) ) return false;

    sum = 0;
      for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
      rest = (sum * 10) % 11;

      if ((rest == 10) || (rest == 11))  rest = 0;
      if (rest != parseInt(cpf.substring(10, 11) ) ) return false;
      return true;
  }

  function isCNPJ(strCNPJ) {
    cnpj = strCNPJ.replace(/[^\d]+/g, '');

    if (cnpj == '00000000000000' ||
        cnpj == '11111111111111' ||
        cnpj == '22222222222222' ||
        cnpj == '33333333333333' ||
        cnpj == '44444444444444' ||
        cnpj == '55555555555555' ||
        cnpj == '66666666666666' ||
        cnpj == '77777777777777' ||
        cnpj == '88888888888888' ||
        cnpj == '99999999999999')
        return false;

    size = cnpj.length - 2
    numbers = cnpj.substring(0, size);
    digits = cnpj.substring(size);
    sum = 0;
    pos = size - 7;

    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0))
        return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1))
        return false;

    return true;
  }
};


/*****************************
  VALIDA A DATA
*****************************/

$.fn.dateMask = function(){
  this.focus(function() {
    $(this).mask('00/00/0000', valid_date);
    $(this).attr('placeholder', '__/__/____');
  }).blur(function() {
    var date = $(this).val();
    if (isDate(date) == false){
      $(this).val('');
      $(this).removeAttr('placeholder');
    }
  });

  var valid_date = {
    onComplete: function(date){
      if (isDate(date)){
        console.log('%c Data válida.', 'color: blue');
      }else {
        console.log('%c Data inválida.', 'color: red');
      }
    },
    clearIfNotMatch: true,
    onChange: function(date){
      //console.log('Data alterada: ', date);
    },
    onKeyPress: function(date){
      //console.log('Data alterada: ', date);
    }
  };

  function isDate(strDate) {
    var currVal = strDate;
    if(currVal == '')
      return false;

    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern);

    if (dtArray == null)
      return false;

    dtDay= dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
      return false;
    else if (dtDay < 1 || dtDay> 31)
      return false;
    else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
      return false;
    else if (dtMonth == 2){
      var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
      if (dtDay> 29 || (dtDay ==29 && !isleap))
        return false;
    }
    return true;
  }
};


/*****************************
  PERCENTUAL
*****************************/

$.fn.percentMask = function(){
  this.attr('maxlength', '7').mask('##0,00%', {reverse: true}).blur(function(){
    if ($(this).val() == '%'){
      $(this).val('')
    }
  });
};


/*****************************
  VALIDA O DINHEIRO
*****************************/

$.fn.moneyMask = function(){
  this.attr('maxlength', '15').maskMoney({
    allowNegative: true,
    allowZero: true,
    thousands:'.',
    decimal:',',
    affixesStay: false
  })
};


/*****************************
  VALIDA O TELEFONE
*****************************/

$.fn.phoneMask = function(){
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
  };

  this.mask(SPMaskBehavior, spOptions).blur(function(){
    if ($(this).val().length < 14){
      $(this).val('');
    }
  });
  return this;
};


/*****************************
  VALIDA EMAIL
*****************************/

$.fn.emailMask = function(){
  this.mask('A', {
    translation: {
      'A': { pattern: /[\w@\-.+]/, recursive: true }
    }
  }).keyup(function(){
    $(this).val($(this).val().toLowerCase());
  });
  return this;
};


/*****************************
  VALIDA SOMENTE NÚMEROS DIGITADOS
*****************************/

$.fn.justNumberMask = function(){
  this.mask('0000', {
    clearIfNotMatch: true,
    translation: {
      'Z': {
        pattern: /[0-9]/, optional: true
      }
    }
  });
};


/*****************************
  MUDA A COR DA TAG H1
*****************************/

$('h1').mouseover(function(){
  var color = '#' + Math.floor(Math.random()*16777215).toString(16);
  $(this).css('color', color);
});


/*****************************
  REMOVE MÁSCARAS
*****************************/

$('.unmasked_fields').on('click', function(){
  let cpf = $('.cpf').cleanVal();
  let cnpj = $('.cnpj').cleanVal();
  let cpfOrCnpj = $('.cpfOrCnpj').cleanVal();
  let phone = $('.phone').cleanVal();
  let percent = $('.percent').val().replace(/\,/g, '.').replace(/\%/g, '');
  let money = $('.money').maskMoney('unmasked')[0];

  alert(
        '\n CPF: '         + cpf +
        '\n CNPJ: '        + cnpj +
        '\n CPF ou CNPJ: ' + cpfOrCnpj +
        '\n Telefone: '    + phone +
        '\n Porcentagem: ' + percent +
        '\n Valor: '       + money
        )
});


/*****************************
  LISTA COM NÚMEROS E VÍRGULAS
*****************************/

// $(document).ready(function() {
//  $('#list').bind('keyup paste', function(){
//    this.value = this.value.replace(/[^0-9,]/g,'').replace(/,,+/g,',').replace(/^,/, '');
//  });
//
//  $('#list').bind('blur', function(){
//    this.value = this.value.replace(/,$/g, '');
//  });
// });


/*****************************
VALIDA SOMENTE NÚMEROS DIGITADOS COM UMA VÍRGULA
*****************************/

// $('.number_with_comma').keypress(function(event) {
//   var $this = $(this);
//   if ((event.which != 44 || $this.val().indexOf(',') != -1) &&
//   ((event.which < 48 || event.which > 57) &&
//   (event.which != 0 && event.which != 8))) {
//     event.preventDefault();
//   }
//
//   var text = $(this).val();
//   if ((event.which == 44) && (text.indexOf(',') == -1)) {
//     setTimeout(function() {
//       if ($this.val().substring($this.val().indexOf(',')).length > 3) {
//         $this.val($this.val().substring(0, $this.val().indexOf(',') + 3));
//       }
//     }, 1);
//   }
//
//   if ((text.indexOf(',') != -1) &&
//   (text.substring(text.indexOf(',')).length > 2) &&
//   (event.which != 0 && event.which != 8) &&
//   ($(this)[0].selectionStart >= text.length - 2)) {
//     event.preventDefault();
//   }
// }).bind('blur', function(){
//   this.value = this.value.replace(/,$/g, '');
//   this.value = this.value.replace(/^,/, '');
// });


/*****************************
  NÚMERO COM PONTO
*****************************/

// $('.bitcoin_value, .bitcoin_amount').bind('keypress paste', function(event) {
//   if (((event.which != 46 || (event.which == 46 && $(this).val() == '')) ||
//     $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
//     event.preventDefault();
//   }
// }).on('blur', function() {
//   number = $(this).val();
//   if (number[number.length -1] === '.'){
//     number = number.replace('.', '');
//     $(this).val(number);
//   }
// });


/*****************************
  OCULTANDO ELEMENTO AO PASSAR O MOUSE
*****************************/
// $(function(){
//   $('.environment').hover(function() {
//     $(this).fadeTo(1,0);
//   },function() {
//     $(this).fadeTo(1,1);
//   });
// });


/*****************************
  TEXTO COM A PRIMEIRA LETRA EM MAIÚSCULO,
  TEXTO SEMPRE EM MINÚSCULO
*****************************/
// $(function(){
//   $('.capitalize_text').on('keyup', function(e){
//     var txt = $(this).val();
//     $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase( ); }));
//   });
//
//   $('.lowercase_text').on('keyup', function (e){
//     var txt = $(this).val();
//     $(this).val(txt.toLowerCase());
//   });
// });
