#!/usr/bin/env bash
#
# Install the standalone Regency service and its Nginx site.
#
# Prerequisite: deploy the built bundle to /srv/regency/current so that
# /srv/regency/current/server.js exists. Run as root:
#   sudo bash setup-regency.sh stage1   # HTTP + ACME challenge
#   sudo bash setup-regency.sh stage2   # HTTPS after DNS points here

set -euo pipefail

DOMAIN=regencyparkingservice.com
SERVER_IP=72.62.234.125
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT=/srv/regency
ENV_DIR="$APP_ROOT/shared"
ENV_FILE="$ENV_DIR/.env"
SITE=/etc/nginx/sites-available/regency

FROM_DEFAULT='Regency Parking Services <website@mail.regencyparkingservice.com>'
TO_DEFAULT='sidris@regencyparkingservice.com'

log()  { printf '\n\033[1;34m==>\033[0m %s\n' "$*"; }
fail() { printf '\n\033[1;31mFAILED:\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" = 0 ] || fail "run as root (sudo bash $0 ${1:-stage1})"
[ -f "$APP_ROOT/current/server.js" ] || fail "standalone bundle missing at $APP_ROOT/current; deploy it before setup"

if ! getent passwd regency >/dev/null; then
  useradd --system --home-dir "$APP_ROOT" --shell /usr/sbin/nologin regency
fi
install -d -o regency -g regency -m 0750 "$APP_ROOT" "$ENV_DIR"
touch "$ENV_FILE"
chown regency:regency "$ENV_FILE"
chmod 0640 "$ENV_FILE"

set_default() {
  local key=$1 value=$2
  if ! grep -q "^${key}=" "$ENV_FILE"; then
    printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
  fi
}

reload_nginx() {
  nginx -t || fail "nginx config test failed — nothing reloaded"
  systemctl reload nginx
}

case "${1:-}" in
  stage1)
    log "Installing the standalone Regency service"
    install -m 644 "$HERE/regency.service" /etc/systemd/system/regency.service
    systemctl daemon-reload
    set_default NODE_ENV production
    set_default PORT 3001
    set_default HOSTNAME 127.0.0.1
    set_default REGENCY_EMAIL_FROM "\"$FROM_DEFAULT\""
    set_default REGENCY_LEAD_TO "$TO_DEFAULT"
    chown regency:regency "$ENV_FILE"
    chmod 0640 "$ENV_FILE"
    systemctl enable regency.service

    log "Installing the Nginx site for $DOMAIN (HTTP)"
    install -m 644 "$HERE/regency-proxy.conf" /etc/nginx/snippets/regency-proxy.conf
    install -m 644 "$HERE/regency-nginx-bootstrap.conf" "$SITE"
    ln -sf "$SITE" /etc/nginx/sites-enabled/regency
    reload_nginx
    systemctl restart regency.service
    log "Stage 1 done. Point $DOMAIN and www at $SERVER_IP, wait for DNS, then run stage2."
    ;;

  stage2)
    log "Checking DNS"
    for name in "$DOMAIN" "www.$DOMAIN"; do
      ip=$(getent ahostsv4 "$name" | awk 'NR==1{print $1}')
      [ "$ip" = "$SERVER_IP" ] || fail "$name resolves to '${ip:-nothing}', not $SERVER_IP — wait for DNS and retry"
      echo "  $name -> $ip"
    done

    log "Requesting certificate"
    certbot certonly --webroot -w /var/www/certbot \
      -d "$DOMAIN" -d "www.$DOMAIN" \
      --non-interactive --agree-tos --keep-until-expiring

    hook=/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
    if [ ! -f "$hook" ]; then
      printf '#!/bin/sh\nsystemctl reload nginx\n' > "$hook"
      chmod 755 "$hook"
    fi

    log "Switching $DOMAIN to HTTPS"
    install -m 644 "$HERE/regency-nginx.conf" "$SITE"
    reload_nginx
    log "Stage 2 done: https://$DOMAIN is served by the standalone Regency service."
    ;;

  *)
    echo "usage: sudo bash $0 stage1|stage2" >&2
    exit 2
    ;;
esac
