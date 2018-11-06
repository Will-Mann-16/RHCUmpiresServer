var mysql = require('mysql');
var {DB_HOST, DB_USER, DB_PASS, DB_DBNAME} = require('./config');


class Database {
    constructor(host, user, password, database){
        this.conn = mysql.createConnection({host, user, password, database});
        this.conn.connect();
    }
    query(query, values=[]){
        return new Promise((resolve, reject) => {
            if(values.length > 0){
                this.conn.query(query, values, (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } else {
                this.conn.query(query, (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    }
    create(table='', values={}, options={returnRow: false, columns: '*', idSelector: 'ID'}){
        return new Promise((resolve, reject) => {
            var colNames = [];
            var colValues = [];
            Object.entries(values).forEach((key, value) => {
                colNames.push(key);
                colValues.push(value);
            });
            var query = `INSERT INTO ${table} (${colNames.join(',')}) VALUES ?`;
            this.query(query, colValues).then(response => {
                if (options.returnRow) {
                    query = `SELECT ${options.columns} FROM ${table} WHERE ${options.idSelector}=${response.insertId} LIMIT 1`;
                    this.query(query).then(response => resolve(response[0])).catch(err => reject(err));
                } else {
                    resolve(response.insertId);
                }
            }).catch(err => reject(err));
        });
    }
    read(table='', options={columns: '*', limit: 0, condition: '', orderBy: ''}){
        return new Promise((resolve, reject) => {
            var query = `SELECT ${options.columns} FROM ${table}`;
            if(options.condition !== ''){
                query += ` WHERE ${options.condition}`;
            }
            if(options.orderBy !== ''){
                query += ` ORDER BY ${options.orderBy}`;
            }
            if(options.limit > 0){
                query += ` LIMIT ${options.limit}`;
            }
            this.query(query).then(response => {
                if(options.limit === 1){
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
    update(table='', values={}, options={returnRow: false, columns: '*', idSelector: 'ID', id: -1, whereClause: ''}){
        return new Promise(((resolve, reject) => {
            var set = Object.entries(values).map((key, value) => {
               return `${key}=${value}`;
            });
            var query = `UPDATE ${table} SET ${set.join(',')} WHERE ${options.whereClause !== '' ? options.whereClause : `${options.idSelector}=${options.id}`}`;
            this.query(query, colValues).then(response => {
                if (options.returnRow){
                    query = `SELECT ${options.columns} FROM ${table} WHERE ${options.idSelector}=${response.insertId} LIMIT 1`;
                    this.query(query).then(response => resolve(response[0])).catch(err => reject(err));
                } else {
                    resolve(response.insertId);
                }
            }).catch(err => reject(err));
        }));
    }
    delete(table, options={whereClause: '', idSelector: 'ID', id: -1}){
        return new Promise((resolve, reject) => {
            var query = `DELETE FROM ${table} WHERE ${options.whereClause !== '' ? options.whereClause : `${options.idSelector}=${options.id}`}`;
            this.query(query).then(response => resolve(response.affectedRows)).catch(err => reject(err));
        });
    }
}

module.exports = new Database(DB_HOST, DB_USER, DB_PASS, DB_DBNAME);