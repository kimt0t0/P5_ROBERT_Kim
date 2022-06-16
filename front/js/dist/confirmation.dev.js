"use strict";

(function _callee() {
  var orderNum;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          orderNum = document.getElementById("orderId");
          orderNum.textContent = new URL(location.href).searchParams.get("orderId");

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
})();
//# sourceMappingURL=confirmation.dev.js.map
