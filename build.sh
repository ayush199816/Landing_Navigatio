#!/bin/bash
set -e

# Install dependencies
npm install --legacy-peer-deps

# Grant execute permissions to react-scripts
chmod +x ./node_modules/.bin/react-scripts

# Set CI to false and run build
export CI=false
npm run build