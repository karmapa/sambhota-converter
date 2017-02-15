import React, {Component} from 'react';
import sambhotaParser from 'sambhota-parser';
import {DropdownButton, MenuItem, Nav, Navbar} from 'react-bootstrap';
import bo from '../langs/bo.json';
import en from '../langs/en.json';
import zhCN from '../langs/zh-CN.json';
import zhTW from '../langs/zh-TW.json';

const footerLogoImage = require('./footer-logo.png');

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentLangTitle: {json: en, title: 'English'},
      langList: {
        'en': {json: en, title: 'English'},
        'bo': {json: bo, title: 'བོད་སྐད།'},
        'tw': {json: zhTW, title: '繁體中文'},
        'cn': {json: zhCN, title: '简体中文'}
      },
      input: '',
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
      const xml = sambhotaParser.docxToXml(data);
      let doc = sambhotaParser.docxToJson(xml);
      sambhotaParser.toUnicode(doc);
      data = sambhotaParser.jsonToHtml(doc);
      data = sambhotaParser.HTMLToText(data);
      var downLoad = new Blob([data], {encoding: 'utf8', type: 'text/html'});
      var url = URL.createObjectURL(downLoad);
      this.setState({
        output: data,
        input: file.name,
        downLoadOptions:{
          href: url,
          target: '_blank',
          download: 'convertedDocument.txt'
        }
      });
    };
    fileReader.readAsBinaryString(file);
  }

  langSelect = (key) => {
    this.setState({
      currentLangTitle: this.state.langList[key]
    });
  }

  render() {

    const navTitle = (
      <span>
        <i className="fa fa-globe shifted" />
        {this.state.currentLangTitle['title']}
      </span>
    );

    const options = this.state.downLoadOptions;
    let result = 'result';
    let clickButton = (
      <div className="upLoadButton">
        <div className="fileLoad btn-primary">
          <span className="glyphicon glyphicon-open-file">upload</span>
          <input type="file" id="fileInput" onChange={this.converter} accept=".dct, .docx" />
        </div>
      </div>
    );
    if (this.state.output) {
      result = 'result render';
      clickButton = (
        <div className="upAndDownButton">
          <div className="fileLoad anti btn-primary">
            <span className="glyphicon glyphicon-open-file" aria-hidden="true">upload</span>
            <input type="file" id="fileInput" onChange={this.converter} accept=".dct, .docx" />
          </div>
          <a {...options}>
            <div className="fileDownload btn-primary">
              <span className="glyphicon glyphicon-save-file" aria-hidden="true">down</span>
            </div>
          </a>
        </div>
      );
    }

    let fileInfo = (
      <div className="fileType">
      Upload a file, type: docx, dct
      </div>
    );
    if (this.state.output) {
      let fileName = 'File name: ' + this.state.input;
      fileInfo = (
        <div>
          <div className="fileName">{fileName}</div>
          <div className="divLine" />
        </div>
      );
    }
    let intruText = 'intruText';
    if (this.state.currentLangTitle['title'] === 'English') {
      intruText = 'intruText';
    } else {
      intruText = 'intruText fontBigger';
    }

    const dataInnerHTML = this.state.output.split('\n').map((str, idx) => {
      if (!str) {
        return;
      } else {
        return <div key={idx}>{str}</div>;
      }
    });

    return (
      <div className="app">
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <span className="brand" />
              <span className="brandText">{this.state.currentLangTitle['json']['dharma-treasure']}</span>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar pullRight>
              <DropdownButton id="dropdown-lang" bsStyle="link" title={navTitle}>
                <MenuItem eventKey="en" onSelect={this.langSelect}>{this.state.langList['en']['title']}</MenuItem>
                <MenuItem eventKey="bo" onSelect={this.langSelect}>{this.state.langList['bo']['title']}</MenuItem>
                <MenuItem eventKey="tw" onSelect={this.langSelect}>{this.state.langList['tw']['title']}</MenuItem>
                <MenuItem eventKey="cn" onSelect={this.langSelect}>{this.state.langList['cn']['title']}</MenuItem>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="appContent">
          <div className="intruduction">
            <span className="intruImg" />
            <div className="appDownLoad">
              <a href="https://drive.google.com//uc?export=download&id=0B9GraSYa0W12bE11UFdTTHh6WUU" target="_blank">
                <div className="downLoadButton">
                  <i className="fa fa-cloud-download fa-lg" aria-hidden="true"></i> Mac
                </div>
              </a>
              <a href="https://drive.google.com//uc?export=download&id=0B9GraSYa0W12UkM1Y19RVl8xbm8" target="_blank">
                <div className="downLoadButton">
                  <i className="fa fa-cloud-download fa-lg" aria-hidden="true"></i> PC
                </div>
              </a>
            </div>
            <div className="intruTitle">Sambhota to unicode converter</div>
            <div className={intruText}>{this.state.currentLangTitle['json']['app-sambhota-to-unicode-converter-intro-content']}</div>
          </div>
          {clickButton}
          {fileInfo}
          <div className={result}>{dataInnerHTML}</div>
        </div>

        <footer>
          <section>
            <div className="footerSection">
              <div className="footerContent container clearfix">
                <div className="row">
                  <div className="footerLogo col-sm-6">
                    <img src={footerLogoImage} alt="footer logo image" />
                  </div>
                  <div className="footerContact col-sm-6">
                    <h2>
                      {this.state.currentLangTitle['json']['contact-us']}
                    </h2>
                    <ul>
                      <li>
                        {this.state.currentLangTitle['json']['email']}
                        <span>: support@dharma-treasure.org</span>
                      </li>
                      <li>
                        {this.state.currentLangTitle['json']['phone']}
                        <span>: 02-27586828</span>
                      </li>
                      <li>
                        {this.state.currentLangTitle['json']['address']}
                        <span id="address-content">: {this.state.currentLangTitle['json']['address-content']}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footerCompany">
                  <i className="fa fa-fw fa-at" />
                  <span>@2016 Dharma Treasure Corp. All right reserved.</span>
                </div>
              </div>
            </div>
          </section>
        </footer>
      </div>
    );
  }
}

export default App;
