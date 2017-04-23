'use babel';
// main event loop
//

export const NumberMapping = {
  "zero": 0,

  "one": 1,
  "won": 1,

  "two": 2,
  "to": 2,
  "too": 2,

  "three": 3,

  "four": 4,
  "for": 4,

  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
};

function voice_capture(){
    //voice capture
    //wait for input

    // end listening when escape command called

}

// "atom-workspace":
//       "command": "sourcefetch:fetch"

var hashmap = {};

hashmap = {
    "navigation":"na",
    "selection":"se",
    "deletion":"de",
    "insertion":"in",

    "undo":"un",
    "escape":"es",

    //dir
    "up":"up",
    "down":"do",
    "right":"ri",
    "left":"le"

    //Jump to line #
    //Jump to first line
    //Jump to last line
    //Delete line
    //Yank line

}

// for insert mode
export var parsed_elements = {

    "escape": "escape insert mode",
    "new-line": "new line",
    "navigation":"na",
    "selection":"se",
    "deletion":"de",
    "insertion":"in",
    "undo":"un",

    "up":"up",
    "down":"do",
    "right":"ri",
    "left":"le",

    "exclamation": "!",
    "hash": "#",
    "dollar": "$",
    "percent": "%",
    "carrot": "^",
    "ampersand": "&",
    "star": "*",
    "underscore": "_",
    "minus": "-",
    "plus": "+",
    "equal": "=",
    "equals": "=",
    "let": "let ",
    "function": "function ",

    "or": " || ",
    "and": " && ",

    "open-parenthesis": "(",
    "close-parenthesis": ")",
    "open-brace": "{",
    "close-brace": "}",
    "open-bracket": "[",
    "close-bracket": "]",
    "call": "()",

    "pair": " {}",
    "pear": " {}",

    "return": "return ",
    "if": "if ",
    "logic": "==",

    "colon": "':'",
    "semicolon": ";",
    "forward-slash": "/",

    "less-than": "<",
    "greater-than": ">",
    "question": "?",
    "quote": '""',
    "single-quote": "\'",

    "space": " ",
    "tab": "    "

}

// first word: action
//
//
// last word: call


function nav(dir,num,mod=null){
    for(i = 0; i < num; i++){
      // core:move-dir num times
    }
}

function sel(dir,num,mod=null){
    for(i = 0; i < num; i++){
      // core:select-dir num times
    }
}

function del(dir,num,mod=null){
    for(i = 0; i < num; i++){
      // core:delete num times
    }
}

function bac(dir,num,mod=null){
    for(i = 0; i < num; i++){
      // core:backspace num times
    }
}

function ins(args){
    for(i = 1; i < args.length; i++){
        // insert args[i]
        if (args[i] in parsed_elements){
            // dont insert args[i]
            // only insert args[i].value
        }
    }

}

function parse_command(args){
    act = args[0];

    if (act == "navigation"){
        dir = args[1];
        num = args[2];
        nav(dir,num);
    }
    if (act == "selection"){
        dir = args[1];
        num = args[2];
        sel(dir,num);
    }
    if (act == "deletion"){
        dir = args[1];
        num = args[2];
        del(dir,num);
    }
    if (act == "backspace"){
        dir = args[1];
        num = args[2];
        bac(dir,num);
    }
    if (act == "insertion"){
        ins(args);
    }

}

//{
//  "atom-workspace": {
//    "ctrl-alt-o": "atom-voice:start",
//    "voice-move-up": "core:move-up",
//    "voice-move-down": "core:move-down",
//    "voice-move-right": "core:move-right",
//    "voice-move-left": "core:move-left",
//
//    "voice-select-up": "core:select-up",
//    "voice-select-down": "core:select-down",
//    "voice-select-right": "core:select-right",
//    "voice-select-left": "core:select-left",
//
//    "voice-backspace": "core:backspace",
//    "voice-delete": "core:delete",
//
//    "voice-text-insert-mode": "vim-mode-plus:activate-insert-mode"
//  }
//}



//
// "context-menu": {
//   "atom-text-editor": [
//     {
//       "label": "Fetch code",
//       "command": "sourcefetch:fetch"
//     }
//   ]
// },

var dir_map = {
    "up":"u",
    "down":"d",
    "right":"r",
    "left":"l",
}

function nav(dir,num,mod=null){
    // core:move-dir num times
}
function sel(dir,num,mod=null){
    // core:select-dir num times
}


function run_command(exp){

    switch (exp){

        case 'navigation':
            console.log('navigation initiated');
            dir = voice_capture();
            num = voice_capture();
            mod = voice_capture();
            nav(dir,num,mod);
            break;

        case 'selection':
            console.log('selection initiated');
            dir = voice_capture();
            num = voice_capture();
            mod = voice_capture();
            sel(dir,num,mod);
            break;

        case 'backspace':
            console.log('backspace initiated');
            dir = voice_capture();
            num = voice_capture();
            mod = voice_capture();
            bac(dir,num,mod);
            break;

        case 'deletion':
            console.log('deletion initiated');
            dir = single_voice_capture();
            num = single_voice_capture();
            mod = single_voice_capture();
            del(dir,num,mod);
            break;

        case 'insertion':
            console.log('insertion initiated');
            text = text_voice_capture();
            ins(text);
            break;

        case 'undo':
            console.log('undo initiated');
            break;

    }

}


function main(){

    // words come in one at a time and are added to the queue
    var queue;

    while (queue.waitForMessage) {


        // wait for incoming word
        word = voice_capture();
        run_command(word);

    }

}
