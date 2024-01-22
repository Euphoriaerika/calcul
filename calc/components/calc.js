/* Exception to prevent malicious input */
function BodyaSkazavTrebaException() {
    Bodya_value = document.getElementById('Bodya').value
        .replace('--', '+').replace('++', '+')
        .replace('sin(', 'Math.sin(').replace('cos(', 'Math.cos(').replace('tan(','Math.tan(')
        .replace('sqrt(', 'Math.sqrt(').replace('^', '**').replace('π','Math.PI').replace('e','Math.E');
    
    try {
        Bodya_value = eval(Bodya_value);
        event.preventDefault();

    } catch (e) {
        console.log(`Error: ${e}`);
        alert('input error♡');
        Bodya_value = '';
    }
    finally{
        document.getElementById('Bodya').value = Bodya_value;
    }
}

/* Backspace implementation */
function backSpace() {
    var bsp = document.getElementById('Bodya').value;
    document.getElementById('Bodya').value = bsp.substring(0, bsp.length - 1);
}

/* Display trigonometry side panel */
function showTrigonometry() {
    document.getElementById("sin").style.display = "inline";
    document.getElementById("cos").style.display = "inline";
    document.getElementById("tan").style.display = "inline";
    document.getElementById("ctg").style.display = "inline";
    document.getElementById("sqrt").style.display = "none";
    document.getElementById("^").style.display = "none";
    document.getElementById("pi").style.display = "none";
    document.getElementById("e").style.display = "none";
}

/* Display math side panel */
function showMath() {
    document.getElementById("sqrt").style.display = "inline";
    document.getElementById("^").style.display = "inline";
    document.getElementById("pi").style.display = "inline";
    document.getElementById("e").style.display = "inline";
    document.getElementById("sin").style.display = "none";
    document.getElementById("cos").style.display = "none";
    document.getElementById("tan").style.display = "none";
    document.getElementById("ctg").style.display = "none";
}

function ctg(x) { return 1 / Math.tan(x); }
