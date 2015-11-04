(function() {
  var log = function(text) {
    console.log(text);
    document.getElementById("output").textContent += text + "\n";
  };

  var step = 1;

  var allocateBiggestPossible = function(upper) {
    for (var currentBits = upper; currentBits >= 24; currentBits -= step) {
      localStorage.setItem("trying", currentBits);
      console.log("trying " + currentBits);
      var size = Math.ceil(Math.pow(2, currentBits));
      var ok = false;
      try {
        var a = new ArrayBuffer(size);
	var v = new Uint8Array(a);
	ok = a.byteLength == size;
      } catch (e) {
      }
      localStorage.removeItem("trying");
      if (ok) {
	return currentBits;
      }
    }
    return currentBits;
  };

  window.onload = function() {
    console.log("starting test...");
    document.getElementById("clear").onclick = function() {
      localStorage.clear();
    };

    var upper = localStorage.getItem("upper_limit");
    if (!upper) {
      upper = 33;
    }
    var trying = localStorage.getItem("trying");
    if (trying) {
      log("perviously crashed at: " + trying);
      upper = trying - step;    
      localStorage.removeItem("trying");
    }
    localStorage.setItem("upper_limit", upper);


    var biggest = allocateBiggestPossible(upper);
    log("Allocated 2^" + biggest + " bytes. ");

    var best = localStorage.getItem("best");
    if (biggest > best) {
      best = biggest;
      localStorage.setItem("best", best);
    }
    log("Best is 2^" + best + " bytes. ");
  };
})();