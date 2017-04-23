let table = {};
table['normal mode'] = [];
table['insert mode'] = [];
table['visual mode'] = [];
table['not insert mode'] = [];

table['normal mode']['undo'] = 'vim-mode-plus:undo';
table['normal mode']['redo'] = 'vim-mode-plus:redo';

table['not insert mode']['move left'] = 'vim-mode-plus:move-left';
table['not insert mode']['move right'] = 'vim-mode-plus:move-right';
table['not insert mode']['move up'] = 'vim-mode-plus:move-up';
table['not insert mode']['move down'] = 'vim-mode-plus:move-down';
table['not insert mode']['delete'] = 'vim-mode-plus:delete';
table['not insert mode']['change'] = 'vim-mode-plus:change';

table['not insert mode']['one'] = 'vim-mode-plus:set-count-1';
table['not insert mode']['two'] = 'vim-mode-plus:set-count-2';
table['not insert mode']['three'] = 'vim-mode-plus:set-count-3';
table['not insert mode']['four'] = 'vim-mode-plus:set-count-4';
table['not insert mode']['five'] = 'vim-mode-plus:set-count-5';
table['not insert mode']['six'] = 'vim-mode-plus:set-count-6';
table['not insert mode']['seven'] = 'vim-mode-plus:set-count-7';
table['not insert mode']['eight'] = 'vim-mode-plus:set-count-8';
table['not insert mode']['nine'] = 'vim-mode-plus:set-count-9';
table['not insert mode']['zero'] = 'vim-mode-plus:set-count-0';


exports.table = table;
