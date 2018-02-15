
/* #################################################################################### */
window.TConfig = window.TConfig || {};
window.TConfig = function ()
{
  this.id = 0;
  this.chave = window.StringEmpty;
  this.atualizacao_data = window.StringEmpty;
  this.wsserver = window.StringEmpty;
  this.enviado = 0;
  this.atu_cidades = 0;
  this.atu_fornecedores = 0;
  this.atu_clientes = 0;
  this.atu_colecoes = 0;
  this.atu_prazos = 0;
  this.atu_fornecedorclientes = 0;
  this.atu_fornecedorprazos = 0;
  this.atu_grades = 0;
  this.atu_produtos = 0;

  this.Struct = function ()
  {
    return {
      'table': 'Config',
      'fields': [
        {'name': 'id', 'type': 'INTEGER', 'size': 11, 'default': null, 'key': true},
        {'name': 'chave', 'type': 'TEXT', 'size': 32, 'default': '', 'key': false},
        {'name': 'atualizacao_data', 'type': 'TEXT', 'size': 8, 'default': '', 'key': false},
        {'name': 'wsserver', 'type': 'TEXT', 'size': 100, 'default': 'http://192.168.1.200:8080', 'key': false},
        {'name': 'enviado', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_cidades', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_fornecedores', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_clientes', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_colecoes', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_prazos', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_fornecedorclientes', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_fornecedorprazos', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_grades', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'atu_produtos', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Config(chave, atualizacao_data, wsserver, enviado, atu_cidades, atu_fornecedores, atu_clientes, atu_colecoes, atu_prazos, atu_fornecedorclientes, atu_fornecedorprazos, atu_grades, atu_produtos) VALUES(" + "'" + this.chave + "'" + ", " + "'" + this.atualizacao_data + "'" + ", " + "'" + this.wsserver + "'" + ", " +  this.enviado + ", " +  this.atu_cidades + ", " +  this.atu_fornecedores + ", " +  this.atu_clientes + ", " +  this.atu_colecoes + ", " +  this.atu_prazos + ", " +  this.atu_fornecedorclientes + ", " +  this.atu_fornecedorprazos + ", " +  this.atu_grades + ", " +  this.atu_produtos + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Config SET chave='" + this.chave + "', atualizacao_data='" + this.atualizacao_data + "', wsserver='" + this.wsserver + "', enviado=" + this.enviado + ", atu_cidades=" + this.atu_cidades + ", atu_fornecedores=" + this.atu_fornecedores + ", atu_clientes=" + this.atu_clientes + ", atu_colecoes=" + this.atu_colecoes + ", atu_prazos=" + this.atu_prazos + ", atu_fornecedorclientes=" + this.atu_fornecedorclientes + ", atu_fornecedorprazos=" + this.atu_fornecedorprazos + ", atu_grades=" + this.atu_grades + ", atu_produtos=" + this.atu_produtos + "";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Config";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TVendedor = window.TVendedor || {};
window.TVendedor = function ()
{
  this.codigo = 0;
  this.nome = window.StringEmpty;
  this.regiao = 0;
  this.estado = window.StringEmpty;

  this.Struct = function ()
  {
    return {
      'table': 'Vendedor',
      'fields': [
        {'name': 'codigo', 'type': 'INTEGER', 'size': 11, 'default': 0, 'key': false},
        {'name': 'nome', 'type': 'TEXT', 'size': 50, 'default': '', 'key': false},
        {'name': 'regiao', 'type': 'INTEGER', 'size': 11, 'default': 0, 'key': false},
        {'name': 'estado', 'type': 'TEXT', 'size': 2, 'default': '', 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Vendedor(codigo, nome, regiao, estado) VALUES(" +  this.codigo + ", " + "'" + this.nome + "'" + ", " +  this.regiao + ", " + "'" + this.estado + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Vendedor SET codigo=" + this.codigo + ", nome='" + this.nome + "', regiao=" + this.regiao + ", estado='" + this.estado + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Vendedor";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TFornecedor = window.TFornecedor || {};
window.TFornecedor = function ()
{
  this.codigo = 0;
  this.nome = window.StringEmpty;
  this.fantasia = window.StringEmpty;

  this.Struct = function ()
  {
    return {
      'table': 'Fornecedor',
      'fields': [
        {'name': 'codigo', 'type': 'INTEGER', 'size': 11, 'default': 0, 'key': false},
        {'name': 'nome', 'type': 'TEXT', 'size': 100, 'default': '', 'key': false},
        {'name': 'fantasia', 'type': 'TEXT', 'size': 100, 'default': '', 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Fornecedor(codigo, nome, fantasia) VALUES(" +  this.codigo + ", " + "'" + this.nome + "'" + ", " + "'" + this.fantasia + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Fornecedor SET codigo=" + this.codigo + ", nome='" + this.nome + "', fantasia='" + this.fantasia + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Fornecedor";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TColecao = window.TColecao || {};
window.TColecao = function ()
{
  this.codigo = 0;
  this.nome = window.StringEmpty;

  this.Struct = function ()
  {
    return {
      'table': 'Colecao',
      'fields': [
        {'name': 'codigo', 'type': 'INTEGER', 'size': 11, 'default': 0, 'key': false},
        {'name': 'nome', 'type': 'TEXT', 'size': 50, 'default': '', 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Colecao(codigo, nome) VALUES(" +  this.codigo + ", " + "'" + this.nome + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Colecao SET codigo=" + this.codigo + ", nome='" + this.nome + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Colecao";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TGrade = window.TGrade || {};
window.TGrade = function ()
{
  this.codigo = 0;
  this.grade1 = window.StringEmpty;
  this.grade2 = window.StringEmpty;
  this.grade3 = window.StringEmpty;
  this.grade4 = window.StringEmpty;
  this.grade5 = window.StringEmpty;
  this.grade6 = window.StringEmpty;
  this.grade7 = window.StringEmpty;
  this.grade8 = window.StringEmpty;
  this.grade9 = window.StringEmpty;
  this.grade10 = window.StringEmpty;
  this.grade11 = window.StringEmpty;
  this.grade12 = window.StringEmpty;
  this.grade13 = window.StringEmpty;
  this.grade14 = window.StringEmpty;

  this.Struct = function ()
  {
    return {
      'table': 'Grade',
      'fields': [
        {'name': 'codigo', 'type': 'INTEGER', 'size': 11, 'default': 0, 'key': false},
        {'name': 'grade1', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade2', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade3', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade4', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade5', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade6', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade7', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade8', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade9', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade10', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade11', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade12', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade13', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'grade14', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Grade(codigo, grade1, grade2, grade3, grade4, grade5, grade6, grade7, grade8, grade9, grade10, grade11, grade12, grade13, grade14) VALUES(" +  this.codigo + ", " + "'" + this.grade1 + "'" + ", " + "'" + this.grade2 + "'" + ", " + "'" + this.grade3 + "'" + ", " + "'" + this.grade4 + "'" + ", " + "'" + this.grade5 + "'" + ", " + "'" + this.grade6 + "'" + ", " + "'" + this.grade7 + "'" + ", " + "'" + this.grade8 + "'" + ", " + "'" + this.grade9 + "'" + ", " + "'" + this.grade10 + "'" + ", " + "'" + this.grade11 + "'" + ", " + "'" + this.grade12 + "'" + ", " + "'" + this.grade13 + "'" + ", " + "'" + this.grade14 + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Grade SET codigo=" + this.codigo + ", grade1='" + this.grade1 + "', grade2='" + this.grade2 + "', grade3='" + this.grade3 + "', grade4='" + this.grade4 + "', grade5='" + this.grade5 + "', grade6='" + this.grade6 + "', grade7='" + this.grade7 + "', grade8='" + this.grade8 + "', grade9='" + this.grade9 + "', grade10='" + this.grade10 + "', grade11='" + this.grade11 + "', grade12='" + this.grade12 + "', grade13='" + this.grade13 + "', grade14='" + this.grade14 + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Grade";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TProduto = window.TProduto || {};
window.TProduto = function ()
{
  this.codigo = 0;
  this.nome = window.StringEmpty;
  this.colecao_codigo = 0;
  this.referencia = window.StringEmpty;
  this.fornecedor_codigo = 0;
  this.preco_fabrica = 0;
  this.preco_cliente = 0;
  this.grade_codigo = 0;
  this.grade1 = 0;
  this.grade2 = 0;
  this.grade3 = 0;
  this.grade4 = 0;
  this.grade5 = 0;
  this.grade6 = 0;
  this.grade7 = 0;
  this.grade8 = 0;
  this.grade9 = 0;
  this.grade10 = 0;
  this.grade11 = 0;
  this.grade12 = 0;
  this.grade13 = 0;
  this.grade14 = 0;

  this.Struct = function ()
  {
    return {
      'table': 'Produto',
      'fields': [
        {'name': 'codigo', 'type': 'INTEGER', 'size': 11, 'default': 0, 'key': false},
        {'name': 'nome', 'type': 'TEXT', 'size': 100, 'default': '', 'key': false},
        {'name': 'colecao_codigo', 'type': 'INTEGER', 'size': 11, 'default': 0, 'key': false},
        {'name': 'referencia', 'type': 'TEXT', 'size': 20, 'default': '', 'key': false},
        {'name': 'fornecedor_codigo', 'type': 'INTEGER', 'size': 11, 'default': 0, 'key': false},
        {'name': 'preco_fabrica', 'type': 'REAL', 'size': 0, 'default': 0, 'key': false},
        {'name': 'preco_cliente', 'type': 'REAL', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade1', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade2', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade3', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade4', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade5', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade6', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade7', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade8', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade9', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade10', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade11', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade12', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade13', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade14', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Produto(codigo, nome, colecao_codigo, referencia, fornecedor_codigo, preco_fabrica, preco_cliente, grade_codigo, grade1, grade2, grade3, grade4, grade5, grade6, grade7, grade8, grade9, grade10, grade11, grade12, grade13, grade14) VALUES(" +  this.codigo + ", " + "'" + this.nome + "'" + ", " +  this.colecao_codigo + ", " + "'" + this.referencia + "'" + ", " +  this.fornecedor_codigo + ", " + "'" + this.preco_fabrica + "'" + ", " + "'" + this.preco_cliente + "'" + ", " +  this.grade_codigo + ", " +  this.grade1 + ", " +  this.grade2 + ", " +  this.grade3 + ", " +  this.grade4 + ", " +  this.grade5 + ", " +  this.grade6 + ", " +  this.grade7 + ", " +  this.grade8 + ", " +  this.grade9 + ", " +  this.grade10 + ", " +  this.grade11 + ", " +  this.grade12 + ", " +  this.grade13 + ", " +  this.grade14 + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Produto SET codigo=" + this.codigo + ", nome='" + this.nome + "', colecao_codigo=" + this.colecao_codigo + ", referencia='" + this.referencia + "', fornecedor_codigo=" + this.fornecedor_codigo + ", preco_fabrica='" + this.preco_fabrica + "', preco_cliente='" + this.preco_cliente + "', grade_codigo=" + this.grade_codigo + ", grade1=" + this.grade1 + ", grade2=" + this.grade2 + ", grade3=" + this.grade3 + ", grade4=" + this.grade4 + ", grade5=" + this.grade5 + ", grade6=" + this.grade6 + ", grade7=" + this.grade7 + ", grade8=" + this.grade8 + ", grade9=" + this.grade9 + ", grade10=" + this.grade10 + ", grade11=" + this.grade11 + ", grade12=" + this.grade12 + ", grade13=" + this.grade13 + ", grade14=" + this.grade14 + "";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Produto";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TCliente = window.TCliente || {};
window.TCliente = function ()
{
  this.id = 0;
  this.codigo = 0;
  this.nome = window.StringEmpty;
  this.fantasia = window.StringEmpty;
  this.cadastro = window.StringEmpty;
  this.inscricao = window.StringEmpty;
  this.endereco = window.StringEmpty;
  this.numero = 0;
  this.complemento = window.StringEmpty;
  this.bairro = window.StringEmpty;
  this.cod_cidade = 0;
  this.cidade = window.StringEmpty;
  this.cep = window.StringEmpty;
  this.estado = window.StringEmpty;
  this.telefone = window.StringEmpty;
  this.fax = window.StringEmpty;
  this.email = window.StringEmpty;
  this.emitente = window.StringEmpty;
  this.cpfemit = window.StringEmpty;
  this.rgemit = window.StringEmpty;
  this.inf_banco = window.StringEmpty;
  this.inf_comerc = window.StringEmpty;

  this.Struct = function ()
  {
    return {
      'table': 'Cliente',
      'fields': [
        {'name': 'id', 'type': 'INTEGER', 'size': 0, 'default': null, 'key': true},
        {'name': 'codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'nome', 'type': 'TEXT', 'size': 40, 'default': '', 'key': false},
        {'name': 'fantasia', 'type': 'TEXT', 'size': 30, 'default': '', 'key': false},
        {'name': 'cadastro', 'type': 'TEXT', 'size': 18, 'default': '', 'key': false},
        {'name': 'inscricao', 'type': 'TEXT', 'size': 18, 'default': '', 'key': false},
        {'name': 'endereco', 'type': 'TEXT', 'size': 40, 'default': '', 'key': false},
        {'name': 'numero', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'complemento', 'type': 'TEXT', 'size': 40, 'default': '', 'key': false},
        {'name': 'bairro', 'type': 'TEXT', 'size': 30, 'default': '', 'key': false},
        {'name': 'cod_cidade', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'cidade', 'type': 'TEXT', 'size': 30, 'default': '', 'key': false},
        {'name': 'cep', 'type': 'TEXT', 'size': 9, 'default': '', 'key': false},
        {'name': 'estado', 'type': 'TEXT', 'size': 2, 'default': '', 'key': false},
        {'name': 'telefone', 'type': 'TEXT', 'size': 40, 'default': '', 'key': false},
        {'name': 'fax', 'type': 'TEXT', 'size': 20, 'default': '', 'key': false},
        {'name': 'email', 'type': 'TEXT', 'size': 40, 'default': '', 'key': false},
        {'name': 'emitente', 'type': 'TEXT', 'size': 40, 'default': '', 'key': false},
        {'name': 'cpfemit', 'type': 'TEXT', 'size': 14, 'default': '', 'key': false},
        {'name': 'rgemit', 'type': 'TEXT', 'size': 14, 'default': '', 'key': false},
        {'name': 'inf_banco', 'type': 'TEXT', 'size': 80, 'default': '', 'key': false},
        {'name': 'inf_comerc', 'type': 'TEXT', 'size': 80, 'default': '', 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Cliente(codigo, nome, fantasia, cadastro, inscricao, endereco, numero, complemento, bairro, cod_cidade, cidade, cep, estado, telefone, fax, email, emitente, cpfemit, rgemit, inf_banco, inf_comerc) VALUES(" +  this.codigo + ", " + "'" + this.nome + "'" + ", " + "'" + this.fantasia + "'" + ", " + "'" + this.cadastro + "'" + ", " + "'" + this.inscricao + "'" + ", " + "'" + this.endereco + "'" + ", " +  this.numero + ", " + "'" + this.complemento + "'" + ", " + "'" + this.bairro + "'" + ", " +  this.cod_cidade + ", " + "'" + this.cidade + "'" + ", " + "'" + this.cep + "'" + ", " + "'" + this.estado + "'" + ", " + "'" + this.telefone + "'" + ", " + "'" + this.fax + "'" + ", " + "'" + this.email + "'" + ", " + "'" + this.emitente + "'" + ", " + "'" + this.cpfemit + "'" + ", " + "'" + this.rgemit + "'" + ", " + "'" + this.inf_banco + "'" + ", " + "'" + this.inf_comerc + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Cliente SET codigo=" + this.codigo + ", nome='" + this.nome + "', fantasia='" + this.fantasia + "', cadastro='" + this.cadastro + "', inscricao='" + this.inscricao + "', endereco='" + this.endereco + "', numero=" + this.numero + ", complemento='" + this.complemento + "', bairro='" + this.bairro + "', cod_cidade=" + this.cod_cidade + ", cidade='" + this.cidade + "', cep='" + this.cep + "', estado='" + this.estado + "', telefone='" + this.telefone + "', fax='" + this.fax + "', email='" + this.email + "', emitente='" + this.emitente + "', cpfemit='" + this.cpfemit + "', rgemit='" + this.rgemit + "', inf_banco='" + this.inf_banco + "', inf_comerc='" + this.inf_comerc + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Cliente";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TPrazo = window.TPrazo || {};
window.TPrazo = function ()
{
  this.codigo = 0;
  this.nome = window.StringEmpty;
  this.desconto = 0;
  this.parcelas = window.StringEmpty;

  this.Struct = function ()
  {
    return {
      'table': 'Prazo',
      'fields': [
        {'name': 'codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'nome', 'type': 'TEXT', 'size': 50, 'default': '', 'key': false},
        {'name': 'desconto', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'parcelas', 'type': 'TEXT', 'size': 50, 'default': '', 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Prazo(codigo, nome, desconto, parcelas) VALUES(" +  this.codigo + ", " + "'" + this.nome + "'" + ", " +  this.desconto + ", " + "'" + this.parcelas + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Prazo SET codigo=" + this.codigo + ", nome='" + this.nome + "', desconto=" + this.desconto + ", parcelas='" + this.parcelas + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Prazo";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TPedido = window.TPedido || {};
window.TPedido = function ()
{
  this.numero = 0;
  this.cliente_codigo = 0;
  this.fornecedor_codigo = 0;
  this.emissao_data = window.StringEmpty;
  this.emissao_hora = window.StringEmpty;
  this.colecao_codigo = 0;
  this.prazo_codigo = 0;
  this.desconto = 0;
  this.observacao1 = window.StringEmpty;
  this.observacao2 = window.StringEmpty;
  this.numero_gestor = 0;
  this.docto = window.StringEmpty;
  this.enviado = 0;
  this.cliente_id = 0;
  this.recebido = 0;

  this.Struct = function ()
  {
    return {
      'table': 'Pedido',
      'fields': [
        {'name': 'numero', 'type': 'INTEGER', 'size': 0, 'default': null, 'key': true},
        {'name': 'cliente_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'fornecedor_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'emissao_data', 'type': 'TEXT', 'size': 8, 'default': '', 'key': false},
        {'name': 'emissao_hora', 'type': 'TEXT', 'size': 4, 'default': '', 'key': false},
        {'name': 'colecao_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'prazo_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'desconto', 'type': 'REAL', 'size': 0, 'default': 0, 'key': false},
        {'name': 'observacao1', 'type': 'TEXT', 'size': 100, 'default': '', 'key': false},
        {'name': 'observacao2', 'type': 'TEXT', 'size': 100, 'default': '', 'key': false},
        {'name': 'numero_gestor', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'docto', 'type': 'TEXT', 'size': 20, 'default': '', 'key': false},
        {'name': 'enviado', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'cliente_id', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'recebido', 'type': 'REAL', 'size': 0, 'default': 0, 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Pedido(cliente_codigo, fornecedor_codigo, emissao_data, emissao_hora, colecao_codigo, prazo_codigo, desconto, observacao1, observacao2, numero_gestor, docto, enviado, cliente_id, recebido) VALUES(" +  this.cliente_codigo + ", " +  this.fornecedor_codigo + ", " + "'" + this.emissao_data + "'" + ", " + "'" + this.emissao_hora + "'" + ", " +  this.colecao_codigo + ", " +  this.prazo_codigo + ", " + "'" + this.desconto + "'" + ", " + "'" + this.observacao1 + "'" + ", " + "'" + this.observacao2 + "'" + ", " +  this.numero_gestor + ", " + "'" + this.docto + "'" + ", " +  this.enviado + ", " +  this.cliente_id + ", " + "'" + this.recebido + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Pedido SET cliente_codigo=" + this.cliente_codigo + ", fornecedor_codigo=" + this.fornecedor_codigo + ", emissao_data='" + this.emissao_data + "', emissao_hora='" + this.emissao_hora + "', colecao_codigo=" + this.colecao_codigo + ", prazo_codigo=" + this.prazo_codigo + ", desconto='" + this.desconto + "', observacao1='" + this.observacao1 + "', observacao2='" + this.observacao2 + "', numero_gestor=" + this.numero_gestor + ", docto='" + this.docto + "', enviado=" + this.enviado + ", cliente_id=" + this.cliente_id + ", recebido='" + this.recebido + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Pedido";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TPedidoProduto = window.TPedidoProduto || {};
window.TPedidoProduto = function ()
{
  this.id = 0;
  this.pedido_numero = 0;
  this.produto_codigo = 0;
  this.grade1 = 0;
  this.grade2 = 0;
  this.grade3 = 0;
  this.grade4 = 0;
  this.grade5 = 0;
  this.grade6 = 0;
  this.grade7 = 0;
  this.grade8 = 0;
  this.grade9 = 0;
  this.grade10 = 0;
  this.grade11 = 0;
  this.grade12 = 0;
  this.grade13 = 0;
  this.grade14 = 0;
  this.preco_venda = 0;
  this.preco_tabela = 0;
  this.cor = window.StringEmpty;

  this.Struct = function ()
  {
    return {
      'table': 'PedidoProduto',
      'fields': [
        {'name': 'id', 'type': 'INTEGER', 'size': 0, 'default': null, 'key': true},
        {'name': 'pedido_numero', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'produto_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade1', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade2', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade3', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade4', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade5', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade6', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade7', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade8', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade9', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade10', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade11', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade12', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade13', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'grade14', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'preco_venda', 'type': 'REAL', 'size': 0, 'default': 0, 'key': false},
        {'name': 'preco_tabela', 'type': 'REAL', 'size': 0, 'default': 0, 'key': false},
        {'name': 'cor', 'type': 'TEXT', 'size': 50, 'default': '', 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO PedidoProduto(pedido_numero, produto_codigo, grade1, grade2, grade3, grade4, grade5, grade6, grade7, grade8, grade9, grade10, grade11, grade12, grade13, grade14, preco_venda, preco_tabela, cor) VALUES(" +  this.pedido_numero + ", " +  this.produto_codigo + ", " +  this.grade1 + ", " +  this.grade2 + ", " +  this.grade3 + ", " +  this.grade4 + ", " +  this.grade5 + ", " +  this.grade6 + ", " +  this.grade7 + ", " +  this.grade8 + ", " +  this.grade9 + ", " +  this.grade10 + ", " +  this.grade11 + ", " +  this.grade12 + ", " +  this.grade13 + ", " +  this.grade14 + ", " + "'" + this.preco_venda + "'" + ", " + "'" + this.preco_tabela + "'" + ", " + "'" + this.cor + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE PedidoProduto SET pedido_numero=" + this.pedido_numero + ", produto_codigo=" + this.produto_codigo + ", grade1=" + this.grade1 + ", grade2=" + this.grade2 + ", grade3=" + this.grade3 + ", grade4=" + this.grade4 + ", grade5=" + this.grade5 + ", grade6=" + this.grade6 + ", grade7=" + this.grade7 + ", grade8=" + this.grade8 + ", grade9=" + this.grade9 + ", grade10=" + this.grade10 + ", grade11=" + this.grade11 + ", grade12=" + this.grade12 + ", grade13=" + this.grade13 + ", grade14=" + this.grade14 + ", preco_venda='" + this.preco_venda + "', preco_tabela='" + this.preco_tabela + "', cor='" + this.cor + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE PedidoProduto";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TFornecedorCliente = window.TFornecedorCliente || {};
window.TFornecedorCliente = function ()
{
  this.fornecedor_codigo = 0;
  this.cliente_codigo = 0;

  this.Struct = function ()
  {
    return {
      'table': 'FornecedorCliente',
      'fields': [
        {'name': 'fornecedor_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'cliente_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO FornecedorCliente(fornecedor_codigo, cliente_codigo) VALUES(" +  this.fornecedor_codigo + ", " +  this.cliente_codigo + ")";
  };
  this.Update = function ()
  {
    return "UPDATE FornecedorCliente SET fornecedor_codigo=" + this.fornecedor_codigo + ", cliente_codigo=" + this.cliente_codigo + "";
  };
  this.Drop = function ()
  {
    return "DROP TABLE FornecedorCliente";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TFornecedorPrazo = window.TFornecedorPrazo || {};
window.TFornecedorPrazo = function ()
{
  this.fornecedor_codigo = 0;
  this.prazo_codigo = 0;
  this.desconto = 0;

  this.Struct = function ()
  {
    return {
      'table': 'FornecedorPrazo',
      'fields': [
        {'name': 'fornecedor_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'prazo_codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'desconto', 'type': 'REAL', 'size': 0, 'default': 0, 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO FornecedorPrazo(fornecedor_codigo, prazo_codigo, desconto) VALUES(" +  this.fornecedor_codigo + ", " +  this.prazo_codigo + ", " + "'" + this.desconto + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE FornecedorPrazo SET fornecedor_codigo=" + this.fornecedor_codigo + ", prazo_codigo=" + this.prazo_codigo + ", desconto='" + this.desconto + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE FornecedorPrazo";
  };
  return this;
};
/* #################################################################################### */

/* #################################################################################### */
window.TCidade = window.TCidade || {};
window.TCidade = function ()
{
  this.codigo = 0;
  this.nome = window.StringEmpty;
  this.estado = window.StringEmpty;

  this.Struct = function ()
  {
    return {
      'table': 'Cidade',
      'fields': [
        {'name': 'codigo', 'type': 'INTEGER', 'size': 0, 'default': 0, 'key': false},
        {'name': 'nome', 'type': 'TEXT', 'size': 30, 'default': '', 'key': false},
        {'name': 'estado', 'type': 'TEXT', 'size': 2, 'default': '', 'key': false}
      ]
    };
  };
  this.Insert = function ()
  {
    return "INSERT INTO Cidade(codigo, nome, estado) VALUES(" +  this.codigo + ", " + "'" + this.nome + "'" + ", " + "'" + this.estado + "'" + ")";
  };
  this.Update = function ()
  {
    return "UPDATE Cidade SET codigo=" + this.codigo + ", nome='" + this.nome + "', estado='" + this.estado + "'";
  };
  this.Drop = function ()
  {
    return "DROP TABLE Cidade";
  };
  return this;
};
/* #################################################################################### */
