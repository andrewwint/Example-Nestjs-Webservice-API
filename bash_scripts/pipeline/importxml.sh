#!/bin/bash

if [ $# -eq 2 ];then
  DELETEXML=''
elif [ $3 == 'client' ] || [ $3 == 'game' ] || [ $3 == 'subgame' ]; then
  DELETEXML=$3
else
  DELETEXML=''  
fi

if [ -e $1 ];then
  xmlbase64="`cat $1 | base64`"
  echo "{\"server\":\"$2\", \"deleteXml\":\"${DELETEXML}\", \"payload\":\"${xmlbase64}\"}" > ./tmp.txt 
  echo $(curl -X POST "https://webservices.truechoice.io/xmlimport/xml" -H "accept: */*" -H "Content-Type: application/json" -d @tmp.txt)
  #echo $(curl -X POST "http://localhost:3000/xmlimport/xml" -H "accept: */*" -H "Content-Type: application/json" -d @tmp.txt)
  unlink ./tmp.txt 
else
  echo "File not found"
fi

