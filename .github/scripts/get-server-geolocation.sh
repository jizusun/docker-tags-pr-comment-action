#!/bin/bash
if [ -z "$1" ]; then
    echo "No URL provided. Usage: ./script.sh <url>"
    exit 1
fi
url=$1
echo "The URL is $url"
domain=$(echo "$url" | awk -F/ '{print $3}')
ip_address=$(dig +short "$domain" @resolver1.opendns.com)
echo "The IP of $domain is $ip_address"
geolocation=$(curl -s "ipinfo.io/$ip_address")
echo "The geolocation of $ip_address is $geolocation"
