#!/usr/bin/env bash

source scripts/config.sh
aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$REGION"
