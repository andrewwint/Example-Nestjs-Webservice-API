#!/bin/bash

INTERNAL_IP=$(hostname -i | cut -d' ' -f2)
CMD="bfd.tools.cl.CommandTool -h ${INTERNAL_IP} -p 8080 /monitoring/gateway/xml ./xmls/cache_clear.xml"
$HOME/load/execute.sh $CMD
