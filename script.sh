#!/usr/bin/env bash

#! Github Update
echo "Github update"
git fetch
git pull

echo "Executing backend script"

sh ./backend/script.sh

echo "Executing frontend script"
sh ./frontend/script.sh
