//<FJScript>

/* #################################################################################### */
var ws = ws || {};
/* #################################################################################### */
ws.TesteServerUp = {};
ws.TesteServerUp.p_mensagem = '';

ws.TesteServerUp.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_mensagem = this.p_mensagem;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/TesteServerUp', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.AppChaveValida = {};
ws.AppChaveValida.p_chave = '';

ws.AppChaveValida.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/AppChaveValida', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.AppChaveMensagem = {};
ws.AppChaveMensagem.p_chave = '';

ws.AppChaveMensagem.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/AppChaveMensagem', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerVendedorCadastro = {};
ws.PeddlerVendedorCadastro.p_chave = '';
ws.PeddlerVendedorCadastro.p_token = '';
ws.PeddlerVendedorCadastro.p_vendedor_codigo = 0;

ws.PeddlerVendedorCadastro.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerVendedorCadastro', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerCidadeLista = {};
ws.PeddlerCidadeLista.p_chave = '';
ws.PeddlerCidadeLista.p_token = '';
ws.PeddlerCidadeLista.p_vendedor_codigo = 0;

ws.PeddlerCidadeLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerCidadeLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerFornecedoresLista = {};
ws.PeddlerFornecedoresLista.p_chave = '';
ws.PeddlerFornecedoresLista.p_token = '';
ws.PeddlerFornecedoresLista.p_vendedor_codigo = 0;

ws.PeddlerFornecedoresLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerFornecedoresLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerColecoesLista = {};
ws.PeddlerColecoesLista.p_chave = '';
ws.PeddlerColecoesLista.p_token = '';
ws.PeddlerColecoesLista.p_vendedor_codigo = 0;

ws.PeddlerColecoesLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerColecoesLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerGradesLista = {};
ws.PeddlerGradesLista.p_chave = '';
ws.PeddlerGradesLista.p_token = '';
ws.PeddlerGradesLista.p_vendedor_codigo = 0;

ws.PeddlerGradesLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerGradesLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerProdutosLista = {};
ws.PeddlerProdutosLista.p_chave = '';
ws.PeddlerProdutosLista.p_token = '';
ws.PeddlerProdutosLista.p_vendedor_codigo = 0;

ws.PeddlerProdutosLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerProdutosLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerClientesLista = {};
ws.PeddlerClientesLista.p_chave = '';
ws.PeddlerClientesLista.p_token = '';
ws.PeddlerClientesLista.p_vendedor_codigo = 0;

ws.PeddlerClientesLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerClientesLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerFornecedorClientesLista = {};
ws.PeddlerFornecedorClientesLista.p_chave = '';
ws.PeddlerFornecedorClientesLista.p_token = '';
ws.PeddlerFornecedorClientesLista.p_vendedor_codigo = 0;

ws.PeddlerFornecedorClientesLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerFornecedorClientesLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerFornecedorPrazosLista = {};
ws.PeddlerFornecedorPrazosLista.p_chave = '';
ws.PeddlerFornecedorPrazosLista.p_token = '';
ws.PeddlerFornecedorPrazosLista.p_vendedor_codigo = 0;

ws.PeddlerFornecedorPrazosLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerFornecedorPrazosLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerPrazosLista = {};
ws.PeddlerPrazosLista.p_chave = '';
ws.PeddlerPrazosLista.p_token = '';
ws.PeddlerPrazosLista.p_vendedor_codigo = 0;

ws.PeddlerPrazosLista.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerPrazosLista', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerPedidoAdd = {};
ws.PeddlerPedidoAdd.p_chave = '';
ws.PeddlerPedidoAdd.p_token = '';
ws.PeddlerPedidoAdd.p_vendedor_codigo = 0;
ws.PeddlerPedidoAdd.p_pedido_mobile = '';
ws.PeddlerPedidoAdd.p_list_pedido_item = '';

ws.PeddlerPedidoAdd.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;
  v_data.p_pedido_mobile = this.p_pedido_mobile;
  v_data.p_list_pedido_item = this.p_list_pedido_item;
  //Mensagem("length: " + this.p_pedido_mobile.length + this.p_list_pedido_item.length);

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerPedidoAdd', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.PeddlerPedidoLer = {};
ws.PeddlerPedidoLer.p_chave = '';
ws.PeddlerPedidoLer.p_token = '';
ws.PeddlerPedidoLer.p_vendedor_codigo = 0;
ws.PeddlerPedidoLer.p_pedido_docto = '';

ws.PeddlerPedidoLer.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_chave = this.p_chave;
  v_data.p_token = this.p_token;
  v_data.p_vendedor_codigo = this.p_vendedor_codigo;
  v_data.p_pedido_docto = this.p_pedido_docto;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/PeddlerPedidoLer', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.AutoCompleteData = {};
ws.AutoCompleteData.p_type = '';
ws.AutoCompleteData.p_table = '';
ws.AutoCompleteData.p_id = '';
ws.AutoCompleteData.p_description = '';
ws.AutoCompleteData.p_filter = '';

ws.AutoCompleteData.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_type = this.p_type;
  v_data.p_table = this.p_table;
  v_data.p_id = this.p_id;
  v_data.p_description = this.p_description;
  v_data.p_filter = this.p_filter;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/AutoCompleteData', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerProdutoModelo = {};
ws.LerProdutoModelo.p_id = 0;

ws.LerProdutoModelo.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerProdutoModelo', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerTecido = {};
ws.LerTecido.p_id = 0;

ws.LerTecido.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerTecido', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerColecao = {};
ws.LerColecao.p_id = 0;

ws.LerColecao.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerColecao', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerProducaoEstagio = {};
ws.LerProducaoEstagio.p_id = 0;

ws.LerProducaoEstagio.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerProducaoEstagio', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerLinhaProducaoOperacao = {};
ws.LerLinhaProducaoOperacao.p_id = 0;

ws.LerLinhaProducaoOperacao.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerLinhaProducaoOperacao', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerSaidaLote = {};
ws.LerSaidaLote.p_id = 0;

ws.LerSaidaLote.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerSaidaLote', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerEmpresa = {};
ws.LerEmpresa.p_id = 0;

ws.LerEmpresa.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerEmpresa', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerProduto = {};
ws.LerProduto.p_id = 0;

ws.LerProduto.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerProduto', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerEmpresaPagtOrdem = {};
ws.LerEmpresaPagtOrdem.p_id = 0;

ws.LerEmpresaPagtOrdem.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerEmpresaPagtOrdem', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.LerSaidaLoteProdutos = {};
ws.LerSaidaLoteProdutos.p_id = 0;

ws.LerSaidaLoteProdutos.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_id = this.p_id;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/LerSaidaLoteProdutos', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */

ws.UploadFile = {};
ws.UploadFile.p_bytefile = '';
ws.UploadFile.p_fileName = '';

ws.UploadFile.Run = function (p_onsuccess, p_container)
{
  v_data = {};
  v_data.p_bytefile = this.p_bytefile;
  v_data.p_fileName = this.p_fileName;

  if (p_container)
    ContainerWaiting(p_container);
  AjaxAspNetWs(window.WsServer + '/ws.asmx/UploadFile', v_data, p_onsuccess, null, true);
};
/* ########################################################################## */
//</FJScript>
