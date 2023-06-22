#!/bin/sh

source ./.env.production.local

# Write a bash script to move files from dist to the environment variable FILE_MOVE_PATH
# Create an .env.local file with the environment variable FILE_MOVE_PATH
# It should contain full path to the dist folder of the plugin
echo "Moving files from ./dist to $FILE_MOVE_PATH"
rsync -avd --exclude-from=".rsyncignore" ./dist/ $FILE_MOVE_PATH

# For windows users, use the following command
# Find some way to ignore using .rsyncignore file
# cp -r --i ./dist/* $FILE_MOVE_PATH
