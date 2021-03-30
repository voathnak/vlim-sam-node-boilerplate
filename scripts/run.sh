#!/usr/bin/env bash

source scripts/config.sh
rm -rf .aws-sam

# Preparing layer
sh scripts/layer-preparation.sh


# Run in local
sam local start-api \
  --port 4000 \
  --region "$REGION" \
  --profile "$PROFILE" \
  --parameter-overrides \
    StageName="$STAGE_NAME" \
    DeploymentS3BucketName="$S3_BUCKET" \
    AppName="$APP_NAME" \
  --skip-pull-image \
  2>&1 | tr "\r" "\n"

