cd "/server/productify"
# get date 4 hours ago bc of timezone
NOW=$(date --date="5 hours ago" +"%Y-%m-%d %H:%M:%S")
echo "Starting Service: $NOW" && npm run start || echo "Service failed to start"
