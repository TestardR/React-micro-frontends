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
    if (data && host) {
      const { entrypoints } = data;
      _loadExternalResources(host, entrypoints);
    }
  }, [data, host]);

  /**
   * Factory function to create script tags.
   * @function _loadExternalResource
   * @param {string} url - host url from which the bundle will be downloaded
   * @param {string} entry - bundle location in the host
   * @returns a script tag
   */

  const _loadExternalResource = (url: string, entry: string) => {
    return new Promise((resolve, reject) => {
      const match = entry.match(/\.([^.]+)$/);
      if (!match) return;
      const type = match[1];

      let tag;
      if (type === 'css') {
        tag = document.createElement('link');
        tag.type = 'text/css';
        tag.rel = 'stylesheet';
        tag.href = _normalizeUrl(`${url}/${entry}`);
      } else if (type === 'js') {
        tag = document.createElement('script');
        tag.type = 'text/javascript';
        tag.src = _normalizeUrl(`${url}/${entry}`);
      }

      if (tag) {
        tag.id = uuidv4();
        tag.onload = function() {
          resolve();
        };
        tag.onerror = function() {
          reject();
        };


        if (tag.type === 'test/javascript') {
          document.getElementsByTagName('body')[0].appendChild(tag);
        } else if (tag.type === 'test/javascript') {
          document.getElementsByTagName('head')[0].appendChild(tag);
        }
      }
    });
  };

  /**
   * Factory function initializing a script for each chunk produced by webpack.
   * @function _loadExternalResources
   * @param {string} url - host url from which the bundle will be downloaded
   * @param {array} entries - array of entries obtained from asset-manifest.json
   * @returns an array of promises
   */

  const _loadExternalResources = (url: string, entries: string[]) => {
    const promises = entries.map(entry => _loadExternalResource(url, entry));
    return Promise.all(promises);
  };

  const _normalizeUrl = (path: string) => {
    return url.format(url.parse(path));
  };

  const renderMicroFrontend = () => {
    console.log('hello')
    window[`render${name}`](`${name}-container`, history);
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
