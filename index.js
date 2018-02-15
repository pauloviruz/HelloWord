//<FJScript>
window.InitVars = function ()
{
  window.DivContainer = new ContainerObject('DivContainer');
  window.DivPainelLogin = new ContainerObject('DivPainelLogin');
  window.TxtVendedorCodigo = new TextControl('TxtVendedorCodigo');
  window.TxtCadastro = new TextControl('TxtCadastro');
  window.DivColEntrar = new ContainerObject('DivColEntrar');
  window.BtnEntrar = new ButtonControl('BtnEntrar');
  window.DivWaiting = new ContainerObject('DivWaiting');
};
//</FJScript>

function VendedorLer()
{
  var v_ven = new Vendedor();
  v_ven.Read(function (p_ven) {
    if (p_ven.Codigo > 0)
      ConfigWsServerReset();
    else
      ConfigIniciar();
  });
}

function ConfigWsServerReset()
{
  var v_cfg = new Config();
  v_cfg.Read(/** * @param {Config} p_cfg Config entity */function (p_cfg) {
    if (p_cfg.Id > 0) {
      p_cfg.WsServer = "http://fiodutra.ddns-intelbras.com.br:8080";
      p_cfg.Save(function (p_success) {
        window.location = "menu.html";
      });
    }
  });
}

function ConfigIniciar()
{
  var v_cfg = new Config();
  v_cfg.Chave = '';
  v_cfg.AtualizacaoData = '';
  v_cfg.WsServer = window.WsServer;
  v_cfg.Save(function (p_success) {
    DivPainelLogin.Show();
  });
}

function ValidarServidor()
{
  try {
    ws.TesteServerUp.p_mensagem = window.Chave;
    ws.TesteServerUp.Run(function (p_data) {
      if (p_data.d === window.Chave) {
        ws.AppChaveValida.p_chave = window.Chave;
        ws.AppChaveValida.Run(function (p_data) {
          if (p_data.d === true) {
            DbIniciar();
          } else {
            BtnEntrar.Enabled(false);
            ws.AppChaveMensagem.p_chave = window.Chave;
            ws.AppChaveMensagem.Run(function (p_data) {
              Mensagem(p_data.d);
            }, null);
          }
        }, null);
      } else {
        BtnEntrar.Enabled(false);
        Mensagem("Não foi possível verificar nossos servidores, por favor verifique sua conexão!");
      }
    }, null);
  } catch (ex) {
    Mensagem(ex.message);
  }
}

function BtnEntrar_Click()
{
  if ((TxtVendedorCodigo.ToInt() > 0) && (TxtCadastro.Length() > 0)) {
    if (TxtCadastro.Text().substr(0, 1) == '!') {
      RunCommand();
    } else
      EntrarExecutar();
  } else
    Mensagem("Informe o código e o CPF!");
}

function RunCommand()
{
  var v_command = TxtCadastro.Text().substr(1);
  if (v_command.length > 0) {
    if (v_command == "SERVER")
      Mensagem("Ws server: " + window.WsServer);
    else if (v_command == "CHAVE")
      Mensagem("Chave: " + window.Chave);
    else if (v_command == "SETLOCAL")
      WsServerSetLocal();
    else if (v_command == "SETDEBUG")
      WsServerSetDebug();
  }
}

function WsServerSetLocal()
{
  YesNo("Alterar para servidor local ?", function (p_button) {
    if (p_button == BUTTON_YES) {
      var v_cfg = new Config();
      v_cfg.Read(/** * @param {Config} p_cfg Config entity */ function (p_cfg) {
        p_cfg.WsServer = "http://192.168.1.200:8080";
        p_cfg.Save(function (p_success) {
          window.WsServer = p_cfg.WsServer;
          TxtCadastro.Clear();
          TxtVendedorCodigo.Focus();
          Mensagem("Servidor alterado para host local.");
        });
      });
    }
  });
}

function WsServerSetDebug()
{
  YesNo("Alterar para servidor local de teste ?", function (p_button) {
    if (p_button == BUTTON_YES) {
      var v_cfg = new Config();
      v_cfg.Read(/** * @param {Config} p_cfg Config entity */ function (p_cfg) {
        p_cfg.WsServer = "http://localhost:58439";
        p_cfg.Save(function (p_success) {
          window.WsServer = p_cfg.WsServer;
          TxtCadastro.Clear();
          TxtVendedorCodigo.Focus();
          Mensagem("Servidor alterado para host de teste local.");
        });
      });
    }
  });
}

function EntrarExecutar()
{
  DivPainelLogin.Hide();
  DivWaiting.Show();
  ws.PeddlerVendedorCadastro.p_chave = window.Chave;
  ws.PeddlerVendedorCadastro.p_token = '';
  ws.PeddlerVendedorCadastro.p_vendedor_codigo = TxtVendedorCodigo.ToInt();
  ws.PeddlerVendedorCadastro.Run(function (p_data) {
    var v_ven = new Vendedor(p_data.d);
    if (v_ven.Codigo > 0) {
      v_ven.Save(function (p_success) {
        window.location = "menu.html";
//        if (p_success)
//          window.location = "menu.html";
//        else
//          Mensagem("Ocorreu algume erro ao tentar salvar os dados do vendedor!");
      });
    } else {
      DivWaiting.Hide();
      DivPainelLogin.Show();
      Mensagem("Vendedor não localizado!");
    }
  }, null);
}

window._onload = function () {
  window.DbIniciar(VendedorLer);
};
