function InputOnlyNumbers(num) {
  var er = /[^0-9]/;
  er.lastIndex = 0;
  var campo = num;
  if (er.test(campo.value)) {
    if (campo.value.length > 1)
      campo.value = campo.value.substring(0, campo.value.length - 1);
    else
      campo.value = "";
  }
}
/* #################################################################################### */
function CadastroValidar(p_cadastro)
{
  if (p_cadastro.length > 11)
    return CadastroValidarCnpj(p_cadastro);
  else
    return CadastroValidarCpf(p_cadastro);
}
/* #################################################################################### */
function CadastroValidarCnpj(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj === '')
    return false;
  if (cnpj.length !== 14)
    return false;
  if (cnpj === "00000000000000" ||
          cnpj === "11111111111111" ||
          cnpj === "22222222222222" ||
          cnpj === "33333333333333" ||
          cnpj === "44444444444444" ||
          cnpj === "55555555555555" ||
          cnpj === "66666666666666" ||
          cnpj === "77777777777777" ||
          cnpj === "88888888888888" ||
          cnpj === "99999999999999")
    return false;
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== digitos.charAt(0))
    return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== digitos.charAt(1))
    return false;
  return true;
}
/* #################################################################################### */
function CadastroValidarCpf(strCPF) {
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF === "00000000000")
    return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11))
    Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10)))
    return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11))
    Resto = 0;
  if (Resto !== parseInt(strCPF.substring(10, 11)))
    return false;
  return true;
}
/* #################################################################################### */
if (!String.prototype.Format) {
  String.prototype.Format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined'
              ? args[number]
              : match
              ;
    });
  };
}
/* #################################################################################### */
function GetQueryParams(qs) {
  qs = qs.split('+').join(' ');
  var params = {},
          tokens,
          re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}
/* #################################################################################### */
function Hoje()
{
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return dd + '/' + mm + '/' + yyyy;
}
/* #################################################################################### */
function DataSerial(p_date)
{
  return p_date.substr(6, 4) + p_date.substr(3, 2) + p_date.substr(0, 2);
}
/* #################################################################################### */
function DataEng(p_date)
{
  return p_date.substr(6, 4) + "-" + p_date.substr(3, 2) + "-" + p_date.substr(0, 2);
}
/* #################################################################################### */
function DataSerialToString(p_date)
{
  /*11112233*/
  return p_date.substr(6, 2) + "/" + p_date.substr(4, 2) + "/" + p_date.substr(0, 4);
}
/* #################################################################################### */
function HoraPadrao()
{
  var v_now = new Date();
  var v_minutes = v_now.getMinutes();
  if (v_minutes < 10)
    v_minutes = "0" + v_minutes;
  return v_now.getHours() + ":" + v_minutes;
}
/* #################################################################################### */
function HoraSerial(p_hora)
{
  /*11:22*/
  return p_hora.substr(0, 2) + p_hora.substr(3, 2);
}
/* #################################################################################### */
function HoraSerialToString(p_hora)
{
  /*1122*/
  return p_hora.substr(0, 2) + ":" + p_hora.substr(2, 2);
}
/* #################################################################################### */
function TextBoxActivateType() {
//  $("input[ctype='date']").each(function (index) {
//    $(this).attr("type", "date");
//  });
//  if (device.platform == 'Android') {
//    $("input[ctype='number']").each(function (index) {
//      $(this).attr("type", "number");
//    });
//  }
}
/* #################################################################################### */
if (!window.InitVars)
  window.InitVars = function () {
    return true;
  };
//TextBoxActivateType();
window.InitVars();