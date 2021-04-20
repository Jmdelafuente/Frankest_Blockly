// Generamos los bloques gráficos de Frankest y los agregamos a Blockly
Blockly.defineBlocksWithJsonArray([
  // {
  //   type: "inicializar_frankestito",
  //   message0: "Utilizar robot %1",
  //   args0: [
  //     {
  //       type: "field_dropdown",
  //       name: "robot",
  //       options: [
  //         ["simulador", "robofai"],
  //         ["rojo", "robofaiRojo"],
  //         ["azul", "robofaiAzul"],
  //         ["blanco", "robofaiBlanco"],
  //         ["negro", "robofaiNegro"],
  //       ],
  //     },
  //   ],
  //   previousStatement: "inicializar_frankestito",
  //   nextStatement: null,
  //   colour: 60,
  //   tooltip: "Elige un robot para ejecutar el programa",
  //   helpUrl: "",
  // },
  {
    type: "adelante",
    message0: "Adelante %1 a velocidad %2 %3 durante %4 segundos",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "velocidad",
        value: 0.5,
        min: 0.1,
        max: 1,
        precision: 0.6,
      },
      {
        type: "input_dummy",
        align: "CENTRE",
      },
      {
        type: "field_number",
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
  // {
  //   type: "inicializar_programa",
  //   message0: "PROGRAMA %1 CREADO POR %2",
  //   args0: [
  //     {
  //       type: "field_input",
  //       name: "nombre_programa",
  //       text: "Nombre del Programa",
  //     },
  //     {
  //       type: "field_input",
  //       name: "nombre_autor",
  //       text: "autores",
  //     },
  //   ],
  //   nextStatement: "robot",
  //   colour: 60,
  //   tooltip: "Comenzar a utilizar a Frankestito",
  //   helpUrl: "",
  // },
  {
    type: "inicializar_programa",
    message0: "PROGRAMA %1 CREADO POR %2 %3 UTILIZANDO %4 %5",
    args0: [
      {
        type: "field_input",
        name: "nombre_programa",
        text: "nombre del Programa",
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
    message0: "Atras %1 a velocidad %2 %3 durante %4 segundos",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "velocidad",
        value: 0.5,
        min: 0.1,
        max: 1,
        precision: 0.6,
      },
      {
        type: "input_dummy",
        align: "CENTRE",
      },
      {
        type: "field_number",
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
    message0: "Izquierda %1 a velocidad %2 %3 durante %4 segundos",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "velocidad",
        value: 0.5,
        min: 0.1,
        max: 1,
        precision: 0.6,
      },
      {
        type: "input_dummy",
        align: "CENTRE",
      },
      {
        type: "field_number",
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
    tooltip: "Girar hacia la izquierda una cantidad de segundos",
    helpUrl: "",
  },
  {
    type: "derecha",
    message0: "Derecha %1 a velocidad %2 %3 durante %4 segundos",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "velocidad",
        value: 0.5,
        min: 0.1,
        max: 1,
        precision: 0.6,
      },
      {
        type: "input_dummy",
        align: "CENTRE",
      },
      {
        type: "field_number",
        name: "tiempo",
        value: 1,
        min: 1,
        max: 20,
        precision: 1,
      },
    ],
    inputsInline: true,
    colour: 230,
    tooltip: "Girar hacia la derecha una cantidad de segundos",
    helpUrl: "",
  },
  {
    type: "buscarcolor",
    message0: "donde veo el color %1",
    args0: [
      {
        type: "field_dropdown",
        name: "buscarcolor",
        options: [
          ["Rojo", "ROJO"],
          ["Azul", "AZUL"],
          ["Verde", "VERDE"],
          ["Blanco", "BLANCO"],
          ["Negro", "NEGRO"],
        ],
      },
    ],
    inputsInline: true,
    output: "Number",
    colour: 160,
    tooltip: "Posición de un color en la imagen (valor entre 0° y 180°)",
    helpUrl: "",
  },
  {
    type: "cuantocolor",
    lastDummyAlign0: "CENTRE",
    message0: "cuanto color %1 veo",
    args0: [
      {
        type: "field_dropdown",
        name: "cuantocolor",
        options: [
          ["Rojo", "ROJO"],
          ["Azul", "AZUL"],
          ["Verde", "VERDE"],
          ["Blanco", "BLANCO"],
          ["Negro", "NEGRO"],
        ],
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
  // Check if robot exists
  nombres_robot.menuGenerator_.forEach(([key, value]) => {
    if(dropdown_robot == value){
      is_valid = true;
    }
  });
  // If not, get first available
  if(!is_valid){
    dropdown_robot = nombres_robot.menuGenerator_[0][1];
  }

  var statements_name = Blockly.Python.statementToCode(block, "programa_frankest");

  var code = `"""Programa realizado en FrankLab\n\nNombre del Programa: ${text_nombre_programa}\nCreado por: ${text_nombre_autor}\n"""\n\n`;
  code += `def ${text_nombre_programa}():\n`;
  code += `  # Cargamos la libreria del robot\n  from ${dropdown_robot} import *\n\n`;
  code += `  # Codigo del programa \n`;
  code += statements_name + "\n";
  code += `${text_nombre_programa}() \n\n`;
  return code;
};

Blockly.Python["inicializar_frankestito"] = function (block) {
  let dropdown_robot = block.getFieldValue("robot");

  var code = `# Cargamos la libreria del robo ${dropdown_robot}\nfrom ${dropdown_robot} import *\n`;
  return code;
};

Blockly.Python["adelante"] = function (block) {
  let number_velocidad = block.getFieldValue("velocidad");
  let number_tiempo = block.getFieldValue("tiempo");

  var code = `adelante(${number_velocidad},${number_tiempo})\n`;
  return code;
};

Blockly.Python["derecha"] = function (block) {
  let number_velocidad = block.getFieldValue("velocidad");
  let number_tiempo = block.getFieldValue("tiempo");

  var code = `derecha(${number_velocidad},${number_tiempo})\n`;
  return code;
};

Blockly.Python["izquierda"] = function (block) {
  let number_velocidad = block.getFieldValue("velocidad");
  let number_tiempo = block.getFieldValue("tiempo");

  var code = `izquierda(${number_velocidad},${number_tiempo})\n`;
  return code;
};

Blockly.Python["verfoto"] = function (block) {
  var code = "verfoto()\n";
  return code;
};

Blockly.Python["atras"] = function (block) {
  let number_velocidad = block.getFieldValue("velocidad");
  let number_tiempo = block.getFieldValue("tiempo");

  var code = `atras(${number_velocidad},${number_tiempo})\n`;
  return code;
};

Blockly.Python["buscarcolor"] = function (block) {
  var dropdown_buscarcolor = block.getFieldValue("buscarcolor");

  var code = `buscarcolor(${dropdown_buscarcolor})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["cuantocolor"] = function (block) {
  var dropdown_cuantocolor = block.getFieldValue("cuantocolor");

  var code = `cuantocolor(${dropdown_cuantocolor})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["beep"] = function (block) {
  var code = "beep()\n";
  return code;
};
