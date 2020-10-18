import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {
    async create(request: Request, response: Response) {
        const {
            nome,
            latitude,
            longitude,
            sobre,
            instrucoes,
            horario_abertura,
            abertura_fins_de_semana,    
        } = request.body;
        
        const orphanagesRepository = getRepository(Orphanage);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            nome,
            latitude,
            longitude,
            sobre,
            instrucoes,
            horario_abertura,
            abertura_fins_de_semana: abertura_fins_de_semana === 'true',
            images
        };

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            sobre: Yup.string().required().max(300),
            instrucoes: Yup.string().required(),
            horario_abertura: Yup.string().required(),
            abertura_fins_de_semana: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape(
                {
                    path: Yup.string().required()
                }
            ))
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);
        
        await orphanagesRepository.save(orphanage);
        
        return response.status(201).json(orphanage);
    },

    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.status(200).json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.status(200).json(orphanageView.render(orphanage));

        /*
        if(!orphanage) {
            return response.status(404).json("Nada encontrado!");
        }else{
        }
        */
    }
}
