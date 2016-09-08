$(":file").filestyle();
var r = new FileReader();
function act() {
  var file = fileInput.files[0]
  r.onload = function() {
    var data = r.result
    
    var z = new JSZip(data);
    var xml = z.file("word/document.xml").asText()

    var doc = docxToJson(xml)
    toUnicode(doc)
    data = jsonToHtml(doc)

    output.innerHTML = data
    data = data.replace(/<p>/g, '\n').replace(/<.+?>/g, '').replace(/^\r?\n/g, '');
    var b = new Blob([data], { encoding:'utf-8',type:'text/html' });
    var url = URL.createObjectURL(b);
    downLink.href = url
    downLink.target = '_blank'
    downLink.innerHTML = 'Download'
    downLink.download = 'convertedDocument.txt'
    document.getElementById('reload').style.display = 'inline'
  }
  r.readAsBinaryString(file); 
}

reload.addEventListener('click', doReload);

function doReload(event) {
  location.reload();
}
