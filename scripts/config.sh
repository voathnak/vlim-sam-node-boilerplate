#!/usr/bin/env bash
# shellcheck disable=SC2034

APP_NAME=vlim-sam-node-boilerplate
STAGE_NAME=dev
S3_BUCKET=$APP_NAME-$STAGE_NAME-bucket
S3_SWAGGER_BUCKET=$APP_NAME-dev-swagger-bucket
STACK_NAME=$APP_NAME-$STAGE_NAME-stack
PROFILE=private.vlim
REGION=ap-southeast-1
INPUT_FILE=template.yaml
OUTPUT_FILE=packaged.yaml
