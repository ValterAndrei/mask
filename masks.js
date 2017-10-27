$(document).ready(function(){

  /*****************************
  VALIDA O CNPJ
  *****************************/

  var valid_cnpj =  {
    onComplete: function(cnpj){
      if (isCNPJ(cnpj)){
        console.log('CNPJ válido.');
      }else {
        console.log('CNPJ inválido.');
      }
    },
    clearIfNotMatch: true
  };

  $('.cnpj').mask('00.000.000/0000-00', valid_cnpj);

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

  /*****************************
  VALIDA O CPF
  *****************************/

  var valid_cpf =  {
    onComplete: function(cpf){
      if (isCPF(cpf)){
        console.log('CPF válido.');
      }else {
        console.log('CPF inválido.');
      }
    },
    reverse: true,
    clearIfNotMatch: true
  };

  $('.cpf').mask('000.000.000-00', valid_cpf);

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

  /*****************************
  VALIDA A DATA
  *****************************/

  var valid_date =  {
    onComplete: function(date){
      if (isDate(date)){
        console.log('Data válida.');
      }else {
        console.log('Data inválida.');
      }
    },
    clearIfNotMatch: true,
    placeholder: '__/__/____',
    onChange: function(date){
      //console.log('Data alterada: ', date);
    },
    onKeyPress: function(date){
      //console.log('Data alterada: ', date);
    }
  };

  $('.date').focus(function() {
    $(this).mask('00/00/0000', valid_date);
  }).blur(function() {
    var date = $(this).val();
    if (isDate(date) == false){
      $(this).val('');
    }
  });

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

  /*****************************
  VALIDA O TELEFONE
  *****************************/

  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      }
  };

  $('.phone').mask(SPMaskBehavior, spOptions);

  /*****************************
  VALIDA O DINHEIRO
  *****************************/

  $('.money').maskMoney({allowNegative: true, thousands:'.', decimal:',', affixesStay: false});

  /*****************************
  VALIDA SOMENTE NÚMEROS DIGITADOS
  *****************************/

  $('.just_number').mask('0000000000', {clearIfNotMatch: true}).on('keypress paste', function(e){
    var keycode = e.charCode || e.keyCode;
    if (keycode == 46) {
      return false;
    }
  });
});
