//
// Copyright (c) 2013-2016 Pavel Medvedev. All rights reserved.
//
// This file is part of v8pp (https://github.com/pmed/v8pp) project.
//
// Distributed under the Boost Software License, Version 1.0. (See accompanying
// file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)
//
var console = require('console');
console.log("load console.dll ok!");
/*console.log('yo', 'baby', 4.2, null);

var c2 = require('console');
c2.log('conker 2');

function pando() {
    this.friend = 1;
    this.masto = require('console');
    this.whack = function() {
        this.masto.log('truckman')
    };
}

var c = new pando();
c.whack();
*/



function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) { 
     var c = str.charCodeAt(i); 
    //���ֽڼ�1 
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
       len++; 
     } 
     else { 
      len+=2; 
     } 
    } 
    return len;
}

function test2(date, from_station, to_station)
{
	var str = "https://kyfw.12306.cn/otn/leftTicket/queryX";
	  str += "?leftTicketDTO.train_date=";
	  str += date;
	  str += "&leftTicketDTO.from_station=";
	  str += from_station;
	  str += "&leftTicketDTO.to_station=";
	  str += to_station;
	  str += "&purpose_codes=ADULT";
	  //GET
		
		var curl = require('curl');
		
		ret = curl.post(str, str, 0, 0, str);
		
		console.log(ret);
}

function test1()
{
var curl = require('curl');
var str = "";
ret = curl.post("http://192.168.35.115:3000/queryMsg/query", "_trunc=-1&_limit=10&_skip=0&_sort={\"createtime\":-1}&_doc=", 1, 0, str);
//console.log(str);

var json = require('json');


//����json
var parse =  json.parse(ret);
if(parse.IsValid())
{
	//code -->string
	if(parse.IsString("code"))
	{
		var vCode = parse.GetItem("code");
		var sCode = parse.ToString(vCode);
		console.log(sCode);
	}
	
	//data -->array
	var vData = parse.GetItem("data");
	if(parse.IsArray(vData))
	{
		var nArrCount = parse.GetArrayCount(vData);
		for( i=0; i<nArrCount; i++)
		{
			//item
			var vObjItem = parse.GetArrayItem(vData, i);
			
			//_id -->string
			var vId = parse.GetObjItem(vObjItem, "_id");
			var sValueId = parse.ToString(vId);
			
			//dataid -->int
			
			//msgType -->string
			
			//title -->string
			var vTitle = parse.GetObjItem(vObjItem, "title");
			var sValueTitle = parse.ToString(vTitle);
			
			//content -->string
			var vContent = parse.GetObjItem(vObjItem, "content");
			var sValueContent = parse.ToString(vContent);
			
			//dataid -->int32
			var vDataId = parse.GetObjItem(vObjItem,"dataid");
			var nDataId = parse.ToInt32(vDataId);			
			
			console.log("array['data']: ", i+1, "dataid=",nDataId, ",_id=", sValueId, ", title=", sValueTitle,  "\r\n");
		}
	}
	
	
}
else
{
	console.log("invalid");
}
}

test2("2017-10-02", "SZQ", "BJP");