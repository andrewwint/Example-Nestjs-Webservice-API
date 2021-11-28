#!/bin/bash

if [ -d $1 ];then
  if [ -e ./tmp-xmls.txt ];then
    unlink ./tmp-xmls.txt
  fi

  FILES="$1/app/*.xml
  $1/products/*.xml"
  
  for f in $FILES
  do
    FILEPATH=${f##*/}
    echo  "\"${FILEPATH:0:-4}\": \""$(cat $f | base64)"\","
  done >>./tmp-xmls.txt 
else
  echo "Folder not found"
fi
