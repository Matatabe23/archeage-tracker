# Включаем трассировку команд
set -x

# Загрузка переменных из .env
set -o allexport
source <(grep -v '^#' .env | tr -d '\r')
set +o allexport

APP_DIR="/var/www/${PROJECT_NAME}"
NGINX_TEMPLATE="$APP_DIR/nginx.conf.template"
NGINX_CONFIG="$APP_DIR/nginx.conf"

mkdir -p "$APP_DIR/data/deploy"

cd "$APP_DIR" || exit 1

# Подтягиваем изменения из git и выводим процесс
git pull origin ${BRANCH_DEPLOY}

# Генерация конфигурации nginx
envsubst '${MY_DOMAIN}' < "$NGINX_TEMPLATE" > "$NGINX_CONFIG"

# Сборка и запуск контейнеров с выводом
docker compose build --no-cache
docker compose up
