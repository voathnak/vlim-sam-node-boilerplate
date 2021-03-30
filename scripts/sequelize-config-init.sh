#!/usr/bin/env bash

source scripts/config.sh

rm -rf .sequelize-config
mkdir -p .sequelize-config/
echo "init sequelize-config"
echo "
  {
    \"development\": {
      \"username\": \"$PG_USER\",
      \"password\": \"$PG_DB_PASSWORD\",
      \"database\": \"$PG_DB_NAME\",
      \"host\": \"$PG_HOST\",
      \"dialect\": \"postgres\"
    }
  }
" > ".sequelize-config/config.json"
