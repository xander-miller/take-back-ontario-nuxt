#!/bin/bash
LIMIT=1000
URL="https://represent.opennorth.ca/boundaries/ontario-electoral-districts-representation-act-2015?limit=$LIMIT"
OUTPUT_DIR="assets/json/ridings.json"
# Get the total count then iterate through those pages
# | jq '.meta.total_count'
BOUNDARY_DATA=$(wget -O - "$URL")
BOUNDARIES=$(echo "$BOUNDARY_DATA"| jq '.objects' )
RESPONSE_COUNT=$(echo "$BOUNDARY_DATA"| jq '.meta.total_count')
LOCAL_COUNT=$(echo "$BOUNDARIES" | jq length )

if [[ $RESPONSE_COUNT -ne $LOCAL_COUNT ]] ; then
	echo "Number of boundaries received($LOCAL_COUNT), is different from the total number available($RESPONSE_COUNT)"
	exit 1
fi

echo $BOUNDARIES | jq '.[] | { url, name, external_id}' > $OUTPUT_DIR 
