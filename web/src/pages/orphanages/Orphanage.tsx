import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../../components/Sidebar";
import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";

import '../../styles/pages/orphanage.css';

interface Orphanage {
  latitude: number;
  longitude: number;
  nome: string;
  sobre: string;
  instrucoes: string;
  horario_abertura: string;
  abertura_fins_de_semana: string;
  images: Array<{
    id: number;
    url: string;
  }>;
};

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response => {
          setOrphanage(response.data);
      });
  }, [params.id]);
  
  if(!orphanage) {
    return <p>Carregando dados...</p>
  }
  
  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImage].url} alt={orphanage.nome} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id} 
                  className={activeImage === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImage(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.nome} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.nome} </h1>
            <p>{orphanage.sobre} </p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                    url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instrucoes} </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.horario_abertura}
              </div>
              { orphanage.abertura_fins_de_semana ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}