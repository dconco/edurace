class Calculator {
    constructor (calc, calc_res) {
        this.calc = calc;
        this.calc_res = calc_res;
        this.values = "";
    }
    
    vibrate(num) {
        // To check that is vibration API supported
        if (navigator.vibrate) {
            window.navigator.vibrate(num);
        }
    }

    add_value(args) {
        this.values = args;
        this.calc.value += this.values;
        
        this.simpleEval();
    }
    
    del() {
        let val = this.calc.value;
        let res = val.slice(0, val.length-1);
        this.calc.value = res;
        
        if (val === "" && this.calc.placeholder !== "0") {
            this.calc.placeholder = 0;
            this.vibrate(200);
        } else {
            this.calc.placeholder = "";
        }
    }
    
    Eval() {
        var inputWrite = this.calc;
        var inputRes = this.calc_res;
        
        try {
            //"use strict";
            
            let newRes = inputWrite.value.toString();
            while (newRes[0] === '0') {
                newRes = newRes.substr(1, newRes.length);
            }
            
            let res = newRes;
            // match times 
            if (inputWrite.value.match("×")) {
                res = res.replaceAll("×", "*");
            }
            // match divide 
            if (inputWrite.value.match("÷")) {
                res = res.replaceAll("÷", "/")
            }
            // match power 
            if (inputWrite.value.match("^")) {
                res = res.replaceAll("^", "**")
            }
            // match power 2 
            if (inputWrite.value.match("²")) {
                res = res.replaceAll("²", "**2")
            }
            // match cos 
            while ((let match = (/cos/g).exec(res)) != null) {
                console.log("match found at " + match.index);
            }
            
            inputRes.value = eval(res) == undefined 
                ? "0" 
                : eval(res);
        }
        catch (e) {
            console.error(e);
            
            let msg = "";
            if (e.message == "Invalid or unexpected token") {
                msg = "Syntax Error";
            } 
            else if (e.message = "Invalid left-hand side expression in postfix operation") {
                msg = "Math Error";
            } else {
                msg = "Unexpected Error"
            }
            
            inputRes.value = msg;
        }
    }
    
    simpleEval() {
        var inputWrite = this.calc;
        var inputRes = this.calc_res;
    
        try {
            "use strict";
            
            let newRes = inputWrite.value.toString();
            while (newRes[0] === '0') {
                newRes = newRes.substr(1, newRes.length);
            }
            
            let res = newRes;
            if (inputWrite.value.match("×")) {
                res = res.replaceAll("×", "*");
            }
            if (inputWrite.value.match("÷")) {
                res = res.replaceAll("÷", "/")
            }
            if (inputWrite.value.match("^")) {
                res = res.replaceAll("^", "**")
            }
            if (inputWrite.value.match("²")) {
                res = res.replaceAll("²", "**2")
            }
            
            inputRes.value = eval(res) == undefined 
                ? "0" 
                : eval(res);
                
            return true;
        } catch (e) {}
    }
}
