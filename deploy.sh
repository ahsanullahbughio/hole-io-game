#!/bin/bash
cd "/Users/thebug/development/claude training/first project"

# Auto-answer prompts
echo "Deploying to Vercel..."
echo ""
echo "This will deploy your hole.io game to Vercel."
echo "Please answer the following prompts:"
echo ""

exec vercel --prod --scope ahsanullah-gmailcoms-projects
