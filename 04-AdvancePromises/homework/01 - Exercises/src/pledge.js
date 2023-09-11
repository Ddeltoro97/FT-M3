'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise{
    constructor(executor){
        if(typeof executor !== "function") throw TypeError("Executor must be a function");
        this._state = "pending";
        this._value = undefined;
        this._handlerGroups = [];

        const resolve = (value) =>{
            this._internalResolve(value);
        }
    
        const reject = (reason) =>{
            this._internalReject(reason);
        }
    
        executor(resolve, reject);
    }

    _internalResolve = (value) =>{
        if (this._state !== "pending") return;
        this._state = "fulfilled";
        this._value = value;
        this._callHandlers(this._value);
    }

    _internalReject = (reason) =>{
        if (this._state !== "pending") return;
        this._state = "rejected";
        this._value = reason;
        this._callHandlers(this._value);
    }

    then = (successCb, errorCb) =>{
        const handlerGroup ={
            successCb: typeof successCb === "function" ? successCb : false,
            errorCb: typeof errorCb === "function" ? errorCb : false
        }
        this._handlerGroups.push(handlerGroup);
        this._state !== "pending" && this._callHandlers(this._value);    
    }

    catch = (errorCb) =>{
        this.then(null, errorCb);
    }

    _callHandlers = (value) =>{
        while (this._handlerGroups.length){
            const currentHandler = this._handlerGroups.shift(); //nos robamos el primer elemento del array

            this._state === "fulfilled" && currentHandler.successCb && currentHandler.successCb(value);
            this._state === "rejected" && currentHandler.errorCb && currentHandler.errorCb(value);
        }
    }

}

// const miPromesa = new Promise((resolve, reject) =>{

// })


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
