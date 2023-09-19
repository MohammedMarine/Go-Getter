//import { useParams } from "react-router-dom";
import axiosInstance from '../../utils/axios';
import { useEffect, useState } from 'react';
import InfinityLoading from '../Loading/InfinityLoading';

export default function Status() {
  const [status, setStatus] = useState(Number);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/currentCart');
        console.log(res.data[0].status_id);
        if (res.data[0].status_id) {
          setStatus(res.data[0].status_id);
          setLoading(false);
        }
        console.log(res.data[0].status_id);
        console.log(status);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchdata();
  }, [status]);

  return loading ? (
    <InfinityLoading />
  ) : status === 1 ? (
    <ul className="steps">
      <li className="step step-primary">En cours de préparation</li>
      <li className="step">Prêt à être récupéré</li>
      <li className="step">Récupéré</li>
    </ul>
  ) : status === 2 ? (
    <ul className="steps">
      <li className="step step-primary">En cours de préparation</li>
      <li className="step step-primaryy">Prêt à être récupéré</li>
      <li className="step">Récupéré</li>
    </ul>
  ) : status === 4 ? (
    <ul className="steps">
      <li className="step step-primary">En cours de préparation</li>
      <li className="step step-primary">Prêt à être récupéré</li>
      <li className="step step-primary">Récupéré</li>
    </ul>
  ) : status === 3 ? (
    <ul className="steps">
      <li className="step step-error">En cours de préparation</li>
      <li className="step step-error">Prêt à être récupéré</li>
      <li className="step step-error">Récupéré</li>
      <li className="step step-error">Pannier refusé</li>
    </ul>
  ) : (
    <ul className="steps">
      <li className="step step-error">Aucun panier à afficher</li>
      <li className="step">En cours de préparation</li>
      <li className="step">Prêt à être récupéré</li>
      <li className="step">Récupéré</li>
      <li className="step">Pannier refusé</li>
    </ul>
  );
}
