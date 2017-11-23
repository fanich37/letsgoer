#!/bin/bash

touch app/pages/$1.jade

echo -e "extends /blocks/layout-default/layout-default\n\nblock head\n\t- var pageTitle = 'Letsgoer is here!';\n\nblock content" >> app/pages/$1.jade
echo -e "Page $1 is created"