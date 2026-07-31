// =====================================================================
// PYTHON-WORKER.JS - Web Worker để chạy Pyodide an toàn
// =====================================================================

importScripts('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js');

let pyodideReadyPromise;
let pyodide;

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide();
  // Có thể tải thêm packages nếu cần
}

pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  const { id, code, inputStr } = event.data;
  if (!id) return;

  try {
    await pyodideReadyPromise;

    let outputStr = '';
    let errorStr = '';

    // Ghi đè stdout / stderr
    pyodide.setStdout({
      batched: (msg) => { outputStr += msg + '\n'; }
    });
    pyodide.setStderr({
      batched: (msg) => { errorStr += msg + '\n'; }
    });

    let inputLines = inputStr ? inputStr.split('\n') : [];
    
    pyodide.globals.set('_mock_inputs', pyodide.toPy(inputLines));
    pyodide.globals.set('_mock_input_idx', 0);

    const setupCode = `
import builtins

if not hasattr(builtins, '__original_input__'):
    builtins.__original_input__ = builtins.input

def mock_input(prompt=""):
    print(prompt, end="")
    global _mock_input_idx, _mock_inputs
    if _mock_input_idx < len(_mock_inputs):
        val = _mock_inputs[_mock_input_idx]
        _mock_input_idx += 1
        print(val)
        return val
    else:
        raise EOFError("EOF when reading a line")

builtins.input = mock_input
`;
    await pyodide.runPythonAsync(setupCode);

    // Chạy code người dùng
    await pyodide.runPythonAsync(code);

    // Khôi phục
    const teardownCode = `
import builtins
builtins.input = builtins.__original_input__
`;
    await pyodide.runPythonAsync(teardownCode);

    self.postMessage({ id, success: true, output: outputStr, error: errorStr });
  } catch (err) {
    // Khôi phục nếu crash ở user code
    try {
      if (pyodide) {
        await pyodide.runPythonAsync(`
import builtins
if hasattr(builtins, '__original_input__'):
    builtins.input = builtins.__original_input__
        `);
      }
    } catch(e) {}
    
    self.postMessage({ id, success: false, error: err.message });
  }
};
