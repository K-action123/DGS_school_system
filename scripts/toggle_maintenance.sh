#!/bin/bash

# Load configuration from .env file if it exists
if [ -f "$(dirname "$0")/../.env" ]; then
    source "$(dirname "$0")/../.env"
fi

# Check if variables are set
if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    echo "Error: BUCKET_NAME and DISTRIBUTION_ID must be set."
    echo "You can set them in a .env file in the project root or export them as environment variables."
    echo "Example .env content:"
    echo "BUCKET_NAME=my-school-website-bucket"
    echo "DISTRIBUTION_ID=E1234567890"
    exit 1
fi

MODE=$1

if [ "$MODE" == "on" ]; then
    echo "Turning Maintenance Mode ON..."
    
    # Check if already in maintenance (index.html.orig exists)
    if aws s3 ls "s3://$BUCKET_NAME/index.html.orig" > /dev/null 2>&1; then
        echo "Error: index.html.orig already exists. Maintenance mode might already be ON."
        exit 1
    fi

    # Backup live index
    echo "Backing up index.html to index.html.orig..."
    aws s3 mv "s3://$BUCKET_NAME/index.html" "s3://$BUCKET_NAME/index.html.orig"

    # Upload maintenance page as index
    echo "Activating maintenance page..."
    if [ -f "public/maintenance.html" ]; then
        aws s3 cp "public/maintenance.html" "s3://$BUCKET_NAME/index.html" --content-type "text/html"
    else
        echo "Error: public/maintenance.html not found locally."
        exit 1
    fi

elif [ "$MODE" == "off" ]; then
    echo "Turning Maintenance Mode OFF..."

    # Check if in maintenance (index.html.orig exists)
    if ! aws s3 ls "s3://$BUCKET_NAME/index.html.orig" > /dev/null 2>&1; then
        echo "Error: index.html.orig does not exist. Maintenance mode might already be OFF."
        exit 1
    fi

    # Restore live index
    echo "Restoring index.html from backup..."
    aws s3 mv "s3://$BUCKET_NAME/index.html.orig" "s3://$BUCKET_NAME/index.html"

else
    echo "Usage: ./toggle_maintenance.sh [on|off]"
    exit 1
fi

# Invalidate CloudFront
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"

echo "Done!"
