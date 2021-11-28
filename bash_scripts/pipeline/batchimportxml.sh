#!/bin/bash

if [ $# -eq 2 ];then
  DELETEXML=''
elif [ $3 == 'client' ] || [ $3 == 'game' ] || [ $3 == 'subgame' ]; then
  DELETEXML=$3
else
  DELETEXML=''  
fi

if [ -d /c/Program\ Files\ \(x86\)/Apache\ Software\ Foundation/Apache2.2/htdocs/truechoice/app/clients/prototype/$1/xml/ ];then
  rm -rf ./xml/*
  cp -r /c/Program\ Files\ \(x86\)/Apache\ Software\ Foundation/Apache2.2/htdocs/truechoice/app/clients/prototype/$1/xml/* ./xml/
  $(./base64xmls.sh ./xml/)
  JSON=$(cat ./tmp-xmls.txt)
  echo "{\"server\":\"$2\", \"deleteXml\":\"${DELETEXML}\", \"payload\":{${JSON:0:-1}}}" > ./tmp-batch.txt 
  echo $(curl -X POST "https://webservices.truechoice.io/xmlimport/batchxml" -# -H "accept: */*" -H "Content-Type: application/json" -d @tmp-batch.txt)
  #echo $(curl -X POST "http://localhost:3000/xmlimport/batchxml" -# -H "accept: */*" -H "Content-Type: application/json" -d @tmp-batch.txt)

  unlink ./tmp-xmls.txt
  unlink ./tmp-batch.txt 
else
  echo "Folder not found"
fi