# Загрузка переменных из .env и генерация nginx.conf
set -o allexport
source <(grep -v '^#' .env | tr -d '\r')
set +o allexport

APP_DIR="/var/www/${TYPE_PROJECT}"
NGINX_TEMPLATE="$APP_DIR/nginx.conf.template"
NGINX_CONFIG="$APP_DIR/nginx.conf"

mkdir -p "$APP_DIR/data/deploy"

cd "$APP_DIR" || exit 1

git pull origin ${BRANCH_DEPLOY}

envsubst '${MY_DOMAIN}' < "$NGINX_TEMPLATE" > "$NGINX_CONFIG"

docker compose build --no-cache
docker compose up -d
