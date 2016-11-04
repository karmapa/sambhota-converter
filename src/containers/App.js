import React, {Component} from 'react';
import sambothaParser from 'sambotha-parser';

class App extends Component {
  constructor() {
    super();
    this.state = {
      output: '',
      downLoadOptions: {
        href: '',
        target: '',
        download: ''
      }
    };
  }

  fileReader = new FileReader();

  converter = event => {
    const file = event.target.files[0];
    if (undefined === file) {
      this.setState({
        output: '',
        downLoadOptions:{
          href: '',
          target: '',
          download: ''
        }
      });
      return;
    }
    const fileReader = this.fileReader;
    fileReader.onload = () => {
      let data = fileReader.result;
      const xml = sambothaParser.docxToXml(data);
      let doc = sambothaParser.docxToJson(xml);
      sambothaParser.toUnicode(doc);
      data = sambothaParser.jsonToHtml(doc);
      data = sambothaParser.HTMLToText(data);
      var downLoad = new Blob([data], {encoding: 'utf8', type: 'text/html'});
      var url = URL.createObjectURL(downLoad);
      this.setState({
        output: data,
        downLoadOptions:{
          href: url,
          target: '_blank',
          download: 'convertedDocument.txt'
        }
      });
    };
    fileReader.readAsBinaryString(file);
  }

  render() {
    const dataInnerHTML = this.state.output.split('\n').map((str, idx) => {
      if (!str) {
        return;
      } else {
        return <div className="lineBreak" key={idx}>{str}</div>;
      }
    });
    const options = this.state.downLoadOptions;
    let downLink = '';
    if (this.state.downLoadOptions.href !== '') {
      downLink = <span><a id="downLink" {...options}>Download</a><span id="reload">X</span></span>;
    } else {
      downLink = '';
    }
    return (
      <div>
        <h1>Sambotha to unicode converter</h1>
        <input type="file" id="fileInput" onChange={this.converter} accept=".docx" />
        <div id="downBar">
          {downLink}
        </div>
        <div className="divLine" />
        <pre_><font id="result">{dataInnerHTML}</font></pre_>
      </div>
    );
  }
}

export default App;
