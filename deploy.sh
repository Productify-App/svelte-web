POCKETPORT=8090

"/usr/bin/pm2" restart "productify" && echo "Restarting Service" || cd "/server/productify" && npm run start && echo "Starting Service"
# "/server/productify/database/quizzable" serve || fuser -n tcp -k $POCKETPORT && "/server/quizzable/database/quizzable" serve
