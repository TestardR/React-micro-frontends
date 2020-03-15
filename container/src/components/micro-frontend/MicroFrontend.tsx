import React, { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import url from 'url';

import useFetch from './../../hooks/useFetch';

/**
 * Micro front-end functional component. Its goal is to produce scripts from props to load external components.
 * @function MicroFrontend
 * @param {object} props - name and host from micro front-end components
 * @returns WIP
 */

interface IProps {
  history: any;
  name: string;
  host?: string;
}

declare global {
  interface Window {
    [key: string]: (str: string, history: any) => any;
  }
}

const MicroFrontend: React.FC<IProps> = ({ name, host, history }) => {
  const { data, loading, error } = useFetch(`${host}/asset-manifest.json`);

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    if (data && host) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.crossOrigin = '';
      script.src = _normalizeUrl(`${host}/${data.files['main.js']}`);
      script.onload = renderMicroFrontend;
      document.head.appendChild(script);
    }
  }, [data, host, name]);

  useEffect(() => {
    return () => {
      console.log('bye');
      /*  window[`unmount${name}`](`${name}-container`); */
    };
  }, []);

  const _normalizeUrl = (path: string) => {
    return url.format(url.parse(path));
  };

  const renderMicroFrontend = () => {
    console.log('hello');
    /* window[`render${name}`](`${name}-container`, history); */
  };

  return (
    <div>
      {loading && <div>Your micro front-end component is laoding</div>}
      {error && (
        <div>
          Sorry, we encountered an error loading your micro front-end component
        </div>
      )}
      {data && <main id={`${name}-container`} />}
    </div>
  );
};

export default MicroFrontend;
