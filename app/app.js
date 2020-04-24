const express = require('express')
const ejs = require('ejs')
const bodyParser = require("body-parser")
const app = express()

/*DB接続用*/
const hostname = 'localhost';
const port = 3000;
const backlog = 500;
const pg = require('pg');
const dbConnectStr = process.env.dbConnectStr;

app.use(express.static('public'));
app.set('ejs',ejs.renderFile)
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render("./index.ejs",
        {
            nm_searchtext: '',data:null
        });
});

app.post("/", (req, res) => {
    const client = new pg.Client("tcp://postgres:postgres@localhost:5432/postgres");
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);

        }else{
            var searchtext = req.body.nm_searchtext;
            var name_search_sql = req.body.name_search_sql;
            var scale_search_sql = req.body.scale_search_sql;
            var sql_bv = '',sql_pr = '',sql_ja = '',sql_an = '';
            var re_rows = [];
            var sql_col = 'select id,bvfilemst_id,filename,number,bvspec,bvproperspec,bvjasspec,analysis,devtype,devscale,biztranstype,biztransscale,opepolicy,opetype,pageinfo,pageno from show_all ';
            var sql_end = ' order by filename OFFSET 0 LIMIT 500;';
            var sql = '';
            if (searchtext == null || searchtext==''){
                sql = sql_col + sql_end;
            }else{
                var sql_where = ' where '; 
                if (name_search_sql.length > 0){
                    sql = sql_col + sql_where + name_search_sql + sql_end;
                }else if (scale_search_sql.length > 0){
                    sql = sql_col + sql_where + scale_search_sql + sql_end;
                }
                else{
                    if (req.body.nm_needbv === undefined && req.body.nm_needpr === undefined  && req.body.nm_needja === undefined  && req.body.nm_needan === undefined ){
                        sql_bv = "bvspec like '%" + searchtext + "%' or ";
                        sql_pr = "bvproperspec like '%" + searchtext + "%' or ";
                        sql_ja = "bvjasspec like '%" + searchtext + "%' or ";
                        sql_an = "analysis like '%" + searchtext + "%' ";
                        sql = sql_col + sql_where + sql_bv + sql_pr + sql_ja + sql_an + sql_end;
                    }else{
                        if(req.body.nm_needbv  != undefined){
                            sql_bv = "bvspec like '%" + searchtext + "%' or ";
                        }else{sql_bv='';}
                        if(req.body.nm_needpr  != undefined){
                            sql_pr = "bvproperspec like '%" + searchtext + "%' or ";
                        }else{sql_pr='';}
                        if(req.body.nm_needja  != undefined){
                            sql_ja = "bvjasspec like '%" + searchtext + "%' or ";
                        }else{sql_ja='';}
                        if(req.body.nm_needan != undefined){
                            sql_an = "analysis like '%" + searchtext + "%' or ";
                        }else{sql_an='';}
                        var sql_like = sql_bv + sql_pr + sql_ja + sql_an;

                        if (sql_like.length > 0){
                            sql_like = sql_like.substr(0,sql_like.lastIndexOf('or'));
                        }
                        sql = sql_col + sql_where + sql_like + sql_end;
                        //チェックボックスの値設定
                        if(sql_bv.length > 0){sql_bv='checked';}
                        if(sql_pr.length > 0){sql_pr='checked';}
                        if(sql_ja.length > 0){sql_ja='checked';}
                        if(sql_an.length > 0){sql_an='checked';}
                    }
                }
            }
            //console.log("sql=" + sql);//debug
            client.query(sql, function(err, result) {
                if (err) {
                    return console.error('could not connect to postgres(query)', err);
                }else{
                    re_rows=result.rows;
                    //console.log(re_rows);
                    res.render('index.ejs', {
                        c1:sql_bv,c2:sql_pr,c3:sql_ja,c4:sql_an,
                        searchtext:searchtext,
                        data: re_rows
                    });
                }
            });
        }
    });

    /*
    if (err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('select id, name,age,height from member order by id;', function(err, result) {
        if (err) {
            return console.error('could not connect to postgres(query)', err);
        }
    
        res.render('index.ejs', {
            nm_searchtext: 'なんかつかえたかも'
            //nm_searchtext:result.rows.name
        });

    });
    */
   //client.end();
});

app.listen(3000, () => {
    console.log('start')
});