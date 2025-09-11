#!/bin/bash
set -e

# Install dependencies
npm install --legacy-peer-deps

# Fix permissions
chmod -R 755 node_modules/
chmod +x node_modules/.bin/*

# Set environment variables
export CI=false

# Run build
npm run build
npm run build