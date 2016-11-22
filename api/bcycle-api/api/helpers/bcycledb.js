/**
 * Created by tst on 11/12/16.
 */

var connection = require('./connection');

function getAllStationsInRegion(params, callback) {

    try {

        connection.acquire(function(err, con) {
            var sql = "SELECT * FROM station WHERE Latitude BETWEEN ? AND ? AND Longitude BETWEEN ? AND ?";
            con.query(sql, params, function(err, rows) {
                con.release();
                if(err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    callback(null, rows);
                }
            });
        });
    }
    catch(e) {
        console.log('Exception caught: %j',e);
        callback(e, null);
    }
}

function getAllStations(callback) {

    try {

        connection.acquire(function(err, con) {
            con.query("SELECT * FROM station", function (err, rows) {
                con.release();
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    callback(null, rows);
                }
            });
        });
    }
    catch(e) {
        console.log('Exception caught: %j',e);
        callback(e, null);
    }
}

function getStation(id, callback) {

    try {
        connection.acquire(function(err, con) {
            var sql = "SELECT * FROM station WHERE id = ?"
            var params = [];
            params.push(id);
            con.query(sql, params, function(err, rows) {
                con.release();
                if(err) {
                    console.log(err);
                    callback(err,null);
                }
                else {
                    callback(err,rows);
                }
            });
        });
    }
    catch(e) {
        console.log('Exception caught: %j',e);
        callback(e, null);
    }
}

function createStation(station, callback) {

    try {
        connection.acquire(function(err, con) {
            var sql = "INSERT INTO station SET ?";
            con.query(sql, station, function(err, rows) {
                con.release();
                if(err) {
                    callback(err, null);
                }
                else  {
                    callback(err, rows);
                }
            });
        });
    }
    catch(e) {
        console.log('Exception caught: %j', e);
        callback(e, null);
    }
}

function removeStation(id, callback) {
     try {
        connection.acquire(function(err, con) {
            var sql = "DELETE FROM station WHERE id = ?"
            var params = [];
            params.push(id);
            con.query(sql, params, function(err, rows) {
                con.release();
                if(err) {
                    console.log(err);
                    callback(err,null);
                }
                else {
                    callback(err,rows);
                }
            });
        });
    }
    catch(e) {
        console.log('Exception caught: %j',e);
        callback(e, null);
    }
}

module.exports = {
    getAllStationsInRegion: getAllStationsInRegion,
    getAllStations: getAllStations,
    getStation: getStation,
    createStation: createStation,
    removeStation: removeStation
};
