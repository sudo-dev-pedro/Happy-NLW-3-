import Orphanage from '../models/Orphanage';
import imagesView from './images_view';

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            nome: orphanage.nome,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            sobre: orphanage.sobre,
            instrucoes: orphanage.instrucoes,
            horario_abertura: orphanage.horario_abertura,
            abertura_fins_de_semana: orphanage.abertura_fins_de_semana,
            images: imagesView.renderMany(orphanage.images) 
        };
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}