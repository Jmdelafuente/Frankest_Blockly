// Generamos los bloques gráficos de Frankest y los agregamos a Blockly
Blockly.defineBlocksWithJsonArray([
  {
    type: "adelante",
    message0: "Adelante a velocidad %1 durante %2 segundos",
    args0: [
      {
        type: "input_value",
        name: "velocidad",
        check: "Number",
        value: 0.5,
        min: 0.1,
        max: 1,
        precision: 0.6,
      },
      {
        type: "input_value",
        name: "tiempo",
        check: "Number",
        value: 1,
        min: 1,
        max: 20,
        precision: 1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Avanzar durante una cantidad de segundos",
    helpUrl: "",
  },
  {
    type: "verfoto",
    message0: "Ver foto",
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Tomar una foto y visualizarla",
    helpUrl: "",
  },
  {
    type: "inicializar_programa",
    message0: "MODULO %1 CREADO POR %2 %3 UTILIZANDO %4 %5",
    args0: [
      {
        type: "field_input",
        name: "nombre_programa",
        text: "nombre del Modulo",
      },
      {
        type: "field_input",
        name: "nombre_autor",
        text: "creadores",
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_dropdown",
        name: "robot",
        options: [
          ["Simulador", "robofaiSimulador"],
          ["Robot rojo", "robofaiRojo"],
          ["Robot azul", "robofaiAzul"],
          ["Robot blanco", "robofaiBlanco"],
          ["Robot negro", "robofaiNegro"],
        ],
      },
      {
        type: "input_statement",
        name: "programa_frankest",
        check: "inicializar_robot",
      },
    ],
    colour: 60,
    tooltip: "Comenzar a utilizar a Frankestito",
    helpUrl: "",
  },
  {
    type: "atras",
    message0: "Atras a velocidad %1 durante %2 segundos",
    args0: [
      {
        type: "input_value",
        name: "velocidad",
        check: "Number",
        value: 0.5,
        min: 0.1,
        max: 1,
        precision: 0.6,
      },
      {
        type: "input_value",
        name: "tiempo",
        value: 1,
        min: 1,
        max: 20,
        precision: 1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Retroceder una cantidad de segundos",
    helpUrl: "",
  },
  {
    type: "izquierda",
    message0: "Izquierda a velocidad %1 durante %2 segundos",
    args0: [
      {
        type: "input_value",
        name: "velocidad",
        check: "Number",
        value: 0.5,
        min: 0.1,
        max: 1,
        precision: 0.6,
      },
      {
        type: "input_value",
        name: "tiempo",
        check: "Number",
        value: 1,
        min: 1,
        max: 20,
        precision: 1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Girar hacia la izquierda una cantidad de segundos",
    helpUrl: "",
  },
  {
    type: "derecha",
    message0: "Derecha a velocidad %1 durante %2 segundos",
    args0: [
      {
        type: "input_value",
        name: "velocidad",
        check: "Number",
        value: 0.5,
        min: 0.1,
        max: 1,
        precision: 0.6,
      },
      {
        type: "input_value",
        name: "tiempo",
        check: "Number",
        value: 1,
        min: 1,
        max: 20,
        precision: 1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Girar hacia la derecha una cantidad de segundos",
    helpUrl: "",
  },
  {
    type: "buscarcolor",
    message0: "donde veo el color %1",
    args0: [
      {
        type: "input_value",
        name: "color",
        check: "COLOR",
      },
    ],
    inputsInline: true,
    output: "Number",
    colour: 160,
    tooltip: "Posición de un color en la imagen (valor entre 0° y 180°)",
    helpUrl: "",
  },
  {
    type: "color",
    message0: "%1",
    args0: [
      {
        type: "field_dropdown",
        name: "COLOR",
        options: [
          ["Rojo", "ROJO"],
          ["Azul", "AZUL"],
          ["Verde", "VERDE"],
          ["Blanco", "BLANCO"],
          ["Negro", "NEGRO"],
        ],
      },
    ],
    output: "COLOR",
    colour: 165,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "cuantocolor",
    lastDummyAlign0: "CENTRE",
    message0: "cuanto color %1 veo",
    args0: [
      {
        type: "input_value",
        name: "color",
        check: "COLOR",
      },
    ],
    inputsInline: true,
    output: "Number",
    colour: 160,
    tooltip: "Cantidad de un color en la imagen",
    helpUrl: "",
  },
  {
    type: "beep",
    message0: "Beep",
    colour: 290,
    tooltip: "Emite un sonido (beep)",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "led_izquierdo",
    message0: "Led izquierdo",
    colour: 290,
    tooltip: "Enciende la luz izquierda momentaneamente",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "led_derecho",
    message0: "Led derecho",
    colour: 290,
    tooltip: "Enciende la luz derecha momentaneamente",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
]);

// Generamos la funcionalidad de cada bloque para Frankest
// Para ello se anexa al generador de Python de blockly
// las instrucciones propias de Frankest

// Constantes temporales
var velocidad = "0.6";
var robot = "SIMULADOR";

Blockly.Python["inicializar_programa"] = function (block) {
  let text_nombre_programa = block
    .getFieldValue("nombre_programa")
    .replace(/\W/g, "_");
    // .replace(/ /g, "_");
  let text_nombre_autor = block.getFieldValue("nombre_autor");
  let dropdown_robot = block.getFieldValue("robot");
  console.log(block);
  // Get all robots' name
  let nombres_robot = block.getField("robot");
  let is_valid = false;
  // Check if exists
  nombres_robot.menuGenerator_.forEach(([key, value]) => {
    if(dropdown_robot == value){
      is_valid = true;
    }
  });
  // If not, get first available
  if(!is_valid){
    dropdown_robot = nombres_robot.menuGenerator_[0][1];
  }

  // Prevent highlight for this special block
  Code.SPECIAL_BLOCKS.add(block.id);
  var statements_name = Blockly.Python.statementToCode(block, "programa_frankest");
  // Docstring + main generation with import
  var code = `"""Módulo realizado en FrankLab\n\nNombre del Módulo: ${text_nombre_programa}\nCreado por: ${text_nombre_autor}\n"""\n\n`;
  code += `def ${text_nombre_programa}():\n`;
  code += `  # Cargamos la librería del robot\n  from ${dropdown_robot} import *\n  init()\n\n`;
  code += `  # Código del programa \n`;
  code += statements_name + "\n";
  code += `${text_nombre_programa}() \n\n`;
  return code;
};

Blockly.Python["inicializar_frankestito"] = function (block) {
  let dropdown_robot = block.getFieldValue("robot");

  var code = `# Cargamos la libreria del robot ${dropdown_robot}\nfrom ${dropdown_robot} import *\n`;
  return code;
};

Blockly.Python["adelante"] = function (block) {
  // let number_velocidad = block.getFieldValue("velocidad");
  let number_velocidad = Blockly.Python.valueToCode(
    block,
    "velocidad",
    Blockly.Python.ORDER_ATOMIC
  );
  let number_tiempo = Blockly.Python.valueToCode(
    block,
    "tiempo",
    Blockly.Python.ORDER_ATOMIC
  );

  var code = `adelante(${number_velocidad},${number_tiempo})\n`;
  return code;
};

Blockly.Python["derecha"] = function (block) {
  let number_velocidad = Blockly.Python.valueToCode(
    block,
    "velocidad",
    Blockly.Python.ORDER_ATOMIC
  );
  let number_tiempo = Blockly.Python.valueToCode(
    block,
    "tiempo",
    Blockly.Python.ORDER_ATOMIC
  );

  var code = `derecha(${number_velocidad},${number_tiempo})\n`;
  return code;
};

Blockly.Python["izquierda"] = function (block) {
  let number_velocidad = Blockly.Python.valueToCode(
    block,
    "velocidad",
    Blockly.Python.ORDER_ATOMIC
  );
  let number_tiempo = Blockly.Python.valueToCode(
    block,
    "tiempo",
    Blockly.Python.ORDER_ATOMIC
  );

  var code = `izquierda(${number_velocidad},${number_tiempo})\n`;
  return code;
};

Blockly.Python["verfoto"] = function (block) {
  var code = "verfoto()\n";
  return code;
};

Blockly.Python["atras"] = function (block) {
  let number_velocidad = Blockly.Python.valueToCode(
    block,
    "velocidad",
    Blockly.Python.ORDER_ATOMIC
  );
  let number_tiempo = Blockly.Python.valueToCode(
    block,
    "tiempo",
    Blockly.Python.ORDER_ATOMIC
  );

  var code = `atras(${number_velocidad},${number_tiempo})\n`;
  return code;
};

Blockly.Python["buscarcolor"] = function (block) {
  var value_name = Blockly.Python.valueToCode(
    block,
    "color",
    Blockly.Python.ORDER_ATOMIC
  );
  var code = `buscarcolor(${value_name})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["cuantocolor"] = function (block) {
  var value_name = Blockly.Python.valueToCode(
    block,
    "color",
    Blockly.Python.ORDER_ATOMIC
  );

  var code = `cuantocolor(${value_name})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["color"] = function (block) {
  var dropdown_color = block.getFieldValue("COLOR");
  // TODO: Assemble Python into code variable.
  var code = `"${dropdown_color}"`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["beep"] = function (block) {
  var code = "beep()\n";
  return code;
};

Blockly.Python["led_izquierdo"] = function (block) {
  var code = "luz_izq_on()\nwait(.5)\nluz_izq_off()\n";
  return code;
};

Blockly.Python["led_derecho"] = function (block) {
  var code = "luz_der_on()\nwait(.5)\nluz_der_off()\n";
  return code;
};