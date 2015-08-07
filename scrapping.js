var casper = require('casper').create();
var x = require('casper').selectXpath;
//#Paginacion ul .ultimo:nth-child(6)
var fs = require('fs');

var writeDoc = function(string, mode){
	var date = new Date();
	var dateString = " "+(date.getMonth()+1)+"-"+date.getUTCDate()+"-"+date.getFullYear();
	stream = fs.open('results/'+dateString+'.html',mode);
    stream.writeLine(string);
    stream.flush();
    stream.close();
}

var addRows = function(dis, string, index){
	if(string == "" && index == 1){
    	string = "<html><head><meta charset='UTF-8'></head><body><table><thead>";
    	string += dis.getHTML(".cierreBursatilTabla thead");
    	string += "</thead><tbody>"
    }
	string += dis.getHTML(".cierreBursatilTabla tbody");
	return string;
};

var endDoc = function(string){
	return string += "</tbody></table></body></html>";
}

var loadContent = function(dis, index, maxIndex){
		dis.evaluate(function(i){
			funCierreBursatil.getPaginaCierreBursatil(i);	
		}, {i: index});

		dis.wait(3000, function(){
			var str = "";
			str = addRows(dis, str, index);
			writeDoc(str, 'a');
			dis.echo("index: "+index+" maxIndex: "+maxIndex);
			index++;
			if(index <= maxIndex){
				loadContent(dis, index, maxIndex);	
			}else if(index > maxIndex){
				dis.echo("Ended");
				var end = "";
				endDoc(end)
				writeDoc(end, 'a');
			}
		});
}

casper.start('http://www.bolsadesantiago.com/mercado/Paginas/cierrebursatil.aspx', function() {
    var table = "", i = 0;
    table = addRows(this, table, 1);
    writeDoc(table, 'w');
    this.echo("index: "+1+" maxIndex: "+casper.cli.args[0]);

    loadContent(this, 2, casper.cli.args[0]);
});

casper.run();