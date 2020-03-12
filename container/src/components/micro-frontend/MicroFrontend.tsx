import React, { useEffect } from 'react';
import axios from 'axios';

interface IProps {
  name: string;
  host: string;
}

interface IResponse {
  data: IData;
}

interface IData {
  manifest: {
    entrypoints: any;
    files: any;
  };
}

const MicroFrontend: React.FC<IProps> = props => {
  useEffect(() => {
    const { name, host } = props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      //   renderMicroFrontend();
      return;
    }

    axios.get(`${host}/asset-manifest.json`)
    .then(res => res.data)
    .then(manifest => {
      const script = document.createElement('script');
      script.id = scriptId;
      script.crossOrigin = '';
      script.src = `${host}${manifest['main.js']}`;
      script.onload = renderMicroFrontend;
      document.head.appendChild(script);
    }).catch(error => console.log(error)) 

  }, []);

  function renderMicroFrontend() {
      console.log('hello')
  }

  return <div></div>;
};

export default MicroFrontend;
