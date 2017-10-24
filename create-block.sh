#!/bin/bash

mkdir app/blocks/$1
touch app/blocks/$1/$1.pug
touch app/blocks/$1/$1.styl

echo -e "mixin $1()\n\t+b.$1&attributes(attributes)" >> app/blocks/$1/$1.pug
echo -e ".$1\n\tdisplay block" >> app/blocks/$1/$1.styl
echo "Block $1 is created"