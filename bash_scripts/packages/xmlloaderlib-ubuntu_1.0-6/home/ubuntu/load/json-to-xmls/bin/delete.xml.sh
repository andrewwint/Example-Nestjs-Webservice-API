#!/bin/bash

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<!DOCTYPE client SYSTEM \"object.dtd\">
<client name=\"$1\" delete=\"true\"/>" > $HOME/load/json-to-xmls/delete_$1.xml

if [ -e $HOME/load/json-to-xmls/delete_$1.xml ]; then
  echo "success"
else
  echo "failed"
fi
