import { useEffect, useState } from 'react';
import axios from 'axios';

interface IState {
  data: any;
  loading: boolean;
  error: string | null;
}

const useFetch = (url: string) => {
  const [state, setState] = useState<IState>({
    data: null,
    loading: true,
    error: null
  });
  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    const fetchData = async (url: string) => {
      try {
        const result = await axios.get(url);
        const { data } = result;
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error });
      }
    };

    fetchData(url);
  }, [url, setState]);

  return state;
};

export default useFetch;
