#!/usr/bin/env bash
# shellcheck disable=SC2034

APP_NAME=vlim-sam-node-boilerplate
STAGE_NAME=devii
S3_BUCKET=$APP_NAME-$STAGE_NAME-bucket
STACK_NAME=$APP_NAME-$STAGE_NAME-stack
PROFILE=private.vlim
REGION=us-east-1
INPUT_FILE=template.yaml
OUTPUT_FILE=packaged.yaml
