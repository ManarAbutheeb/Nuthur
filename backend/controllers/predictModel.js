const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

async function runModelPrediction(inputData) {
  return new Promise((resolve, reject) => {
    const pythonPath = path.join(__dirname, "../ml/venv/Scripts/python.exe");
    const scriptPath = path.join(__dirname, "../ml/predict.py");
    const tempPath = path.join(__dirname, "../ml/temp_input.json");


    fs.writeFileSync(tempPath, JSON.stringify(inputData));

    const python = spawn(pythonPath, [scriptPath, tempPath], {
      cwd: path.join(__dirname, "../ml"),
    });

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error(" Python Error:", data.toString());
      errorOutput += data.toString();
    });

    python.on("close", (code) => {
      fs.unlinkSync(tempPath); // نحذف الملف المؤقت
      if (code !== 0) {
        console.error("Python error:", errorOutput);
        return reject(new Error(`Python script exited with code ${code}`));
      }

      console.log(" RAW PYTHON OUTPUT:", output);

      try {
        const parsed = JSON.parse(output.trim());
        resolve(parsed);
      } catch (err) {
        console.error(" Failed to parse model output:", output);
        reject(new Error("Failed to parse model output: " + output));
      }
    });
  });
}

module.exports = { runModelPrediction };
