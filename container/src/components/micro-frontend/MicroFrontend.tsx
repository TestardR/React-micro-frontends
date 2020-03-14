import React, { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import url from 'url';

import useFetch from './../../hooks/useFetch';

/**
 * Factory function to create script tags to load micro front-end components inside container.
 * @function MicroFrontend
 * @param {object} props - name and host from micro front-end components
 * @returns WIP
 */

interface IProps {
  name: string;
  host: string;
}

const MicroFrontend: React.FC<IProps> = ({ name, host }) => {
  const { data, loading, error } = useFetch(`${host}/asset-manifest.json`);
  useEffect(() => {
    if (data) {
      const { entrypoints } = data;
      _loadExternalResources(host, entrypoints);
    }
  }, [data, loading, error]);

  function _loadExternalResource(url: string, entry: string) {
    console.log(`${url}/${entry}`)
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
          resolve(entry);
        };
        tag.onerror = function() {
          reject(entry);
        };

        if (tag.type === 'test/javascript') {
          document.getElementsByTagName('body')[0].appendChild(tag);
        } else if (tag.type === 'test/javascript') {
          document.getElementsByTagName('head')[0].appendChild(tag);
        }
      }
    });
  }

  function _loadExternalResources(url: string, entries: string[]) {
    const promises = entries.map(entry => _loadExternalResource(url, entry));
    return Promise.all(promises);
  }

  function _normalizeUrl(path: string) {
    return url.format(url.parse(path)) 
  }

  function renderMicroFrontend() {
    console.log('hello');
  }

  return (
    <div>
      {loading && <div>Your micro front-end component is laoding</div>}
      {error && (
        <div>
          Sorry, we encountered an error loading your micro front-end component
        </div>
      )}
    </div>
  );
};

export default MicroFrontend;
