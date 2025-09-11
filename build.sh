#!/bin/bash
set -e

# Install dependencies
npm install --legacy-peer-deps

# Set CI to false and run build
CI=false npm run build
