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