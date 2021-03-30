#!/usr/bin/env bash

source scripts/config.sh

# Preparing Layer ######################################################################################

sh scripts/layer-preparation.sh

# Create Buckets #######################################################################################

aws s3api 	--profile "$PROFILE" create-bucket \
			--bucket "$S3_BUCKET" \
			--region "$REGION" \
			--create-bucket-configuration LocationConstraint="$REGION"

# Deploy Application ###################################################################################

sam package --profile "$PROFILE" \
			--region "$REGION" \
			--template-file "$INPUT_FILE" \
			--output-template-file "$OUTPUT_FILE" \
			--s3-bucket "$S3_BUCKET"

sam deploy 	--profile "$PROFILE" \
			--region "$REGION" \
			--template-file "$OUTPUT_FILE" \
			--stack-name "$STACK_NAME" \
			--s3-bucket "$S3_BUCKET" \
			--parameter-overrides \
				StageName="$STAGE_NAME" \
				DeploymentS3BucketName="$S3_BUCKET" \
				AppName="$APP_NAME" \
			--capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND

# Deleting deployment buckets ##########################################################################

aws s3 rb s3://"$S3_BUCKET" --profile "$PROFILE" --force

# Config Gateway Response ##############################################################################

REST_API_ID=$(aws cloudformation describe-stacks \
--profile "$PROFILE" \
--region "$REGION" \
--stack-name "$STACK_NAME" \
--query "Stacks[0].Outputs[?OutputKey=='RestApiId'].OutputValue" \
--output text)

aws --profile "$PROFILE" --region "$REGION"  apigateway put-gateway-response \
	--rest-api-id "$REST_API_ID" \
	--response-type MISSING_AUTHENTICATION_TOKEN \
	--status-code "403" \
    --cli-input-json  file:///$(pwd)/scripts/gateway-response-json/missing_authentication_token.json
#
aws --profile "$PROFILE" --region "$REGION"  apigateway put-gateway-response \
	--rest-api-id "$REST_API_ID" \
	--response-type DEFAULT_4XX \
    --cli-input-json  file:///$(pwd)/scripts/gateway-response-json/default_4xx.json
#
aws --profile "$PROFILE" --region "$REGION"  apigateway put-gateway-response \
	--rest-api-id "$REST_API_ID" \
	--response-type DEFAULT_5XX \
    --cli-input-json  file:///$(pwd)/scripts/gateway-response-json/default_5xx.json

########################################################################################################
