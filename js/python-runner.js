// =====================================================================
// PYTHON-RUNNER.JS - Main thread controller cho Web Worker
// Hỗ trợ chạy trực tiếp từ file:// (bằng Blob)
// =====================================================================

const pythonWorkerSource = `
importScripts('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js');

let pyodideReadyPromise;
let pyodide;

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide();
}

pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  const { id, code, inputStr } = event.data;
  if (!id) return;

  try {
    await pyodideReadyPromise;

    let outputStr = '';
    let errorStr = '';

    pyodide.setStdout({
      batched: (msg) => { outputStr += msg + '\\n'; }
    });
    pyodide.setStderr({
      batched: (msg) => { errorStr += msg + '\\n'; }
    });

    let inputLines = inputStr ? inputStr.split('\\n') : [];
    
    pyodide.globals.set('_mock_inputs', pyodide.toPy(inputLines));
    pyodide.globals.set('_mock_input_idx', 0);

    const setupCode = \`
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
\`;
    await pyodide.runPythonAsync(setupCode);

    // Chạy code người dùng
    await pyodide.runPythonAsync(code);

    // Khôi phục
    const teardownCode = \`
import builtins
builtins.input = builtins.__original_input__
\`;
    await pyodide.runPythonAsync(teardownCode);

    self.postMessage({ id, success: true, output: outputStr, error: errorStr });
  } catch (err) {
    // Khôi phục nếu crash ở user code
    try {
      if (pyodide) {
        await pyodide.runPythonAsync(\`
import builtins
if hasattr(builtins, '__original_input__'):
    builtins.input = builtins.__original_input__
        \`);
      }
    } catch(e) {}
    
    self.postMessage({ id, success: false, error: err.message });
  }
};
`;

class PythonRunner {
  constructor() {
    this.worker = null;
    this.pendingResolves = {};
    this.nextId = 1;
    this.timeoutMs = 5000; // Mặc định 5s timeout
    
    // Tạo Blob url để chạy được trên giao thức file://
    const blob = new Blob([pythonWorkerSource], { type: 'application/javascript' });
    this.workerUrl = URL.createObjectURL(blob);

    this.initWorker();
  }

  initWorker() {
    this.worker = new Worker(this.workerUrl);
    this.worker.onmessage = (event) => {
      const { id, success, output, error } = event.data;
      if (this.pendingResolves[id]) {
        clearTimeout(this.pendingResolves[id].timeoutId);
        if (success) {
          this.pendingResolves[id].resolve({ output, error });
        } else {
          this.pendingResolves[id].reject(new Error(error));
        }
        delete this.pendingResolves[id];
      }
    };
  }

  /**
   * Chạy code Python với Web Worker, có timeout.
   */
  async runCode(code, inputStr = '') {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      
      const timeoutId = setTimeout(() => {
        // Hủy worker hiện tại nếu quá thời gian
        this.worker.terminate();
        this.initWorker(); // Khởi tạo lại worker mới
        
        if (this.pendingResolves[id]) {
          this.pendingResolves[id].reject(new Error('Timeout: Mã nguồn chạy quá lâu (vòng lặp vô hạn?)'));
          delete this.pendingResolves[id];
        }
      }, this.timeoutMs);

      this.pendingResolves[id] = { resolve, reject, timeoutId };
      this.worker.postMessage({ id, code, inputStr });
    });
  }
}

// Khởi tạo một singleton instance
window.pythonRunner = new PythonRunner();
