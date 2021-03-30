#!/usr/bin/env bash

source scripts/config.sh

#  Deploy API Docs ######################################################################################
CURRENT_BRANCH_NAME=$(git branch --show-current)

API_GATEWAY_URL=$(aws cloudformation describe-stacks \
--profile "$PROFILE" \
--region "$REGION" \
--stack-name "$STACK_NAME" \
--query "Stacks[0].Outputs[?OutputKey=='WebEndpoint'].OutputValue" \
--output text)

sed "s,CURRENT_BRANCH_URL,$API_GATEWAY_URL," \
api-doc/vg-backend-api-doc.yaml > api-doc/swagger.yaml

KEY=${CURRENT_BRANCH_NAME//\//-}
KEY=${KEY//#/-}

aws s3   --profile "$PROFILE" \
    --region "$REGION" \
    cp --recursive api-doc s3://"$S3_SWAGGER_BUCKET"/api-doc/"${KEY}"/

rm api-doc/swagger.yaml

echo "API Demo: http://vg-backend-api-dev-swagger-bucket.s3-website-ap-southeast-1.amazonaws.com/$KEY"
########################################################################################################
