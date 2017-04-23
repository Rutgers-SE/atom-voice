// main event loop 
//


function voice_capture(){
    //voice capture
    //wait for input
    
    // end listening when escape command called
    
}


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
    "left":"le",

    //Jump to line #
    //Jump to first line
    //Jump to last line
    //Delete line
    //Yank line

}

// for insert mode
var parsed_elements = {
    
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

    "exclamation": "'!'",
    "hash": "'#'",
    "dollar": "'$'",
    "percent": "'%'",
    "carrot": "'^'",
    "ampersand": "'&'",
    "star": "'*'",
    "underscore": "'_'",
    "minus": "'-'",
    "plus": "'+'",
    "equal": "'='",

    "open-parenthesis": "'('",
    "close-parenthesis": "')'",
    "open-brace": "'{'",
    "close-brace": "'}'",
    "open-bracket": "'['",
    "close-bracket": "']'",

    "colon": "':'",
    "semi-colon": "';'",
    "forward-slash": "'/'",

    "less-than": "'<'",
    "greater-than": "'>'",
    "question": "'?'",
    "quote": "'\"'",
    "single-quote": "'\''",

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



var direction = {
    "up":"u",
    "down":"d",
    "right":"r",
    "left":"l",
}


function run_command(exp){

}

function main(){

    // words come in one at a time and are added to the queue
    var queue;

    while (true) {

        // wait for incoming word
        args = voice_capture();
        run_command(args);

    }

}

