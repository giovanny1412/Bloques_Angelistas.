// Archivo: app.js

// 1. Definir la apariencia del bloque
Blockly.Blocks['mover_carro'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Mover carro")
        .appendField(new Blockly.FieldDropdown([
            ["adelante", "FORWARD"], 
            ["atrás", "BACKWARD"], 
            ["derecha", "RIGHT"], 
            ["izquierda", "LEFT"]
        ]), "DIRECCION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Mueve el carro en la dirección seleccionada");
  }
};

// 2. Definir qué código C++ genera este bloque
Blockly.JavaScript['mover_carro'] = function(block) {
  var dropdown_direccion = block.getFieldValue('DIRECCION');
  
  // Aquí escribes el nombre de la función que tendrías en tu ESP32
  var code = `ejecutarMovimiento("${dropdown_direccion}");\n`;
  return code;
};

// 3. Inyectar Blockly en el HTML
var workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox')
});

// 4. Función para ver el resultado
function generarCodigo() {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('codigoGenerado').innerText = code;

}
// Configuramos el generador de JavaScript para que use sintaxis de C++
Blockly.JavaScript['controls_repeat_ext'] = function(block) {
  // Cuántas veces se repite
  var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  
  // Qué bloques hay adentro del bucle
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  
  // Resultado en formato C++ (un simple ciclo for)
  var code = `for (int i = 0; i < ${repeats}; i++) {\n${branch}}\n`;
  return code;
};
// Definición del bloque Estructura Arduino
Blockly.Blocks['arduino_base'] = {
  init: function() {
    this.appendDummyInput().appendField("Configuración (Setup)");
    this.appendStatementInput("SETUP").setCheck(null);
    this.appendDummyInput().appendField("Bucle Principal (Loop)");
    this.appendStatementInput("LOOP").setCheck(null);
    this.setColour(290);
    this.setDeletable(false); // Que no se pueda borrar
  }
};

// Traductor a C++
Blockly.JavaScript['arduino_base'] = function(block) {
  var setup = Blockly.JavaScript.statementToCode(block, 'SETUP');
  var loop = Blockly.JavaScript.statementToCode(block, 'LOOP');
  var code = `void setup() {\n${setup}}\n\nvoid loop() {\n${loop}}\n`;
  return code;
};
