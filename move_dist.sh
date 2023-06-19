#!/bin/sh

source ./.env.production.local

# Write a bash script to move files from dist to the environment variable FILE_MOVE_PATH
# Create an .env.local file with the environment variable FILE_MOVE_PATH
# It should contain full path to the dist folder of the plugin
echo "Moving files from ./dist to $FILE_MOVE_PATH"
cp -r ./dist/* $FILE_MOVE_PATH
