#!/usr/bin/env bash

#! Github Update
echo "Github update"
git fetch
git pull

echo "Executing backend script"
cd ./backend
sh script.sh

cd ../

echo "Executing frontend script"
cd ./frontend
sh script.sh
