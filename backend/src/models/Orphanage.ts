import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('orphanages')

export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;
    
    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    sobre: string;

    @Column()
    instrucoes: string;

    @Column()
    horario_abertura: string;
    
    @Column()
    abertura_fins_de_semana: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[];
}