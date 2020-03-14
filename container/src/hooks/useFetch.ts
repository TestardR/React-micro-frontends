import { useEffect, useState } from 'react';
import axios from 'axios';

interface IProps {
  url: string;
}

interface IData {
  data: string;
}

interface IState {
  data: string | null;
  loading: boolean;
}

const useFetch = ({ url }: IProps) => {
  const [state, setState] = useState<IState>({ data: null, loading: true });
  useEffect(() => {
    setState({ data: null, loading: true });

    const fetchData = async (url: string) => {
      const result: IData = await axios.get(url);
      const { data } = result;
      setState({ data, loading: false });
    };

    fetchData(url);
  }, [url, setState]);

  return state;
};

export default useFetch;
