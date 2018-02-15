/* #################################################################################### */
window.dao = window.dao || {};
/* #################################################################################### */
dao.Version = 0;
dao.DbName = "dbmain";
dao.DbVersion = "2";
dao.Conn = null;
dao.Message = "";
dao.Open = function(p_callback)
{
  this.Message = window.StringEmpty;
  try {
    this.Conn = openDatabase(this.DbName, this.DbVersion, window.StringEmpty,  5 * 1024 * 1024);
    p_callback();
  } catch (ex) { this.Conn = null; this.Message = ex.message; }
};

dao.TableAdd = function(p_table)
{
  try {
    this.Message = window.StringEmpty;
    this.Conn.transaction(function (tx)
                          {
      var v_sql = dao.StructTableSql(p_table);
      tx.executeSql(v_sql, [],
                    function (transaction, resultSet) {},
                    function(transaction, error) { Mensagem("Dao/TableAdd error: " + error.message); });
    });
  } catch (ex) { this.Message = ex.message; }
};

dao.StructTableSql = function(p_struct)
{
  var v_ret = "CREATE TABLE IF NOT EXISTS " + p_struct["table"] + " ( ";
  $.each(p_struct["fields"], function(j, field) {
    var fName = field["name"];
    var fType = field["type"].toUpperCase();
    if(fType!="INTEGER" && fType!="FLOAT" && fType!="REAL" && fType!="NUMBER") {
      fType += "("+field["size"]+")";
    }
    if(fType=="INTEGER" && field["key"]==true) {
      var fKey = "PRIMARY KEY AUTOINCREMENT";
    }
    else {
      var fKey = "";
    }
    var fDefault = field["default"];
    if(fDefault!=null) {
      if(fType!="INTEGER" && fType!="FLOAT" && fType!="REAL" && fType!="NUMBER") {
        fDefault = "'" + fDefault + "'";
      }
      fDefault = "DEFAULT " + fDefault;
    }
    else
    {
      fDefault = "";
    }
    v_ret += fName + " " + fType;
    if(fDefault.length > 0) v_ret += " " + fDefault;
    if(fKey.length > 0) v_ret += " " + fKey;
    if(j < p_struct["fields"].length - 1) {
      v_ret += ", ";
    }
  });
  v_ret += " );";
  return v_ret;
};
  
dao.Table = "";
dao.Fields = "";
dao.Filter = "";
dao.OrderBy = "";

dao.Run = function(p_callback)
{
  var v_sql = this.MountSql();
  try {
    this.Message = window.StringEmpty;
    this.Conn.transaction(function (tx) {
      tx.executeSql(v_sql, [], function (transaction, resultSet) {
        p_callback(resultSet.rows); // SQLResultSetRowList
      }, function(transaction, error) { Mensagem("Dao/executeSql erro: " + error.message) });
    });
  } catch (ex) { this.Message = ex.message; Mensagem("Dao/Run erro: " + ex.message); }
};

dao.RunSql = function(p_sql, p_callback)
{
  try {
    this.Message = window.StringEmpty;
    this.Conn.transaction(function (tx) {
      tx.executeSql(p_sql, [], function (transaction, resultSet) {
        p_callback(resultSet.rows); // SQLResultSetRowList
      }, function(transaction, error) { Mensagem("Dao/executeSql erro: " + error.message) });
    });
  } catch (ex) { this.Message = ex.message; Mensagem("Dao/Run erro: " + ex.message); }
};

dao.ExecSql = function(p_sql, p_callback)
{
  try {
    this.Message = window.StringEmpty;
    this.ClearSql();
    this.Conn.transaction(function (tx) {
      tx.executeSql(p_sql, [],
                    function(transaction, resultSet) {
                      p_callback(resultSet.rowsAffected, true, "");
                    },
                    function(transaction, error) {
                      p_callback(-1, false, error.message);
                    }
                            );
    });
  } catch (ex) { this.Message = ex.message; Mensagem("Dao/RunSql error: " + error.message); }
};

dao.WhileRead = function(p_callback)
{
  var v_length = this.Rows.length;
  for (i = 0; i < v_length; i++)
    p_callback(this.Rows.item(i));
};

dao.MountSql = function()
{
  var v_ret = "SELECT " + this.Fields + " FROM " + this.Table;
  if (this.Filter.length > 0)
    v_ret += " WHERE " + this.Filter;
  if (this.OrderBy.length > 0)
    v_ret += " ORDER BY " + this.OrderBy;
  this.ClearSql();
  return v_ret;
};

dao.ClearSql = function()
{
  this.Table = window.StringEmpty;
  this.Fields = window.StringEmpty;
  this.Filter = window.StringEmpty;
  this.OrderBy = window.StringEmpty;
};
/* #################################################################################### */