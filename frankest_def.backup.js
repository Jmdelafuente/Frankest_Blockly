// Generamos los bloques gráficos de Frankest y los agregamos a Blockly
Blockly.defineBlocksWithJsonArray([{
  "type": "frankest_adelante",
  "message0": "Avanzar %1 pasos",
  "args0": [
    {
      "type": "field_number",
      "name": "pasos",
      "value": 0,
      "min": 1,
      "max": 10,
      "precision": 1
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Cantidad de pasos para adelante",
  "helpUrl": ""
},
{
  "type": "frankest_init",
  "message0": "PROGRAMA %1",
  "args0": [
    {
      "type": "field_input",
      "name": "NombrePrograma",
      "text": "programa"
    }
  ],
  "nextStatement": "frankestito",
  "colour": 0,
  "tooltip": "Comenzar a utilizar a Frankestito",
  "helpUrl": ""
},
{
  "type": "frankest_girar",
  "message0": "Girar hacia %1 %2  pasos",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "direccion",
      "options": [
        [
          "derecha",
          "derecha"
        ],
        [
          "izquierda",
          "izquierda"
        ]
      ]
    },
    {
      "type": "field_number",
      "name": "pasosgiro",
      "value": 1,
      "min": 1,
      "max": 15,
      "precision": 1
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 210,
  "tooltip": "Añade un giro",
  "helpUrl": ""
},
{
  "type": "frankest_verfoto",
  "message0": "Ver foto",
  "previousStatement": null,
  "nextStatement": "Array",
  "colour": 160,
  "tooltip": "Tomar una foto y visualizarla",
  "helpUrl": ""
},
{
  "type": "frankest_cuantocolor",
  "message0": "cuanto color %1 %2 veo",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "color",
      "options": [
        [
          "ROJO",
          "ROJO"
        ],
        [
          "AZUL",
          "AZUL"
        ],
        [
          "VERDE",
          "VERDE"
        ]
      ]
    },
    {
      "type": "input_dummy"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 160,
  "tooltip": "Analizar cuanto color hay en la imagen",
  "helpUrl": ""
},
{
  "type": "frankest_atras",
  "message0": "Retroceder %1 pasos",
  "args0": [
    {
      "type": "field_number",
      "name": "pasos",
      "value": 0,
      "min": 1,
      "max": 10,
      "precision": 1
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Cantidad de pasos hacia atras",
  "helpUrl": ""
}]);

// Generamos la funcionalidad de cada bloque para Frankest
// Para ello se anexa al generador de Python de blockly
// las instrucciones propias de Frankest

// Constantes temporales
var velocidad = '0.6';
var robot = Code.robot;
Blockly.Python.frankest_adelante = function(block) {
  var number_pasos = block.getFieldValue('pasos');
  // TODO: Assemble Python into code variable.
  var code = 'adelante('+velocidad+','+number_pasos+')';
  code = code + '\n';
  return code;
};

Blockly.Python.frankest_init = function(block) {
var text_nombreprograma = block.getFieldValue('NombrePrograma');
// TODO: Assemble Python into code variable.
  var code = 'from '+robot+' import * \ninit() \n';
  return code;
};

Blockly.Python.frankest_girar = function(block) {
  var dropdown_direccion = block.getFieldValue('direccion');
  var number_pasosgiro = block.getFieldValue('pasosgiro');
  // TODO: Assemble Python into code variable.
  var code = dropdown_direccion+'('+velocidad+','+number_pasosgiro+')'+'\nwait(0.5)';
  code = code + '\n';
  return code;
};

Blockly.Python.frankest_verfoto = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'verfoto() \n';
  return code;
};

Blockly.Python.frankest_cuantocolor = function(block) {
  var dropdown_color = block.getFieldValue('color');
  // TODO: Assemble Python into code variable.
  var code = 'cuanto_color('+dropdown_color+')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.frankest_atras = function(block) {
  var number_pasos = block.getFieldValue('pasos');
  // TODO: Assemble Python into code variable.
  var code = 'atras('+velocidad+','+number_pasos+')';
  code = code + '\n';
  return code;
};
