#!/bin/sh

DATE=`date +"%Y-%m-%d"`
TITLE=$1
SLUGIFIED="$(echo -n "${TITLE}" | sed -e 's/[^[:alnum:]]/-/g' | tr -s '-' | tr A-Z a-z)"
FILENAME="$DATE-$SLUGIFIED.markdown"
DATESTAMP=`date +"%Y-%m-%d %T PDT"`


POST="---\nlayout: post\ntitle:  $TITLE\ndate:   $DATESTAMP\nhidetitle: 'true'\npublished: false\n---\n\n"

echo $POST > _posts/$FILENAME

git add _posts/$FILENAME
