/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...
window.StringEmpty = window.StringEmpty || '';
window.Chave = window.Chave || "1R1";
window.VendedorCodigo = window.VendedorCodigo || 0;
window.VendedorNome = window.VendedorNome || window.StringEmpty;
window.VendedorRegiao = window.VendedorRegiao || 0;
window.WsServer = window.WsServer || "http://fiodutra.ddns-intelbras.com.br:8080";
/* #################################################################################### */
window.DbIniciar = window.DbIniciar || {};
window.DbIniciar = function (p_callback)
{
  window.dao.Open(function () {
    if (window.dao.Conn === null) {
      Mensagem(window.dao.Message);
    } else {
      window.dao.TableAdd((new TConfig()).Struct());
      window.dao.TableAdd((new TVendedor()).Struct());
      window.dao.TableAdd((new TCidade()).Struct());
      window.dao.TableAdd((new TFornecedor()).Struct());
      window.dao.TableAdd((new TColecao()).Struct());
      window.dao.TableAdd((new TGrade()).Struct());
      window.dao.TableAdd((new TProduto()).Struct());
      window.dao.TableAdd((new TCliente()).Struct());
      window.dao.TableAdd((new TPrazo()).Struct());
      window.dao.TableAdd((new TFornecedorCliente()).Struct());
      window.dao.TableAdd((new TFornecedorPrazo()).Struct());
      window.dao.TableAdd((new TPedido()).Struct());
      window.dao.TableAdd((new TPedidoProduto()).Struct());
      if (p_callback != null)
        p_callback();
    }
  });
};

function ConfigLer(p_callback)
{
  var v_cfg = new Config();
  v_cfg.Read(function (p_cfg) {
    window.Chave = p_cfg.Chave;
    window.WsServer = p_cfg.WsServer;
    if (p_callback != null)
      p_callback();
  });
}
/* #################################################################################### */
function DebugShow(p_mensagem)
{
  window.location = "debug.html?mensagem=" + p_mensagem;
}
/* #################################################################################### */
function NetIpVerificar(p_callback)
{
  $.ajax({
    url: '//freegeoip.net/json/',
    type: 'POST',
    dataType: 'jsonp',
    success: function (location) {
      if (location.ip.substr(0, 9) == "192.168.1")
        window.WsServer = "http://192.168.1.200:8080";
      else
        window.WsServer = "http://fiodutra.ddns-intelbras.com.br:8080";
      if (p_callback)
        p_callback();
    }
  });
}
/* #################################################################################### */
function AppVendedorLer(p_callback)
{
  var v_ven = new Vendedor();
  v_ven.Read(function (p_ven) {
    if (p_ven.Codigo > 0) {
      window.VendedorCodigo = p_ven.Codigo;
      var v_nome = window.StringEmpty;
      var v_index = p_ven.Nome.indexOf(' ');
      if (v_index > 0)
        v_nome = p_ven.Nome.substr(0, v_index);
      //v_nome = p_ven.Nome.substr(0, v_index) + p_ven.Nome.substr(v_index, 2);
      else
        v_nome = p_ven.Nome;
      window.VendedorNome = v_nome;
      window.VendedorRegiao = p_ven.Regiao;
      if (p_callback != null)
        p_callback();
    } else
      window.location = "logout.html";
  });
}
/* #################################################################################### */
function DdlClientes(p_controlid, p_todos, p_callback, p_fornecedor_codigo)
{
  if (p_fornecedor_codigo > 0) {
    var v_cli = new FornecedorCliente();
    v_cli.FilterSet_fornecedor_codigo(p_fornecedor_codigo);
    v_cli.ReadList(function (p_lista) {
      var CboControl = new window.DropDownListControl(p_controlid);
      if (p_todos)
        CboControl.AddItem(0, " ", true);
      for (var i = 0; i < p_lista.length; i++) {
        CboControl.AddItem(p_lista[i].ClienteId, p_lista[i].ClienteNome, true);
      }
      if (p_callback)
        p_callback();
    });
  } else {
    var v_cli = new Cliente();
    v_cli.ReadList(function (p_lista) {
      var CboControl = new window.DropDownListControl(p_controlid);
      if (p_todos)
        CboControl.AddItem(0, " ", true);
      for (var i = 0; i < p_lista.length; i++) {
        CboControl.AddItem(p_lista[i].Id, p_lista[i].Nome, true);
      }
      if (p_callback)
        p_callback();
    });
  }
}
/* #################################################################################### */
function DdlFornecedores(p_controlid, p_todos, p_callback)
{
  var v_for = new Fornecedor();
  v_for.ReadList(function (p_lista) {
    var CboControl = new window.DropDownListControl(p_controlid);
    if (p_todos)
      CboControl.AddItem(0, " ", true);
    for (var i = 0; i < p_lista.length; i++) {
      CboControl.AddItem(p_lista[i].Codigo, p_lista[i].Nome, true);
    }
    if (p_callback)
      p_callback();
  });
}
/* #################################################################################### */
function DdlColecoes(p_controlid, p_todos, p_callback)
{
  var v_for = new Colecao();
  v_for.ReadList(function (p_lista) {
    var CboControl = new window.DropDownListControl(p_controlid);
    if (p_todos)
      CboControl.AddItem(0, " ", true);
    for (var i = 0; i < p_lista.length; i++) {
      CboControl.AddItem(p_lista[i].Codigo, p_lista[i].Nome, true);
    }
    if (p_callback)
      p_callback();
  });
}
/* #################################################################################### */
/**
 * @param {int} p_controlid Id for entity
 * @param {Boolean} p_todos Insert first empty row
 * @param {object} p_callback Function to callback
 */
function DdlCidades(p_controlid, p_todos, p_callback)
{
  var v_for = new Cidade();
  v_for.ReadList(function (p_lista) {
    var CboControl = new window.DropDownListControl(p_controlid);
    if (p_todos)
      CboControl.AddItem(0, " ", true);
    for (var i = 0; i < p_lista.length; i++) {
      CboControl.AddItem(p_lista[i].Codigo, p_lista[i].Nome, true);
    }
    if (p_callback)
      p_callback();
  });
}
/* #################################################################################### */
/**
 * @param {int} p_controlid Id for entity
 * @param {Boolean} p_todos Insert first empty row
 * @param {int} p_cliente_codigo Cliente entity codigo
 * @param {int} p_fornecedor_codigo Fornecedor entity codigo
 * @param {object} p_callback Function to callback
 */
function DdlFornecedorPrazos(p_controlid, p_todos, p_cliente_codigo, p_fornecedor_codigo, p_callback)
{
  var v_fprz = new FornecedorPrazo();
  v_fprz.FilterSet_fornecedor_codigo(p_fornecedor_codigo);
  v_fprz.ReadList(function (p_lista) {
    var CboControl = new window.DropDownListControl(p_controlid);
    CboControl.Clear();
    if (p_todos)
      CboControl.AddItem(0, " ", true);
    for (var i = 0; i < p_lista.length; i++) {
      CboControl.AddItem(p_lista[i].PrazoCodigo, p_lista[i].PrazoNome, true);
    }
    if (p_lista.length <= 0) {
      DdlPrazos(p_controlid, false, p_callback);
    } else {
      if (p_callback)
        p_callback();
    }
  });
}
/* #################################################################################### */
/**
 * @param {int} p_controlid Id for entity
 * @param {Boolean} p_todos Insert first empty row
 * @param {object} p_callback Function to callback
 */
function DdlPrazos(p_controlid, p_todos, p_callback)
{
  var v_for = new Prazo();
  v_for.ReadList(function (p_lista) {
    var CboControl = new window.DropDownListControl(p_controlid);
    if (p_todos)
      CboControl.AddItem(0, " ", true);
    for (var i = 0; i < p_lista.length; i++) {
      CboControl.AddItem(p_lista[i].Codigo, p_lista[i].Nome, true);
    }
    if (p_callback)
      p_callback();
  });
}
/* #################################################################################### */
window.Config = window.Config || {};
window.Config = function (p_data) {
  this.Id = 0;
  this.Chave = '';
  this.AtualizacaoData = '';
  this.WsServer = '';
  this.AtuCidades = false;
  this.AtuFornecedores = false;
  this.AtuClientes = false;
  this.AtuColecoes = false;
  this.AtuPrazos = false;
  this.AtuFornecedorClientes = false;
  this.AtuFornecedorPrazos = false;
  this.AtuGrades = false;
  this.AtuProdutos = false;
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Id = v_data.Id;
      this.Chave = v_data.Chave;
      this.AtualizacaoData = v_data.AtualizacaoData;
      this.WsServer = v_data.WsServer;
      this.AtuCidades = v_data.AtuCidades;
      this.AtuFornecedores = v_data.AtuFornecedores;
      this.AtuClientes = v_data.AtuClientes;
      this.AtuColecoes = v_data.AtuColecoes;
      this.AtuPrazos = v_data.AtuPrazos;
      this.AtuFornecedorClientes = v_data.AtuFornecedorClientes;
      this.AtuFornecedorPrazos = v_data.AtuFornecedorPrazos;
      this.AtuGrades = v_data.AtuGrades;
      this.AtuProdutos = v_data.AtuProdutos;
    } catch (ex) {
    }
  }

  this.Read = function (p_callback) {
    dao.Table = "Config";
    dao.Fields = "id, chave, atualizacao_data, wsserver, enviado, atu_cidades, atu_fornecedores, atu_clientes, atu_colecoes, atu_prazos, atu_fornecedorclientes, atu_fornecedorprazos, atu_grades, atu_produtos";
    dao.Run(function (p_rows)
    {
      var v_cfg = new Config();
      if (p_rows.length > 0) {
        v_cfg.Id = p_rows.item(0).id;
        v_cfg.Chave = p_rows.item(0).chave;
        v_cfg.AtualizacaoData = p_rows.item(0).atualizacao_data;
        v_cfg.WsServer = p_rows.item(0).wsserver;
        v_cfg.AtuCidades = (p_rows.item(0).atu_cidades == 1);
        v_cfg.AtuFornecedores = (p_rows.item(0).atu_fornecedores == 1);
        v_cfg.AtuClientes = (p_rows.item(0).atu_clientes == 1);
        v_cfg.AtuColecoes = (p_rows.item(0).atu_colecoes == 1);
        v_cfg.AtuPrazos = (p_rows.item(0).atu_prazos == 1);
        v_cfg.AtuFornecedorClientes = (p_rows.item(0).atu_fornecedorclientes == 1);
        v_cfg.AtuFornecedorPrazos = (p_rows.item(0).atu_fornecedorprazos == 1);
        v_cfg.AtuGrades = (p_rows.item(0).atu_grades == 1);
        v_cfg.AtuProdutos = (p_rows.item(0).atu_produtos == 1);
      }
      if (p_callback != null)
        p_callback(v_cfg);
    });
  };

  this.Save = function (p_callback) {
    var v_tcfg = new TConfig();
    v_tcfg.chave = this.Chave;
    v_tcfg.atualizacao_data = this.AtualizacaoData;
    v_tcfg.wsserver = this.WsServer;
    var v_sql = '';
    if (this.Id == 0)
      v_sql = v_tcfg.Insert();
    else {
      v_sql = v_tcfg.Update() + " WHERE id=" + this.Id;
    }
    window.dao.RunSql(v_sql, function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };
  
  this.AtuTableSetClear = function (p_callback) {
    window.dao.ExecSql("UPDATE Config SET atu_cidades=0, atu_fornecedores=0, atu_clientes=0, atu_colecoes=0, atu_prazos=0, atu_fornecedorclientes=0, atu_fornecedorprazos=0, atu_grades=0, atu_produtos=0", function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };
  
  this.AtuCidadesSet = function (p_callback) {
    this.AtuTableSet("atu_cidades", p_callback);
  };
  
  this.AtuFornecedoresSet = function (p_callback) {
    this.AtuTableSet("atu_fornecedores", p_callback);
  };
  
  this.AtuClientesSet = function (p_callback) {
    this.AtuTableSet("atu_clientes", p_callback);
  };
  
  this.AtuColecoesSet = function (p_callback) {
    this.AtuTableSet("atu_colecoes", p_callback);
  };
  
  this.AtuPrazosSet = function (p_callback) {
    this.AtuTableSet("atu_prazos", p_callback);
  };
  
  this.AtuFornecedorClientesSet = function (p_callback) {
    this.AtuTableSet("atu_fornecedorclientes", p_callback);
  };
  
  this.AtuFornecedorPrazosSet = function (p_callback) {
    this.AtuTableSet("atu_fornecedorprazos", p_callback);
  };
  
  this.AtuGradesSet = function (p_callback) {
    this.AtuTableSet("atu_grades", p_callback);
  };
  
  this.AtuProdutosSet = function (p_callback) {
    this.AtuTableSet("atu_produtos", p_callback);
  };
  
  this.AtuTableSet = function (p_field,  p_callback) {
    window.dao.ExecSql("UPDATE Config SET {0}=1".Format(p_field), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };
};
/* #################################################################################### */
window.Vendedor = window.Vendedor || {};
window.Vendedor = function (p_data) {
  this.Codigo = 0;
  this.Nome = '';
  this.Regiao = 0;
  this.Estado = '';
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Codigo = v_data.Codigo;
      this.Nome = v_data.Nome;
      this.Regiao = v_data.Regiao;
      this.Estado = v_data.Estado;
    } catch (ex) {
    }
  }

  this.Read = function (p_callback) {
    dao.Table = "Vendedor";
    dao.Fields = "codigo, nome, regiao, estado";
    dao.Run(function (p_rows)
    {
      var v_ven = new Vendedor();
      if (p_rows.length > 0) {
        v_ven.Codigo = p_rows.item(0).codigo;
        v_ven.Nome = p_rows.item(0).nome;
        v_ven.Regiao = p_rows.item(0).regiao;
        v_ven.Estado = p_rows.item(0).estado;
      }
      if (p_callback != null)
        p_callback(v_ven);
    });
  };

  this.Save = function (p_callback) {
    var v_tven = new TVendedor();
    v_tven.codigo = this.Codigo;
    v_tven.nome = this.Nome;
    v_tven.regiao = this.Regiao;
    v_tven.estado = this.Estado;
    window.dao.RunSql(v_tven.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };
};

window.Cidade = window.Cidade || {};
window.Cidade = function (p_data) {
  this.Codigo = 0;
  this.Nome = '';
  this.Estado = '';
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Codigo = v_data.Codigo;
      this.Nome = v_data.Nome;
      this.Estado = v_data.Estado;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_codigo = function (p_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "codigo=" + p_codigo;
  };

  this.DaoStart = function () {
    dao.Table = "Cidade";
    dao.Fields = "codigo, nome, estado";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    if (dao.OrderBy.length <= 0)
      dao.OrderBy = "nome";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new Cidade();
      if (p_rows.length > 0) {
        v_cli.Codigo = p_rows.item(0).codigo;
        v_cli.Nome = p_rows.item(0).nome;
        v_cli.Estado = p_rows.item(0).estado;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cli = new Cidade();
        for (var i = 0; i < p_rows.length; i++) {
          v_cli = new Cidade();
          v_cli.Codigo = p_rows.item(i).codigo;
          v_cli.Nome = p_rows.item(i).nome;
          v_cli.Estado = p_rows.item(i).estado;
          v_ret.push(v_cli);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TCidade();
    v_tcli.codigo = this.Codigo;
    v_tcli.nome = this.Nome;
    v_tcli.estado = this.Estado;
    window.dao.ExecSql(v_tcli.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM Cidade", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.Fornecedor = window.Fornecedor || {};
window.Fornecedor = function (p_data) {
  this.Codigo = 0;
  this.Nome = '';
  this.Fantasia = '';
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Codigo = v_data.Codigo;
      this.Nome = v_data.Nome;
      this.Fantasia = v_data.Fantasia;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_codigo = function (p_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "codigo=" + p_codigo;
  };

  this.Read = function (p_callback) {
    dao.Table = "Fornecedor";
    dao.Fields = "codigo, nome, fantasia";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    dao.OrderBy = "codigo";
    dao.Run(function (p_rows)
    {
      var v_for = new Fornecedor();
      if (p_rows.length > 0) {
        v_for.Codigo = p_rows.item(0).codigo;
        v_for.Nome = p_rows.item(0).nome;
        v_for.Fantasia = p_rows.item(0).fantasia;
      }
      if (p_callback != null)
        p_callback(v_for);
    });
  };

  this.ReadList = function (p_callback) {
    dao.Table = "Fornecedor";
    dao.Fields = "codigo, nome, fantasia";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    dao.OrderBy = "nome";
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_for = new Fornecedor();
        for (var i = 0; i < p_rows.length; i++) {
          v_for = new Fornecedor();
          v_for.Codigo = p_rows.item(i).codigo;
          v_for.Nome = p_rows.item(i).nome;
          v_for.Fantasia = p_rows.item(i).fantasia;
          v_ret.push(v_for);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tfor = new TFornecedor();
    v_tfor.codigo = this.Codigo;
    v_tfor.nome = this.Nome;
    v_tfor.fantasia = this.Fantasia;
    window.dao.ExecSql(v_tfor.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM Fornecedor", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.Colecao = window.Colecao || {};
window.Colecao = function (p_data) {
  this.Codigo = 0;
  this.Nome = '';
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Codigo = v_data.Codigo;
      this.Nome = v_data.Nome;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_codigo = function (p_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "codigo=" + p_codigo;
  };

  this.DaoStart = function () {
    dao.Table = "Colecao";
    dao.Fields = "codigo, nome";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    if (dao.OrderBy.length <= 0)
      dao.OrderBy = "nome";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new Colecao();
      if (p_rows.length > 0) {
        v_cli.Codigo = p_rows.item(0).codigo;
        v_cli.Nome = p_rows.item(0).nome;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cli = new Colecao();
        for (var i = 0; i < p_rows.length; i++) {
          v_cli = new Colecao();
          v_cli.Codigo = p_rows.item(i).codigo;
          v_cli.Nome = p_rows.item(i).nome;
          v_ret.push(v_cli);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TColecao();
    v_tcli.codigo = this.Codigo;
    v_tcli.nome = this.Nome;
    window.dao.ExecSql(v_tcli.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM Colecao", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.Grade = window.Grade || {};
window.Grade = function (p_data) {
  this.Codigo = 0;
  this.Grade1 = '';
  this.Grade2 = '';
  this.Grade3 = '';
  this.Grade4 = '';
  this.Grade5 = '';
  this.Grade6 = '';
  this.Grade7 = '';
  this.Grade8 = '';
  this.Grade9 = '';
  this.Grade10 = '';
  this.Grade11 = '';
  this.Grade12 = '';
  this.Grade13 = '';
  this.Grade14 = '';
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Codigo = v_data.Codigo;
      this.Grade1 = v_data.Grade1;
      this.Grade2 = v_data.Grade2;
      this.Grade3 = v_data.Grade3;
      this.Grade4 = v_data.Grade4;
      this.Grade5 = v_data.Grade5;
      this.Grade6 = v_data.Grade6;
      this.Grade7 = v_data.Grade7;
      this.Grade8 = v_data.Grade8;
      this.Grade9 = v_data.Grade9;
      this.Grade10 = v_data.Grade10;
      this.Grade11 = v_data.Grade11;
      this.Grade12 = v_data.Grade12;
      this.Grade13 = v_data.Grade13;
      this.Grade14 = v_data.Grade14;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_codigo = function (p_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "codigo=" + p_codigo;
  };

  this.Read = function (p_callback) {
    dao.Table = "Grade";
    dao.Fields = "codigo, grade1, grade2, grade3, grade4, grade5, grade6, grade7, grade8, grade9, grade10, grade11, grade12, grade13, grade14";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    dao.OrderBy = "codigo";
    dao.Run(function (p_rows)
    {
      var v_cli = new Grade();
      if (p_rows.length > 0) {
        v_cli.Codigo = p_rows.item(0).codigo;
        v_cli.Grade1 = p_rows.item(0).grade1;
        v_cli.Grade2 = p_rows.item(0).grade2;
        v_cli.Grade3 = p_rows.item(0).grade3;
        v_cli.Grade4 = p_rows.item(0).grade4;
        v_cli.Grade5 = p_rows.item(0).grade5;
        v_cli.Grade6 = p_rows.item(0).grade6;
        v_cli.Grade7 = p_rows.item(0).grade7;
        v_cli.Grade8 = p_rows.item(0).grade8;
        v_cli.Grade9 = p_rows.item(0).grade9;
        v_cli.Grade10 = p_rows.item(0).grade10;
        v_cli.Grade11 = p_rows.item(0).grade11;
        v_cli.Grade12 = p_rows.item(0).grade12;
        v_cli.Grade13 = p_rows.item(0).grade13;
        v_cli.Grade14 = p_rows.item(0).grade14;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    dao.Table = "Grade";
    dao.Fields = "codigo, grade1, grade2, grade3, grade4, grade5, grade6, grade7, grade8, grade9, grade10, grade11, grade12, grade13, grade14";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    dao.OrderBy = "codigo";
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cli = new Grade();
        for (var i = 0; i < p_rows.length; i++) {
          v_cli = new Grade();
          v_cli.Codigo = p_rows.item(i).codigo;
          v_cli.Grade1 = p_rows.item(i).grade1;
          v_cli.Grade2 = p_rows.item(i).grade2;
          v_cli.Grade3 = p_rows.item(i).grade3;
          v_cli.Grade4 = p_rows.item(i).grade4;
          v_cli.Grade5 = p_rows.item(i).grade5;
          v_cli.Grade6 = p_rows.item(i).grade6;
          v_cli.Grade7 = p_rows.item(i).grade7;
          v_cli.Grade8 = p_rows.item(i).grade8;
          v_cli.Grade9 = p_rows.item(i).grade9;
          v_cli.Grade10 = p_rows.item(i).grade10;
          v_cli.Grade11 = p_rows.item(i).grade11;
          v_cli.Grade12 = p_rows.item(i).grade12;
          v_cli.Grade13 = p_rows.item(i).grade13;
          v_cli.Grade14 = p_rows.item(i).grade14;
          v_ret.push(v_cli);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TGrade();
    v_tcli.codigo = this.Codigo;
    v_tcli.grade1 = this.Grade1;
    v_tcli.grade2 = this.Grade2;
    v_tcli.grade3 = this.Grade3;
    v_tcli.grade4 = this.Grade4;
    v_tcli.grade5 = this.Grade5;
    v_tcli.grade6 = this.Grade6;
    v_tcli.grade7 = this.Grade7;
    v_tcli.grade8 = this.Grade8;
    v_tcli.grade9 = this.Grade9;
    v_tcli.grade10 = this.Grade10;
    v_tcli.grade11 = this.Grade11;
    v_tcli.grade12 = this.Grade12;
    v_tcli.grade13 = this.Grade13;
    v_tcli.grade14 = this.Grade14;
    window.dao.ExecSql(v_tcli.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM Grade", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.Produto = window.Produto || {};
window.Produto = function (p_data) {
  this.Codigo = 0;
  this.Nome = '';
  this.ColecaoCodigo = 0;
  this.ColecaoNome = '';
  this.Referencia = '';
  this.FornecedorCodigo = 0;
  this.FornecedorNome = '';
  this.PrecoFabrica = 0;
  this.PrecoCliente = 0;
  this.GradeCodigo = 0;
  this.Grade1 = 0;
  this.Grade2 = 0;
  this.Grade3 = 0;
  this.Grade4 = 0;
  this.Grade5 = 0;
  this.Grade6 = 0;
  this.Grade7 = 0;
  this.Grade8 = 0;
  this.Grade9 = 0;
  this.Grade10 = 0;
  this.Grade11 = 0;
  this.Grade12 = 0;
  this.Grade13 = 0;
  this.Grade14 = 0;
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Codigo = v_data.Codigo;
      this.Nome = v_data.Nome;
      this.ColecaoCodigo = v_data.ColecaoCodigo;
      this.ColecaoNome = v_data.ColecaoNome;
      this.Referencia = v_data.Referencia;
      this.FornecedorCodigo = v_data.FornecedorCodigo;
      this.FornecedorNome = v_data.FornecedorNome;
      this.PrecoFabrica = v_data.PrecoFabrica;
      this.PrecoCliente = v_data.PrecoCliente;
      this.GradeCodigo = v_data.GradeCodigo;
      this.Grade1 = v_data.Grade1;
      this.Grade2 = v_data.Grade2;
      this.Grade3 = v_data.Grade3;
      this.Grade4 = v_data.Grade4;
      this.Grade5 = v_data.Grade5;
      this.Grade6 = v_data.Grade6;
      this.Grade7 = v_data.Grade7;
      this.Grade8 = v_data.Grade8;
      this.Grade9 = v_data.Grade9;
      this.Grade10 = v_data.Grade10;
      this.Grade11 = v_data.Grade11;
      this.Grade12 = v_data.Grade12;
      this.Grade13 = v_data.Grade13;
      this.Grade14 = v_data.Grade14;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_fornecedor_codigo = function (p_fornecedor_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "fornecedor_codigo=" + p_fornecedor_codigo;
  };

  this.FilterSet_colecao_codigo = function (p_colecao_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "colecao_codigo=" + p_colecao_codigo;
  };

  this.FilterSet_referencia = function (p_referencia) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "referencia LIKE '%" + p_referencia + "%'";
  };

  this.DaoStart = function () {
    dao.Table = "Produto";
    dao.Fields = "codigo, nome, colecao_codigo, referencia, fornecedor_codigo, preco_fabrica, preco_cliente, grade_codigo, grade1, grade2, grade3, grade4, grade5, grade6, grade7, grade8, grade9, grade10, grade11, grade12, grade13, grade14";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    if (dao.OrderBy.length <= 0)
      dao.OrderBy = "referencia";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new Produto();
      if (p_rows.length > 0) {
        v_cli.Codigo = p_rows.item(0).codigo;
        v_cli.Nome = p_rows.item(0).nome;
        v_cli.ColecaoCodigo = p_rows.item(0).colecao_codigo;
        v_cli.ColecaoNome = '';
        v_cli.Referencia = p_rows.item(0).referencia;
        v_cli.FornecedorCodigo = p_rows.item(0).fornecedor_codigo;
        v_cli.FornecedorNome = '';
        v_cli.PrecoFabrica = p_rows.item(0).preco_fabrica;
        v_cli.PrecoCliente = p_rows.item(0).preco_cliente;
        v_cli.GradeCodigo = p_rows.item(0).grade_codigo;
        v_cli.Grade1 = p_rows.item(0).grade1;
        v_cli.Grade2 = p_rows.item(0).grade2;
        v_cli.Grade3 = p_rows.item(0).grade3;
        v_cli.Grade4 = p_rows.item(0).grade4;
        v_cli.Grade5 = p_rows.item(0).grade5;
        v_cli.Grade6 = p_rows.item(0).grade6;
        v_cli.Grade7 = p_rows.item(0).grade7;
        v_cli.Grade8 = p_rows.item(0).grade8;
        v_cli.Grade9 = p_rows.item(0).grade9;
        v_cli.Grade10 = p_rows.item(0).grade10;
        v_cli.Grade11 = p_rows.item(0).grade11;
        v_cli.Grade12 = p_rows.item(0).grade12;
        v_cli.Grade13 = p_rows.item(0).grade13;
        v_cli.Grade14 = p_rows.item(0).grade14;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_prd = new Produto();
        for (var i = 0; i < p_rows.length; i++) {
          v_prd = new Produto();
          v_prd.Codigo = p_rows.item(i).codigo;
          v_prd.Nome = p_rows.item(i).nome;
          v_prd.ColecaoCodigo = p_rows.item(i).colecao_codigo;
          v_prd.ColecaoNome = '';
          v_prd.Referencia = p_rows.item(i).referencia;
          v_prd.FornecedorCodigo = p_rows.item(i).fornecedor_codigo;
          v_prd.FornecedorNome = '';
          v_prd.PrecoFabrica = p_rows.item(i).preco_fabrica;
          v_prd.PrecoCliente = p_rows.item(i).preco_cliente;
          v_prd.GradeCodigo = p_rows.item(i).grade_codigo;
          v_prd.Grade1 = p_rows.item(i).grade1;
          v_prd.Grade2 = p_rows.item(i).grade2;
          v_prd.Grade3 = p_rows.item(i).grade3;
          v_prd.Grade4 = p_rows.item(i).grade4;
          v_prd.Grade5 = p_rows.item(i).grade5;
          v_prd.Grade6 = p_rows.item(i).grade6;
          v_prd.Grade7 = p_rows.item(i).grade7;
          v_prd.Grade8 = p_rows.item(i).grade8;
          v_prd.Grade9 = p_rows.item(i).grade9;
          v_prd.Grade10 = p_rows.item(i).grade10;
          v_prd.Grade11 = p_rows.item(i).grade11;
          v_prd.Grade12 = p_rows.item(i).grade12;
          v_prd.Grade13 = p_rows.item(i).grade13;
          v_prd.Grade14 = p_rows.item(i).grade14;
          v_ret.push(v_prd);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TProduto();
    v_tcli.codigo = this.Codigo;
    v_tcli.nome = this.Nome;
    v_tcli.colecao_codigo = this.ColecaoCodigo;
    v_tcli.referencia = this.Referencia;
    v_tcli.fornecedor_codigo = this.FornecedorCodigo;
    v_tcli.preco_fabrica = this.PrecoFabrica;
    v_tcli.preco_cliente = this.PrecoCliente;
    v_tcli.grade_codigo = this.GradeCodigo;
    v_tcli.grade1 = this.Grade1;
    v_tcli.grade2 = this.Grade2;
    v_tcli.grade3 = this.Grade3;
    v_tcli.grade4 = this.Grade4;
    v_tcli.grade5 = this.Grade5;
    v_tcli.grade6 = this.Grade6;
    v_tcli.grade7 = this.Grade7;
    v_tcli.grade8 = this.Grade8;
    v_tcli.grade9 = this.Grade9;
    v_tcli.grade10 = this.Grade10;
    v_tcli.grade11 = this.Grade11;
    v_tcli.grade12 = this.Grade12;
    v_tcli.grade13 = this.Grade13;
    v_tcli.grade14 = this.Grade14;
    window.dao.ExecSql(v_tcli.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM Produto", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.Cliente = window.Cliente || {};
window.Cliente = function (p_data) {
  this.Id = 0;
  this.Codigo = 0;
  this.Nome = '';
  this.Fantasia = '';
  this.Cadastro = '';
  this.Inscricao = '';
  this.CadastroData = '';
  this.Endereco = '';
  this.Numero = '';
  this.Bairro = '';
  this.Complemento = '';
  this.CidadeCodigo = 0;
  this.CidadeNome = '';
  this.Cep = '';
  this.Estado = '';
  this.Telefone = '';
  this.Fax = '';
  this.Email = '';
  this.Emitente = '';
  this.EmitenteCadastro = '';
  this.EmitenteRg = '';
  this.InformacoesBanco = '';
  this.InformacoesComerciais = '';
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Id = 0;
      this.Codigo = v_data.Codigo;
      this.Nome = v_data.Nome;
      this.Fantasia = v_data.Fantasia;
      this.Cadastro = v_data.Cadastro;
      this.Inscricao = v_data.Inscricao;
      this.CadastroData = v_data.CadastroData;
      this.Endereco = v_data.Endereco;
      this.Numero = v_data.Numero;
      this.Bairro = v_data.Bairro;
      this.Complemento = v_data.Complemento;
      this.CidadeCodigo = v_data.CidadeCodigo;
      this.CidadeNome = v_data.CidadeNome;
      this.Cep = v_data.Cep;
      this.Estado = v_data.Estado;
      this.Telefone = v_data.Telefone;
      this.Fax = v_data.Fax;
      this.Email = v_data.Email;
      this.Emitente = v_data.Emitente;
      this.EmitenteCadastro = v_data.EmitenteCadastro;
      this.EmitenteRg = v_data.EmitenteRg;
      this.InformacoesBanco = v_data.InformacoesBanco;
      this.InformacoesComerciais = v_data.InformacoesComerciais;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_id = function (p_id) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "id=" + p_id;
  };

  this.FilterSet_codigo = function (p_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "codigo=" + p_codigo;
  };

  this.FilterSet_cod_cidade = function (p_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "cod_cidade=" + p_codigo;
  };

  this.FilterSet_nome_cadastro = function (p_pesquisa) {
    var v_pesquisa = p_pesquisa + '%';
    if (v_pesquisa[0] == '*')
      v_pesquisa = '%' + v_pesquisa.substr(1);
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "((nome LIKE '{0}') OR (cadastro LIKE '{0}'))".Format(v_pesquisa);
  };

  this.DaoStart = function () {
    dao.Table = "Cliente";
    dao.Fields = "id, codigo, nome, fantasia, cadastro, inscricao, endereco, numero, complemento, bairro, cod_cidade, cidade, cep, estado, telefone, fax, email, emitente, cpfemit, rgemit, inf_banco, inf_comerc";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    if (dao.OrderBy.length <= 0)
      dao.OrderBy = "codigo";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new Cliente();
      if (p_rows.length > 0) {
        v_cli.Id = p_rows.item(0).id;
        v_cli.Codigo = p_rows.item(0).codigo;
        v_cli.Nome = p_rows.item(0).nome;
        v_cli.Fantasia = p_rows.item(0).fantasia;
        v_cli.Cadastro = p_rows.item(0).cadastro;
        v_cli.Inscricao = p_rows.item(0).inscricao;
        //v_cli.CadastroData = p_rows.item(0).CadastroData;
        v_cli.Endereco = p_rows.item(0).endereco;
        v_cli.Numero = p_rows.item(0).numero;
        v_cli.Bairro = p_rows.item(0).bairro;
        v_cli.Complemento = p_rows.item(0).complemento;
        v_cli.CidadeCodigo = p_rows.item(0).cod_cidade;
        v_cli.CidadeNome = p_rows.item(0).cidade;
        v_cli.Cep = p_rows.item(0).cep;
        v_cli.Estado = p_rows.item(0).estado;
        v_cli.Telefone = p_rows.item(0).telefone;
        v_cli.Fax = p_rows.item(0).fax;
        v_cli.Email = p_rows.item(0).email;
        v_cli.Emitente = p_rows.item(0).emitente;
        v_cli.EmitenteCadastro = p_rows.item(0).cpfemit;
        v_cli.EmitenteRg = p_rows.item(0).rgemit;
        v_cli.InformacoesBanco = p_rows.item(0).inf_banco;
        v_cli.InformacoesComerciais = p_rows.item(0).inf_comerc;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    dao.OrderBy = "nome";
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cliente;
        for (var i = 0; i < p_rows.length; i++) {
          v_cliente = new Cliente();
          v_cliente.Id = p_rows.item(i).id;
          v_cliente.Teste = p_rows.item(i).id;
          v_cliente.Codigo = p_rows.item(i).codigo;
          v_cliente.Nome = p_rows.item(i).nome;
          v_cliente.Fantasia = p_rows.item(i).fantasia;
          v_cliente.Cadastro = p_rows.item(i).cadastro;
          v_cliente.Inscricao = p_rows.item(i).inscricao;
          //v_cli.CadastroData = p_rows.item(i).CadastroData;
          v_cliente.Endereco = p_rows.item(i).endereco;
          v_cliente.Numero = p_rows.item(i).numero;
          v_cliente.Bairro = p_rows.item(i).bairro;
          v_cliente.Complemento = p_rows.item(i).complemento;
          v_cliente.CidadeCodigo = p_rows.item(i).cod_cidade;
          v_cliente.CidadeNome = p_rows.item(i).cidade;
          v_cliente.Cep = p_rows.item(i).cep;
          v_cliente.Estado = p_rows.item(i).estado;
          v_cliente.Telefone = p_rows.item(i).telefone;
          v_cliente.Fax = p_rows.item(i).fax;
          v_cliente.Email = p_rows.item(i).email;
          v_cliente.Emitente = p_rows.item(i).emitente;
          v_cliente.EmitenteCadastro = p_rows.item(i).cpfemit;
          v_cliente.EmitenteRg = p_rows.item(i).rgemit;
          v_cliente.InformacoesBanco = p_rows.item(i).inf_banco;
          v_cliente.InformacoesComerciais = p_rows.item(i).inf_comerc;
          v_ret.push(v_cliente);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TCliente();
    v_tcli.codigo = this.Codigo;
    v_tcli.nome = this.Nome;
    v_tcli.fantasia = this.Fantasia;
    v_tcli.cadastro = this.Cadastro;
    v_tcli.inscricao = this.Inscricao;
    //v_tcli.CadastroData = this.CadastroData;
    v_tcli.endereco = this.Endereco;
    v_tcli.numero = this.Numero;
    v_tcli.bairro = this.Bairro;
    v_tcli.complemento = this.Complemento;
    v_tcli.cod_cidade = this.CidadeCodigo;
    v_tcli.cidade = this.CidadeNome;
    v_tcli.cep = this.Cep;
    v_tcli.estado = this.Estado;
    v_tcli.telefone = this.Telefone;
    v_tcli.fax = this.Fax;
    v_tcli.email = this.Email;
    v_tcli.emitente = this.Emitente;
    v_tcli.cpfemit = this.EmitenteCadastro;
    v_tcli.rgemit = this.EmitenteRg;
    v_tcli.inf_banco = this.InformacoesBanco;
    v_tcli.inf_comerc = this.InformacoesComerciais;
    var v_sql = '';
    if (this.Id > 0)
      v_sql = v_tcli.Update() + ' WHERE id=' + this.Id;
    else
      v_sql = v_tcli.Insert();
    window.dao.ExecSql(v_sql, function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM Cliente", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.Prazo = window.Prazo || {};
window.Prazo = function (p_data) {
  this.Codigo = 0;
  this.Nome = '';
  this.Desconto = false;
  this.Parcelas = '';
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Codigo = v_data.Codigo;
      this.Nome = v_data.Nome;
      this.Desconto = v_data.Desconto;
      this.Parcelas = v_data.Parcelas;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_codigo = function (p_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "codigo=" + p_codigo;
  };

  this.DaoStart = function () {
    dao.Table = "Prazo";
    dao.Fields = "codigo, nome, desconto, parcelas";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    if (dao.OrderBy.length <= 0)
      dao.OrderBy = "nome";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new Prazo();
      if (p_rows.length > 0) {
        v_cli.Codigo = p_rows.item(0).codigo;
        v_cli.Nome = p_rows.item(0).nome;
        v_cli.Desconto = (p_rows.item(0).desconto == 1);
        v_cli.Parcelas = p_rows.item(0).parcelas;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cli = new Prazo();
        for (var i = 0; i < p_rows.length; i++) {
          v_cli = new Prazo();
          v_cli.Codigo = p_rows.item(i).codigo;
          v_cli.Nome = p_rows.item(i).nome;
          v_cli.Desconto = (p_rows.item(i).desconto == 1);
          v_cli.Parcelas = p_rows.item(i).parcelas;
          v_ret.push(v_cli);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TPrazo();
    v_tcli.codigo = this.Codigo;
    v_tcli.nome = this.Nome;
    v_tcli.desconto = this.Desconto;
    v_tcli.parcelas = this.Parcelas;
    window.dao.ExecSql(v_tcli.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM Prazo", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.FornecedorCliente = window.FornecedorCliente || {};
window.FornecedorCliente = function (p_data) {
  this.FornecedorCodigo = 0;
  this.ClienteCodigo = 0;
  this.ClienteNome = '';
  this.ClienteId = 0;
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.FornecedorCodigo = v_data.FornecedorCodigo;
      this.ClienteCodigo = v_data.ClienteCodigo;
      this.ClienteNome = v_data.ClienteNome;
      this.ClienteId = 0;
    } catch (ex) {
    }
  }

  this.Filter = 'cli.codigo=fcli.cliente_codigo';

  this.FilterSet_fornecedor_codigo = function (p_fornecedor_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "fcli.fornecedor_codigo=" + p_fornecedor_codigo;
  };

  this.DaoStart = function () {
    dao.Table = "FornecedorCliente fcli, Cliente cli";
    dao.Fields = "fcli.fornecedor_codigo, fcli.cliente_codigo, cli.nome AS cliente_nome, cli.id AS cliente_id";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    if (dao.OrderBy.length <= 0)
      dao.OrderBy = "cli.nome";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new FornecedorCliente();
      if (p_rows.length > 0) {
        v_cli.FornecedorCodigo = p_rows.item(0).fornecedor_codigo;
        v_cli.ClienteCodigo = p_rows.item(0).cliente_codigo;
        v_cli.ClienteNome = p_rows.item(0).cliente_nome;
        v_cli.ClienteId = p_rows.item(0).cliente_id;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cli = new FornecedorCliente();
        for (var i = 0; i < p_rows.length; i++) {
          v_cli = new FornecedorCliente();
          v_cli.FornecedorCodigo = p_rows.item(i).fornecedor_codigo;
          v_cli.ClienteCodigo = p_rows.item(i).cliente_codigo;
          v_cli.ClienteNome = p_rows.item(i).cliente_nome;
          v_cli.ClienteId = p_rows.item(i).cliente_id;
          v_ret.push(v_cli);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TFornecedorCliente();
    v_tcli.fornecedor_codigo = this.FornecedorCodigo;
    v_tcli.cliente_codigo = this.ClienteCodigo;
    window.dao.ExecSql(v_tcli.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM FornecedorCliente", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.FornecedorPrazo = window.FornecedorPrazo || {};
window.FornecedorPrazo = function (p_data) {
  this.FornecedorCodigo = 0;
  this.PrazoCodigo = 0;
  this.PrazoNome = '';
  this.Desconto = 0;
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.FornecedorCodigo = v_data.FornecedorCodigo;
      this.PrazoCodigo = v_data.PrazoCodigo;
      this.PrazoNome = v_data.PrazoNome;
      this.Desconto = v_data.Desconto;
    } catch (ex) {
    }
  }

  this.Filter = 'fprz.prazo_codigo=prz.codigo';

  this.FilterSet_fornecedor_codigo = function (p_fornecedor_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "fprz.fornecedor_codigo=" + p_fornecedor_codigo;
  };

  this.FilterSet_prazo_codigo = function (p_prazo_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "fprz.prazo_codigo=" + p_prazo_codigo;
  };

  this.DaoStart = function () {
    dao.Table = "FornecedorPrazo fprz, Prazo prz";
    dao.Fields = "fprz.fornecedor_codigo, fprz.prazo_codigo, prz.nome AS prazo_nome, fprz.desconto";
    if (this.Filter.length > 0)
      dao.Filter = this.Filter;
    if (dao.OrderBy.length <= 0)
      dao.OrderBy = "prz.nome";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new FornecedorPrazo();
      if (p_rows.length > 0) {
        v_cli.FornecedorCodigo = p_rows.item(0).fornecedor_codigo;
        v_cli.PrazoCodigo = p_rows.item(0).prazo_codigo;
        v_cli.PrazoNome = p_rows.item(0).prazo_nome;
        v_cli.Desconto = p_rows.item(0).desconto;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cli = new FornecedorPrazo();
        for (var i = 0; i < p_rows.length; i++) {
          v_cli = new FornecedorPrazo();
          v_cli.FornecedorCodigo = p_rows.item(i).fornecedor_codigo;
          v_cli.PrazoCodigo = p_rows.item(i).prazo_codigo;
          v_cli.PrazoNome = p_rows.item(i).prazo_nome;
          v_cli.Desconto = p_rows.item(i).desconto;
          v_ret.push(v_cli);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TFornecedorPrazo();
    v_tcli.fornecedor_codigo = this.FornecedorCodigo;
    v_tcli.prazo_codigo = this.PrazoCodigo;
    v_tcli.desconto = this.Desconto;
    window.dao.ExecSql(v_tcli.Insert(), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM FornecedorPrazo", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};

window.Pedido = window.Pedido || {};
window.Pedido = function (p_data) {
  this.Numero = 0;
  this.ClienteId = 0;
  this.ClienteCodigo = 0;
  this.ClienteNome = '';
  this.ClienteCadastro = '';
  this.FornecedorCodigo = 0;
  this.FornecedorNome = '';
  this.ColecaoCodigo = 0;
  this.ColecaoNome = '';
  this.PrazoCodigo = 0;
  this.Desconto = 0;
  this.Observacao1 = '';
  this.Observacao2 = '';
  this.EmissaoData = '';
  this.EmissaoHora = '';
  this.ProdutosQtde = 0;
  this.UnidadesQtde = 0;
  this.ProdutosTotal = 0;
  this.NumeroGestor = 0;
  this.Docto = '';
  this.Enviado = false;
  this.Recebido = 0;
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Numero = v_data.Numero;
      this.ClienteId = v_data.ClienteId;
      this.ClienteCodigo = v_data.ClienteCodigo;
      this.ClienteNome = '';
      this.ClienteCadastro = v_data.ClienteCadastro;
      this.FornecedorCodigo = v_data.FornecedorCodigo;
      this.FornecedorNome = '';
      this.ColecaoCodigo = v_data.ColecaoCodigo;
      this.ColecaoNome = '';
      this.PrazoCodigo = v_data.PrazoCodigo;
      this.Desconto = v_data.Desconto;
      this.Observacao1 = v_data.Observacao1;
      this.Observacao2 = v_data.Observacao2;
      this.EmissaoData = v_data.EmissaoData;
      this.EmissaoHora = v_data.EmissaoHora;
      this.ProdutosQtde = v_data.ProdutosQtde;
      this.UnidadesQtde = v_data.UnidadesQtde;
      this.ProdutosTotal = v_data.ProdutosTotal;
      this.NumeroGestor = v_data.NumeroGestor;
      this.Docto = v_data.Docto;
      this.Enviado = v_data.Enviado;
      this.Recebido = v_data.Recebido;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_numero = function (p_numero) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "ped.numero=" + p_numero;
  };

  this.FilterSet_emissao_data_periodo = function (p_de, p_ate) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "((ped.emissao_data>='{0}') AND (ped.emissao_data<='{1}'))".Format(DataSerial(p_de), DataSerial(p_ate));
  };

  this.FilterSet_fornecedor_codigo = function (p_fornecedor_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "ped.fornecedor_codigo=" + p_fornecedor_codigo;
  };

  this.FilterSet_cliente_codigo = function (p_cliente_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "ped.cliente_codigo=" + p_cliente_codigo;
  };

  this.FilterSet_cliente_id = function (p_cliente_id) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "ped.cliente_id=" + p_cliente_id;
  };

  this.FilterSet_cliente_idUltimo = function (p_cliente_id) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "ped.cliente_id=" + p_cliente_id;
    dao.OrderBy = "ped.numero DESC LIMIT 1";
  };

  this.FilterSet_cliente_codigoUltimo = function (p_cliente_codigo) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "ped.cliente_codigo=" + p_cliente_codigo;
    dao.OrderBy = "ped.numero DESC LIMIT 1";
  };
  
  this.FilterSet_enviado = function (p_enviado) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += ((p_enviado ? "" : "NOT ") + "ped.enviado");
  };
  
  this.FilterSet_recebido_zero = function () {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "ped.recebido<=0";
  };
  
  this.FilterSet_recebido = function () {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "ped.recebido>0";
  };

  this.DaoStart = function () {
    //dao.Table = "Pedido ped, Cliente cli, Fornecedor forn, Colecao clc";
    dao.Table = "Pedido ped, Cliente cli, Fornecedor forn";
    var v_sqlProdutosQtde = "(SELECT COUNT(DISTINCT(pprd1.produto_codigo)) FROM PedidoProduto pprd1 WHERE pprd1.pedido_numero=ped.numero) AS produtos_qtde";
    var v_sqlUnidadesQtde = "(SELECT SUM(COALESCE(pprd2.Grade1, 0) + COALESCE(pprd2.Grade2, 0) + COALESCE(pprd2.Grade3, 0) + COALESCE(pprd2.Grade4, 0) + COALESCE(pprd2.Grade5, 0) + COALESCE(pprd2.Grade6, 0) + COALESCE(pprd2.Grade7, 0) + COALESCE(pprd2.Grade8, 0) + COALESCE(pprd2.Grade9, 0) + COALESCE(pprd2.Grade10, 0) + COALESCE(pprd2.Grade11, 0) + COALESCE(pprd2.Grade12, 0) + COALESCE(pprd2.Grade13, 0) + COALESCE(pprd2.Grade14, 0)) FROM PedidoProduto pprd2 WHERE pprd2.pedido_numero=ped.numero) AS unidades_qtde";
    var v_sqlProdutosTotal = "(SELECT SUM(pprd3.preco_venda * (COALESCE(pprd3.Grade1, 0) + COALESCE(pprd3.Grade2, 0) + COALESCE(pprd3.Grade3, 0) + COALESCE(pprd3.Grade4, 0) + COALESCE(pprd3.Grade5, 0) + COALESCE(pprd3.Grade6, 0) + COALESCE(pprd3.Grade7, 0) + COALESCE(pprd3.Grade8, 0) + COALESCE(pprd3.Grade9, 0) + COALESCE(pprd3.Grade10, 0) + COALESCE(pprd3.Grade11, 0) + COALESCE(pprd3.Grade12, 0)) + COALESCE(pprd3.Grade13, 0) + COALESCE(pprd3.Grade14, 0)) FROM PedidoProduto pprd3 WHERE pprd3.pedido_numero=ped.numero) AS produtos_total";
    //dao.Fields = 'ped.numero, ped.cliente_id, cli.codigo AS cliente_codigo, cli.nome AS cliente_nome, cli.cadastro AS cliente_cadastro, ped.fornecedor_codigo, forn.nome AS fornecedor_nome, ped.colecao_codigo, clc.nome AS colecao_nome, ped.prazo_codigo, ped.desconto, ped.observacao1, ped.observacao2, ped.emissao_data, ped.emissao_hora, ped.numero_gestor, ped.docto, ped.enviado, ped.recebido, {0}, {1}, {2}'.Format(v_sqlProdutosQtde, v_sqlUnidadesQtde, v_sqlProdutosTotal);
    dao.Fields = 'ped.numero, ped.cliente_id, cli.codigo AS cliente_codigo, cli.nome AS cliente_nome, cli.cadastro AS cliente_cadastro, ped.fornecedor_codigo, forn.nome AS fornecedor_nome, ped.colecao_codigo, ped.prazo_codigo, ped.desconto, ped.observacao1, ped.observacao2, ped.emissao_data, ped.emissao_hora, ped.numero_gestor, ped.docto, ped.enviado, ped.recebido, {0}, {1}, {2}'.Format(v_sqlProdutosQtde, v_sqlUnidadesQtde, v_sqlProdutosTotal);
    //var v_filter = "(cli.codigo=ped.cliente_codigo) AND (forn.codigo=ped.fornecedor_codigo) AND (clc.codigo=ped.colecao_codigo)";
    var v_filter = "(cli.codigo=ped.cliente_codigo) AND (forn.codigo=ped.fornecedor_codigo)";
    if (this.Filter.length > 0)
      v_filter += " AND " + this.Filter;
    dao.Filter = v_filter;
    if (dao.OrderBy.length <= 0)
      dao.OrderBy = "ped.numero";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new Pedido();
      if (p_rows.length > 0) {
        v_cli.Numero = p_rows.item(0).numero;
        v_cli.ClienteId = p_rows.item(0).cliente_id;
        v_cli.ClienteCodigo = p_rows.item(0).cliente_codigo;
        v_cli.ClienteNome = p_rows.item(0).cliente_nome;
        v_cli.ClienteCadastro = p_rows.item(0).cliente_cadastro;
        v_cli.FornecedorCodigo = p_rows.item(0).fornecedor_codigo;
        v_cli.FornecedorNome = p_rows.item(0).fornecedor_nome;
        v_cli.ColecaoCodigo = p_rows.item(0).colecao_codigo;
        v_cli.ColecaoNome = p_rows.item(0).colecao_nome;
        v_cli.PrazoCodigo = p_rows.item(0).prazo_codigo;
        v_cli.Desconto = p_rows.item(0).desconto;
        v_cli.Observacao1 = p_rows.item(0).observacao1;
        v_cli.Observacao2 = p_rows.item(0).observacao2;
        v_cli.EmissaoData = DataSerialToString(p_rows.item(0).emissao_data);
        v_cli.EmissaoHora = HoraSerialToString(p_rows.item(0).emissao_hora);
        v_cli.ProdutosQtde = p_rows.item(0).produtos_qtde;
        v_cli.UnidadesQtde = p_rows.item(0).unidades_qtde;
        v_cli.ProdutosTotal = p_rows.item(0).produtos_total;
        v_cli.NumeroGestor = p_rows.item(0).numero_gestor;
        v_cli.Docto = p_rows.item(0).docto;
        v_cli.Enviado = (p_rows.item(0).enviado == 1);
        v_cli.Recebido = p_rows.item(0).recebido;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cli = new Pedido();
        for (var i = 0; i < p_rows.length; i++) {
          v_cli = new Pedido();
          v_cli.Numero = p_rows.item(i).numero;
          v_cli.ClienteId = p_rows.item(i).cliente_id;
          v_cli.ClienteCodigo = p_rows.item(i).cliente_codigo;
          v_cli.ClienteNome = p_rows.item(i).cliente_nome;
          v_cli.ClienteCadastro = p_rows.item(i).cliente_cadastro;
          v_cli.FornecedorCodigo = p_rows.item(i).fornecedor_codigo;
          v_cli.FornecedorNome = p_rows.item(i).fornecedor_nome;
          v_cli.ColecaoCodigo = p_rows.item(i).colecao_codigo;
          v_cli.ColecaoNome = p_rows.item(i).colecao_nome;
          v_cli.PrazoCodigo = p_rows.item(i).prazo_codigo;
          v_cli.Desconto = p_rows.item(i).desconto;
          v_cli.Observacao1 = p_rows.item(i).observacao1;
          v_cli.Observacao2 = p_rows.item(i).observacao2;
          v_cli.EmissaoData = DataSerialToString(p_rows.item(i).emissao_data);
          v_cli.EmissaoHora = HoraSerialToString(p_rows.item(i).emissao_hora);
          v_cli.ProdutosQtde = p_rows.item(i).produtos_qtde;
          v_cli.UnidadesQtde = p_rows.item(i).unidades_qtde;
          v_cli.ProdutosTotal = p_rows.item(i).produtos_total;
          v_cli.NumeroGestor = p_rows.item(i).numero_gestor;
          v_cli.Docto = p_rows.item(i).docto;
          v_cli.Enviado = (p_rows.item(i).enviado == 1);
          v_cli.Recebido = p_rows.item(i).recebido;
          v_ret.push(v_cli);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TPedido();
    v_tcli.numero = this.Numero;
    v_tcli.cliente_id = this.ClienteId;
    v_tcli.cliente_codigo = this.ClienteCodigo;
    v_tcli.fornecedor_codigo = this.FornecedorCodigo;
    v_tcli.colecao_codigo = this.ColecaoCodigo;
    v_tcli.prazo_codigo = this.PrazoCodigo;
    v_tcli.desconto = this.Desconto;
    v_tcli.observacao1 = this.Observacao1;
    v_tcli.observacao2 = this.Observacao2;
    v_tcli.emissao_data = DataSerial(this.EmissaoData);
    v_tcli.emissao_hora = HoraSerial(this.EmissaoHora);
    v_tcli.numero_gestor = this.NumeroGestor;
    v_tcli.docto = this.Docto;
    v_tcli.enviado = (this.Enviado ? 1 : 0);
    v_tcli.recebido = this.Recebido;
    var v_sql = '';
    if (this.Numero > 0)
      v_sql = v_tcli.Update() + ' WHERE numero=' + this.Numero;
    else
      v_sql = v_tcli.Insert();
    window.dao.ExecSql(v_sql, function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM Pedido", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };

  this.EnviadoSet = function (p_callback) {
    var v_sql = "UPDATE Pedido SET enviado=1, numero_gestor={1}, docto='{2}' WHERE numero={0}";
    window.dao.ExecSql(v_sql.Format(this.Numero, this.NumeroGestor, this.Docto), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };
  
  this.RecebidoSet = function (p_callback) {
    var v_sql = "UPDATE Pedido SET recebido={1} WHERE numero={0}";
    window.dao.ExecSql(v_sql.Format(this.Numero, this.Recebido), function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.Delete = function (p_callback) {
    var v_numero = this.Numero;
    window.dao.ExecSql(
            "DELETE FROM PedidoProduto WHERE pedido_numero={0}".Format(v_numero),
            function (p_rowscount, p_success, p_message) {
              window.dao.ExecSql(
                      "DELETE FROM Pedido WHERE numero={0}".Format(v_numero),
                      function (p_1rowscount, p_1success, p_1message) {
                        if (p_callback != null)
                          p_callback(p_1success);
                      });
            });
  };
};

window.PedidoProduto = window.PedidoProduto || {};
window.PedidoProduto = function (p_data) {
  this.Id = 0;
  this.PedidoNumero = 0;
  this.ProdutoCodigo = 0;
  this.Nome = '';
  this.Referencia = '';
  this.Grade1 = 0;
  this.Grade2 = 0;
  this.Grade3 = 0;
  this.Grade4 = 0;
  this.Grade5 = 0;
  this.Grade6 = 0;
  this.Grade7 = 0;
  this.Grade8 = 0;
  this.Grade9 = 0;
  this.Grade10 = 0;
  this.Grade11 = 0;
  this.Grade12 = 0;
  this.Grade13 = 0;
  this.Grade14 = 0;
  this.PrecoVenda = 0;
  this.PrecoTabela = 0;
  this.Cor = '';
  this.GradeNomes = '';
  this.GradeAtiva = '';
  if (p_data !== null) {
    try {
      var v_data = JSON.parse(p_data);
      this.Id = v_data.Id;
      this.PedidoNumero = v_data.PedidoNumero;
      this.ProdutoCodigo = v_data.ProdutoCodigo;
      this.Nome = v_data.Nome;
      this.Referencia = v_data.Referencia;
      this.Grade1 = v_data.Grade1;
      this.Grade2 = v_data.Grade2;
      this.Grade3 = v_data.Grade3;
      this.Grade4 = v_data.Grade4;
      this.Grade5 = v_data.Grade5;
      this.Grade6 = v_data.Grade6;
      this.Grade7 = v_data.Grade7;
      this.Grade8 = v_data.Grade8;
      this.Grade9 = v_data.Grade9;
      this.Grade10 = v_data.Grade10;
      this.Grade11 = v_data.Grade11;
      this.Grade12 = v_data.Grade12;
      this.Grade13 = v_data.Grade13;
      this.Grade14 = v_data.Grade14;
      this.PrecoVenda = v_data.PrecoVenda;
      this.PrecoTabela = v_data.PrecoTabela;
      this.Cor = v_data.Cor;
      this.GradeNomes = v_data.GradeNomes;
      this.GradeAtiva = v_data.GradeAtiva;
    } catch (ex) {
    }
  }

  this.Filter = '';

  this.FilterSet_id = function (p_id) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "pprd.id=" + p_id;
  };

  this.FilterSet_pedidonumero = function (p_pedidonumero) {
    if (this.Filter.length > 0)
      this.Filter += ' AND ';
    this.Filter += "pprd.pedido_numero=" + p_pedidonumero;
  };

  this.DaoStart = function () {
    dao.Table = "PedidoProduto pprd, Produto prd";
    var v_gradenomes = "(SELECT grd.grade1 || ',' || grd.grade2 || ',' || grd.grade3 || ',' || grd.grade4 || ',' || grd.grade5 || ',' || grd.grade6 || ',' || grd.grade7 || ',' || grd.grade8 || ',' || grd.grade9 || ',' || grd.grade10 || ',' || grd.grade11 || ',' || grd.grade12 || ',' || grd.grade13 || ',' || grd.grade14 FROM Grade grd WHERE grd.codigo=prd.grade_codigo) AS grade_nomes";
    var v_gradeativa = "(SELECT prd.grade1 || ',' || prd.grade2 || ',' || prd.grade3 || ',' || prd.grade4 || ',' || prd.grade5 || ',' || prd.grade6 || ',' || prd.grade7 || ',' || prd.grade8 || ',' || prd.grade9 || ',' || prd.grade10 || ',' || prd.grade11 || ',' || prd.grade12 || ',' || prd.grade13 || ',' || prd.grade14) AS grade_ativa";
    dao.Fields = "pprd.id, pprd.pedido_numero, pprd.produto_codigo, prd.nome, prd.referencia, pprd.grade1, pprd.grade2, pprd.grade3, pprd.grade4, pprd.grade5, pprd.grade6, pprd.grade7, pprd.grade8, pprd.grade9, pprd.grade10, pprd.grade11, pprd.grade12, pprd.grade13, pprd.grade14, pprd.preco_venda, pprd.preco_tabela, pprd.cor," + v_gradenomes + "," + v_gradeativa;
    if (this.Filter.length > 0)
      dao.Filter = "(prd.codigo=pprd.produto_codigo) AND " + this.Filter;
    dao.OrderBy = "prd.referencia, pprd.cor";
  };

  this.Read = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_cli = new PedidoProduto();
      if (p_rows.length > 0) {
        v_cli.Id = p_rows.item(0).id;
        v_cli.PedidoNumero = p_rows.item(0).pedido_numero;
        v_cli.ProdutoCodigo = p_rows.item(0).produto_codigo;
        v_cli.Nome = p_rows.item(0).nome;
        v_cli.Referencia = p_rows.item(0).referencia;
        v_cli.Grade1 = p_rows.item(0).grade1;
        v_cli.Grade2 = p_rows.item(0).grade2;
        v_cli.Grade3 = p_rows.item(0).grade3;
        v_cli.Grade4 = p_rows.item(0).grade4;
        v_cli.Grade5 = p_rows.item(0).grade5;
        v_cli.Grade6 = p_rows.item(0).grade6;
        v_cli.Grade7 = p_rows.item(0).grade7;
        v_cli.Grade8 = p_rows.item(0).grade8;
        v_cli.Grade9 = p_rows.item(0).grade9;
        v_cli.Grade10 = p_rows.item(0).grade10;
        v_cli.Grade11 = p_rows.item(0).grade11;
        v_cli.Grade12 = p_rows.item(0).grade12;
        v_cli.Grade13 = p_rows.item(0).grade13;
        v_cli.Grade14 = p_rows.item(0).grade14;
        v_cli.PrecoVenda = p_rows.item(0).preco_venda;
        v_cli.PrecoTabela = p_rows.item(0).preco_tabela;
        v_cli.Cor = p_rows.item(0).cor;
        v_cli.GradeNomes = p_rows.item(0).grade_nomes;
        v_cli.GradeAtiva = p_rows.item(0).grade_ativa;
      }
      if (p_callback != null)
        p_callback(v_cli);
    });
  };

  this.ReadList = function (p_callback) {
    this.DaoStart();
    dao.Run(function (p_rows)
    {
      var v_ret = [];
      if (p_rows.length > 0) {
        var v_cli = new PedidoProduto();
        for (var i = 0; i < p_rows.length; i++) {
          v_cli = new PedidoProduto();
          v_cli.Id = p_rows.item(i).id;
          v_cli.PedidoNumero = p_rows.item(i).pedido_numero;
          v_cli.ProdutoCodigo = p_rows.item(i).produto_codigo;
          v_cli.Nome = p_rows.item(i).nome;
          v_cli.Referencia = p_rows.item(i).referencia;
          v_cli.Grade1 = p_rows.item(i).grade1;
          v_cli.Grade2 = p_rows.item(i).grade2;
          v_cli.Grade3 = p_rows.item(i).grade3;
          v_cli.Grade4 = p_rows.item(i).grade4;
          v_cli.Grade5 = p_rows.item(i).grade5;
          v_cli.Grade6 = p_rows.item(i).grade6;
          v_cli.Grade7 = p_rows.item(i).grade7;
          v_cli.Grade8 = p_rows.item(i).grade8;
          v_cli.Grade9 = p_rows.item(i).grade9;
          v_cli.Grade10 = p_rows.item(i).grade10;
          v_cli.Grade11 = p_rows.item(i).grade11;
          v_cli.Grade12 = p_rows.item(i).grade12;
          v_cli.Grade13 = p_rows.item(i).grade13;
          v_cli.Grade14 = p_rows.item(i).grade14;
          v_cli.PrecoVenda = p_rows.item(i).preco_venda;
          v_cli.PrecoTabela = p_rows.item(i).preco_tabela;
          v_cli.Cor = p_rows.item(i).cor;
          v_cli.GradeNomes = p_rows.item(i).grade_nomes;
          v_cli.GradeAtiva = p_rows.item(i).grade_ativa;
          v_ret.push(v_cli);
        }
      }
      p_callback(v_ret);
    });
  };

  this.Save = function (p_callback) {
    var v_tcli = new TPedidoProduto();
    v_tcli.id = this.Id;
    v_tcli.pedido_numero = this.PedidoNumero;
    v_tcli.produto_codigo = this.ProdutoCodigo;
    v_tcli.grade1 = this.Grade1;
    v_tcli.grade2 = this.Grade2;
    v_tcli.grade3 = this.Grade3;
    v_tcli.grade4 = this.Grade4;
    v_tcli.grade5 = this.Grade5;
    v_tcli.grade6 = this.Grade6;
    v_tcli.grade7 = this.Grade7;
    v_tcli.grade8 = this.Grade8;
    v_tcli.grade9 = this.Grade9;
    v_tcli.grade10 = this.Grade10;
    v_tcli.grade11 = this.Grade11;
    v_tcli.grade12 = this.Grade12;
    v_tcli.grade13 = this.Grade13;
    v_tcli.grade14 = this.Grade14;
    v_tcli.preco_venda = this.PrecoVenda;
    v_tcli.preco_tabela = this.PrecoTabela;
    v_tcli.cor = this.Cor;
    var v_sql = '';
    if (this.Id > 0)
      v_sql = v_tcli.Update() + ' WHERE id=' + this.Id;
    else
      v_sql = v_tcli.Insert();
    window.dao.ExecSql(v_sql, function (p_rowscount, p_success, p_message)
    {
      if (p_callback != null)
        p_callback(p_success);
    });
  };

  this.Delete = function (p_id, p_callback) {
    window.dao.ExecSql("DELETE FROM PedidoProduto WHERE id=" + p_id, function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };

  this.ClearAll = function (p_callback) {
    window.dao.ExecSql("DELETE FROM PedidoProduto", function (p_rowscount, p_success, p_message)
    {
      p_callback(p_success);
    });
  };
};
