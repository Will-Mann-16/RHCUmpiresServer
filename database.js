var mysql = require('mysql');
var {DB_HOST, DB_USER, DB_PASS, DB_DBNAME} = require('./config');



class Database {
    constructor(host, user, password, database){
        this.conn = mysql.createConnection({host, user, password, database});
    }
    query(query, values=[]){
        return new Promise((resolve, reject) => {
            if(values.length > 0){
                this.conn.query(query, [values], (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)));
                    }
                });
            } else {
                this.conn.query(query, (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)));
                    }
                });
            }
        });
    }
    create(table='', values={}, {returnRow=false, columns='*', idSelector='ID'}){
        return new Promise((resolve, reject) => {
            var colNames = [];
            var colValues = [];
            Object.entries(values).forEach((value) => {
                colNames.push(value[0]);
                colValues.push(`'${value[1]}'`);
            });
            var query = `INSERT INTO ${table} (${colNames.join(',')}) VALUES (${colValues.join(',')})`;
            this.query(query).then(response => {
                if (returnRow) {
                    query = `SELECT ${columns} FROM ${table} WHERE ${idSelector}=${response.insertId} LIMIT 1`;
                    this.query(query).then(response => resolve(response[0])).catch(err => reject(err));
                } else {
                    resolve(response.insertId);
                }
            }).catch(err => reject(err));
        });
    }
    read(table='', {columns='*', limit=0, condition='', orderBy=''}){
        return new Promise((resolve, reject) => {
            var query = `SELECT ${columns} FROM ${table}`;
            if(condition !== ''){
                query += ` WHERE ${condition}`;
            }
            if(orderBy !== ''){
                query += ` ORDER BY ${orderBy}`;
            }
            if(limit > 0){
                query += ` LIMIT ${limit}`;
            }
            this.query(query).then(response => {
                if(limit === 1){
                    if(response.length > 0){
                        resolve(response[0]);
                    } else {
                        resolve({});
                    }
                }
                else {
                    resolve(response);
                }
            }).catch(err => reject(err));
        });
    }
    update(table='', values={}, {returnRow=false, columns='*', idSelector='ID', id=-1, whereClause=''}){
        return new Promise(((resolve, reject) => {
            var set = Object.entries(values).map((key, value) => {
               return `${key}=${value}`;
            });
            var query = `UPDATE ${table} SET ${set.join(',')} WHERE ${whereClause !== '' ? whereClause : `${idSelector}=${id}`}`;
            this.query(query, colValues).then(response => {
                if (returnRow){
                    query = `SELECT ${columns} FROM ${table} WHERE ${idSelector}=${response.insertId} LIMIT 1`;
                    this.query(query).then(response => resolve(response[0])).catch(err => reject(err));
                } else {
                    resolve(response.insertId);
                }
            }).catch(err => reject(err));
        }));
    }
    delete(table, {whereClause='', idSelector='ID', id=-1}){
        return new Promise((resolve, reject) => {
            var query = `DELETE FROM ${table} WHERE ${whereClause !== '' ? whereClause : `${idSelector}=${id}`}`;
            this.query(query).then(response => resolve(response.affectedRows)).catch(err => reject(err));
        });
    }
}

module.exports = new Database(DB_HOST, DB_USER, DB_PASS, DB_DBNAME);