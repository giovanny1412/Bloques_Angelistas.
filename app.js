// --- 1. Definición de Bloques Personalizados ---

// Bloque Base: Setup y Loop
Blockly.Blocks['arduino_base'] = {
  init: function() {
    this.appendDummyInput().appendField("⚙️ CONFIGURACIÓN (Setup)");
    this.appendStatementInput("SETUP").setCheck(null);
    this.appendDummyInput().appendField("🔄 BUCLE PRINCIPAL (Loop)");
    this.appendStatementInput("LOOP").setCheck(null);
    this.setColour(290);
    this.setTooltip("Estructura principal de Arduino");
    this.setHelpUrl("");
  }
};

// Bloque: Mover Carro
Blockly.Blocks['mover_carro'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Mover carro")
        .appendField(new Blockly.FieldDropdown([
            ["adelante", "FORWARD"], 
            ["atrás", "BACKWARD"], 
            ["derecha", "RIGHT"], 
            ["izquierda", "LEFT"],
            ["detener", "STOP"]
        ]), "DIRECCION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

// --- 2. Generadores de Código (Traducción a C++) ---

Blockly.JavaScript['arduino_base'] = function(block) {
  var setup = Blockly.JavaScript.statementToCode(block, 'SETUP');
  var loop = Blockly.JavaScript.statementToCode(block, 'LOOP');
  return `void setup() {\n  Serial.begin(115200);\n${setup}}\n\nvoid loop() {\n${loop}}\n`;
};

Blockly.JavaScript['mover_carro'] = function(block) {
  var dropdown_direccion = block.getFieldValue('DIRECCION');
  return `enviarComando("${dropdown_direccion}");\n  delay(500);\n`;
};

// --- 3. Inicialización de Blockly ---

var workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
  scrollbars: true
});

function generarCodigo() {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('codigoGenerado').innerText = code;
  return code;
}

// --- 4. Conexión Web Serial (USB) ---

let port;
let writer;

async function conectarESP32() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    
    const encoder = new TextEncoderStream();
    outputDone = encoder.readable.pipeTo(port.writable);
    writer = encoder.writable.getWriter();
    
    alert("✅ ESP32 Conectado");
  } catch (error) {
    console.error(error);
    alert("❌ Error al conectar: " + error);
  }
}
